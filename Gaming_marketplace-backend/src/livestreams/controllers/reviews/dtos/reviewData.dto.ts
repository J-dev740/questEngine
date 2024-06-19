import { IsInt, IsString } from "class-validator";

export class ReviewDataDto {
	@IsString()
	content: string;

	@IsInt()
	rating: number;

	@IsInt()
	upvotes: number;
}
