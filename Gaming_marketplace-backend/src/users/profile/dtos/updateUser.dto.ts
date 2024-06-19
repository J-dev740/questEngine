import { Equals, IsOptional, IsString, IsUrl } from "class-validator";
import { AUTH_ROLES } from "../../../_common/types.global";

export class UpdateUserDto {
	@Equals(AUTH_ROLES.expert)
	@IsOptional()
	role: AUTH_ROLES;

	@IsString()
	@IsOptional()
	username: string;

	@IsUrl() // ipfs solution
	@IsOptional()
	icon: string;
}
