import { HydratedDocument, Schema, Types } from "mongoose";
import { LIVESTREAM_STATUS } from "../../types.global";

export interface ILivestream {
	owner: Types.ObjectId;
	title: string;
	game: Types.ObjectId;
	description: string;
	icon: string;
	streamStart: Date;
	streamEnd: Date;
	streamId: string;
	users: Array<Types.ObjectId>;
	status?: LIVESTREAM_STATUS;
}

export const modelName = "Livestream";

export type LivestreamDocument = HydratedDocument<ILivestream>;

export const LivestreamSchema = new Schema<ILivestream>(
	{
		owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
		title: { type: String, required: true },
		game: { type: Schema.Types.ObjectId, ref: "Game", required: true },
		description: { type: String, required: true },
		streamId: { type: String, required: true },
		icon: { type: String },
		streamStart: { type: Date, required: true },
		streamEnd: { type: Date, required: true },
		status: { type: String, default: LIVESTREAM_STATUS.scheduled },
		users: [{ type: Schema.Types.ObjectId, ref: "User", default: [] }],
	},
	{ timestamps: true },
);
