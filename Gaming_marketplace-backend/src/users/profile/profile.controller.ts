import {
	// BadRequestException,
	Body,
	Controller,
	DefaultValuePipe,
	Get,
	Param,
	ParseIntPipe,
	Post,
	Put,
	Query,
	Req,
	UseGuards,
} from "@nestjs/common";
import { Roles } from "../../_common/decorators/roles/roles.decorator";
import { AuthGuard } from "../../_common/middleware/auth.guard";
import { AUTH_ROLES, TRequestWithAuth } from "../../_common/types.global";
import { GetSelfDto } from "./dtos/getSelf.dto";
import { SingleUserDto } from "./dtos/getSingleUser.dto";
import { CreateHandleDto } from "./dtos/handle.dto";
import { UpdateUserDto } from "./dtos/updateUser.dto";
import { ProfileService } from "./profile.service";

@Controller({ path: "profile", version: "1" })
@UseGuards(AuthGuard)
export class ProfileController {
	// eslint-disable-next-line no-useless-constructor, no-unused-vars, no-empty-function
	constructor(private profileService: ProfileService) {}

	@Get()
	getAllExperts(
		@Query("skip", new DefaultValuePipe(0), ParseIntPipe) skip: number,
		@Query("length", new DefaultValuePipe(100), ParseIntPipe) length: number,
	) {
		return this.profileService.getAllExperts({ skip, length });
	}

	@Get("self")
	getSelfData(
		@Query() selfDto: GetSelfDto,
		//  @Req() request: TRequestWithAuth
	) {
		// console.log({ selfDto, request: request.walletAddress });
		console.log({ selfDto });

		// if (selfDto.walletAddress.toLowerCase() !== request.walletAddress.toLowerCase())
		// 	throw new BadRequestException("invalid user");
		return this.profileService.getSelfData(selfDto.walletAddress.toLowerCase());
	}

	@Post("streamKey")
	getStreamKey(@Req() request: TRequestWithAuth) {
		return this.profileService.getStreamKey(request.walletAddress);
	}

	@Put("handle")
	updateUserHandle(
		@Req() { walletAddress }: TRequestWithAuth,
		@Body() { handle }: CreateHandleDto,
	) {
		return this.profileService.updateUserHandle(walletAddress, handle);
	}

	@Get(":userId")
	getSingleUser(@Param() { userId }: SingleUserDto) {
		return this.profileService.getUserProfile(userId);
	}

	@Put(":userId")
	@Roles(AUTH_ROLES.expert)
	updateUser(@Param() { userId: _id }: SingleUserDto, @Body() userDto: UpdateUserDto) {
		return this.profileService.updateUserInfo({ _id }, userDto);
	}
}
