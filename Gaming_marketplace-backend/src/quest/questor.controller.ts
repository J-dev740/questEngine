import { QuestProgressDocument } from "@common/database/schema/questProgress.schema";
import { GetPagination } from "@common/decorators/utils/pagination.decorator";
import { AuthGuard } from "@common/middleware/auth.guard";
import { MoralisGuard } from "@common/middleware/moralis.guard";
import { Page } from "@common/types.global";
import {
	BadRequestException,
	Body,
	Controller,
	Get,
	HttpStatus,
	Param,
	Patch,
	Post,
	Query,
	UseGuards,
} from "@nestjs/common";
import { GetCurrentQuestDto, UserQuestProgress } from "./dtos/QuestProgressDto";
import { QuestService } from "./quest.service";
import { RewardPayoutService } from "./rewardPayout.service";

@Controller({ path: "questor", version: "1" })
export class QuestorController {
	constructor(
		private questService: QuestService,
		private rewardPayoutService: RewardPayoutService,
	) { }

	@Get("/completed-quests")
	@UseGuards(AuthGuard)
	async getQuestorCompletedQuests(@GetPagination() page: Page, @Query("userId") userId: string) {
		return this.questService.getCompletedQuests(userId, page);
	}

	@Get("/participated-quests")
	@UseGuards(AuthGuard)
	async getParticipatedQuests(@Query("userId") userId: string) {
		return this.questService.getParticipatedQuests(userId);
	}

	@Post("/participate")
	@UseGuards(AuthGuard)
	async participateInQuestAndUpdateQuest(@Body() createQuest: GetCurrentQuestDto) {
		return this.questService.participateInQuestAndUpdateQuest(
			createQuest.questId,
			createQuest.userId,
		);
	}

	@Get("/quest-progress")
	@UseGuards(AuthGuard)
	getCurrentQuestData(@Query() query: UserQuestProgress) {
		console.log("getCurrentQuestData", query);
		return this.questService.getUsersQuestProgress(query.userId, query.questId);
	}

	@Patch("/update-task")
	@UseGuards(AuthGuard)
	updateTaskInQuestProgress(@Body() body): Promise<QuestProgressDocument> {
		console.log(body);
		try {
			return this.questService.updateTaskInQuestProgress(
				body.questID,
				body.taskID,
				body.userID,
			);
		} catch (error) {
			throw new BadRequestException({
				status: 500,
				message: "Task not updated",
			});
		}
	}

	@Get("reward-recepients/:questId")
	@UseGuards(AuthGuard)
	getRewardRecepients(@Param("questId") questId: string) {
		return this.rewardPayoutService.getUsersWhoCompletedQuest(questId);
	}

	@Post("reward-payout/:questId")
	@UseGuards(AuthGuard)
	rewardPayout(
		@Param("questId") questId: string,
		@Query("tokenAddress") tokenAddress: string,
		@Query("userId") userId: string,
	) {
		return this.rewardPayoutService.rewardPayout(questId, tokenAddress, userId);
	}

	@Post("reward-payout")
	@UseGuards(MoralisGuard)
	async handleRewardPayoutEvent(@Body() body: any) {
		if ((body.chainId as string).length === 0) return { status: HttpStatus.OK };
		return this.rewardPayoutService.handleRewardPayoutEvent(body);
		// return "hello world";
	}

	@Get("getRewards/:questId")
	// @UseGuards(AuthGuard)
	@UseGuards()
	async getRewards(@Param("questId") id: string, @Query("tokenAddress") tokenAddress: string) {
		console.log("getRewards", id, tokenAddress);
		const rewards = await this.rewardPayoutService.getRewards(id, tokenAddress);
		// const quest= await this.questService.getQuestById(id);
		// return  this.rewardPayoutService.getRewards(id);

		return rewards;
		// return quest;
	}

	// @Get("/total-points")
	// getTotalPoints(@Req() { walletAddress }: TRequestWithAuth) {
	// 	return this.questService.getTotalPoints();
	// }
}
