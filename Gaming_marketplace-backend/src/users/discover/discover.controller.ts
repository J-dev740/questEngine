import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { AuthGuard } from "../../_common/middleware/auth.guard";
import { DiscoverService } from "./discover.service";
import { PopulateLimitsDto } from "./dtos/populateLimits.dto";

@Controller({ path: "discover", version: "1" })
@UseGuards(AuthGuard)
export class DiscoverController {
	// eslint-disable-next-line no-useless-constructor, no-unused-vars, no-empty-function
	constructor(private discoverService: DiscoverService) {}

	// return experts with highest average review rating in their courses
	@Get("experts")
	discoverExperts(@Query() limits: PopulateLimitsDto) {
		return this.discoverService.populateExperts(limits.expertsCount);
	}

	// return courses with highest average review rating
	@Get("courses")
	discoverCourses(@Query() limits: PopulateLimitsDto) {
		return this.discoverService.populateCourses(limits.coursesCount);
	}

	// return games with highest users buying its course
	@Get("games")
	discoverGames(@Query() limits: PopulateLimitsDto) {
		return this.discoverService.populateGames(limits.gameCount);
	}
}
