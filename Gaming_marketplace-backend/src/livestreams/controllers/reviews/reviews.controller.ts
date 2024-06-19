import { Body, Controller, Get, Param, Post, Req, UseGuards } from "@nestjs/common";
import { IReview } from "../../../_common/database/schema/review.schema";
import { AuthGuard } from "../../../_common/middleware/auth.guard";
import { TRequestWithAuth } from "../../../_common/types.global";
import { LivestreamService } from "../../livestream.service";
import { LivestreamReviewDto } from "./dtos/livestreamReview.dto";
import { ReviewDataDto } from "./dtos/reviewData.dto";

@Controller({ path: "livestreams/reviews", version: "1" })
@UseGuards(AuthGuard)
export class ReviewsController {
	constructor(private livestreamService: LivestreamService) {}

	@Post(":livestreamId")
	async createLivestreamReview(
		@Param() livestreamReviewDto: LivestreamReviewDto,
		@Req() request: TRequestWithAuth,
		@Body() reviewDataDto: ReviewDataDto,
	): Promise<IReview> {
		return this.livestreamService.handlePostLivestreamReview(
			livestreamReviewDto.livestreamId,
			request.walletAddress,
			reviewDataDto,
		);
	}

	@Get(":livestreamId")
	async getLivestreamReviews(
		@Param() livestreamReviewDto: LivestreamReviewDto,
	): Promise<Array<IReview>> {
		return this.livestreamService.handleGetLivestreamReviews(livestreamReviewDto.livestreamId);
	}
}
