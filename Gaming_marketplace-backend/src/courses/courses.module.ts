import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UsersService } from "@src/users/users.service";
import { UsersController } from "@src/users/users.controller";
import { UsersModule } from "@src/users/users.module";
import { AuthModule } from "../auth/auth.module";
import { CourseModelDefs, VideoModelDefs } from "../_common/database/schema";
import { DataController } from "./controllers/data/data.controller";
import { ReviewsController } from "./controllers/reviews/reviews.controller";
import { CoursesController } from "./courses.controller";
import { CoursesService } from "./courses.service";

@Module({
	imports: [
		UsersModule,
		AuthModule,
		MongooseModule.forFeature(CourseModelDefs),
		MongooseModule.forFeature(VideoModelDefs),
	],
	controllers: [CoursesController, DataController, ReviewsController, UsersController],
	providers: [CoursesService, UsersService],
})
export class CoursesModule {}
