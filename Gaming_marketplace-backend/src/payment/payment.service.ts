import { BadRequestException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { isPast } from "date-fns";
import { BigNumber, ethers } from "ethers";
import { Model, Types } from "mongoose";
import CourseQueryService from "../_common/database/queries/course.query";
import CurrencyQueryService from "../_common/database/queries/currency.query";
import LivestreamQueryService from "../_common/database/queries/livestream.query";
import TransactionQueryService from "../_common/database/queries/transaction.query";
import UserQueryService from "../_common/database/queries/user.query";
import {
	CourseDocument,
	ICourse,
	modelName as courseModelName,
} from "../_common/database/schema/course.schema";
import {
	CurrencyDocument,
	modelName as currencyModelName,
} from "../_common/database/schema/currency.schema";
import {
	ILivestream,
	LivestreamDocument,
	modelName as livestreamModelName,
} from "../_common/database/schema/livestream.schema";
import {
	ITransaction,
	TransactionDocument,
	modelName as transactionModelName,
} from "../_common/database/schema/transaction.schema";
import { UserDocument, modelName as userModelName } from "../_common/database/schema/user.schema";
import { CONTRACT_STATUS, CURRENCY_TYPE, TRANSACTION_ASSET_TYPE } from "../_common/types.global";
import { parseLogs } from "../_common/utils";
import { PaymentDto } from "./dtos/payment.dto";

interface BuyCourseEvent {
	courseId: BigNumber;
	buyer: string;
	amount: BigNumber;
	tokenAddress: string;
	seller: string;
}

type PaymentType = "course" | "livestream";

@Injectable()
export class PaymentService {
	userQueryService: UserQueryService;

	transactionQueryService: TransactionQueryService;

	currencyQueryService: CurrencyQueryService;

	courseQueryService: CourseQueryService;

	livestreamQueryService: LivestreamQueryService;

	constructor(
		@InjectModel(userModelName) UserModel: Model<UserDocument>,
		@InjectModel(courseModelName) CourseModel: Model<CourseDocument>,
		@InjectModel(currencyModelName) CurrencyModel: Model<CurrencyDocument>,
		@InjectModel(livestreamModelName)
		LivestreamModel: Model<LivestreamDocument>,
		@InjectModel(transactionModelName)
		TransactionModel: Model<TransactionDocument>,
	) {
		this.userQueryService = new UserQueryService(UserModel);
		this.courseQueryService = new CourseQueryService(CourseModel);
		this.currencyQueryService = new CurrencyQueryService(CurrencyModel);
		this.livestreamQueryService = new LivestreamQueryService(LivestreamModel);
		this.transactionQueryService = new TransactionQueryService(TransactionModel);
	}

	async makePayment(walletAddress: string, assetType: TRANSACTION_ASSET_TYPE, dto: PaymentDto) {
		const user = await this.userQueryService.readEntity({ walletAddress });
		let asset: ICourse | ILivestream;
		switch (assetType) {
			case TRANSACTION_ASSET_TYPE.course: {
				asset = await this.courseQueryService.readEntity({
					_id: dto.assetId,
				});
				if (asset.users.some((item) => item.toString() === user._id.toString()))
					throw new BadRequestException("Course is already purchased");
				break;
			}
			case TRANSACTION_ASSET_TYPE.livestream: {
				asset = await this.livestreamQueryService.readEntity({
					_id: dto.assetId,
				});
				if (asset.users.some((item) => item.toString() === user._id.toString()))
					throw new BadRequestException("Livestream is already subscribed to");
				if (isPast(asset.streamEnd))
					throw new BadRequestException("Livestream has already ended");
				// remove this after dev
				await this.userQueryService.updateEntity(
					{ _id: user._id },
					{ $push: { purchasedLivestreams: dto.assetId } },
				);
				await this.livestreamQueryService.updateEntity(
					{ _id: dto.assetId },
					{ $push: { users: user._id } },
				);
				break;
			}
			default:
				throw new InternalServerErrorException();
		}

		if (user._id.toString() === asset.owner.toString())
			throw new BadRequestException("You cant buy your own content");

		const buyer = await this.userQueryService.readEntity({
			_id: asset.owner,
		});

		const newTransaction: ITransaction = {
			from: user.walletAddress,
			to: buyer.walletAddress,
			assetType,
			currency: dto.currency,
			price: dto.price,
			asset: new Types.ObjectId(dto.assetId),
			hash: dto.hash,
			status: dto.status,
		};

		await this.transactionQueryService.createEntity(newTransaction);
	}

	async validatePayment(body: any, type: PaymentType) {
		if (!body.confirmed) return;
		console.log("validatePayment triggered------------------------------------->");
		switch (type) {
			case "course": {
				const { courseId, amount, buyer, seller, tokenAddress } =
					parseLogs<BuyCourseEvent>(body)[0];

				const _courseId = new Types.ObjectId(courseId._hex.substring(2));
				const _buyer = buyer.toLowerCase();
				const _seller = seller.toLowerCase();

				const { type: currencyType } = await this.currencyQueryService.readEntity({
					contractAddress: tokenAddress,
				});

				const user = await this.userQueryService.readEntity({
					walletAddress: _buyer,
				});

				const newTransaction: ITransaction = {
					from: _buyer,
					to: _seller,
					assetType: TRANSACTION_ASSET_TYPE.course,
					currency: tokenAddress,
					price:
						currencyType === CURRENCY_TYPE.base
							? Number(ethers.utils.formatEther(amount.toString()))
							: amount.toNumber(),
					asset: _courseId,
					hash: body.logs[0].transactionHash, // this may fail need to check
					status: CONTRACT_STATUS.confirmed,
				};

				await this.transactionQueryService.createEntity(newTransaction);
				await this.userQueryService.updateEntity(
					{ _id: user._id },
					{ $push: { purchasedCourses: _courseId } },
				);
				await this.courseQueryService.updateEntity(
					{ _id: _courseId },
					{ $push: { users: user._id } },
				);

				// await this.transactionQueryService.updateEntity(
				// 	{ _id: courseId },
				// 	{ status: CONTRACT_STATUS.confirmed },
				// );
				break;
			}

			// replace this when livestream payment is done
			case "livestream":
				break;

			default:
				break;
		}
	}
}
