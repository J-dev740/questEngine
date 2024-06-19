import { Type } from "class-transformer";
import {
	IsArray,
	IsBoolean,
	IsEnum,
	IsNotEmpty,
	IsNumber,
	IsOptional,
	IsString,
	MaxLength,
	Validate,
} from "class-validator";
import { IsObjectId } from "../../_common/decorators/validation/ObjectId.decorator";
import { EligibityCriteria } from "../../_common/quest/constants/eligibility_criteria";
import { rewardMethod, rewardStatus, rewardType } from "../../_common/quest/constants/reward";
import {
	TaskOption,
	TaskOrigin,
	TaskState,
	TaskStatus,
	TaskType,
} from "../../_common/quest/constants/task";

class TaskDto {
	@IsEnum(TaskOption)
	@IsNotEmpty()
	category: TaskOption;

	@IsOptional()
	customisation: any;

	@IsNumber()
	@IsNotEmpty()
	points: number;

	@IsString()
	@IsNotEmpty()
	@MaxLength(300)
	name: string;

	@IsString()
	@IsOptional()
	description: string;

	@IsEnum(TaskType)
	@IsOptional()
	type: TaskType;

	@IsEnum(TaskOrigin)
	@IsNotEmpty()
	origin: TaskOrigin;

	@IsEnum(TaskStatus)
	status: TaskStatus;

	@IsEnum(TaskState)
	@IsOptional()
	state: TaskState;

	@Validate(IsObjectId, { message: "invalid createdBy" })
	createdBy: string;
}

export class RewardsDto {
	@IsEnum(rewardType)
	@IsOptional()
	rewardType: rewardType;

	@IsEnum(rewardStatus)
	@IsOptional()
	rewardStatus: rewardStatus;

	@IsNumber()
	@IsOptional()
	amount: number;

	@IsString()
	@IsOptional()
	address: string;

	@IsString()
	@IsOptional()
	name: string;

	@IsString()
	@IsOptional()
	chainId: number;
}
export class CreateQuestDto {
	@Validate(IsObjectId, { message: "invalid createdBy" })
	createdBy: string;

	@IsArray()
	@Type(() => TaskDto)
	tasks: TaskDto[];

	@IsEnum(EligibityCriteria)
	eligibility: EligibityCriteria;

	@IsEnum(rewardMethod)
	rewardMethod: rewardMethod;

	@IsString()
	@IsNotEmpty()
	@MaxLength(300)
	questTitle: string;

	@IsString()
	@IsNotEmpty()
	questDescription: string;

	@IsString()
	@IsOptional()
	imageurl: string;

	@IsString()
	@IsOptional()
	tag: string;

	@IsString()
	@IsNotEmpty()
	startTimestamp: Date;

	@IsString()
	@IsNotEmpty()
	endTimestamp: Date;

	@IsBoolean()
	@IsOptional()
	isQuestRewardConfigured: boolean;

	@IsNumber()
	numberOfWinners: number;

	@IsNumber()
	gemsReward: number;

	@IsArray()
	@Type(() => RewardsDto)
	rewards: RewardsDto[];
}

export class UpdateQuestStatusDTO {}
