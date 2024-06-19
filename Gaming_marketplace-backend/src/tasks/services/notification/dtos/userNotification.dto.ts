import { IsObjectId } from "@common/decorators/validation/ObjectId.decorator";
import {  IsBoolean, IsNotEmpty,  Validate, } from "class-validator";
// import { Types } from "mongoose";
import { Types } from "mongoose";
import { NotificationDTO } from "./notification.dto";

export class UserNotificationDTO {
	@IsNotEmpty()
	@Validate(IsObjectId)
	userId:Types.ObjectId;

	@IsNotEmpty()
    // @Validate(IsObjectId)
	notificationId:NotificationDTO;

    @IsNotEmpty()
    @IsBoolean()
    isRead: boolean;

}