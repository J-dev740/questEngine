import {
	Controller,
	DefaultValuePipe,
	Get,
	Param,
	ParseIntPipe,
	Query,
	UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "../../_common/middleware/auth.guard";
import { DataService } from "./data.service";
import { GetIdDto } from "./dtos/getId.dto";

@Controller({ path: "data/:gameId", version: "1" })
@UseGuards(AuthGuard)
export class DataController {
	// eslint-disable-next-line no-useless-constructor, no-unused-vars, no-empty-function
	constructor(private dataService: DataService) {}

	@Get("/courses")
	getGameCourses(
		@Param() { gameId }: GetIdDto,
		@Query("skip", new DefaultValuePipe(0), ParseIntPipe) skip: number,
		@Query("length", new DefaultValuePipe(100), ParseIntPipe) length: number,
	) {
		return this.dataService.getGameCourses(gameId, { skip, length });
	}

	@Get("/experts")
	getExpertGames(
		@Param() { gameId }: GetIdDto,
		@Query("skip", new DefaultValuePipe(0), ParseIntPipe) skip: number,
		@Query("length", new DefaultValuePipe(40), ParseIntPipe) length: number,
	) {
		return this.dataService.getExpertGames(gameId, { skip, length });
	}
}
