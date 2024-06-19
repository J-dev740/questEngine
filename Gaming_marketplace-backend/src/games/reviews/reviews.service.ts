import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import ReviewQueryService from "../../_common/database/queries/review.query";
import {
	modelName as reviewModelName,
	ReviewDocument,
} from "../../_common/database/schema/review.schema";

@Injectable()
export class ReviewsService {
	reviewQueryService: ReviewQueryService;

	constructor(@InjectModel(reviewModelName) reviewModel: Model<ReviewDocument>) {
		this.reviewQueryService = new ReviewQueryService(reviewModel);
	}

	getGameReviews(gameId: string, count: number): Promise<ReviewDocument[]> {
		return this.reviewQueryService.readMultipleEntities({ game: gameId }, { limit: count });
	}
}
