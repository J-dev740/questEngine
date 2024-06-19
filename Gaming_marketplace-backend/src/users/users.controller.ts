import { Controller, Get, Param, Patch, Put, UseGuards } from "@nestjs/common";
import { Roles } from "../_common/decorators/roles/roles.decorator";
// import { AuthGuard } from "../_common/middleware/auth.guard";
import { AUTH_ROLES } from "../_common/types.global";
import { AddCourseDto } from "./dtos/addCourse.dto";
import { AddGameDto } from "./dtos/addGame.dto";
import { GetUserByIdDtoParams } from "./dtos/getUserById.dto";
import { UsersService } from "./users.service";

@Controller({ path: "users", version: "1" })
// @Controller('users')

@UseGuards()
export class UsersController {
	// eslint-disable-next-line no-useless-constructor, no-unused-vars, no-empty-function
	constructor(private usersService: UsersService) {}

	@Get()
	async getAllUsers() {
		return this.usersService.getUsers();
	}

	@Get("/:walletAddress")
	async getUserById(@Param() getUserByIdDtoParams: GetUserByIdDtoParams) {
		const { walletAddress } = getUserByIdDtoParams;
		return this.usersService.getUserProfile(walletAddress.toLowerCase());
	}

	// for testing admin role this route is defined must be removed later
	@Patch("/:walletAddress")
	async updateUserProfileWithAdminRole(@Param("walletAddress") WalletAddress?: any) {
		// const { walletAddress } = WalletAddress;
		const data = {
			role: AUTH_ROLES.member,
		};
		const updatedUser = await this.usersService.updateUserProfile(
			WalletAddress.toLowerCase(),
			data,
		);
		if (updatedUser) {
			return {
				status: 200,
				message: "user updated",
			};
		}
		return {
			status: 400,
			message: "user not updated",
		};
	}

	@Put("/:walletAddress/game/:id")
	@Roles(AUTH_ROLES.expert)
	async addGame(@Param() addGameDto: AddGameDto) {
		const { walletAddress, id } = addGameDto;
		return this.usersService.addGame(walletAddress.toLowerCase(), id);
	}

	@Put("/:walletAddress/course/:id")
	@Roles(AUTH_ROLES.expert)
	async addCourse(@Param() addCourseDto: AddCourseDto) {
		const { walletAddress, id } = addCourseDto;
		return this.usersService.addCourse(walletAddress.toLowerCase(), id);
	}
}
