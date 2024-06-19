import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
// import { RouterModule } from "@nestjs/core";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from "./auth/auth.module";
import { CoursesModule } from "./courses/courses.module";
import { CreatorModule } from "./creator/creator.module";
import { GamesModule } from "./games/games.module";
// import { gameRoute } from "./games/games.route";
import { LivestreamsModule } from "./livestreams/livestreams.module";
import { MiscModule } from "./misc/misc.module";
import { TasksModule } from "./tasks/tasks.module";
import { UsersModule } from "./users/users.module";
// import { userRoute } from "./users/users.route";

import { LoggerMiddleware } from "./_common/middleware/logger.middleware";

import { PaymentModule } from "./payment/payment.module";
import { QuestModule } from "./quest/quest.module";
import { AdminModule } from "./admin/admin.module";

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		MongooseModule.forRoot(process.env.MONGODB_CON_STRING),
		TasksModule,
		AuthModule,
		UsersModule,
		GamesModule,
		CoursesModule,
		LivestreamsModule,
		MiscModule,
		CreatorModule,
		PaymentModule,
		QuestModule,
		// RouterModule.register([userRoute, gameRoute]),
		AdminModule,
	],
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(LoggerMiddleware).forRoutes({ path: "*", method: RequestMethod.ALL });
	}
}
