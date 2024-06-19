import { CourseInfo, ExpertInfo, GameInfo, ReviewInfo } from "../../types";

export namespace GetCourses {
	export type Response = Array<CourseInfo>;
}

export namespace GetCourse {
	export type Response = CourseInfo;
}

export namespace GetGames {
	export type Response = Array<GameInfo>;
}

export namespace GetGame {
	export type Response = GameInfo;
}

export namespace GetReviews {
	export type Response = Array<ReviewInfo>;
}

export namespace GetReview {
	export type Response = ReviewInfo;
}

export namespace GetGameExpert {
	export type Response = Array<{
		result: Array<ExpertInfo>;
		totalCount: {
			count: number;
		};
	}>;
}
