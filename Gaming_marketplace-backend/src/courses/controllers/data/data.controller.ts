import {
	Controller,
	DefaultValuePipe,
	Get,
	Param,
	ParseIntPipe,
	Query,
	UseGuards,
} from "@nestjs/common";
import { ICourse } from "../../../_common/database/schema/course.schema";
import { IVideo } from "../../../_common/database/schema/video.schema";
import { AuthGuard } from "../../../_common/middleware/auth.guard";
import { CoursesService } from "../../courses.service";
import { GetCourseVideosDto } from "./dtos/getCourseVideos.dto";
import { GetExpertCourseDto } from "./dtos/getExpertCourse.dto";
import { GetGameCoursesDto } from "./dtos/getGameCoursesDto";
import { GetOneCourseDto } from "./dtos/getOneCourse.dto";

@Controller({ path: "courses/data", version: "1" })
@UseGuards(AuthGuard)
export class DataController {
	constructor(private coursesService: CoursesService) {}

	@Get(":courseId")
	async getSpecificCourse(@Param() getOneCourseDto: GetOneCourseDto): Promise<ICourse> {
		return this.coursesService.handleGetSpecificCourse(getOneCourseDto.courseId);
	}

	@Get()
	async getAllCourse(): Promise<ICourse[]> {
		return this.coursesService.handleGetAllCourse();
	}

	@Get("/experts/:userId")
	async getExpertCourses(
		@Param() getExpertCourseDto: GetExpertCourseDto,
	): Promise<Array<ICourse>> {
		return this.coursesService.handleGetExpertCourse(getExpertCourseDto.userId);
	}

	@Get(":courseId/videos")
	async getCourseVideos(@Param() getCourseVideosDto: GetCourseVideosDto): Promise<Array<IVideo>> {
		return this.coursesService.handleGetCourseVideos(getCourseVideosDto.courseId);
	}

	@Get(":courseId/preview")
	async getCoursePreview(@Param() getOneCourseDto: GetOneCourseDto): Promise<ICourse> {
		return this.coursesService.handleCoursePreview(getOneCourseDto.courseId);
	}

	@Get("game/:gameId")
	async getGameCourses(
		@Param() { gameId }: GetGameCoursesDto,
		@Query("skip", new DefaultValuePipe(0), ParseIntPipe) skip: number,
		@Query("length", new DefaultValuePipe(100), ParseIntPipe) length: number,
	): Promise<Array<ICourse>> {
		return this.coursesService.handleGetGameCourses(gameId, { skip, length });
	}
}
