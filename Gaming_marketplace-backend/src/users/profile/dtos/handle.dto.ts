import { MinLength, NotContains } from "class-validator";

export class CreateHandleDto {
	@MinLength(12)
	@NotContains("@")
	handle: string;
}
