import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateSingleQuestTaskDto {
	@IsOptional()
	@IsString()
	name: string;

	@IsOptional()
	@IsNumber()
	points: number;

	@IsNotEmpty()
	@IsString()
	_id: string;
}
