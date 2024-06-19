import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const AuthPayload = createParamDecorator((data: string, ctx: ExecutionContext) => {
	const request = ctx.switchToHttp().getRequest();

	const { walletaddress } = request.headers;
	const { userId } = request.headers;

	if (data === "walletaddress") {
		return walletaddress;
	}
	if (data === "userId") {
		return userId;
	}
	return null;
});
