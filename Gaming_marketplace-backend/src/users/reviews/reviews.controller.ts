import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { AuthGuard } from "../../_common/middleware/auth.guard";
import { UserReviewsDto } from "./dtos/userReviews.dto";
import { ReviewsService } from "./reviews.service";

@Controller({ path: "reviews", version: "1" })
@UseGuards(AuthGuard)
export class ReviewsController {
	// eslint-disable-next-line no-useless-constructor, no-unused-vars, no-empty-function
	constructor(private reviewsService: ReviewsService) {}

	@Get(":userId")
	getUserReviews(@Param() reviewsDto: UserReviewsDto) {
		const { userId, reviewsCount } = reviewsDto;
		return this.reviewsService.getUserReviews(userId, reviewsCount);
	}
}
