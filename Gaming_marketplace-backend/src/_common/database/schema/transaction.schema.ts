import { HydratedDocument, Schema, Types } from "mongoose";
import { CONTRACT_STATUS, TRANSACTION_ASSET_TYPE } from "../../types.global";

export interface ITransaction {
	from: string;
	to: string;
	hash: string;
	status: CONTRACT_STATUS;
	assetType: TRANSACTION_ASSET_TYPE;
	asset: Types.ObjectId;
	currency: string;
	price: number;
}

export const modelName = "Transaction";

export type TransactionDocument = HydratedDocument<ITransaction>;

export const TransactionSchema = new Schema<ITransaction>(
	{
		to: { type: String, required: true },
		from: { type: String, required: true },
		hash: { type: String, required: true },
		status: { type: String, required: true },
		assetType: { type: String, required: true },
		asset: { type: Schema.Types.ObjectId, required: true },
		currency: { type: String, required: true },
		price: { type: Number, required: true },
	},
	{ timestamps: true },
);
