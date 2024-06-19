import { ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { utils } from "ethers";

@ValidatorConstraint({ async: false })
export class IsWalletAddress implements ValidatorConstraintInterface {
	validate(text: string) {
		return utils.isAddress(text.toLowerCase());
	}

	defaultMessage() {
		return "wallet address not detected";
	}
}
