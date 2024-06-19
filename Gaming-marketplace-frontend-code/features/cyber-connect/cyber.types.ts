export interface IProfileCard {
	handle: string;
	avatar: string;
	metadataInfo: { avatar: string; bio: string; displayName: string };
	profileID: number;
	followerCount: number;
	subscriberCount: number;
	postCount: number;
	essences: { totalCount: number };
	isSubscribedByMe: boolean;
	isFollowedByMe: boolean;
	subscribeMw?: { type: string; contractAddress: string; data: string };
	owner: { address: string };
}

export interface IPrimaryProfileCard extends IProfileCard {
	followers?: any;
	subscribers?: any;
}

export interface IAccountCard {
	profileID: number;
	handle: string;
	metadataInfo: { avatar: string; bio: string; displayName: string };
}

export interface IPageInfo {
	endCursor: string;
	startCursor: string;
	hasNextPage: boolean;
	hasPreviousPage: boolean;
}

export enum EssenceTypes {
	free = "free",
	paid = "paid",
	limited = "limited",
}

export interface IPostCard {
	contentID: string;
	authorHandle: string;
	authorAddress: string;
	title: string;
	body: string;
	createdAt: string;
	likeCount: number;
	dislikeCount: number;
	commentCount: number;
	likedStatus: {
		liked: boolean;
		disliked: boolean;
	};
	comments?: any;
}

interface Media {
	/* The MIME type for the media */
	media_type: string;
	/* The URL link for the media */
	media_url: string;
	/* Alternative text when media can't be rendered */
	alt_tag?: string;
	/* The preview image for the media */
	preview_image_url?: string;
}

interface Attribute {
	/* Field indicating how you would like it to be displayed */
	/* optional if the trait_type is string */
	display_type?: string;
	/* Name of the trait */
	trait_type: string;
	/* Value of the trait */
	value: number | string;
}

export interface IEssenceMetadata {
	/* ~~ REQUIRED ~~ */
	/* Unique id for the issued item */
	metadata_id: string;
	/* Version of the metadata schema used for the issued item. */
	version: string;
	/* ~~ OPTIONAL ~~ */
	/* Id of the application under which the items are being minted. */
	app_id?: string;

	/* Language of the content as a BCP47 language tag. */
	lang?: string;

	/* Creation time of the item as ISO 8601. */
	issue_date?: string;

	/* The content associated with the item */
	content?: string;

	/* Media refers to any image, video, or any other MIME type attached to the content.
		Limited to max. 10 media objects. */
	media?: Media[];

	/* Field indicating the tags associated with the content. Limited to max. 5 tags. */
	tags?: string[];

	/* ~~ OPENSEA (optional) ~~ */
	/* URL to the image of the item. */
	image: string;

	/* SVG image data when the image is not passed. Only use this if you're not
			    including the image parameter. */
	image_data?: string;

	/* Name of the item. */
	name?: string;

	/* Description of the item. */
	description?: string;

	/* URL to a multi-media attachment for the item. */
	animation_url?: string;

	/* Attributes for the item. */
	attributes?: Attribute[];

	/* URL to the item on your site. */
	external_url?: string;
}

export interface ICommentCard {
	title: string;
	body: string;
	contentID: number;
	createdAt: Date;
	likeCount: number;
	dislikeCount: number;
	commentCount: number;
	authorHandle: string;
	authorAddress: string;
	likedStatus: {
		liked: boolean;
		disliked: boolean;
	};
}

export interface IEssenceCard {
	name: string;
	essenceID: number;
	contentID: string;
	likeCount: number;
	dislikeCount: number;
	commentCount: number;
	likedStatus: {
		liked: boolean;
		disliked: boolean;
	};
	collectedBy: {
		totalCount: number;
	};
	tokenURI: string;
	isCollectedByMe: boolean;
	metadata: IEssenceMetadata;
	createdBy: {
		owner: {
			address: string;
		};
		handle: string;
		avatar: string;
		metadataInfo: {
			displayName: string;
			bio: string;
			avatar: string;
		};
		profileID: number;
	};
	comments?: ICommentCard[];
	collectMw: {
		contractAddress: string;
		data: string;
		type: "COLLECT_LIMITED_TIME_PAID" | "COLLECT_PAID" | "COLLECT_FREE";
	};
}

export interface ICyber {
	address: string | null;
	cyberConnect: any;
	primaryProfile: IPrimaryProfileCard | undefined;
	profileCount: number;
	followingCount: number;
	followers: number;
	postCount: number;
	followings: IFollowingCard[] | null;
	profiles: IAccountCard[];
	posts: IPostCard[];
	essences: IEssenceCard[];
	collectedEssences: IEssenceCard[];
	indexingProfiles: IAccountCard[];
	primaryProfileEssence: IEssenceCard[];
	primaryProfilePosts: IPostCard[];
}

export namespace GetUserConnection {
	export interface Response {
		address: `0x${string}`;
		response: any;
		res2: any;
		allEssences: any[];
	}
}

export interface IFollowingCard {
	handle: string;
	avatar: string;
	metadataInfo: { avatar: string; bio: string; displayName: string };
	profileID: number;
	isFollowedByMe: boolean;
	isSubscribedByMe: boolean;
}

export interface IEssenceMwCard {
	essence: {
		essenceID: number;
		tokenURI: string;
	};
	selectedEssenceContent: string;
	setSelectedEssence: (essence: { essenceID: number; tokenURI: string }) => void;
	setSelectedEssenceContent: (selectedEssenceContent: string) => void;
	setShowDropdown: (showDropdown: boolean) => void;
}

export interface IProfileMetadata {
	display_name: string;
	bio: string;
	avatar: string;
	version: string;
}

export interface ISignupInput {
	displayName: string;
	bio: string;
	bannerImg: string;
	handle: string;
	avatar: string;
	operator: string;
}
export interface ICommentInput {
	body: string;
	title: string;
	author: string;
}

export interface IProfileMwCard {
	profileID: number;
	metadata: string;
	selectedProfileHandle: string;
	setSelectedProfileId: (profileID: number) => void;
	setSelectedProfileHandle: (selectedProfileHandle: string) => void;
	setShowDropdown: (showDropdown: boolean) => void;
}

export interface IPostInput {
	title: string;
	body: string;
	author: string;
	media: File | null;
}
