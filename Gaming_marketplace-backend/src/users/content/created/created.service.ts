import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import CourseQueryService from "../../../_common/database/queries/course.query";
import LivestreamQueryService from "../../../_common/database/queries/livestream.query";
import UserQueryService from "../../../_common/database/queries/user.query";
import {
	CourseDocument,
	modelName as courseModelName,
} from "../../../_common/database/schema/course.schema";
import {
	LivestreamDocument,
	modelName as livestreamModelName,
} from "../../../_common/database/schema/livestream.schema";
import {
	modelName as userModelName,
	UserDocument,
} from "../../../_common/database/schema/user.schema";

@Injectable()
export class CreatedService {
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

	getAllUserCourses(userId: string): Promise<CourseDocument[]> {
		return this.userQueryService.getExpertCoursesQuery(userId);
	}

	getSingleUserCourses(owner: string, _id: string): Promise<CourseDocument> {
		return this.courseQueryService.readEntity({ _id, owner }, {}, { users: 0 });
	}

	getAllUserLivestreams(userId: string): Promise<LivestreamDocument[]> {
		return this.userQueryService.getExpertLivestreamsQuery(userId);
	}

	getSingleUserLivestream(owner: string, _id: string): Promise<LivestreamDocument> {
		return this.livestreamQueryService.readEntity({ _id, owner }, {}, { users: 0 });
	}
}
