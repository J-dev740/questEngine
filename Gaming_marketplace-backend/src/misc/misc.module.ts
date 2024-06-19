import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from "../auth/auth.module";
import { MiscModelDefs } from "../_common/database/schema";
import { MiscController } from "./misc.controller";
import { MiscService } from "./misc.service";

@Module({
	imports: [AuthModule, MongooseModule.forFeature(MiscModelDefs)],
	controllers: [MiscController],
	providers: [MiscService],
})
export class MiscModule {}
