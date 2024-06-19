import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from "../auth/auth.module";
import { PaymentModelDefs } from "../_common/database/schema";
import { MoralisService } from "../_common/services/moralis.service";
import { PaymentController } from "./payment.controller";
import { PaymentService } from "./payment.service";

@Module({
	imports: [AuthModule, MongooseModule.forFeature(PaymentModelDefs)],
	controllers: [PaymentController],
	providers: [PaymentService, MoralisService],
})
export class PaymentModule {}
