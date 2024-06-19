import QuestQueryService from "@common/database/queries/quest.query";
import QuestProgressQueryService from "@common/database/queries/questProgress.query";
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CreatorService } from "@src/creator/creator.service";
import UserQueryService from "@common/database/queries/user.query";
import { QuestModelDefs } from "../_common/database/schema";
import { AuthModule } from "../auth/auth.module";
import { ContractService } from "./contract.service";
import { QuestController } from "./quest.controller";
import { QuestService } from "./quest.service";
import { QuestorController } from "./questor.controller";
import { RewardPayoutService } from "./rewardPayout.service";

@Module({
	imports: [AuthModule, MongooseModule.forFeature(QuestModelDefs)],
	controllers: [QuestController, QuestorController],
	providers: [
		RewardPayoutService,
		UserQueryService,
		QuestQueryService,
		QuestProgressQueryService,
		CreatorService,
		QuestService,
		ContractService,
		UserQueryService,
	],
})
export class QuestModule {}
