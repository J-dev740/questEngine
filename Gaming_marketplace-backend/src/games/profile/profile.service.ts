import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import GameQueryService from "../../_common/database/queries/game.query";
import {
	GameDocument,
	modelName as gameModelName,
} from "../../_common/database/schema/game.schema";
import { Page } from "../../_common/types.global";

@Injectable()
export class ProfileService {
	gameQueryService: GameQueryService;

	constructor(@InjectModel(gameModelName) gameModel: Model<GameDocument>) {
		this.gameQueryService = new GameQueryService(gameModel);
	}

	getAllGames(page: Page) {
		return this.gameQueryService.paginateAllGames(page);
	}

	getSingleGame(identifier: object) {
		return this.gameQueryService.readEntity(identifier);
	}

	async postSingleGame(data: any) {
		const { title } = data;
		if (!(await this.gameQueryService.checkValidity({ title })))
			return this.gameQueryService.createEntity(data);

		throw new BadRequestException("User already exists");
	}

	updateSingleGame(identifier: object, data: any) {
		return this.gameQueryService.updateEntity(identifier, data);
	}

	deleteSingleGame(gameId: string) {
		return this.gameQueryService.deleteEntity({ _id: gameId });
	}
}
