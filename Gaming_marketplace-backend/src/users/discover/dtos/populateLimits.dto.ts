import { Transform } from "class-transformer";
import { IsOptional } from "class-validator";

function isNumber(value: string) {
	return /^[0-9]+$/gm.test(value);
}

export class PopulateLimitsDto {
	@IsOptional()
	@Transform(({ value }) => (isNumber(value) ? Number(value) : undefined))
	readonly coursesCount: number = 5;

	@IsOptional()
	@Transform(({ value }) => (isNumber(value) ? Number(value) : undefined))
	readonly expertsCount: number = 5;

	@IsOptional()
	@Transform(({ value }) => (isNumber(value) ? Number(value) : undefined))
	readonly gameCount: number = 5;
}
