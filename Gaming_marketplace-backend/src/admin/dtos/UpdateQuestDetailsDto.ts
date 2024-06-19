import { IsNotEmpty, IsNumber, IsString, IsEnum, IsOptional } from "class-validator";
import { QuestStatus } from "@common/quest/constants/quest";
import { rewardMethod } from "@common/quest/constants/reward";
import { EligibityCriteria } from "@common/quest/constants/eligibility_criteria";

export class UpdateQuestDetailsDto {
	@IsString()
	@IsNotEmpty()
	questId: string;

	@IsOptional()
	@IsEnum(QuestStatus)
	status: QuestStatus;

	@IsOptional()
	@IsNumber()
	numberOfWinners: number;

	@IsOptional()
	@IsEnum(rewardMethod)
	rewardMethod: rewardMethod;

	@IsOptional()
	@IsString()
	questTitle: string;

	@IsOptional()
	@IsString()
	questDescription: string;

	@IsOptional()
	@IsNumber()
	gemsReward: number;
	
	@IsOptional()
	@IsEnum(EligibityCriteria)
	eligibility: EligibityCriteria;
}
