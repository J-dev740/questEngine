import { Equals, IsNotEmpty, IsNumber, IsString, Min, Validate } from "class-validator";
import { Types } from "mongoose";
import { IsObjectId } from "../../_common/decorators/validation/ObjectId.decorator";
import { CONTRACT_STATUS } from "../../_common/types.global";

export class PaymentDto {
	@IsString()
	@Validate(IsObjectId)
	assetId: Types.ObjectId;

	@IsString()
	currency: string;

	@IsNumber()
	@Min(0)
	price: number;

	@IsString()
	@IsNotEmpty()
	hash: string;

	@Equals(CONTRACT_STATUS.success || CONTRACT_STATUS.failure)
	status: CONTRACT_STATUS;
}
