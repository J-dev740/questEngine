import { IsOptional, Validate } from "class-validator";
import { IsObjectId } from "../../../../_common/decorators/validation/ObjectId.decorator";

export class LivestreamDto {
	@Validate(IsObjectId)
	userId: string;

	@IsOptional()
	@Validate(IsObjectId)
	livestreamId: string;
}
