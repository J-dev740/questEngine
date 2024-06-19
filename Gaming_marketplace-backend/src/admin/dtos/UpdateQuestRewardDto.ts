import { Type } from "class-transformer";
import { IsArray, IsNotEmpty, IsString } from "class-validator";
import { RewardsDto } from "./CreateQuestDto";

export class UpdateQuestRewardDto {
	@IsString()
	@IsNotEmpty()
	questId: string;

	@IsArray()
	@Type(() => RewardsDto)
	rewards: RewardsDto[];
}
