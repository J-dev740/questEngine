import { IsOptional, IsString, Validate } from "class-validator";
import { IsObjectId } from "../../../_common/decorators/validation/ObjectId.decorator";

export class PutGameDto {
	@Validate(IsObjectId)
	_id: string;

	@IsString()
	@IsOptional()
	title: string;

	@IsString()
	@IsOptional()
	description: string;

	@IsString()
	@IsOptional()
	icon: string;

	@IsOptional()
	@Validate(IsObjectId, { each: true })
	users: Array<string>;

	@IsOptional()
	@Validate(IsObjectId, { each: true })
	courses: Array<string>;
}
