import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from "../auth/auth.module";
import { LivestreamModelDefs } from "../_common/database/schema";
import { DataController } from "./controllers/data/data.controller";
import { ReviewsController } from "./controllers/reviews/reviews.controller";
import { LivestreamController } from "./livestream.controller";
import { LivestreamService } from "./livestream.service";

@Module({
	imports: [AuthModule, MongooseModule.forFeature(LivestreamModelDefs)],
	controllers: [LivestreamController, DataController, ReviewsController],
	providers: [LivestreamService],
})
export class LivestreamsModule {}
