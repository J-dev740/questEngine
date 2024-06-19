import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import ReviewQueryService from "../../_common/database/queries/review.query";
import { CourseDocument } from "../../_common/database/schema/course.schema";
import { GameDocument } from "../../_common/database/schema/game.schema";
import { modelName, ReviewDocument } from "../../_common/database/schema/review.schema";
import { UserDocument } from "../../_common/database/schema/user.schema";

@Injectable()
export class DiscoverService {
	reviewQueryService: ReviewQueryService;

	constructor(@InjectModel(modelName) reviewModel: Model<ReviewDocument>) {
		this.reviewQueryService = new ReviewQueryService(reviewModel);
	}

	populateExperts(UCount: number): Promise<UserDocument[]> {
		return this.reviewQueryService.discoverUsers(UCount, { rating: -1 });
	}

	populateCourses(CCount: number): Promise<CourseDocument[]> {
		return this.reviewQueryService.discoverCourses(CCount, { rating: -1 });
	}

	populateGames(GCount: number): Promise<GameDocument[]> {
		return this.reviewQueryService.discoverGames(GCount, { users: -1 });
	}
}
