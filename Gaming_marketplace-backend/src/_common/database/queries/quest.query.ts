/* eslint-disable import/no-extraneous-dependencies */
import { rewardStatus } from "@common/quest/constants/reward";
import { Page } from "@common/types.global";
import { BadRequestException } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { Model, Types } from "mongoose";
import { QuestStatus } from "@common/quest/constants/quest";
import { IsObjectId } from "@common/decorators/validation/ObjectId.decorator";
import { QuestDocument, modelName } from "../schema/quest.schema";
import { GenericQueryService } from "./generic.query";

export default class QuestQueryService extends GenericQueryService<QuestDocument> {
	constructor(model: Model<QuestDocument>) {
		super(model, modelName);
	}

	async getAllQuests({ skip, length }: Page): Promise<Array<QuestDocument>> {
		return this.model.aggregate([{ $skip: skip }, { $limit: length }]);
	}

	async getQuestDetailsQuery(_id: string): Promise<QuestDocument> {
		console.log("getQuestDetailsQuery", _id);
		if (await this.checkValidity({ _id })) {
			return this.model.findById(_id).populate("tasks");
		}

		throw new BadRequestException(`${this.modelName} not found`);
	}

	async participateInQuestAndUpdateQuest(id: string, _userId: string) {
		try {
			let res: any;
			this.model
				.findOneAndUpdate({ _id: id }, { $push: { participatedUsers: _userId } })
				.exec((err, updatedValue) => {
					if (err) {
						// console.log(err);
						return err;
					}
					// console.log(updatedValue);
					res = updatedValue;
					return res;
				});
			return res;
		} catch (error) {
			return error;
		}
	}

	async updateRewardStatus(
		questId: string,
		tokenAddress: string,
		newStatus: rewardStatus,
	): Promise<QuestDocument> {
		// Find the Quest by its ID
		const quest = await this.model.findById(questId);

		if (!quest) {
			throw new BadRequestException(`${this.modelName} not found`);
		}

		quest.rewards.map((reward) => {
			if (reward.address === tokenAddress) {
				console.log("rewardObject",reward);
				const updatedReward=reward;
				updatedReward.rewardStatus = newStatus;
				console.log("updatedReward",updatedReward)
				return updatedReward;
			}
			// console.log("quest_reward ", reward);
			return reward;
		});
		// quest.status = QuestStatus.COMPLETED;

		const updatedQuest = await quest.save();
		console.log("updatedQuest",updatedQuest)

		return updatedQuest;
	}

	async getQuestsFromQuestIds(QuestIds: any): Promise<Array<QuestDocument>> {
		try {
			const createdQuests = await this.model
				.find({
					_id: { $in: QuestIds },
				})
				.populate("tasks")
				.exec();

			return createdQuests;
		} catch (error: any) {
			throw new BadRequestException(error);
		}
	}

	@Cron(CronExpression.EVERY_30_MINUTES)
	async handleCron() {
		const batchSize = 100;
		const count = await this.model.countDocuments().exec();
		const promises = [];

		for (let skip = 0; skip < count; skip += batchSize) {
			promises.push(this.processBatch(skip, batchSize));
		}

		await Promise.all(promises);
	}

	async processBatch(skip, batchSize) {
		const quests = await this.model.find().skip(skip).limit(batchSize).exec();
		const updatePromises = quests.map(questDoc => this.updateQuestStatus(questDoc));
		await Promise.all(updatePromises);
	}

	private async updateQuestStatus(questDoc: QuestDocument) {
		if (!questDoc) {
			return;
		}

		const currentTime = new Date();
		const questStartTime = new Date(questDoc.startTimestamp);
		const questEndTime = new Date(questDoc.endTimestamp);

		let status: string;

		if (currentTime >= questStartTime && currentTime <= questEndTime) {
			status = "ACTIVE";
		} else if (currentTime < questStartTime) {
			status = "UPCOMING";
		} else {
			status = "INACTIVE";
		}

		await this.model.updateOne({ _id: questDoc._id }, { $set: { status } });
	}

	async getQuests(userId: IsObjectId, status: QuestStatus): Promise<Array<QuestDocument>> {
		try {
			const currentTimestamp = new Date();

			const quests = await this.model
				.find({
					status,
					...(status === QuestStatus.ACTIVE && {
						startTimestamp: { $lte: currentTimestamp },
						endTimestamp: { $gte: currentTimestamp },
					}),
					...(status === QuestStatus.UPCOMING && {
						startTimestamp: { $gte: currentTimestamp },
					}),
					...(status === QuestStatus.INACTIVE && {
						endTimestamp: { $lte: currentTimestamp },
					}),
				})
				.populate("tasks")
				.exec();

			return quests;
		} catch (error: any) {
			throw new BadRequestException(error);
		}
	}

	async updateRewardStatusByRewardId(
		questId: string,
		rewardId: Types.ObjectId,
		newStatus: rewardStatus,
	) {
		const questToUpdate = await this.model.findById(questId);

		if (!questToUpdate) {
			throw new BadRequestException(`${this.modelName} not found`);
		}

		questToUpdate.rewards = questToUpdate.rewards.map((reward) =>
			reward._id.equals(rewardId) ? { ...reward, rewardStatus: newStatus } : reward,
		);

		const updatedQuest = await questToUpdate.save();

		return updatedQuest;
	}
}
