import { HydratedDocument, Schema, Types } from "mongoose";
import { CONTRACT_STATUS } from "../../types.global";

export interface ICourse {
	owner: Types.ObjectId;
	title: string;
	videos: Array<Types.ObjectId>;
	game: Types.ObjectId;
	description: string;
	icon: string;
	prices: Array<{
		currency: Types.ObjectId;
		amount: number;
	}>;
	primaryCurrency: Types.ObjectId; // replacement of currency from the earlier schema
	primaryAmount: number; // replacement of amount from the earlier schema
	users: Array<Types.ObjectId>;
	language: Types.ObjectId;
	status: CONTRACT_STATUS;
}

export const modelName = "Course";

export type CourseDocument = HydratedDocument<ICourse>;

export const CourseSchema = new Schema<ICourse>(
	{
		owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
		title: { type: String, required: true },
		videos: [{ type: Schema.Types.ObjectId, ref: "Video", default: [] }],
		game: { type: Schema.Types.ObjectId, ref: "Game", required: true },
		language: {
			type: Schema.Types.ObjectId,
			ref: "Language",
			required: true,
		},
		description: { type: String, required: true },
		prices: [
			{
				currency: {
					type: Schema.Types.ObjectId,
					ref: "Currency",
					required: true,
				},
				amount: { type: Number, required: true },
				_id: false,
			},
		],
		primaryCurrency: {
			type: Schema.Types.ObjectId,
			ref: "Currency",
			required: true,
		},
		primaryAmount: { type: Number, required: true },
		icon: { type: String, required: true },
		users: [{ type: Schema.Types.ObjectId, ref: "User", default: [] }],
		status: { type: String, required: true },
	},
	{ timestamps: true },
);
