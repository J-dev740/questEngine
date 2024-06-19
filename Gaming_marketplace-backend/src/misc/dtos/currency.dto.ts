import { IsEnum, IsInt, IsString, Validate, ValidateIf } from "class-validator";
import { IsWalletAddress } from "../../_common/decorators/validation/walletAddress.decorator";
import { CURRENCY_TYPE } from "../../_common/types.global";

export class CurrencyDto {
	@IsEnum(CURRENCY_TYPE)
	type: CURRENCY_TYPE;

	@IsString({ message: "invalid name" })
	name: string;

	@IsInt({ message: "invalid chainId" })
	chainId: number;

	@Validate(IsWalletAddress, { message: "invalid contract address" })
	@ValidateIf((o) => o.type !== CURRENCY_TYPE.base)
	contractAddress: string;

	@IsString({ message: "invalid symbol" })
	@ValidateIf((o) => o.type !== CURRENCY_TYPE.base)
	symbol: string;
}
