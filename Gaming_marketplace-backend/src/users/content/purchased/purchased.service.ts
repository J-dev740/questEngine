import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import CourseQueryService from "../../../_common/database/queries/course.query";
import LivestreamQueryService from "../../../_common/database/queries/livestream.query";
import UserQueryService from "../../../_common/database/queries/user.query";
import {
	CourseDocument,
	ICourse,
	modelName as courseModelName,
} from "../../../_common/database/schema/course.schema";
import {
	ILivestream,
	LivestreamDocument,
	modelName as livestreamModelName,
} from "../../../_common/database/schema/livestream.schema";
import {
	modelName as userModelName,
	UserDocument,
} from "../../../_common/database/schema/user.schema";

@Injectable()
export class PurchasedService {
	courseQueryService: CourseQueryService;

	livestreamQueryService: LivestreamQueryService;

	userQueryService: UserQueryService;

	constructor(
		@InjectModel(courseModelName) courseModel: Model<CourseDocument>,
		@InjectModel(userModelName) userModel: Model<UserDocument>,
		@InjectModel(livestreamModelName)
		livestreamModel: Model<LivestreamDocument>,
	) {
		this.courseQueryService = new CourseQueryService(courseModel);
		this.userQueryService = new UserQueryService(userModel);
		this.livestreamQueryService = new LivestreamQueryService(livestreamModel);
	}

	async getAllUserCourses(walletAddress: string): Promise<ICourse[]> {
		const user = await this.userQueryService.readEntity({ walletAddress });
		return this.userQueryService.getPurchasedCoursesQuery(user._id.toString());
	}

	getSingleUserCourse(users: string, _id: string): Promise<CourseDocument> {
		return this.courseQueryService.readEntity({ _id, users }, {}, { users: 0 });
	}

	async getAllUserLivestreams(walletAddress: string): Promise<ILivestream[]> {
		const user = await this.userQueryService.readEntity({ walletAddress });
		return this.userQueryService.getPurchasedLivestreamsQuery(user._id.toString());
	}

	getSingleUserLivestream(users: string, _id: string): Promise<LivestreamDocument> {
		return this.livestreamQueryService.readEntity({ _id, users }, {}, { users: 0 });
	}
}
