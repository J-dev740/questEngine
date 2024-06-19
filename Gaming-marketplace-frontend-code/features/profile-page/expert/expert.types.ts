import {
	CourseInfo,
	ExpertInfo,
	ExpertLivestreamInfo,
	LivestreamInfo,
	Page,
	ReviewInfo,
} from "../../types";

export namespace GetUser {
	export type Response = ExpertInfo;
}

export namespace GetExperts {
	export type Response = Page<ExpertInfo>;
	export type Params = { cursor: number; length: number } | void;
}

export namespace GetExpert {
	export type Response = ExpertInfo;
	export type Params = string;
}

export namespace UpdateExpert {
	export type Response = ExpertInfo;
	export type Params = Partial<ExpertInfo>;
}

export namespace GetExpertCourses {
	export type Response = Array<CourseInfo>;
	export type Params = string;
}

export namespace GetExpertCourse {
	export interface Params {
		expertId: string;
		courseId: string;
	}
	export type Response = CourseInfo;
}

export namespace CreateExpertCourse {
	export type Params = Partial<CourseInfo> & { expertId: string };
	export type Response = CourseInfo;
}

export namespace DeleteExpertCourse {
	export type Response = CourseInfo;
	export type Params = string;
}

export namespace DeleteExpertLivestream {
	export type Response = LivestreamInfo;
	export type Params = string;
}

export namespace GetExpertLivestreams {
	export type Response = Array<ExpertLivestreamInfo>;
	export type Params = string;
}

export namespace GetExpertLivestream {
	export interface Params {
		expertId: string;
		livestreamId: string;
	}
	export type Response = LivestreamInfo;
}

export namespace CreateExpertLivestream {
	export type Params = Partial<LivestreamInfo> & { expertId: string };
	export type Response = LivestreamInfo;
}

export namespace GetExpertReviews {
	export type Params = string;
	export type Response = Array<Partial<ReviewInfo>>;
}
