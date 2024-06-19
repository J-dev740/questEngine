import { HydratedDocument, Schema, Types } from "mongoose";

export interface IFeedback {
	content: string;
	owner: Types.ObjectId;
}

export const modelName = "Feedback";

export type FeedbackDocument = HydratedDocument<IFeedback>;

export const FeedbackSchema = new Schema<IFeedback>(
	{
		content: { type: String, required: true },
		owner: { type: Schema.Types.ObjectId, required: true },
	},
	{ timestamps: true },
);
