import { IsNotEmpty, IsString } from "class-validator";

export class ReferralDTO {
	@IsNotEmpty()
	@IsString()
	walletId: string;

	@IsNotEmpty()
	@IsString()
	questId: string;
}
