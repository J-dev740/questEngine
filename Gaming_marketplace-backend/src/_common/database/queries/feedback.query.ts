import { Model } from "mongoose";
import { FeedbackDocument, modelName } from "../schema/feedback.schema";
import { GenericQueryService } from "./_generic.query";

export default class FeedbackQueryService extends GenericQueryService<FeedbackDocument> {
	constructor(model: Model<FeedbackDocument>) {
		super(model, modelName);
	}
}
