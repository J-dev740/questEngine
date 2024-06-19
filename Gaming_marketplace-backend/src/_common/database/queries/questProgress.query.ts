import { BadRequestException } from "@nestjs/common";
import { Model, Types } from "mongoose";

import { TaskStatus } from "@common/quest/constants/task";
import { Page } from "@common/types.global";
import { QuestDocument } from "../schema/quest.schema";
import { modelName, QuestProgressDocument } from "../schema/questProgress.schema";
import { GenericQueryService } from "./generic.query";

export default class QuestQueryService extends GenericQueryService<QuestProgressDocument> {
	constructor(model: Model<QuestProgressDocument>) {
		super(model, modelName);
	}

	async getQuestQuestorsQuery(_id: string): Promise<any> {
		const questors = await this.model.find({ questId: _id }).populate("userId");
		return questors.map((quest) => quest.userId);
	}

	async getQuestProgressByQuestId(questId: string): Promise<any> {
		const result = await this.model.find({ questId });
		return result;
	}

	async getCompletedQuestsQuery(id: string, { skip, length }: Page) {
		return this.model.aggregate([
			{
				$match: {
					"taskStatus.status": TaskStatus.COMPLETED,
					userId: new Types.ObjectId(id),
				},
			},
			{ $skip: skip },
			{ $limit: length },
		]);
		// const quests = await this.model
		// .find({ userId: new Types.ObjectId(id) })
		// .populate<{ questId: QuestDocument }>("questId");
		// let completedQuests: Array<QuestDocument>;
		// quests.forEach((quest) => {
		// if (quest.taskStatus.every((task) => task.status === TaskStatus.COMPLETED)) {
		// completedQuests.push(quest.questId);
		// }
		// });
		// return completedQuests;
	}

	async getQuestDetailsQuery(_id: string): Promise<any> {
		if (await this.checkValidity({ _id })) {
			const quest = await this.model.findById(_id);

			return Promise.resolve(quest);
		}

		throw new BadRequestException(`${this.modelName} not found`);
	}

	async createEntity(data: any): Promise<QuestProgressDocument> {
		return super.createEntity(data);
	}

	async getQuestsByUserId(userId: string): Promise<Array<QuestDocument>> {
		const quests = await this.model
			.find({ userId: new Types.ObjectId(userId) })
			.populate<{ questId: QuestDocument }>("questId");
		return quests.map((quest) => quest.questId);
	}

	async getUserQuestInformation(userId: string, questId: string): Promise<QuestProgressDocument> {
		const quest = await this.model.findOne({
			userId: new Types.ObjectId(userId),
			questId: new Types.ObjectId(questId),
		});
		return quest;
	}

	async getUserArrayQuestInformation(userIds: any, questId: string): Promise<any> {
		// sort by gems
		// const quest = await this.model.aggregate([{
		// 	$match: { questId },
		// },
		// {
		// 	$lookup: {
		// 		from: "users",
		// 		localField: "userId",
		// 		foreignField: "_id",
		// 		as: "userDetails",
		// 	},
		// },
		// {
		// 	$unwind: "$userDetails",
		// },
		// {
		// 	$sort: { "userDetails.gems": -1 },
		// },
		// {
		// 	$project: {
		// 		_id: 1,
		// 		questId: 1,
		// 		userId: 1,
		// 		taskStatus: 1,
		// 		points_earned: 1,
		// 		"userDetails.gems": 1,
		// 	},
		// },
		// ]);

		const quest = await this.model.aggregate([
			{
				$match: {
					userId: { $in: userIds },
					questId: new Types.ObjectId(questId),
				},
			},
			{
				$sort: {
					points_earned: -1,
				},
			},
		]);
		return quest;
	}
}
