import {
	// BadRequestException,
	CanActivate,
	ExecutionContext,
	// ForbiddenException,
	Injectable,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Reflector } from "@nestjs/core";
// import { Observable } from "rxjs";
import { UsersService } from "@src/users/users.service";
import { AuthService } from "../../auth/auth.service";
import { AUTH_ROLES } from "../types.global";

@Injectable()
export class RolesGuard implements CanActivate {
	constructor(
		private reflector: Reflector,
		private authService: AuthService,
		private configService: ConfigService,
		private userService:UsersService,
	) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest();
		const requiredRoles = this.reflector.getAllAndOverride<AUTH_ROLES[]>("roles", [
			context.getHandler(),
			context.getClass(),
		]);

		if (!requiredRoles) return Promise.resolve(true);
		const { userId } =  request.params
		console.log("userId",userId);
		const user = await this.userService.getUser(userId);
		console.log("userRole",user.role);
		return requiredRoles.some((role) => user?.role?.includes(role));
	}
}
