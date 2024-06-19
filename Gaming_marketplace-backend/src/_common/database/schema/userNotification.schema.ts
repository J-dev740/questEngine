// import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument,Schema,Types } from "mongoose";


export interface IuserNotificationModel{
    userId:Types.ObjectId;
    notificationId:Types.ObjectId;
    isRead: boolean;


}

// eslint-disable-next-line no-use-before-define
export type UserNotificationDocument = HydratedDocument<IuserNotificationModel>;
export const modelName= "UserNotification";
export const UserNotificationSchema = new Schema<IuserNotificationModel>({
    userId:{type:Schema.Types.ObjectId,ref:"User",required:true},
    notificationId:{type:Schema.Types.ObjectId,ref:"Notification",required:true},
    isRead:{type:Boolean,required:true,default:false}

},{
	timestamps: true,
})


