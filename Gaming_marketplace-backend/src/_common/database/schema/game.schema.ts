import { HydratedDocument, Schema, Types } from "mongoose";

export interface IGame {
	title: string;
	description: string;
	icon: string;
	experts?: Array<Types.ObjectId>;
	courses?: Array<Types.ObjectId>;
	livestreams: Array<Types.ObjectId>;
}

export const modelName = "Game";

export type GameDocument = HydratedDocument<IGame>;

export const GameSchema = new Schema<IGame>(
	{
		title: { type: String, unique: true, required: true },
		description: { type: String, required: true },
		icon: { type: String },
		experts: [{ type: Schema.Types.ObjectId, ref: "User", default: [] }],
		courses: [{ type: Schema.Types.ObjectId, ref: "Course", default: [] }],
		livestreams: [{ type: Schema.Types.ObjectId, ref: "Livestream", default: [] }],
	},
	{ timestamps: true },
);
