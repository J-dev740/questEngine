import { CourseInfo } from "../types";

interface AssetPayment {
	assetId: string;
	hash: string;
	status: "failure" | "success";
}

export namespace GetPurchasedCourses {
	export type Response = Array<CourseInfo & { username: string }>;
	export type Request = {
		walletAddress: string;
	};
}

export namespace MakePayment {
	export type Param = AssetPayment;
}
export namespace EnrollUser {
	export type Param = {
		id: string;
		walletAddress: string;
	};
}
