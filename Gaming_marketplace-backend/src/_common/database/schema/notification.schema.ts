// import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument,Schema } from "mongoose";

export enum NotificationType {
	QUEST_REWARD = "QUEST_REWARD",
	QUEST="QUEST",
	PAYMENT="PAYMENT",
	COURSE_PURCHASE="COURSE_PURCHASE",
	FOLLOW_REQUEST="FOLLOW_REQUEST",
	REMINDER="REMINDER",
}
export interface NotificationModel{
	type: NotificationType;
	message: string;
	createdAt: Date;
	updatedAt: Date;
	data: object;
}

// eslint-disable-next-line no-use-before-define
export type NotificationDocument = HydratedDocument<NotificationModel>;
export const modelName= "Notification";
export const NotificationSchema = new Schema<NotificationModel>({
	type: { type:String, required: true, enum: Object.values(NotificationType) },
	message: { type: String, required: true },
	data:{type:Schema.Types.Mixed, required: false}
},{
	timestamps: true,
})


