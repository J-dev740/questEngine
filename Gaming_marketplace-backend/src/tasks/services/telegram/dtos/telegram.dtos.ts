import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class TelegramDTO {
	@IsNotEmpty()
	walletId: string;

	@IsNotEmpty()
	channelName: string;

	@IsNotEmpty()
	Chat_ID: string;

	@IsNotEmpty()
	UserName: string;

	@IsNotEmpty()
	User_ID: string;
}

export class TelegramUserDTO {
	@IsNotEmpty()
	@IsString()
	channelName: string;

	@IsNumber()
	taskID: number;

	@IsNotEmpty()
	@IsString()
	userID: string;
}
