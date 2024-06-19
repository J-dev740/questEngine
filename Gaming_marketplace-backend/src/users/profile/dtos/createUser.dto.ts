import { Equals, IsOptional, IsString, IsUrl, Validate } from "class-validator";
import { IsValidSignature } from "../../../_common/decorators/validation/signature.decorator";
import { IsWalletAddress } from "../../../_common/decorators/validation/walletAddress.decorator";
import { AUTH_ROLES } from "../../../_common/types.global";

export class CreateUserDto {
	@IsString()
	@Validate(IsValidSignature)
	signature: string;

	@IsString()
	@Validate(IsWalletAddress)
	walletAddress: string;

	@Equals(AUTH_ROLES.expert)
	role: AUTH_ROLES;

	@IsString()
	@IsOptional()
	username: string;

	@IsUrl() // ipfs solution
	@IsOptional()
	icon: string;
}
