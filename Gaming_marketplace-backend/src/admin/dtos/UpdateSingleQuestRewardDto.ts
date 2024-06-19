import { IsNotEmpty, IsString } from "class-validator";
import { RewardsDto } from "./CreateQuestDto";

export class UpdateSingleQuestRewardDto {
	@IsString()
	@IsNotEmpty()
	questId: string;

	@IsNotEmpty()
	reward: RewardsDto;
}
