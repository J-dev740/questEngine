import { Validate } from "class-validator";
import { IsObjectId } from "../../../../_common/decorators/validation/ObjectId.decorator";

export class GetCourseVideosDto {
	@Validate(IsObjectId)
	courseId: string;
}
