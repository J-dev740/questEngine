import { Model } from "mongoose";

import { UserNotificationDocument, modelName as UserNotificationModelName } from "../schema/userNotification.schema";
import { GenericQueryService } from "./generic.query";

export default class UserNotificationQueryService extends
 GenericQueryService<UserNotificationDocument> {
	constructor(model: Model<UserNotificationDocument>) {
		super(model, UserNotificationModelName);
	}
	

	async createEntity(data: any): Promise<UserNotificationDocument> {
		return super.createEntity(data);
	}

	async createMultipleEntities(data: any): Promise<Array<UserNotificationDocument>> {
		return super.createMultipleEntities(data);
	}
}
