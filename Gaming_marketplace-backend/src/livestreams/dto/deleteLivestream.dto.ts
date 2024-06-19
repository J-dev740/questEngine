import { Validate } from "class-validator";
import { IsObjectId } from "../../_common/decorators/validation/ObjectId.decorator";

export class DeleteLivestreamDto {
	@Validate(IsObjectId)
	livestreamId: string;
}
