import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { Roles } from "../_common/decorators/roles/roles.decorator";
import { AuthGuard } from "../_common/middleware/auth.guard";
import { AUTH_ROLES, TRequestWithAuth } from "../_common/types.global";
import { CurrencyDto } from "./dtos/currency.dto";
import { FeedbackDto } from "./dtos/feedback.dto";
import { MiscService } from "./misc.service";

@Controller({ path: "misc", version: "1" })
export class MiscController {
	constructor(private miscService: MiscService) {}

	@Get("/currency")
	async getCurrency() {
		return this.miscService.handleGetCurrency();
	}

	@Get("/games")
	async getGames() {
		return this.miscService.handleGetGames();
	}

	@Get("/languages")
	async getLanguages() {
		return this.miscService.handleGetLanguages();
	}

	@Post("/currency")
	@UseGuards(AuthGuard)
	@Roles(AUTH_ROLES.admin)
	createCurrency(@Body() body: CurrencyDto) {
		return this.miscService.handleCreateCurrency(body);
	}

	@Post("/feedback")
	@UseGuards(AuthGuard)
	async createFeedback(@Body() fbDto: FeedbackDto, @Req() request: TRequestWithAuth) {
		return this.miscService.handleCreateFeedback(fbDto.content, request.walletAddress);
	}
}
