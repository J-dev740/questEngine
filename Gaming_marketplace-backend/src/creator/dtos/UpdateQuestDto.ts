import { QuestStatus } from "@common/quest/constants/quest";
import { IsEnum, IsNotEmpty, IsString } from "class-validator";

export class UpdateQuestDto {
	@IsString()
	@IsNotEmpty()
	questId: string;

	@IsEnum(QuestStatus)
	questStatus: QuestStatus;
}
