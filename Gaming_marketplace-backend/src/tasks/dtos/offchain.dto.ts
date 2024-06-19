import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class TwitterFollowDto {
	@IsNotEmpty()
	@IsString()
	twitterId: string;

	@IsNotEmpty()
	@IsString()
	taskID: string;
}

export class TwitterDto {
	@IsNotEmpty()
	@IsString()
	tweetId: string;

	@IsNotEmpty()
	@IsString()
	taskID: string;
}

export class TelegramDto {
	@IsNotEmpty()
	@IsString()
	channelName: string;

	@IsNotEmpty()
	@IsString()
	userID: string;

	@IsNotEmpty()
	@IsString()
	taskID: string;
}

export class ReferDTO {
	@IsNotEmpty()
	@IsString()
	referralCode: string;

	@IsNotEmpty()
	@IsNumber()
	minCount: number;

	@IsNotEmpty()
	@IsString()
	taskID: string;
}
