import { HydratedDocument, Schema } from "mongoose";

export interface ILanguage {
	name: string;
	notation: string;
}

export const modelName = "Language";

export type LanguageDocument = HydratedDocument<ILanguage>;

export const LanguageSchema = new Schema<ILanguage>(
	{
		name: { type: String, required: true },
		notation: { type: String, required: true },
	},
	{ timestamps: true },
);
