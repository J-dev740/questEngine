import { IsObjectId } from "@common/decorators/validation/ObjectId.decorator";
import { Page } from "@common/types.global";
import { BadRequestException, Injectable, OnModuleInit } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model, Types } from "mongoose";
import { rewardStatus } from "@common/quest/constants/reward";
import QuestQueryService from "../_common/database/queries/quest.query";
import TaskQueryService from "../_common/database/queries/task.query";
import UserQueryService from "../_common/database/queries/user.query";
import {
	IQuest,
	QuestDocument,
	modelName as questModelName,
} from "../_common/database/schema/quest.schema";
import { TaskDocument, modelName as taskModelName } from "../_common/database/schema/task.schema";
import { UserDocument, modelName as userModelName } from "../_common/database/schema/user.schema";
import { QuestStatus } from "../_common/quest/constants/quest";
import { RewardsDto } from "./dtos/CreateQuestDto";
import { UpdateQuestDetailsDto } from "./dtos/UpdateQuestDetailsDto";
import { UpdateQuestDto } from "./dtos/UpdateQuestDto";
import { UpdateQuestRewardDto } from "./dtos/UpdateQuestRewardDto";
import { UpdateSingleQuestRewardDto } from "./dtos/UpdateSingleQuestRewardDto";
import { UpdateSingleQuestTaskDto } from "./dtos/UpdateSingleQuestTaskDto";

@Injectable()
export class AdminService implements OnModuleInit {
	userQueryService: UserQueryService;

	questQueryService: QuestQueryService;

	taskQueryService: TaskQueryService;

	constructor(
		@InjectModel(taskModelName) TaskModel: Model<TaskDocument>,
		@InjectModel(questModelName) QuestModel: Model<QuestDocument>,
		@InjectModel(userModelName) UserModel: Model<UserDocument>,
	) {
		// initialize the query services with the related models
		this.userQueryService = new UserQueryService(UserModel);
		this.questQueryService = new QuestQueryService(QuestModel);
		this.taskQueryService = new TaskQueryService(TaskModel);
	}

	hasDuplicateReward = (rewards: RewardsDto[]): boolean => {
		const seenAddresses = new Set<string>();
		const seenNames = new Set<string>();

		return rewards.some((reward) => {
			const { address, name } = reward;

			if (seenAddresses.has(address) || seenNames.has(name)) {
				return true;
			}

			seenAddresses.add(address);
			seenNames.add(name);

			return false;
		});
	};

	async onModuleInit() {
		try {
			await this.questQueryService.handleCron();
		} catch (error) {
			throw new BadRequestException("error");
		}
	}


	async createQuest(createQuestDto: any, userId: string) {
		const userIdObject = new Types.ObjectId(userId);
		await this.userQueryService.checkValidity({ _id: userIdObject });

		const {
			tag,
			questTitle,
			questDescription,
			imageurl,
			eligibility,
			tasks,
			gemsReward,
			rewardMethod,
			startTimestamp,
			endTimestamp,
			isQuestRewardConfigured,
			numberOfWinners,
			rewards,
			status,
		} = createQuestDto;

		if (this.hasDuplicateReward(rewards)) {
			throw new BadRequestException("Duplicate rewards found");
		}
		const updatedRewards = rewards.map((reward) => ({
			...reward,
			rewardStatus: rewardStatus.FAILED,
		}));
		const updatedTasks = tasks.map((task) => ({ ...task, createdBy: userIdObject }));
		const result = await this.taskQueryService.createMultipleEntities(updatedTasks);
		const taskIds: Types.ObjectId[] = [];

		result.forEach((task) => {
			taskIds.push(task._id);
		});

		const newQuest: IQuest = {
			createdBy: userIdObject,
			tag,
			questTitle,
			questDescription,
			imageurl,
			eligibility,
			tasks: taskIds,
			rewardMethod,
			isQuestRewardConfigured,
			numberOfWinners,
			rewards: updatedRewards,
			gemsReward,
			startTimestamp: new Date(startTimestamp),
			endTimestamp: new Date(endTimestamp),
			status: status || QuestStatus.DRAFTED,
		};

		console.log("newQuest");
		const quest = await this.questQueryService.createEntity(newQuest);

		await this.userQueryService.updateEntity(
			{ _id: userIdObject },
			{ $push: { created_quests: quest._id } },
		);

		return quest;
	}

	async getAllQuests(page: Page) {
		try {
			const allQuests = await this.questQueryService.getAllQuests(page);
			return allQuests;
		} catch (error) {
			throw new BadRequestException(error);
		}
	}

	async updateQuestStatus(updateQuestStatusDTO: UpdateQuestDto, skip: number, length: number) {
		const id = new mongoose.Types.ObjectId(updateQuestStatusDTO.questId);

		await this.questQueryService.getAllQuests({ skip, length });

		await this.questQueryService.updateEntity(
			{ _id: id },
			{ status: updateQuestStatusDTO.questStatus },
		);
	}

	async updateQuestRewards(updateQuestRewardDto: UpdateQuestRewardDto, userId: string) {
		const questId = new mongoose.Types.ObjectId(updateQuestRewardDto.questId);

		const quest = await this.questQueryService.readEntity({ _id: questId });

		if (quest.createdBy.toString() !== userId) {
			throw new BadRequestException("You are not authorized to update this quest");
		}

		const { rewards } = updateQuestRewardDto;

		if (this.hasDuplicateReward(rewards)) {
			throw new BadRequestException("Duplicate rewards found");
		}

		await this.questQueryService.updateEntity({ _id: questId }, { rewards });

		await this.questQueryService.updateEntity(
			{ _id: questId },
			{ isQuestRewardConfigured: true },
		);
	}

	async updateQuestTaskByTaskId(
		updateSingleQuestTaskDto: UpdateSingleQuestTaskDto,
		userId: string,
	) {
		// check if the task is created by the userId
		const taskId = new mongoose.Types.ObjectId(updateSingleQuestTaskDto._id);
		const task = await this.taskQueryService.readEntity({ _id: taskId });
		if (task.createdBy.toString() !== userId) {
			throw new BadRequestException("You are not authorized to update this task");
		}

		await this.taskQueryService.updateEntity(
			{ _id: updateSingleQuestTaskDto._id },
			updateSingleQuestTaskDto,
		);
	}

	async updateQuestRewardByRewardId(
		updateSingleQuestRewardDto: UpdateSingleQuestRewardDto,
		userId: string,
	) {
		const questId = new mongoose.Types.ObjectId(updateSingleQuestRewardDto.questId);
		const { reward } = updateSingleQuestRewardDto;
		const quest = await this.questQueryService.readEntity({ _id: questId });
		if (quest.createdBy.toString() !== userId) {
			throw new BadRequestException("You are not authorized to update this quest");
		}
		const questRewards = quest.rewards;
		// check if address of reward is already present in rewards array
		const isDuplicate = questRewards.some(
			(r) => r.address === reward.address || r.name === reward.name,
		);

		if (isDuplicate) {
			throw new BadRequestException("Duplicate reward found");
		}
		const rewardIndex = questRewards.findIndex((r) => r._id.equals(reward._id));
		questRewards[rewardIndex] = reward;
		await this.questQueryService.updateEntity({ _id: questId }, { rewards: questRewards });
		await this.questQueryService.updateEntity(
			{ _id: questId },
			{ isQuestRewardConfigured: true },
		);
	}

	async updateQuestDetails(updateQuestDetailsDto: UpdateQuestDetailsDto, userId: string) {
		const questId = new mongoose.Types.ObjectId(updateQuestDetailsDto.questId);

		const quest = await this.questQueryService.readEntity({ _id: questId });
		if (quest.createdBy.toString() !== userId) {
			throw new BadRequestException("You are not authorized to update this quest");
		}

		const {
			questTitle,
			questDescription,
			gemsReward,
			eligibility,
			numberOfWinners,
			rewardMethod,
			status,
		} = updateQuestDetailsDto;

		await this.questQueryService.updateEntity(
			{ _id: questId },
			{
				questTitle,
				questDescription,
				gemsReward,
				eligibility,
				numberOfWinners,
				rewardMethod,
				status,
			},
		);
	}


	async getCreatedQuests(userId: IsObjectId) {
		try {
			const userInfo = await this.userQueryService.readEntity({ _id: userId });
			const createdQuests = await this.questQueryService.getQuestsFromQuestIds(
				userInfo.created_quests,
			);
			return createdQuests;
		} catch (error) {
			throw new BadRequestException(error);
		}
	}

	async getQuests(userId: IsObjectId, status: QuestStatus) {
		try {
			const quests = await this.questQueryService.getQuests(userId, status);
			return quests;
		}
		catch (error) {
			throw new BadRequestException(error);
		}
	}
}
