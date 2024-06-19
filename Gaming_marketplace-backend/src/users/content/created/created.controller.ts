import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { AuthGuard } from "../../../_common/middleware/auth.guard";
import { CreatedService } from "./created.service";
import { CourseDto } from "./dtos/course.dto";
import { LivestreamDto } from "./dtos/livestream.dto";

@Controller({ path: "content/created/", version: "1" })
@UseGuards(AuthGuard)
export class CreatedController {
	// eslint-disable-next-line no-useless-constructor, no-unused-vars, no-empty-function
	constructor(private createdService: CreatedService) {}

	@Get(":userId/courses")
	getUserCourses(@Param() ids: CourseDto) {
		const { userId } = ids;
		return this.createdService.getAllUserCourses(userId);
	}

	@Get(":userId/courses/:courseId")
	getSingleUserCourse(@Param() ids: CourseDto) {
		const { userId, courseId } = ids;
		return this.createdService.getSingleUserCourses(userId, courseId);
	}

	@Get(":userId/livestreams")
	getUserLivestreams(@Param() ids: CourseDto) {
		const { userId } = ids;
		return this.createdService.getAllUserLivestreams(userId);
	}

	@Get(":userId/livestreams/:livestreamId")
	getSingleUserLivestream(@Param() ids: LivestreamDto) {
		const { userId, livestreamId } = ids;
		return this.createdService.getSingleUserLivestream(userId, livestreamId);
	}
}
