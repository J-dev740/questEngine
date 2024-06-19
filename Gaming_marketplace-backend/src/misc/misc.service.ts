import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import CurrencyQueryService from "../_common/database/queries/currency.query";
import FeedbackQueryService from "../_common/database/queries/feedback.query";
import GameQueryService from "../_common/database/queries/game.query";
import LanguageQueryService from "../_common/database/queries/language.query";
import UserQueryService from "../_common/database/queries/user.query";
import {
	CurrencyDocument,
	ICurrency,
	modelName as currencyModelName,
} from "../_common/database/schema/currency.schema";
import {
	FeedbackDocument,
	IFeedback,
	modelName as feedbackModelName,
} from "../_common/database/schema/feedback.schema";
import {
	GameDocument,
	IGame,
	modelName as gameModelName,
} from "../_common/database/schema/game.schema";
import {
	ILanguage,
	LanguageDocument,
	modelName as languageModelName,
} from "../_common/database/schema/language.schema";
import { UserDocument, modelName as userModelName } from "../_common/database/schema/user.schema";
import { CURRENCY_TYPE } from "../_common/types.global";

@Injectable()
export class MiscService {
	currencyQueryService: CurrencyQueryService;

	gameQueryService: GameQueryService;

	languageQueryService: LanguageQueryService;

	feedbackQueryService: FeedbackQueryService;

	userQueryService: UserQueryService;

	constructor(
		@InjectModel(currencyModelName) CurrencyModel: Model<CurrencyDocument>,
		@InjectModel(gameModelName) GameModel: Model<GameDocument>,
		@InjectModel(languageModelName) LanguageModel: Model<LanguageDocument>,
		@InjectModel(feedbackModelName) FeedbackModel: Model<FeedbackDocument>,
		@InjectModel(userModelName) UserModel: Model<UserDocument>,
	) {
		this.currencyQueryService = new CurrencyQueryService(CurrencyModel);
		this.gameQueryService = new GameQueryService(GameModel);
		this.languageQueryService = new LanguageQueryService(LanguageModel);
		this.feedbackQueryService = new FeedbackQueryService(FeedbackModel);
		this.userQueryService = new UserQueryService(UserModel);
	}

	async handleGetCurrency(): Promise<Array<ICurrency>> {
		return this.currencyQueryService.readMultipleEntities({});
	}

	async handleCreateCurrency(body: ICurrency): Promise<CurrencyDocument> {
		if (body.type === CURRENCY_TYPE.base) {
			if (
				await this.currencyQueryService.checkValidity({
					chainId: body.chainId,
					type: body.type,
				})
			) {
				throw new BadRequestException("Currency already exists");
			}
			return this.currencyQueryService.createEntity(body);
		}
		if (
			await this.currencyQueryService.checkValidity({
				contractAddress: body.contractAddress,
			})
		) {
			throw new BadRequestException("Currency already exists");
		}
		return this.currencyQueryService.createEntity(body);
	}

	async handleGetGames(): Promise<Array<IGame>> {
		return this.gameQueryService.readMultipleEntities({});
	}

	async handleGetLanguages(): Promise<Array<ILanguage>> {
		return this.languageQueryService.readMultipleEntities({});
	}

	async handleCreateFeedback(content: string, walletAddress: string): Promise<FeedbackDocument> {
		const user = await this.userQueryService.readEntity({ walletAddress });

		const newFeedback: IFeedback = {
			content,
			owner: user.toObject()._id,
		};
		return this.feedbackQueryService.createEntity(newFeedback);
	}
}
