import { CourseInfo, PriceInfo, ReviewInfo } from "../../types";

export namespace GetCourse {
	export type Response = CourseInfo;
}

export namespace GetCourses {
	export type Response = CourseInfo[];
}

export namespace GetCourseReviews {
	export type Response = Array<ReviewInfo>;
}

export namespace CreateCourseReview {
	export type Response = Partial<ReviewInfo>;
	export type Param = { courseId: string } & Partial<ReviewInfo>;
}

export namespace DeleteCourse {
	export type Response = Partial<CourseInfo>;
}

export namespace UpdatePayOptions {
	export type Response = Partial<CourseInfo>; // ??
	export type Params = {
		_expertId: string;
		courseId: string;
		prices: PriceInfo[];
		primaryAmount: number;
		primaryCurrency: string;
	};
}
