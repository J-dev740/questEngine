import { IsOptional, IsString } from "class-validator";

export class PostGameDto {
	@IsString()
	title: string;

	@IsString()
	description: string;

	@IsString()
	@IsOptional()
	icon: string;
}
