import { HydratedDocument, Schema, Types } from "mongoose";

export interface IReview {
	user: Types.ObjectId;
	course?: Types.ObjectId;
	game?: Types.ObjectId;
	livestream?: Types.ObjectId;
	content: string;
	rating: number;
	upvotes?: number;
}

export const modelName = "Review";

export type ReviewDocument = HydratedDocument<IReview>;

export const ReviewSchema = new Schema<IReview>(
	{
		user: { type: Schema.Types.ObjectId, ref: "User", required: true },
		course: { type: Schema.Types.ObjectId, ref: "Course", required: false },
		game: { type: Schema.Types.ObjectId, ref: "Game", required: false },
		livestream: {
			type: Schema.Types.ObjectId,
			ref: "Livestream",
			required: false,
		},
		content: { type: String, required: true },
		rating: { type: Number, required: true },
		upvotes: { type: Number, required: false, default: 1 },
	},
	{ timestamps: true },
);
