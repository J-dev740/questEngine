import { Model } from "mongoose";
import { CurrencyDocument, modelName } from "../schema/currency.schema";
import { GenericQueryService } from "./_generic.query";

export default class CurrencyQueryService extends GenericQueryService<CurrencyDocument> {
	constructor(model: Model<CurrencyDocument>) {
		super(model, modelName);
	}
}
