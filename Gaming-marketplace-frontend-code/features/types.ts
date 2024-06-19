export type UserRoles = "member" | "expert" | "new";

export enum CONTRACT_STATUS {
	success = "success",
	failure = "failure",
	confirmed = "confirmed",
	refunded = "refunded",
	approved = "approved",
}

export enum CURRENCY_TYPE {
	base = "base",
	erc20 = "erc20",
	erc721 = "erc721",
}

export interface Page<T> {
	result: T[];
	totalCount: { count: number };
}

export interface PriceInfo {
	currency: string;
	amount: number;
}

export interface ServerError {
	statusCode: number;
	timestamp: string;
	message: string;
	path: string;
}

export interface ExpertDiscoverInfo {
	owner: {
		_id: string;
		role: string;
		walletAddress: string;
		courses: Array<{
			id: string;
			title: string;
		}>;
		livestreams: Array<string>;
		games: Array<string>;
		participated_quests: Array<string>;
		createdAt: string;
		about: string;
		updatedAt: string;
		username: string;
		icon: string;
		language: string;
		__v: number;
	};
	rating: number;
}

export interface UserInfo {
	_id: string;
	role: Array<UserRoles>;
	walletAddress: string;
	username: string;
	stream: {
		key: string;
		id: string;
	};
	livestreams: Array<string>;
	purchasedLivestreams: Array<string>;
	courses: Array<string>;
	purchasedCourses: Array<string>;
	games: Array<string>;
	icon: string;
	about: string;
	language: string;
	createdAt: string;
	updatedAt: string;
	gems: number;
	bio: string;
	participated_quests: string[];
	created_quests?: string[];
}
export interface ExpertInfo {
	_id: string;
	role: Array<UserRoles>;
	walletAddress: string;
	username: string;
	stream: {
		key: string;
		id: string;
	};
	livestreams: Array<string>;
	purchasedLivestreams: Array<string>;
	courses: Array<string>;
	purchasedCourses: Array<string>;
	games: Array<string>;
	icon: string;
	about: string;
	language: string;
	createdAt: string;
	updatedAt: string;
	gems: number;
	bio: string;
	participated_quests: string[];
	created_quests?: string[];
}

export interface CourseInfo {
	_id: string;
	owner: string;
	game: string;
	title: string;
	icon: string;
	description: string;
	prices: PriceInfo[];
	primaryCurrency: string;
	primaryAmount: number;
	videos: Array<Partial<VideoInfo>>;
	users: Array<string>;
	createdAt: string;
	updatedAt: string;
	status: CONTRACT_STATUS;
}

export interface ExpertLivestreamInfo {
	_id: string;
	owner: {
		_id: string;
		username: string;
	};
	game: {
		_id: string;
		title: string;
	};
	icon: string;
	title: string;
	description: string;
	playbackId: string;
	streamStart: string; // datetime
	streamEnd: string; // datetime
	users: Array<string>;
	createdAt: string;
	updatedAt: string;
}

export interface LivestreamInfo {
	_id: string;
	owner: string;
	game: string;
	icon: string;
	title: string;
	description: string;
	playbackId: string;
	streamStart: string; // datetime
	streamEnd: string; // datetime
	users: Array<string>;
	createdAt: string;
	updatedAt: string;
}

export interface VideoInfo {
	_id?: string;
	seq_id: number;
	title: string;
	description: string;
	icon: string;
	assetId: string;
	duration: number;
	playbackId: string;
	__v?: number;
}

export interface GameInfo {
	_id: string;
	title: string;
	description: string;
	icon: string;
	users: Array<string>;
	courses: Array<string>;
}

export interface ReviewInfo {
	_id: string;
	owner: string;
	game: string;
	title: string;
	content: string;
	rating: number;
	upvotes: number;
	createdAt: string;
	updatedAt: string;
}

export interface CurrencyInfo {
	_id: string;
	type: CURRENCY_TYPE;
	name: string;
	chainId: string;
	contractAddress: string;
	createdAt: string;
	updatedAt: string;
}

export interface LanguageInfo {
	_id: string;
	name: string;
	notation: string;
	createdAt: string;
	updatedAt: string;
}
