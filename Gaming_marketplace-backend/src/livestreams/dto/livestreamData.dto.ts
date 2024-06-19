import { IsDateString, IsString, Validate } from "class-validator";
import { Types } from "mongoose";
import { IsObjectId } from "../../_common/decorators/validation/ObjectId.decorator";

export class LivestreamDataDto {
	@IsString()
	title: string;

	@Validate(IsObjectId)
	game: Types.ObjectId;

	@IsString()
	description: string;

	@IsString()
	icon: string;

	@IsDateString()
	streamStart: string;

	@IsDateString()
	streamEnd: string;
}
