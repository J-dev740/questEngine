import {
	Body,
	Controller,
	Delete,
	Get,
	HttpStatus,
	Param,
	Post,
	Put,
	Req,
	UseGuards,
	Patch,
	Query,
} from "@nestjs/common";
import { ICourse } from "../_common/database/schema/course.schema";
import { Roles } from "../_common/decorators/roles/roles.decorator";
import { AuthGuard } from "../_common/middleware/auth.guard";
import { AUTH_ROLES, TRequestWithAuth } from "../_common/types.global";
import { CoursesService } from "./courses.service";
import { courseDataDto } from "./dto/courseData.dto";
import { IdDto } from "./dto/id.dto";
import { UpdateCurrencyDto } from "./dto/updateCurrency.dto";

@Controller({ path: "courses", version: "1" })
export class CoursesController {
	constructor(private coursesService: CoursesService) {}

	@Post("upload")
	@UseGuards(AuthGuard)
	@Roles(AUTH_ROLES.expert)
	async registerCourse(@Body() courseData: courseDataDto, @Req() request: TRequestWithAuth) {
		console.log(request.walletAddress);

		const data = await this.coursesService.handleCourseRegister(
			courseData,
			request.walletAddress,
		);
		return data;
	}

	@Get("pending")
	@UseGuards(AuthGuard)
	@Roles(AUTH_ROLES.admin)
	getPendingAddCourses() {
		return this.coursesService.getPendingAddCourses();
	}

	@Post("approve/:courseId")
	@UseGuards(AuthGuard)
	@Roles(AUTH_ROLES.admin)
	approveAddCourse(@Param() idDto: IdDto) {
		return this.coursesService.approveAddCourse(idDto.courseId);
	}

	@Delete("reject/:courseId")
	@UseGuards(AuthGuard)
	@Roles(AUTH_ROLES.admin)
	rejectAddCourse(@Param() idDto: IdDto) {
		return this.coursesService.rejectAddCourse(idDto.courseId);
	}

	@Post("upload/callback")
	addCourseEvent(@Body() body: any) {
		if ((body.chainId as string).length === 0) return { status: HttpStatus.OK };
		return this.coursesService.confirmAddCourse(body);
	}

	@Delete(":courseId")
	@UseGuards(AuthGuard)
	@Roles(AUTH_ROLES.expert)
	async deleteCourse(@Param() deleteCourseDto: IdDto): Promise<ICourse> {
		const data = await this.coursesService.handleDeleteCourse(deleteCourseDto.courseId);
		return data;
	}

	@Put("payment/:courseId")
	@UseGuards(AuthGuard)
	@Roles(AUTH_ROLES.expert)
	async updatePrimaryCurrency(
		@Param() currDto: IdDto,
		@Body() body: UpdateCurrencyDto,
		@Req() req: TRequestWithAuth,
	): Promise<boolean> {
		return this.coursesService.updateCurrencyDto(req.walletAddress, currDto.courseId, body);
	}

	@Patch("update/:courseId")
	async updateCourseWithEnrolledUser(
		@Param("courseId") courseId: string,
		@Query("walletAddress") walletId: string,
	): Promise<boolean> {
		console.log(courseId, walletId);

		return this.coursesService.handleUserEnrollCourse(courseId, walletId);
	}
}
