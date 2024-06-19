import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Document, Model } from "mongoose";
import CourseQueryService from "../_common/database/queries/course.query";
import GameQueryService from "../_common/database/queries/game.query";
import UserQueryService from "../_common/database/queries/user.query";
import {
	CourseDocument,
	modelName as courseModelName,
} from "../_common/database/schema/course.schema";
import { GameDocument, modelName as gameModelName } from "../_common/database/schema/game.schema";
import { modelName as userModelName, UserDocument } from "../_common/database/schema/user.schema";
import { AUTH_ROLES } from "../_common/types.global";

@Injectable()
export class UsersService {
	userQueryService: UserQueryService;

	courseQueryService: CourseQueryService;

	gameQueryService: GameQueryService;

	questProgressQueryService: any;

	questQueryService: any;

	constructor(
		@InjectModel(userModelName) UserModel: Model<UserDocument>,
		@InjectModel(gameModelName) GameModel: Model<GameDocument>,
		@InjectModel(courseModelName) CourseModel: Model<CourseDocument>,
	) {
		this.userQueryService = new UserQueryService(UserModel);
		this.courseQueryService = new CourseQueryService(CourseModel);
		this.gameQueryService = new GameQueryService(GameModel);
	}

	async getUsers(): Promise<Document[]> {
		return this.userQueryService.readMultipleEntities(
			{},
			{ limit: 100 },
			{ games: 0, courses: 0 },
		);
	}

	async getUserProfile(walletAddress: string): Promise<UserDocument> {
		return this.userQueryService.readEntity({ walletAddress });
	}

	async getUser(_id: string): Promise<UserDocument> {
		return this.userQueryService.readEntity({ _id });
	}

	async updateUserProfile(walletAddress: string, data: any): Promise<boolean> {
		const updatedUser = this.userQueryService.updateEntity({ walletAddress }, data);
		if (updatedUser) {
			console.log("user updated");
			return true;
		}
		return false;
	}

	async addGame(walletAddress: string, _id: string): Promise<boolean> {
		try {
			const gameRef = await this.gameQueryService.readEntity({ _id });
			const userRef = await this.userQueryService.readEntity({
				walletAddress,
			});
			if (userRef.role.includes(AUTH_ROLES.expert)) {
				this.userQueryService.updateEntity(
					{ walletAddress },
					{ $push: { courses: gameRef._id } },
				);
				return Promise.resolve(true);
			}
			throw new BadRequestException("Incorrect user");
		} catch (error) {
			throw new BadRequestException();
		}
	}

	async addCourse(walletAddress: string, _id: string): Promise<boolean> {
		try {
			const courseRef = await this.courseQueryService.readEntity({ _id });
			const userRef = await this.userQueryService.readEntity({
				walletAddress,
			});
			if (userRef.role.includes(AUTH_ROLES.expert)) {
				await this.courseQueryService.updateEntity(
					{ walletAddress },
					{ $push: { courses: courseRef._id } },
				);
				return Promise.resolve(true);
			}
			throw new BadRequestException("incorrect user");
		} catch (error) {
			throw new BadRequestException();
		}
	}
}
