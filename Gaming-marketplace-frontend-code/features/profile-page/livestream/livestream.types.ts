import { LivestreamInfo, ReviewInfo } from "../../types";

export namespace GetLivestream {
	export type Response = LivestreamInfo;
}

export namespace GetLivestreamReviews {
	export type Response = Array<ReviewInfo>;
}

export namespace CreateLivestreamReview {
	export type Response = Partial<ReviewInfo>;
	export type Param = { livestreamId: string } & Partial<ReviewInfo>;
}

export namespace GetLivestreams {
	export type Response = {
		_id: string;
		owner: { _id: string; username: string };
		game: { _id: string; title: string };
		icon: string;
		streamStart: string;
		streamEnd: string;
	}[];
}
