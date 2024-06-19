import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
// import { v4 as uuidV4 } from "uuid";
import UserNotificationQueryService from "@common/database/queries/userNotification.query";
import {
	modelName as NotificationModelName,
	NotificationDocument,
} from "@common/database/schema/notification.schema";
import {
	modelName as UserNotificationModelName,
	UserNotificationDocument,
	IuserNotificationModel,
} from "@common/database/schema/userNotification.schema";
import NotificationQueryService from "@common/database/queries/notification.query";
// import { NotificationDTO } from "./dtos/notification.dto";
import { UserNotificationDTO } from "./dtos/userNotification.dto";

@Injectable()
export class UserNotificationService {
	notificationQueryService:NotificationQueryService

	userNotificationQueryService: UserNotificationQueryService

	constructor(
		@InjectModel(UserNotificationModelName)
		private readonly userNotificationModel: Model<UserNotificationDocument>,
		@InjectModel(NotificationModelName)
		private readonly notificationModel: Model<NotificationDocument>,
	) {
		this.userNotificationQueryService = new UserNotificationQueryService(userNotificationModel);
		this.notificationQueryService = new NotificationQueryService(notificationModel);
	}

	async getNotifications(userId: string,limit:number ): Promise<any> {
		try {
			const userNotifications = await this.userNotificationModel.find({
				userId
			}).limit(limit).exec();
			if (userNotifications) {
				console.log("userNotifications",userNotifications)
				return userNotifications;
			}
			return null;
		} catch (error) {
			console.log("getNotifications Error");
			throw new BadRequestException(error);
		}
	}

	async getNotification(_id: string): Promise<any> {
		try {
			const notification = await this.notificationModel.findOne({
				_id
			});
			if (notification) {
				console.log("notification",notification)
				return notification;
			}
			return null;
		} catch (error) {
			console.log("getNotification Error");
			throw new BadRequestException(error);
		}
	}

	async Notify(userNotification: UserNotificationDTO): Promise<boolean> {
		try {
			const notification=
			await this.notificationQueryService.createEntity(userNotification.notificationId);

			if(notification){
				const newUserNotification:IuserNotificationModel={
					userId:new Types.ObjectId(userNotification.userId),
					notificationId:notification._id,
					isRead:false,
				}
				await this.userNotificationQueryService.createEntity(newUserNotification);
			console.log("new notification created");
			return true;
			} 
				console.log("notification not created");
				return false;
			
		} catch (error) {
			console.log("Post@notificationError------->");
			throw new BadRequestException(error);
		}
	}

		async updateNotification(userNotificationId:string) {

		const updatedNotification= await this.userNotificationModel.updateOne(
			{
				"_id": userNotificationId,
			},
			{
				"isRead":true,
			}
		)
		return updatedNotification;
	}


// 	async doesNotificationExist(walletId: string): Promise<boolean> {
// 		const exists=await  this.NotificationModel.findOne({
// 			walletIds:{$in:[walletId]},
// 		})

// 		if(exists){
// 			return true;
// 		}
// 			return false;
		
// 	}

// 	async findNotificationByWalletId(walletId: string,page=1,limit=6): Promise<any> {
// 		const notifications=await this.NotificationModel.find({
// 			walletIds:{$in:[walletId]},
// 		},
// 			{_id:1,Notification:1,}
// 		).sort({_id:-1}).skip((page-1)*limit).limit(limit).exec();
// 		if(notifications){
// 			return notifications;
// 		}
// 			throw new Error("No notifications found");
		
// 	}
}
