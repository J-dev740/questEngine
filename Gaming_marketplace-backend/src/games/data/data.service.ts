import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import CourseQueryService from "../../_common/database/queries/course.query";
import GameQueryService from "../../_common/database/queries/game.query";
import UserQueryService from "../../_common/database/queries/user.query";
import {
	CourseDocument,
	modelName as courseModelName,
} from "../../_common/database/schema/course.schema";
import {
	GameDocument,
	modelName as gameModelName,
} from "../../_common/database/schema/game.schema";
import {
	modelName as userModelName,
	UserDocument,
} from "../../_common/database/schema/user.schema";
import { Page } from "../../_common/types.global";

@Injectable()
export class DataService {
	userQueryService: UserQueryService;

	courseQueryService: CourseQueryService;

	gameQueryService: GameQueryService;

	constructor(
		@InjectModel(userModelName) userModel: Model<UserDocument>,
		@InjectModel(courseModelName) courseModel: Model<CourseDocument>,
		@InjectModel(gameModelName) gameModel: Model<GameDocument>,
	) {
		this.userQueryService = new UserQueryService(userModel);
		this.courseQueryService = new CourseQueryService(courseModel);
		this.gameQueryService = new GameQueryService(gameModel);
	}

	async getGameCourses(gameId: string, page: Page): Promise<CourseDocument[]> {
		return this.courseQueryService.getGameCourseQuery(gameId, page);
	}

	async getExpertGames(gameId: string, page: Page): Promise<UserDocument[]> {
		return this.userQueryService.getGameExpertsQuery(gameId, page);
	}
}
