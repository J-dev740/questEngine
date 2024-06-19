import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UsersModule } from "@src/users/users.module";
import { AdminService } from "./admin.service";
import { AdminController } from "./admin.controller";
import { CreatorModelDefs } from "../_common/database/schema";
import { AuthModule } from "../auth/auth.module";

@Module({
	imports: [AuthModule,UsersModule, MongooseModule.forFeature(CreatorModelDefs)],
	controllers: [AdminController],
	providers: [AdminService],
})
export class AdminModule {}
