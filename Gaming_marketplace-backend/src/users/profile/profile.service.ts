import { ForbiddenException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import UserQueryService from "../../_common/database/queries/user.query";
import { modelName, UserDocument } from "../../_common/database/schema/user.schema";
import { AUTH_ROLES, Page } from "../../_common/types.global";

@Injectable()
export class ProfileService {
	userQueryService: UserQueryService;

	constructor(@InjectModel(modelName) userModel: Model<UserDocument>) {
		this.userQueryService = new UserQueryService(userModel);
	}

	async getSelfData(walletAddress: string) {
		const user = await this.userQueryService.readEntity({ walletAddress });
		const { stream, ...data } = user.toObject();
		return data;
	}

	async getStreamKey(walletAddress: string) {
		const user = await this.userQueryService.readEntity({ walletAddress });
		const {
			stream: { key },
		} = user.toObject();
		return Promise.resolve({ key });
	}

	getAllExperts(page: Page) {
		return this.userQueryService.paginateAllExperts(page);
	}

	getUserProfile(id: string): Promise<UserDocument> {
		return this.userQueryService.readEntity({ _id: id });
	}

	async updateUserInfo(identifier: object, data: any): Promise<boolean> {
		const user = await this.userQueryService.readEntity(identifier);
		if (user.role.includes(AUTH_ROLES.expert)) {
			return this.userQueryService.updateEntity(identifier, data);
		}
		throw new ForbiddenException("User is not an expert");
	}

	async updateUserHandle(walletAddress: string, handle: string): Promise<boolean> {
		return this.userQueryService.updateEntity({ walletAddress }, { handle });
	}
}
