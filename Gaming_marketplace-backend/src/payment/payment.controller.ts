import { MoralisGuard } from "@common/middleware/moralis.guard";
import { Body, Controller, HttpStatus, Post, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "../_common/middleware/auth.guard";
import { TRANSACTION_ASSET_TYPE, TRequestWithAuth } from "../_common/types.global";
import { PaymentDto } from "./dtos/payment.dto";
import { PaymentService } from "./payment.service";

@Controller({ path: "payment", version: "1" })
export class PaymentController {
	// eslint-disable-next-line no-useless-constructor, no-unused-vars, no-empty-function
	constructor(private paymentService: PaymentService) {}

	// @Post("course")
	// @UseGuards(AuthGuard)
	// makeCoursePayment(
	// 	@Body() dto: PaymentDto,
	// 	@Req() request: TRequestWithAuth,
	// ) {
	// 	return this.paymentService.makePayment(
	// 		request.walletAddress,
	// 		TRANSACTION_ASSET_TYPE.course,
	// 		dto,
	// 	);
	// }

	@Post("course-callback")
	@UseGuards(MoralisGuard)
	async handleCourseEvent(@Body() body: any) {
		console.log("handleCourseEvent triggered------------------------------------->");
		// console.log('body', body)
		if ((body.chainId as string).length === 0) return { status: HttpStatus.OK };
		console.log("validatePaymentService called");
		try {
			const paymentStatus = await this.paymentService.validatePayment(body, "course");
			return paymentStatus;
		} catch (error) {
			throw new Error(error);
		}
	}

	@Post("livestream")
	@UseGuards(AuthGuard)
	makeLivestreamPayment(@Body() dto: PaymentDto, @Req() request: TRequestWithAuth) {
		return this.paymentService.makePayment(
			request.walletAddress,
			TRANSACTION_ASSET_TYPE.livestream,
			dto,
		);
	}

	// @Post("livestream/callback")
	// handleLivestreamEvent(@Body() body: any) {
	// 	if ((body.chainId as string).length === 0)
	// 		return { status: HttpStatus.OK };
	// 	return this.paymentService.validatePayment(body, "livestream");
	// }
}
