import { Body, Controller, Get, Param, Post, Req, UseGuards } from "@nestjs/common";
import { IReview } from "../../../_common/database/schema/review.schema";
import { AuthGuard } from "../../../_common/middleware/auth.guard";
import { TRequestWithAuth } from "../../../_common/types.global";
import { CoursesService } from "../../courses.service";
import { reviewDataDto } from "./dto/courseReview.dto";
import { GetCourseReviewsDto } from "./dto/getCourseReviews.dto";

@Controller({ path: "courses/reviews", version: "1" })
@UseGuards(AuthGuard)
export class ReviewsController {
	constructor(private coursesService: CoursesService) {}

	@Get(":courseId")
	async getCourseReviews(
		@Param() getCourseReviewsDto: GetCourseReviewsDto,
	): Promise<Array<IReview>> {
		const data = await this.coursesService.handleGetCourseReviews(getCourseReviewsDto.courseId);

		return data;
	}

	@Post(":courseId")
	async createCourseReview(
		@Param() getCourseReviewsDto: GetCourseReviewsDto,
		@Req() request: TRequestWithAuth,
		@Body() courseReviewDto: reviewDataDto,
	): Promise<IReview> {
		const data = await this.coursesService.handlePostCourseReview(
			getCourseReviewsDto.courseId,
			request.walletAddress,
			courseReviewDto,
		);

		return data;
	}
}
