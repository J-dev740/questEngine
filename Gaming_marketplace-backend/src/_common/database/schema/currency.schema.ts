import { HydratedDocument, Schema } from "mongoose";
import { CURRENCY_TYPE } from "../../types.global";

export interface ICurrency {
	type: CURRENCY_TYPE;
	name: string;
	chainId: number;
	contractAddress: string;
	symbol: string;
}

export const modelName = "Currency";

export type CurrencyDocument = HydratedDocument<ICurrency>;

export const CurrencySchema = new Schema<ICurrency>(
	{
		type: { type: String, required: true },
		name: { type: String, required: true },
		chainId: { type: Number, required: true },
		contractAddress: { type: String, unique: true },
		symbol: { type: String },
	},
	{ timestamps: true },
);
