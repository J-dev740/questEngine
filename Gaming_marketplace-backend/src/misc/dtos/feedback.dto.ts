import { IsString } from "class-validator";

export class FeedbackDto {
	@IsString()
	content: string;
}
