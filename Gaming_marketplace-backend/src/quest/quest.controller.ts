import { GetPagination } from "@common/decorators/utils/pagination.decorator";
import { AuthGuard } from "@common/middleware/auth.guard";
import { Page } from "@common/types.global";
import {
	Body,
	Controller,
	DefaultValuePipe,
	Get,
	Param,
	ParseIntPipe,
	Post,
	Query,
	UseGuards,
} from "@nestjs/common";
// import { ReferralService } from "@src/tasks/services/referral/referral.service";
import { QuestProgressDocument } from "../_common/database/schema/questProgress.schema";
import { QuestProgressDTO } from "./dtos/QuestProgressDto";
import { QuestService } from "./quest.service";

@Controller({ path: "quest", version: "1" })
export class QuestController {
	constructor(
		private questService: QuestService, // private readonly referralService: ReferralService
	) {}

	@Get()
	async getAllQuests(
		@Query("skip", new DefaultValuePipe(0), ParseIntPipe) skip: number,
		@Query("length", new DefaultValuePipe(40), ParseIntPipe) length: number,
	) {
		return this.questService.getAllQuests(skip, length);
	}

	@Get(":id")
	async getQuestById(
		@Param("id") id: string,
		// @Query("referCode") Code?:string
	) {
		// if(Code){
		// 	//check if this is a valid referralCode
		// 	//if exists and is used by a user with a different wallet id
		// 		//call updateReferral
		// }
		return this.questService.getQuestById(id);
	}

	@Post()
	async createUser(@Body() body) {
		return this.questService.postUser(body);
	}

	@Post("/quests")
	async createQuestProgress(@Body() body) {
		console.log("called", body);
		return this.questService.postQuestProgress(body);
	}

	@Get("/fetch-data/:id")
	@UseGuards(AuthGuard)
	getUserData(@Param("id") walletId: string): any {
		return this.questService.getUser(walletId);
	}

	@Post("/verify")
	@UseGuards(AuthGuard)
	verifyTasks(@Body() questProgressDto: QuestProgressDTO): Promise<QuestProgressDocument> {
		return this.questService.updateTaskStatus(questProgressDto);
	}

	@Get("/questor/:id")
	async getQuestorsById(@Param("id") id: string) {
		return this.questService.getQuestersByQuest(id);
	}

	@Get("/leaderboard/all")
	getLeaderboard(@GetPagination() page: Page) {
		return this.questService.getLeaderboard(page);
	}

	@Get("/leaderboard/daily")
	getLeaderboardDaily(@GetPagination() page: Page) {
		console.log("called", page);
		return this.questService.getLeaderboardDaily(page);
	}

	@Get("/leaderboard/monthly")
	getLeaderboardMonthly(@GetPagination() page: Page) {
		console.log("called", page);
		return this.questService.getLeaderboardMonthly(page);
	}
}
