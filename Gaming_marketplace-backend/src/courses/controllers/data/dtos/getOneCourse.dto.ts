import { Validate } from "class-validator";
import { IsObjectId } from "../../../../_common/decorators/validation/ObjectId.decorator";

export class GetOneCourseDto {
	@Validate(IsObjectId)
	courseId: string;
}
