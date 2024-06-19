import { Body, Controller, Delete, Param, Post, Req, UseGuards } from "@nestjs/common";
import { ILivestream } from "../_common/database/schema/livestream.schema";
import { Roles } from "../_common/decorators/roles/roles.decorator";
import { AuthGuard } from "../_common/middleware/auth.guard";
import { AUTH_ROLES, TRequestWithAuth } from "../_common/types.global";
import { DeleteLivestreamDto } from "./dto/deleteLivestream.dto";
import { LivestreamDataDto } from "./dto/livestreamData.dto";
import { LivestreamService } from "./livestream.service";

@Controller({ path: "livestreams", version: "1" })
@UseGuards(AuthGuard)
export class LivestreamController {
	constructor(private livestreamService: LivestreamService) {}

	@Post("upload")
	@Roles(AUTH_ROLES.expert)
	async CreateLivestream(
		@Body() livestreamData: LivestreamDataDto,
		@Req() request: TRequestWithAuth,
	) {
		return this.livestreamService.handleCreateLivestream(livestreamData, request.walletAddress);
	}

	@Delete(":livestreamId")
	@Roles(AUTH_ROLES.expert)
	async deleteLivestream(
		@Param() deleteLivestreamDto: DeleteLivestreamDto,
		@Req() request: TRequestWithAuth,
	): Promise<ILivestream> {
		return this.livestreamService.handleDeleteLivestream(
			deleteLivestreamDto.livestreamId,
			request.walletAddress,
		);
	}
}
