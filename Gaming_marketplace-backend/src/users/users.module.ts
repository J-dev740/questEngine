import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from "../auth/auth.module";
import { UsersModelDefs } from "../_common/database/schema";
import { CreatedController } from "./content/created/created.controller";
import { CreatedService } from "./content/created/created.service";
import { PurchasedController } from "./content/purchased/purchased.controller";
import { PurchasedService } from "./content/purchased/purchased.service";
import { DiscoverController } from "./discover/discover.controller";
import { DiscoverService } from "./discover/discover.service";
import { ProfileController } from "./profile/profile.controller";
import { ProfileService } from "./profile/profile.service";
import { ReviewsController } from "./reviews/reviews.controller";
import { ReviewsService } from "./reviews/reviews.service";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";

@Module({
	imports: [AuthModule, MongooseModule.forFeature(UsersModelDefs)],
	controllers: [
		ProfileController,
		DiscoverController,
		ReviewsController,
		CreatedController,
		PurchasedController,
		UsersController,
	],
	providers: [
		ProfileService,
		DiscoverService,
		ReviewsService,
		CreatedService,
		PurchasedService,
		UsersService,
	],
	exports: [UsersService],
})
export class UsersModule {}
