import { Type } from "class-transformer";
import {
	ArrayNotEmpty,
	IsArray,
	IsNumber,
	IsPositive,
	IsString,
	Validate,
	ValidateNested,
} from "class-validator";
import { Types } from "mongoose";
import { IVideo } from "../../_common/database/schema/video.schema";
import { IsObjectId } from "../../_common/decorators/validation/ObjectId.decorator";

class PriceDto {
	@Validate(IsObjectId, { message: "currency must have a valid id" })
	currency: Types.ObjectId;

	@IsNumber()
	@IsPositive()
	amount: number;
}

export class courseDataDto {
	@IsString()
	title: string;

	@Validate(IsObjectId, { message: "Invaid game" })
	game: Types.ObjectId;

	@Validate(IsObjectId, { message: "Invaid language" })
	language: Types.ObjectId;

	@IsArray()
	@ArrayNotEmpty()
	videos: Array<IVideo>;

	@IsString()
	description: string;

	@IsString()
	icon: string;

	@IsArray()
	@ArrayNotEmpty()
	@ValidateNested({ each: true })
	@Type(() => PriceDto)
	prices: PriceDto[];

	@Validate(IsObjectId, { message: "primary currency must have a valid id" })
	primaryCurrency: Types.ObjectId;

	@IsNumber()
	@IsPositive()
	primaryAmount: number;
}
