import { RouteTree } from "@nestjs/core";
import { GamesModule } from "./games.module";

export const gameRoute: RouteTree = {
	path: "games",
	module: GamesModule,
};
