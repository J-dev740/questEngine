/* eslint-disable max-len */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GetUserConnection, ICyber } from "./cyber.types";

export const initialState: ICyber = {
	address: null,
	cyberConnect: null,
	primaryProfile: {
		essences: { totalCount: -1 },
		postCount: -1,
		isFollowedByMe: false,
		isSubscribedByMe: false,
		owner: { address: "" },
		followers: -1,
		subscribers: -1,
		subscribeMw: undefined,
		profileID: -1,
		handle: "",
		avatar: "",
		followerCount: -1,
		metadataInfo: {
			avatar: "",
			bio: "",
			displayName: "",
		},
		subscriberCount: -1,
	},
	profileCount: -1,
	followingCount: -1,
	followers: -1,
	postCount: -1,
	followings: [],
	profiles: [],
	posts: [],
	essences: [],
	collectedEssences: [],
	indexingProfiles: [],
	primaryProfileEssence: [],
	primaryProfilePosts: [],
};

// const cyberSlice = createSlice({
// 	name: "cyber-connect",
// 	initialState,
// 	reducers: {
// 		setEssences: (state, action: PayloadAction<ICyber["essences"]>) => {
// 			state.essences = action.payload;
// 		},
// 		setCyber: (state, action: PayloadAction<ICyber["cyberConnect"]>) => {
// 			state.cyberConnect = action.payload;
// 		},
// 		setPosts: (state, action: PayloadAction<ICyber["posts"]>) => {
// 			state.posts = action.payload;
// 		},
// 		setPrimaryProfile: (state, action: PayloadAction<ICyber["primaryProfile"]>) => {
// 			state.primaryProfile = action.payload;
// 		},
// 		setPrimaryProfileEssence: (
// 			state,
// 			action: PayloadAction<ICyber["primaryProfileEssence"]>,
// 		) => {
// 			state.primaryProfileEssence = action.payload;
// 		},
// 		setPrimaryProfilePosts: (state, action: PayloadAction<ICyber["primaryProfilePosts"]>) => {
// 			state.primaryProfilePosts = action.payload;
// 		},
// 		setCollectedEssences: (state, action: PayloadAction<ICyber["collectedEssences"]>) => {
// 			state.collectedEssences = action.payload;
// 		},
// 		setIndexingProfiles: (state, action: PayloadAction<ICyber["indexingProfiles"]>) => {
// 			state.indexingProfiles = action.payload;
// 		},
// 		setFollowingCount: (state, action: PayloadAction<ICyber["followingCount"]>) => {
// 			state.followingCount = action.payload;
// 		},
// 		setFollowings: (state, action: PayloadAction<ICyber["followings"]>) => {
// 			state.followings = action.payload;
// 		},
// 		checkUserConnection: (state, action: PayloadAction<GetUserConnection.Response>) => {
// 			state.primaryProfile =
// 				action.payload.response.primaryProfile?.data?.address?.wallet?.primaryProfile;
// 			state.profileCount = 0;
// 			state.followers = action.payload.res2?.data?.address?.followings?.edges;
// 			state.followingCount = action.payload.res2?.data?.address?.followingCount;
// 			state.postCount = 0;
// 			state.essences = action.payload.allEssences;
// 			state.collectedEssences = [];
// 			state.indexingProfiles = [];
// 			state.posts = [];
// 			state.primaryProfileEssence = [];
// 			state.primaryProfilePosts = [];
// 			state.indexingProfiles = [];
// 		},
// 		resetState: (state) => {
// 			return initialState;
// 		},
// 	},
// });

// export const cyberReducer = cyberSlice.reducer;
// export const cyberActions = cyberSlice.actions;
