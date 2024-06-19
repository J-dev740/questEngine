import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CreatorModelDefs } from "../_common/database/schema";
import { AuthModule } from "../auth/auth.module";
import CreatorController from "./creator.controller";
import { CreatorService } from "./creator.service";

@Module({
	imports: [AuthModule, MongooseModule.forFeature(CreatorModelDefs)],
	controllers: [CreatorController],
	providers: [CreatorService],
})
export class CreatorModule {}
