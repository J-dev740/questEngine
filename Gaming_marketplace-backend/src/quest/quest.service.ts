import { Page } from "@common/types.global";
import { BadRequestException, Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { startOfMonth, startOfToday, sub } from "date-fns";
import mongoose, { Model } from "mongoose";
import QuestQueryService from "../_common/database/queries/quest.query";
import QuestProgressQueryService from "../_common/database/queries/questProgress.query";
import UserQueryService from "../_common/database/queries/user.query";
import {
	CourseDocument,
	modelName as courseModelName,
} from "../_common/database/schema/course.schema";
import { GameDocument, modelName as gameModelName } from "../_common/database/schema/game.schema";
import { QuestDocument, modelName as questModel } from "../_common/database/schema/quest.schema";
import {
	QuestProgressDocument,
	modelName as questProgressModel,
} from "../_common/database/schema/questProgress.schema";
import { UserDocument, modelName as userModelName } from "../_common/database/schema/user.schema";
import { TaskStatus } from "../_common/quest/constants/task";
import { QuestProgressDTO } from "./dtos/QuestProgressDto";

import TaskQueryService from "../_common/database/queries/task.query";
import { TaskDocument, modelName as taskModelName } from "../_common/database/schema/task.schema";

@Injectable()
export class QuestService {
	userQueryService: UserQueryService;

	questProgressQueryService: QuestProgressQueryService;

	questQueryService: QuestQueryService;

	taskQueryService: TaskQueryService;

	constructor(
		@InjectModel(userModelName) UserModel: Model<UserDocument>,
		@InjectModel(taskModelName) TaskModel: Model<TaskDocument>,

		@InjectModel(gameModelName) GameModel: Model<GameDocument>,
		@InjectModel(courseModelName) CourseModel: Model<CourseDocument>,
		@InjectModel(questProgressModel)
		QuestProgressModel: Model<QuestProgressDocument>,
		@InjectModel(questModel) QuestModel: Model<QuestDocument>,
	) {
		this.userQueryService = new UserQueryService(UserModel);
		this.questProgressQueryService = new QuestProgressQueryService(QuestProgressModel);
		this.questQueryService = new QuestQueryService(QuestModel);
		this.taskQueryService = new TaskQueryService(TaskModel);
	}

	async getUsers(): Promise<UserDocument[]> {
		return this.userQueryService.readMultipleEntities(
			{},
			{ limit: 100 },
			{ games: 0, courses: 0 },
		);
	}

	async postUser(body) {
		try {
			const newUser = await this.userQueryService.createEntity(body);
			return newUser;
		} catch (error: any) {
			throw new BadRequestException(error);
		}
	}

	async getUser(walletId: string) {
		try {
			const allUser = await this.userQueryService.readMultipleEntities(
				{},
				{ limit: 100 },
				{ games: 0, courses: 0 },
			);
			const user = allUser.find(({ walletAddress }) => walletAddress === walletId);
			return user;
		} catch (error: any) {
			throw new BadRequestException(error);
		}
	}

	async getAllQuests(skip: number, length: number): Promise<Array<QuestDocument>> {
		try {
			const allQuests = await this.questQueryService.getAllQuests({ skip, length });
			return allQuests;
		} catch (error: any) {
			throw new BadRequestException(error);
		}
	}

	async getQuestById(questId: string): Promise<QuestDocument> {
		try {
			const quest = await this.questQueryService.getQuestDetailsQuery(questId);
			return quest;
		} catch (error: any) {
			throw new BadRequestException(error);
		}
	}

	async getCompletedQuests(userId: string, page: Page): Promise<Array<QuestDocument>> {
		return this.questProgressQueryService.getCompletedQuestsQuery(userId, page);
	}

	async getParticipatedQuests(userId: string) {
		return this.questProgressQueryService.getQuestsByUserId(userId);
	}

	getTotalPoints(): number {
		return 100;
	}

	// Verify Task
	async updateTaskStatus(questProgressDto: QuestProgressDTO): Promise<any> {
		const questProgress = await this.questProgressQueryService.readEntity({
			questId: questProgressDto.questId,
		});

		const { _id, taskStatus } = questProgress;

		const [taskId] = taskStatus;
		const updateTask = taskId ? [taskId, TaskStatus.COMPLETED] : [];
		await this.questProgressQueryService.updateEntity({ _id }, { taskStatus: updateTask });

		return Promise.resolve(
			await this.questProgressQueryService.readEntity({
				questId: questProgressDto.questId,
			}),
		);
	}

	async updateTaskInQuestProgress(
		questID: string,
		taskID: string,
		userID: string,
	): Promise<QuestProgressDocument> {
		const questId = new mongoose.Types.ObjectId(questID);
		const userId = new mongoose.Types.ObjectId(userID);
		const taskId = new mongoose.Types.ObjectId(taskID);
		const questData = await this.questQueryService.readEntity({ _id: questId });

		const oldQuestProgress = await this.questProgressQueryService.readEntity({
			userId,
			questId,
		});

		const tasks = oldQuestProgress.taskStatus;

		if (tasks?.find((obj) => obj.taskId.toString() === taskID)) {
			throw new BadRequestException("Task already completed");
		}

		const taskObject = await this.taskQueryService.readEntity({ _id: taskId });
		if (!taskObject) {
			throw new BadRequestException("Task not found");
		}
		// let questPointCount = oldQuestProgress.points_earned + taskObject.points;

		const newTask = {
			taskId: taskObject._id,
			status: TaskStatus.COMPLETED,
		};

		const updateQuestProgress = await this.questProgressQueryService.updateEntity(
			{ _id: oldQuestProgress._id },
			{
				$push: { taskStatus: newTask },
			},
		);

		if ((updateQuestProgress as any).taskStatus.length === questData.tasks.length) {
			const updateUser = await this.userQueryService.updateEntity(
				{ _id: oldQuestProgress.userId },
				{
					$inc: { gems: questData.gemsReward },
				},
			);
			if (!updateUser) {
				throw new BadRequestException({
					statusCode: 400,
					message: "error in updating user !",
				});
			}
		}
		return updateQuestProgress as QuestProgressDocument;
	}

	async postQuestProgress(questProgressDTO: QuestProgressDTO) {
		const quest = await this.questProgressQueryService.createEntity(questProgressDTO);
		const { userId, questId } = quest;
		const { referrelUserObjectId, taskId } = questProgressDTO;

		if (referrelUserObjectId && taskId !== "tasks") {
			console.log("called");
			const object = {
				questProgressID: questId,
				userID: referrelUserObjectId,
				taskId,
				taskEnum: "referral",
			};

			console.log(object);

			this.updateTaskInQuestProgress(
				questId.toString(),
				referrelUserObjectId,
				taskId,
				// "referral",
			);
		}

		const userDetails = await this.userQueryService.readEntity({
			_id: userId,
		});
		const updatedQuests = userDetails.participated_quests
			? userDetails.participated_quests
			: [];
		updatedQuests.push(questId);

		await this.userQueryService.updateEntity(
			{ _id: userId },
			{
				participated_quests: updatedQuests,
			},
		);

		return quest;
	}

	async getUsersQuestProgress(userId: string, questId: string): Promise<any> {
		const data = await this.questProgressQueryService.readEntity({ userId, questId });
		return data;

		// const taskArray = [];

		// questProgress.forEach((task: any) => {
		// 	if (task.questId.toString() === questID && task.userId.toString() === userID) {
		// 		task.taskStatus.forEach((e: any) => {
		// 			if (e.status === "completed") {
		// 				taskArray.push(e.taskId);
		// 			}
		// 		});
		// 	}
		// });
		// return taskArray;
	}

	async getQuestersByQuest(questId: string): Promise<Array<any>> {
		if (questId === undefined || questId === null) {
			throw new BadRequestException("Invalid Quest Id");
		}
		const questors = await this.questProgressQueryService.getQuestQuestorsQuery(questId);

		if (questors === null || questors === undefined) {
			throw new BadRequestException("No such Quest Progress Model exist");
		}
		return questors;
	}

	async participateInQuestAndUpdateQuest(questId: string, userId: string) {
		try {
			const quest = await this.questQueryService.readEntity({ _id: questId });
			if (!quest) {
				throw new BadRequestException("Quest not found");
			}
			if (quest.createdBy.toString() === userId) {
				throw new BadRequestException("Creator can't participate in own quest");
			}
			if (quest.startTimestamp > new Date() || quest.endTimestamp < new Date()) {
				throw new BadRequestException("Quest is not active");
			}

			return await this.questProgressQueryService.createEntity({
				questId,
				userId,
			});
		} catch (error) {
			// console.log(error);
			Logger.error(error);
			throw new BadRequestException(error);
		}
		// await this.questQueryService.participateInQuestAndUpdateQuest(questId, userId);
		// return this.getQuesters(questId);
	}

	async getQuesters(questId: string): Promise<any> {
		return this.questProgressQueryService.getQuestQuestorsQuery(questId);
	}

	async getLeaderboard(page: Page) {
		try {
			const allUsers = await this.userQueryService.getLeaderboard(page);

			return allUsers;
		} catch (error: any) {
			throw new BadRequestException(error);
		}
	}

	getLeaderboardDaily(page: Page) {
		const result = sub(startOfToday(), { days: 1 });
		return this.userQueryService.getLeaderBoardDaily(result, page);
	}

	getLeaderboardMonthly(page: Page) {
		const result = sub(startOfMonth(new Date()), { months: 1 });
		return this.userQueryService.getLeaderBoardMonthly(result, page);
	}
}
