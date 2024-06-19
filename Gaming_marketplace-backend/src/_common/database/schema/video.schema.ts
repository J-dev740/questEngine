import mongoose, { HydratedDocument } from "mongoose";

export interface IVideo {
	seq_id: number;
	title: string;
	description: string;
	assetId: string;
	playbackId: string;
	icon: string;
	duration: number;
}

export const modelName = "Video";
export type VideoDocument = HydratedDocument<IVideo>;

export const VideoSchema = new mongoose.Schema<IVideo>(
	{
		seq_id: { type: Number, required: true },
		title: { type: String, required: true },
		description: { type: String, required: true },
		assetId: { type: String, default: "" },
		playbackId: { type: String, required: true },
		icon: { type: String, required: true },
		duration: { type: Number, required: true },
	},
	{ timestamps: true },
);
