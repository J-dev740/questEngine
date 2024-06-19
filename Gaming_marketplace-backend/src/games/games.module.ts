import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from "../auth/auth.module";
import { GamesModelDefs } from "../_common/database/schema";
import { DataController } from "./data/data.controller";
import { DataService } from "./data/data.service";
import { ProfileController } from "./profile/profile.controller";
import { ProfileService } from "./profile/profile.service";
import { ReviewsController } from "./reviews/reviews.controller";
import { ReviewsService } from "./reviews/reviews.service";

@Module({
	imports: [AuthModule, MongooseModule.forFeature(GamesModelDefs)],
	controllers: [ProfileController, ReviewsController, DataController],
	providers: [ProfileService, ReviewsService, DataService],
})
export class GamesModule {}
