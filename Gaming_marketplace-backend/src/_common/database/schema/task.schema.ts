import { HydratedDocument, Schema, Types } from "mongoose";
import { TaskOption, TaskOrigin, TaskState, TaskType } from "../../quest/constants/task";

export const modelName = "Task";

export interface ITask {
	name: string;
	category: TaskOption;
	description: string;
	type: TaskType;
	customisation: { [k: string]: string };
	origin: TaskOrigin;
	state: TaskState;
	points: number;
	createdBy: Types.ObjectId;
}
export type TaskDocument = HydratedDocument<ITask>;

export const taskSchema = new Schema<ITask>(
	{
		name: { type: String, required: true },
		category: { type: String, required: true },
		description: { type: String, required: false },
		type: { type: String, required: false },
		customisation: { type: Schema.Types.Mixed, required: false },
		origin: { type: String, required: true },
		state: { type: String, required: true },
		points: { type: Number, required: true },
		createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
	},
	{ timestamps: true },
);
