/* eslint-disable import/no-extraneous-dependencies */
import { Page } from "@common/types.global";
import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Express } from "express";
import { S3 } from "aws-sdk";
import mongoose, { Model, Types } from "mongoose";
import { v4 as uuidv4 } from "uuid";
import { ConfigService } from "@nestjs/config";
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
import { UpdateQuestDto } from "./dtos/UpdateQuestDto";
import { UpdateQuestRewardDto } from "./dtos/UpdateQuestRewardDto";

// import { modelName } from "../_common/database/schema/quest.schema";

// import {
// 	IQuest,
// 	QuestDocument,
// 	QuestSchemaName,
// 	TaskDocument,
// 	TaskSchemaName,
// 	UserDocument,
// 	UserSchemaName,
// } from "../_common/database/schema";

@Injectable()
export class CreatorService {
	userQueryService: UserQueryService;

	questQueryService: QuestQueryService;

	taskQueryService: TaskQueryService;

	private s3: S3;

	constructor(
		@InjectModel(taskModelName) TaskModel: Model<TaskDocument>,
		@InjectModel(questModelName) QuestModel: Model<QuestDocument>,
		@InjectModel(userModelName) UserModel: Model<UserDocument>,
		private configService: ConfigService,
	) {
		this.userQueryService = new UserQueryService(UserModel);
		this.questQueryService = new QuestQueryService(QuestModel);
		this.taskQueryService = new TaskQueryService(TaskModel);
		this.s3 = new S3({
			accessKeyId: this.configService.get("AWS_ACCESS_KEY_ID"),
			secretAccessKey: this.configService.get("AWS_SECRET_ACCESS_KEY"),
			region: this.configService.get("AWS_REGION"),
		});
	}

	// 1. creatreQues
	async createQuest(createQuestDto) {
		const {
			createdBy,
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
		} = createQuestDto;

		console.log(createQuestDto);

		const result = await this.taskQueryService.createMultipleEntities(tasks);
		const taskIds: Types.ObjectId[] = [];

		result.forEach((task) => {
			taskIds.push(task._id);
		});

		await this.userQueryService.checkValidity({ _id: createdBy });

		const newQuest: IQuest = {
			createdBy: new Types.ObjectId(createdBy),
			tag,
			questTitle,
			questDescription,
			imageurl,
			eligibility,
			tasks: taskIds,
			rewardMethod,
			isQuestRewardConfigured,
			numberOfWinners,
			rewards,
			gemsReward,
			startTimestamp: new Date(startTimestamp),
			endTimestamp: new Date(endTimestamp),
			status: QuestStatus.DRAFTED,
			// participatedUsers: null,
		};

		return this.questQueryService.createEntity(newQuest);
	}

	// Upload an image
	async uploadImage(file: Express.Multer.File): Promise<string> {
		if (!file || !file.buffer || !file.mimetype) {
			throw new BadRequestException("Invalid file");
		}

		const params = {
			Bucket: this.configService.get("AWS_BUCKET_NAME"),
			Key: `${uuidv4()}.${file || file.buffer || file.mimetype}`,
			Body: file.buffer,
			ACL: "public-read",
			ContentType: file.mimetype,
		};

		try {
			const uploadResult = await this.s3.upload(params).promise();
			return uploadResult.Location;
		} catch (error) {
			throw new BadRequestException(`Failed to upload image: ${error.message}`);
		}
	}

	async getAllQuests(page: Page) {
		try {
			const allQuests = await this.questQueryService.getAllQuests(page);
			return allQuests;
		} catch (error) {
			throw new BadRequestException(error);
		}
	}

	// 2. editQuest
	// async updateQuest(updateQuestDto: updateQuestDto) {

	// }

	// 3. reward tranfer

	// 4. task create

	// 5. updateQuestStatus
	async updateQuestStatus(updateQuestStatusDTO: UpdateQuestDto, skip: number, length: number) {
		const id = new mongoose.Types.ObjectId(updateQuestStatusDTO.questId);

		await this.questQueryService.getAllQuests({ skip, length });

		await this.questQueryService.updateEntity(
			{ _id: id },
			{ status: updateQuestStatusDTO.questStatus },
		);
	}

	async updateQuestRewards(updateQuestRewardDto: UpdateQuestRewardDto) {
		const questId = new mongoose.Types.ObjectId(updateQuestRewardDto.questId);

		const { rewards } = updateQuestRewardDto;

		await this.questQueryService.updateEntity({ _id: questId }, { rewards });

		await this.questQueryService.updateEntity(
			{ _id: questId },
			{ isQuestRewardConfigured: true },
		);
	}
}
