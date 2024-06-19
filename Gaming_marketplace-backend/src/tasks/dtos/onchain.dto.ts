import { BigNumber } from "@ethersproject/bignumber";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class TotalGasFeeSpentDto {
	@IsNotEmpty()
	@IsNumber()
	minBalance: number;

	@IsNotEmpty()
	@IsString()
	taskID: string;
}

export class TotalTransactionCountDto {
	@IsNotEmpty()
	@IsString()
	taskID: string;
}

export class NFTCountDto {
	@IsNotEmpty()
	@IsNumber()
	minCount: number;

	@IsNotEmpty()
	@IsString()
	taskID: string;
}

export class VerifyBalanceDto {
	@IsNotEmpty()
	minBalance: BigNumber;

	@IsNotEmpty()
	@IsString()
	taskID: string;
}

export class OnchainCountDto {
	@IsNotEmpty()
	@IsNumber()
	minCount: number;

	@IsNotEmpty()
	@IsString()
	taskID: string;
}

export class SpecifiedNFTPurchaseDto {
	@IsNotEmpty()
	@IsString()
	contractAddress: string;

	@IsNotEmpty()
	@IsNumber()
	minCount: number;

	@IsNotEmpty()
	@IsString()
	taskID: string;
}

export class PurchasedNFTValueDto {
	@IsNotEmpty()
	@IsNumber()
	minValue: number;

	@IsNotEmpty()
	@IsString()
	taskID: string;
}

export class SpecifiedPurchasedNFTValueDto {
	@IsNotEmpty()
	@IsString()
	contractAddress: string;

	@IsNotEmpty()
	@IsNumber()
	minValue: number;

	@IsNotEmpty()
	@IsString()
	taskID: string;
}
