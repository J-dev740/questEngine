import { Page } from "@common/types.global";
import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const GetPagination = createParamDecorator((data, ctx: ExecutionContext): Page => {
	const request = ctx.switchToHttp().getRequest();
	const { pageIndex, length } = request.query;
	if (pageIndex && length) {
		return {
			skip: parseInt(pageIndex, 10),
			length: parseInt(length, 10),
		};
	}
	return {
		skip: 0,
		length: 10,
	};
});
