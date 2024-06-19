import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ethers } from "ethers";

@Injectable()
export class MoralisGuard implements CanActivate {
	// eslint-disable-next-line no-useless-constructor, no-unused-vars, no-empty-function
	constructor(private configService: ConfigService) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest();

		const secret = this.configService.get<string>("MORALIS_STREAM_API_KEY");
		const providedSignature = request.headers["x-signature"];
		if (!providedSignature) throw new Error("Signature not provided");
		const generatedSignature = ethers.utils.keccak256(
			ethers.utils.toUtf8Bytes(JSON.stringify(request.body) + secret),
		);
		if (generatedSignature !== providedSignature) throw new Error("Invalid Signature");

		return true;
	}
}
