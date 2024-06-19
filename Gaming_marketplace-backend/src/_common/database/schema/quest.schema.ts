import { HydratedDocument, Schema, Types } from "mongoose";
import { EligibityCriteria } from "../../quest/constants/eligibility_criteria";
import { QuestStatus } from "../../quest/constants/quest";
import { rewardMethod, rewardStatus, rewardType } from "../../quest/constants/reward";

export const modelName = "Quest";

export interface IQuest {
	tag: string;
	questTitle: string;
	questDescription: string;
	imageurl: string;
	createdBy: Types.ObjectId;
	eligibility: EligibityCriteria;
	tasks: Types.ObjectId[];
	gemsReward: number;
	rewards: {
		_id: Types.ObjectId;
		rewardType: rewardType;
		rewardStatus: rewardStatus;
		amount: number;
		address: string;
		name: string;
		chainId: number;
	}[];
	rewardMethod: rewardMethod;
	startTimestamp: Date;
	endTimestamp: Date;
	status: QuestStatus;
	isQuestRewardConfigured: boolean;
	numberOfWinners: number;
	// participatedUsers: [{ userId: Types.ObjectId }];
}

export type QuestDocument = HydratedDocument<IQuest>;

export const QuestSchema = new Schema<IQuest>(
	{
		tag: { type: String, required: false },
		questTitle: { type: String, required: true },
		questDescription: { type: String, required: true },
		imageurl: { type: String, required: true },
		createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
		eligibility: { type: String, required: true },
		tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
		gemsReward: { type: Number, required: true },
		rewards: [
			{
				rewardType: { type: String, required: false, enum: Object.values(rewardType) },
				rewardStatus: { type: String, required: false, enum: Object.values(rewardStatus) },
				amount: { type: Number, required: false },
				address: { type: String, required: false },
				name: { type: String, required: false },
				chainId: { type: String, required: false },
			},
		],
		rewardMethod: { type: String, required: true, enum: Object.values(rewardMethod) },
		startTimestamp: { type: Date, required: true, index: true },
		endTimestamp: { type: Date, required: true, index: true },
		status: { type: String, required: true, enum: Object.values(QuestStatus), index: true },
		isQuestRewardConfigured: { type: Boolean, required: true, default: false },
		numberOfWinners: { type: Number, required: false, min: 1, max: 10 },
	},
	{ timestamps: true },
);
