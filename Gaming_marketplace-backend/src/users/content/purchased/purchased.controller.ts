import { Controller, Get, Param, Query } from "@nestjs/common";
// import { Request } from "express";
// import { AuthGuard } from "../../../_common/middleware/auth.guard";
// import { TRequestWithAuth } from "../../../_common/types.global";
import { CourseDto } from "./dtos/course.dto";
import { PurchasedService } from "./purchased.service";

@Controller({ path: "content/purchased", version: "1" })
// @UseGuards(AuthGuard)
export class PurchasedController {
	// eslint-disable-next-line no-useless-constructor, no-unused-vars, no-empty-function
	constructor(private purchasedService: PurchasedService) {}

	@Get("/courses")
	getPurchasedCourses(
		// @Req() request: TRequestWithAuth
		// @Req() request: Request,
		@Query("walletAddress") walletId: string,
	) {
		return this.purchasedService.getAllUserCourses(walletId);
	}

	// @Get("livestreams")
	// getPurchasedLivestreams(@Req() request: TRequestWithAuth) {
	// 	return this.purchasedService.getAllUserLivestreams(request.walletAddress);
	// }

	@Get("courses/:courseId")
	getSingleUserCourse(@Param() ids: CourseDto) {
		const { userId, courseId } = ids;
		return this.purchasedService.getSingleUserCourse(userId, courseId);
	}

	// @Get("livestreams/:livestreamId")
	// getSingleUserLivestreams(@Param() ids: LivestreamDto) {
	// 	const { userId, livestreamId } = ids;
	// 	return this.purchasedService.getSingleUserLivestream(userId, livestreamId);
	// }
}
