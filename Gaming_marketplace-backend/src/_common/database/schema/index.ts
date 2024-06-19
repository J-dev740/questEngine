import { ModelDefinition } from "@nestjs/mongoose";
import { CourseSchema, modelName as courseModelName } from "./course.schema";
import { CurrencySchema, modelName as currencyModelName } from "./currency.schema";
import { FeedbackSchema, modelName as feedbackModelName } from "./feedback.schema";
import { GameSchema, modelName as gameModelName } from "./game.schema";
import { LanguageSchema, modelName as languageModelName } from "./language.schema";
import { LivestreamSchema, modelName as livestreamModelName } from "./livestream.schema";
import { QuestSchema, modelName as questModelName } from "./quest.schema";
import { QuestProgressSchema, modelName as questProgressModelName } from "./questProgress.schema";
import { ReferralSchema, ReferralSchemaName } from "./referral.schema";
import { ReviewSchema, modelName as reviewModelName } from "./review.schema";
import { modelName as taskModelName, taskSchema } from "./task.schema";
import { TransactionSchema, modelName as transactionModelName } from "./transaction.schema";
import { UserSchema, modelName as userModelName } from "./user.schema";
import { VideoSchema, modelName as videoModelName } from "./video.schema";
import { NotificationSchema, modelName as NotificationModelName } from "./notification.schema";
import { UserNotificationSchema, modelName as UserNotificationModelName } from "./userNotification.schema";


export const AuthModelDefs: Array<ModelDefinition> = [{ name: userModelName, schema: UserSchema }];

export const UsersModelDefs: Array<ModelDefinition> = [
	{ name: userModelName, schema: UserSchema },
	{ name: reviewModelName, schema: ReviewSchema },
	{ name: gameModelName, schema: GameSchema },
	{ name: courseModelName, schema: CourseSchema },
	{ name: livestreamModelName, schema: LivestreamSchema },
];

export const GamesModelDefs: Array<ModelDefinition> = [
	{ name: userModelName, schema: UserSchema },
	{ name: reviewModelName, schema: ReviewSchema },
	{ name: gameModelName, schema: GameSchema },
	{ name: courseModelName, schema: CourseSchema },
];

export const CourseModelDefs = [
	{ name: courseModelName, schema: CourseSchema },
	{ name: userModelName, schema: UserSchema },
	{ name: gameModelName, schema: GameSchema },
	{ name: languageModelName, schema: LanguageSchema },
	{ name: reviewModelName, schema: ReviewSchema },
];

export const VideoModelDefs = [{ name: videoModelName, schema: VideoSchema }];

export const LivestreamModelDefs = [
	{ name: livestreamModelName, schema: LivestreamSchema },
	{ name: userModelName, schema: UserSchema },
	{ name: gameModelName, schema: GameSchema },
	{ name: reviewModelName, schema: ReviewSchema },
];

export const MiscModelDefs = [
	{ name: userModelName, schema: UserSchema },
	{ name: gameModelName, schema: GameSchema },
	{ name: currencyModelName, schema: CurrencySchema },
	{ name: languageModelName, schema: LanguageSchema },
	{ name: feedbackModelName, schema: FeedbackSchema },
];

export const PaymentModelDefs = [
	{ name: transactionModelName, schema: TransactionSchema },
	{ name: userModelName, schema: UserSchema },
	{ name: currencyModelName, schema: CurrencySchema },
	{ name: courseModelName, schema: CourseSchema },
	{ name: livestreamModelName, schema: LivestreamSchema },
];

export const QuestModelDefs = [
	{ name: userModelName, schema: UserSchema },
	{ name: questModelName, schema: QuestSchema },
	{ name: courseModelName, schema: CourseSchema },
	{ name: questProgressModelName, schema: QuestProgressSchema },
	{ name: gameModelName, schema: GameSchema },
	{ name: taskModelName, schema: taskSchema },
];

export const CreatorModelDefs = [
	{ name: taskModelName, schema: taskSchema },
	{ name: userModelName, schema: UserSchema },
	{ name: questModelName, schema: QuestSchema },
];

export const TasksModelDefs = [
	{ name: taskModelName, schema: taskSchema },
	{ name: userModelName, schema: UserSchema },
	{ name: questModelName, schema: QuestSchema },
	{ name: ReferralSchemaName, schema: ReferralSchema },
	{ name: UserNotificationModelName, schema: UserNotificationSchema },
	{ name: NotificationModelName, schema: NotificationSchema },

];
