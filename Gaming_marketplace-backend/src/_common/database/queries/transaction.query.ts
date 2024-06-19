import { Model } from "mongoose";
import { modelName, TransactionDocument } from "../schema/transaction.schema";
import { GenericQueryService } from "./_generic.query";

export default class TransactionQueryService extends GenericQueryService<TransactionDocument> {
	constructor(model: Model<TransactionDocument>) {
		super(model, modelName);
	}
}
