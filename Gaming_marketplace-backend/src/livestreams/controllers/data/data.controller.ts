import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { ILivestream } from "../../../_common/database/schema/livestream.schema";
import { AuthGuard } from "../../../_common/middleware/auth.guard";
import { LivestreamService } from "../../livestream.service";
import { GetExpertLivestreamsDto } from "./dtos/getExpertLivestreams.dto";
import { GetGameLivestreamsDto } from "./dtos/getGameLivestream.dto";
import { GetOneLivestreamDto } from "./dtos/getOneLivestream.dto";

@Controller({ path: "livestreams/data", version: "1" })
@UseGuards(AuthGuard)
export class DataController {
	constructor(private livestreamService: LivestreamService) {}

	@Get("/ongoing")
	GetOngoingLivestreams(): Promise<Array<ILivestream>> {
		return this.livestreamService.getOngoingLivestreams();
	}

	@Get("/upcoming")
	GetUpcomingLivestreams(): Promise<Array<ILivestream>> {
		return this.livestreamService.getUpcomingLivestreams();
	}

	@Get(":livestreamId")
	GetSpecificLivestream(
		@Param() getOneLivestreamDto: GetOneLivestreamDto,
		// @Req() request: TRequestWithAuth,
	): Promise<ILivestream> {
		return this.livestreamService.handleGetSpecificLivestream(
			getOneLivestreamDto.livestreamId,
			// request.walletAddress,
		);
	}

	@Get("/experts/:userId")
	GetExpertLivestreams(
		@Param() getExpertLivestreamsDto: GetExpertLivestreamsDto,
	): Promise<Array<ILivestream>> {
		return this.livestreamService.handleGetExpertLivestreams(getExpertLivestreamsDto.userId);
	}

	@Get("game/:gameId")
	GetGameLivestreams(
		@Param() getGameLivestreamsDto: GetGameLivestreamsDto,
	): Promise<Array<ILivestream>> {
		return this.livestreamService.handleGetGameLivestreams(getGameLivestreamsDto.gameId);
	}
}
