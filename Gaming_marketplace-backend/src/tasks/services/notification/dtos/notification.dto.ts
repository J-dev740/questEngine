import {  IsNotEmpty, IsString, } from "class-validator";
import { NotificationType } from "@common/database/schema/notification.schema";

export class NotificationDTO {
	@IsNotEmpty()
	@IsString()
	type: NotificationType;

	@IsNotEmpty()
	@IsString()
	message: string;

	data:any

}
