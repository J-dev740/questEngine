import { Roles } from "@common/decorators/roles/roles.decorator";
import { IsObjectId } from "@common/decorators/validation/ObjectId.decorator";
import { RolesGuard } from "@common/middleware/roles.guard";
import { AUTH_ROLES } from "@common/types.global";
import { Controller, DefaultValuePipe, Get, ParseIntPipe, Post } from "@nestjs/common";
import { Body, Param, Patch, Query, UseGuards } from "@nestjs/common/decorators";
import { QuestStatus } from "@common/quest/constants/quest";
import { AdminService } from "./admin.service";
import { CreateQuestDto } from "./dtos/CreateQuestDto";
import { UpdateQuestDetailsDto } from "./dtos/UpdateQuestDetailsDto";
import { UpdateQuestDto } from "./dtos/UpdateQuestDto";
import { UpdateQuestRewardDto } from "./dtos/UpdateQuestRewardDto";
import { UpdateSingleQuestRewardDto } from "./dtos/UpdateSingleQuestRewardDto";
import { UpdateSingleQuestTaskDto } from "./dtos/UpdateSingleQuestTaskDto";

@Controller({ path: "admin", version: "1" })
@Roles(AUTH_ROLES.admin)
export class AdminController {
	constructor(private readonly adminService: AdminService) {}

	@Get("/run/:userId")
	@UseGuards(RolesGuard)
	getRunningStatus(): string {
		return "Running successfully !";
	}

	@Get("/all/:userId")
	@UseGuards(RolesGuard)
	getAllQuests(
		@Query("skip", new DefaultValuePipe(0), ParseIntPipe) skip: number,
		@Query("length", new DefaultValuePipe(40), ParseIntPipe) length: number,
	) {
		return this.adminService.getAllQuests({ skip, length });
	}

	@Post("/create-quest/:userId")
	@UseGuards(RolesGuard)
	async createQuest(@Param("userId") userId: string, @Body() createQuestDto: CreateQuestDto) {
		return this.adminService.createQuest(createQuestDto, userId);
	}

	@Get("/quests/:userId")
	@UseGuards(RolesGuard)
	getQuests(@Param("userId") userId: IsObjectId, @Query("type") questType: string) {
		switch (questType) {
			case "ACTIVE":
				return this.adminService.getQuests(userId, QuestStatus.ACTIVE);
			case "UPCOMING":
				return this.adminService.getQuests(userId, QuestStatus.UPCOMING);
			case "INACTIVE":
				return this.adminService.getQuests(userId, QuestStatus.INACTIVE);
			default:
				return this.adminService.getCreatedQuests(userId);
		}
	}

	@Post("/update-quest-rewards/:userId")
	@UseGuards(RolesGuard)
	async updateQuestRewards(
		@Param("userId") userId: string,
		@Body() updateQuestRewardDto: UpdateQuestRewardDto,
	) {
		return this.adminService.updateQuestRewards(updateQuestRewardDto, userId);
	}

	@Post("/update-quest-task/:userId")
	@UseGuards(RolesGuard)
	async updateQuestTask(
		@Param("userId") userId: string,
		@Body() updateSingleQuestTaskDto: UpdateSingleQuestTaskDto,
	) {
		return this.adminService.updateQuestTaskByTaskId(updateSingleQuestTaskDto, userId);
	}

	@Post("/update-quest-reward/:userId")
	@UseGuards(RolesGuard)
	async updateQuestReward(
		@Param("userId") userId: string,
		@Body() updateSingleQuestRewardDto: UpdateSingleQuestRewardDto,
	) {
		return this.adminService.updateQuestRewardByRewardId(updateSingleQuestRewardDto, userId);
	}

	@Post("/update-quest-details/:userId")
	@UseGuards(RolesGuard)
	async updateQuestDetails(
		@Param("userId") userId: string,
		@Body() updateQuestDetailsDto: UpdateQuestDetailsDto,
	) {
		return this.adminService.updateQuestDetails(updateQuestDetailsDto, userId);
	}

	@Patch("/update-quest-status/:userId")
	@UseGuards(RolesGuard)
	async updateQuestStatus(
		@Query("skip", new DefaultValuePipe(0), ParseIntPipe) skip: number,
		@Query("length", new DefaultValuePipe(40), ParseIntPipe) length: number,
		@Body() updateQuestStatusDTO: UpdateQuestDto,
	) {
		return this.adminService.updateQuestStatus(updateQuestStatusDTO, skip, length);
	}
}
