import { BadRequestException, ForbiddenException, Injectable, UseFilters } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { isPast } from "date-fns";
import { Model, Types } from "mongoose";
import GameQueryService from "../_common/database/queries/game.query";
import LivestreamQueryService from "../_common/database/queries/livestream.query";
import ReviewQueryService from "../_common/database/queries/review.query";
import UserQueryService from "../_common/database/queries/user.query";
import { HttpExceptionFilter } from "../_common/exceptions/http-exception.filter";

import {
	ILivestream,
	LivestreamDocument,
	modelName as livestreamModelName,
} from "../_common/database/schema/livestream.schema";

import { modelName as userModelName, UserDocument } from "../_common/database/schema/user.schema";

import { GameDocument, modelName as gameModelName } from "../_common/database/schema/game.schema";
import {
	IReview,
	modelName as reviewModelName,
	ReviewDocument,
} from "../_common/database/schema/review.schema";
import { ReviewDataDto } from "./controllers/reviews/dtos/reviewData.dto";
import { LivestreamDataDto } from "./dto/livestreamData.dto";

@Injectable()
@UseFilters(new HttpExceptionFilter())
export class LivestreamService {
	userQueryService: UserQueryService;

	gameQueryService: GameQueryService;

	livestreamQueryService: LivestreamQueryService;

	reviewQueryService: ReviewQueryService;

	constructor(
		@InjectModel(userModelName) UserModel: Model<UserDocument>,
		@InjectModel(reviewModelName) ReviewModel: Model<ReviewDocument>,
		@InjectModel(gameModelName) GameModel: Model<GameDocument>,
		@InjectModel(livestreamModelName)
		LivestreamModel: Model<LivestreamDocument>,
	) {
		this.userQueryService = new UserQueryService(UserModel);
		this.gameQueryService = new GameQueryService(GameModel);
		this.livestreamQueryService = new LivestreamQueryService(LivestreamModel);
		this.reviewQueryService = new ReviewQueryService(ReviewModel);
	}

	async handleCreateLivestream(
		livestreamData: LivestreamDataDto,
		walletAddress: string,
	): Promise<ILivestream> {
		const {
			_id,
			stream: { id },
		} = await this.userQueryService.readEntity({ walletAddress });
		const createdLivestream: ILivestream = {
			owner: new Types.ObjectId(_id),
			title: livestreamData.title,
			game: livestreamData.game,
			description: livestreamData.description,
			icon: livestreamData.icon,
			streamStart: new Date(`${livestreamData.streamStart}`),
			streamEnd: new Date(`${livestreamData.streamEnd}`),
			streamId: id,
			users: [],
		};

		const livestream = await this.livestreamQueryService.createEntity(createdLivestream);
		await this.gameQueryService.updateEntity(
			{ _id: livestream.game },
			{ $push: { livestreams: livestream._id } },
		);

		await this.userQueryService.updateEntity(
			{ _id: livestream.owner },
			{ $push: { livestreams: livestream._id } },
		);

		await this.gameQueryService.updateEntity(
			{ _id: livestream.game },
			{ $push: { livestreams: livestream._id } },
		);
		return livestream;
	}

	async handleGetSpecificLivestream(
		livestreamId: string,
		// walletAddress: string,
	): Promise<ILivestream> {
		// const user = await this.userQueryService.readEntity({ walletAddress });
		const livestream = await this.livestreamQueryService.readEntity({
			_id: livestreamId,
		});
		// if (livestream.users.includes(user._id)) {
		if (!isPast(livestream.streamEnd)) return livestream;
		throw new BadRequestException("Stream expired");
		// }
		// throw new BadRequestException("Invalid user");
	}

	async handleGetExpertLivestreams(userId: string): Promise<Array<ILivestream>> {
		return this.userQueryService.getExpertLivestreamsQuery(userId);
	}

	async handleGetGameLivestreams(gameId: string): Promise<Array<ILivestream>> {
		return this.gameQueryService.getGameLivestreamsQuery(gameId);
	}

	async handlePostLivestreamReview(
		livestreamId: string,
		walletAddress: string,
		reviewData: ReviewDataDto,
	): Promise<IReview> {
		// check for user authenticity
		const user = await this.userQueryService.readEntity({ walletAddress });
		const stream = await this.livestreamQueryService.readEntity({
			_id: livestreamId,
		});

		const review: IReview = {
			livestream: new Types.ObjectId(livestreamId),
			content: reviewData.content,
			rating: reviewData.rating,
			upvotes: reviewData.upvotes,
			game: stream.game,
			user: user._id,
		};

		return this.reviewQueryService.createEntity(review);
	}

	async handleGetLivestreamReviews(livestreamId): Promise<Array<IReview>> {
		return this.reviewQueryService.readMultipleEntities(
			{ livestream: livestreamId },
			{ rating: -1 },
		);
	}

	async handleDeleteLivestream(
		livestreamId: string,
		walletAddress: string,
	): Promise<ILivestream> {
		const livestream = await this.livestreamQueryService.readEntity({
			_id: livestreamId,
		});

		// check for user authenticity
		const user = await this.userQueryService.readEntity({ walletAddress });
		if (livestream.owner.toString() !== user._id.toString())
			throw new ForbiddenException("Invalid owner");

		await this.userQueryService.updateEntity(
			{ _id: livestream.owner },
			{ $pull: { livestreams: livestream._id } },
		);

		await this.gameQueryService.updateEntity(
			{ _id: livestream.game },
			{ $pull: { livestreams: livestream._id } },
		);

		await this.livestreamQueryService.deleteEntity({ _id: livestreamId });

		return livestream;
	}

	getUpcomingLivestreams() {
		return this.livestreamQueryService.upcomingLivestreamQuery();
	}

	getOngoingLivestreams() {
		return this.livestreamQueryService.ongoingLivestreamQuery();
	}
}
