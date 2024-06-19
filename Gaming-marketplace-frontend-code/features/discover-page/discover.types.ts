import { ExpertDiscoverInfo } from "../types";

export namespace GetCourses {
	export type Response = Array<{
		upvotes: number;
		course_id: string;
		rating: number;
	}>;

	export type Params = void;
}

export namespace GetExperts {
	export type Response = Array<ExpertDiscoverInfo>;

	export type Params = void;
}

export namespace GetGames {
	export type Response = Array<{
		result: Array<{
			_id: string;
			title: string;
			description: string;
			icon: string;
			users: Array<string>;
			courses: Array<string>;
			livestreams: Array<string>;
			createdAt: string;
			updatedAt: string;
			__v: number;
		}>;
		totalCount: {
			count: number;
		};
	}>;

	export type Params = void;
}

export namespace GetLivestreams {
	export type Response = Array<{
		upvotes: number;
		livestream_id: string;
		rating: number;
	}>;

	export type Params = void;
}
