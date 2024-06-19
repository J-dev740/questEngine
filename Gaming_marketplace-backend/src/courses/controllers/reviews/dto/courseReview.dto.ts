import { IsInt, IsString } from "class-validator";

export class reviewDataDto {
	@IsString()
	content: string;

	@IsInt()
	rating: number;

	@IsInt()
	upvotes: number;
}
