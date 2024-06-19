import { Transform } from "class-transformer";
import { IsOptional, Validate } from "class-validator";
import { IsObjectId } from "../../../_common/decorators/validation/ObjectId.decorator";

function isNumber(value: string) {
	return /^[0-9]+$/gm.test(value);
}

export class UserReviewsDto {
	@Validate(IsObjectId)
	userId: string;

	@IsOptional()
	@Transform(({ value }) => (isNumber(value) ? Number(value) : undefined))
	readonly reviewsCount: number = 5;
}
