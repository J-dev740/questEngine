import {
	Body,
	Controller,
	DefaultValuePipe,
	Delete,
	Get,
	Param,
	ParseIntPipe,
	Post,
	Put,
	Query,
	UseGuards,
} from "@nestjs/common";
import { Roles } from "../../_common/decorators/roles/roles.decorator";
import { AUTH_ROLES } from "../../_common/types.global";

import { AuthGuard } from "../../_common/middleware/auth.guard";
import { GameIdDto } from "./dtos/gameId.dto";
import { PostGameDto } from "./dtos/postGame.dto";
import { PutGameDto } from "./dtos/putGame.dto";
import { ProfileService } from "./profile.service";

@Controller({ path: "games/profile", version: "1" })
@UseGuards(AuthGuard)
export class ProfileController {
	// eslint-disable-next-line no-useless-constructor, no-unused-vars, no-empty-function
	constructor(private profileService: ProfileService) {}

	@Get()
	getAllGames(
		@Query("skip", new DefaultValuePipe(0), ParseIntPipe) skip: number,
		@Query("length", new DefaultValuePipe(100), ParseIntPipe) length: number,
	) {
		return this.profileService.getAllGames({ skip, length });
	}

	@Get(":gameId")
	getSingleGame(@Param() gameIdDto: GameIdDto) {
		const { gameId } = gameIdDto;
		return this.profileService.getSingleGame({ _id: gameId });
	}

	@Post()
	@Roles(AUTH_ROLES.admin)
	postSingleGame(@Body() gameDto: PostGameDto) {
		return this.profileService.postSingleGame(gameDto);
	}

	@Put()
	@Roles(AUTH_ROLES.admin)
	updateSingleGame(@Body() gameDto: PutGameDto) {
		const { _id, ...data } = gameDto;
		return this.profileService.updateSingleGame({ _id }, data);
	}

	@Delete()
	@Roles(AUTH_ROLES.admin)
	deleteSingleGame(@Body() gameIdDto: GameIdDto) {
		const { gameId } = gameIdDto;
		return this.profileService.deleteSingleGame(gameId);
	}
}
