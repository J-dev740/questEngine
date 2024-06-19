import { IsInt, IsPositive, IsString, MinLength } from "class-validator";

export class videoDataDto {
	@IsInt()
	@IsPositive()
	seq_id: number;

	@IsString()
	@MinLength(3)
	title: string;

	@IsString()
	@MinLength(3)
	description: string;

	@IsString()
	assetId: string;

	@IsString()
	@MinLength(3)
	playbackId: string;

	@IsString()
	@MinLength(3)
	icon: string;

	@IsInt()
	@IsPositive()
	duration: number;
}
