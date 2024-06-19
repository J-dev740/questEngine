import { Controller, Get, Param, Query, UseGuards } from "@nestjs/common";
import { AuthGuard } from "../../_common/middleware/auth.guard";
import { CountDto } from "./dtos/count.dto";
import { GameIdDto } from "./dtos/gameId.dto";
import { ReviewsService } from "./reviews.service";

@Controller({ path: "reviews", version: "1" })
@UseGuards(AuthGuard)
export class ReviewsController {
	// eslint-disable-next-line no-useless-constructor, no-unused-vars, no-empty-function
	constructor(private reviewsService: ReviewsService) {}

	@Get(":gameId")
	getGameReviews(@Param() gameIdDto: GameIdDto, @Query() countDto: CountDto) {
		const { gameId } = gameIdDto;
		const { count } = countDto;
		return this.reviewsService.getGameReviews(gameId, count);
	}
}
