import { Type } from "class-transformer";
import {
	ArrayNotEmpty,
	IsArray,
	IsNumber,
	IsPositive,
	Validate,
	ValidateNested,
} from "class-validator";
import { Types } from "mongoose";
import { IsObjectId } from "../../_common/decorators/validation/ObjectId.decorator";

class PriceDto {
	@Validate(IsObjectId, { message: "currency must have a valid id" })
	currency: Types.ObjectId;

	@IsNumber()
	@IsPositive()
	amount: number;
}

export class UpdateCurrencyDto {
	@Validate(IsObjectId, { message: "invalid primaryCurrency" })
	primaryCurrency: Types.ObjectId;

	@IsPositive({ message: "primaryAmount needs to be greater than 0" })
	primaryAmount: number;

	@IsArray()
	@ArrayNotEmpty()
	@ValidateNested({ each: true })
	@Type(() => PriceDto)
	prices: PriceDto[];
}
