import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import ReviewQueryService from "../../_common/database/queries/review.query";
import UserQueryService from "../../_common/database/queries/user.query";
import {
	modelName as reviewModelName,
	ReviewDocument,
} from "../../_common/database/schema/review.schema";
import {
	modelName as userModelName,
	UserDocument,
} from "../../_common/database/schema/user.schema";
import { AUTH_ROLES } from "../../_common/types.global";
import { PromiseFulfilledResult } from "../../_common/types.util";

@Injectable()
export class ReviewsService {
	reviewQueryService: ReviewQueryService;

	userQueryService: UserQueryService;

	constructor(
		@InjectModel(reviewModelName) reviewModel: Model<ReviewDocument>,
		@InjectModel(userModelName) userModel: Model<UserDocument>,
	) {
		this.reviewQueryService = new ReviewQueryService(reviewModel);
		this.userQueryService = new UserQueryService(userModel);
	}

	async getUserReviews(userId: string, reviewCount: number): Promise<ReviewDocument[]> {
		const user = await this.userQueryService.readEntity({ _id: userId });
		const { _id, role, courses, livestreams } = user;

		if (role.includes(AUTH_ROLES.member)) {
			return this.reviewQueryService.readMultipleEntities(
				{ user: _id },
				{ limit: reviewCount },
			);
		}
		if (role.includes(AUTH_ROLES.expert)) {
			const _courseReviews = courses.map((item) =>
				this.reviewQueryService.readEntity({ course: item }),
			);

			const _livestreamReviews = livestreams.map((item) =>
				this.reviewQueryService.readEntity({ livestream: item }),
			);

			const _settled = (
				await Promise.allSettled([..._courseReviews, ..._livestreamReviews])
			).filter((item) => item.status === "fulfilled") as Array<
				PromiseFulfilledResult<ReviewDocument>
			>;
			const res = _settled.map((item) => item.value);

			return Promise.resolve(res);
		}
		throw new BadRequestException();
	}
}
