import { Transform } from "class-transformer";
import { IsOptional } from "class-validator";

function isNumber(value: string) {
	return /^[0-9]+$/gm.test(value);
}

export class CountDto {
	@IsOptional()
	@Transform(({ value }) => (isNumber(value) ? Number(value) : undefined))
	readonly count: number = 5;
}
