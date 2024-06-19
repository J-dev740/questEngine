import { Model } from "mongoose";

import { NotificationDocument, modelName as NotificationModelName } from "../schema/notification.schema";
import { GenericQueryService } from "./generic.query";

export default class NotificationQueryService extends
 GenericQueryService<NotificationDocument> {
	constructor(model: Model<NotificationDocument>) {
		super(model, NotificationModelName);
	}
	

	async createEntity(data: any): Promise<NotificationDocument> {
		return super.createEntity(data);
	}

	async createMultipleEntities(data: any): Promise<Array<NotificationDocument>> {
		return super.createMultipleEntities(data);
	}
}