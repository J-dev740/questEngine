import { Model } from "mongoose";
import { LanguageDocument, modelName } from "../schema/language.schema";
import { GenericQueryService } from "./_generic.query";

export default class LanguageQueryService extends GenericQueryService<LanguageDocument> {
	constructor(model: Model<LanguageDocument>) {
		super(model, modelName);
	}
}
