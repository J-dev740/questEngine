import api from "../api";
import {
	CreateQuestProgress,
	GetAllQuests,
	GetQuest,
	GetQuesters,
	GetReferralCode,
	GetRewards,
	getTaskResponse,
	GetUserData,
	TwitterFollow,
	UpdateQuestProgress,
	UpdateQuestStatus,
	UpdateTaskInQuestProgress,
	UpdateTaskStatus,
	UserQuestProgress,
	VerifyQuest,
} from "./quest.types";

export const questApi = api.injectEndpoints({
	endpoints: (builder) => ({
		getAllQuests: builder.query<GetAllQuests.Response, GetAllQuests.Params>({
			query: ({ pageIndex, length }) => ({
				url: "/quest",
				method: "GET",
				params: { pageIndex, length },
			}),

			// serializeQueryArgs: ({ endpointName }) => {
			// 	return endpointName;
			// },
			// // // Always merge incoming data to the cache entry
			// merge: (currentCache, newItems) => {
			// 	console.log("merge", { currentCache, newItems });
			// 	currentCache.push(...newItems);
			// },
			// forceRefetch({ currentArg, previousArg }) {
			// 	console.log("arg", { currentArg, previousArg });
			// 	if (currentArg?.pageIndex !== 0) {
			// 		console.log("arg", "forceRefetch");
			// 		return currentArg?.pageIndex !== previousArg?.pageIndex;
			// 	}
			// 	console.log("arg", "forceRefetch false");

			// 	return true;
			// },
		}),
		getQuest: builder.query<GetQuest.Response, GetQuest.Params>({
			query: (id) => ({
				url: `/quest/${id}`,
				method: "GET",
			}),
		}),
		updateQuestProgress: builder.mutation<
			UpdateQuestProgress.Response,
			UpdateQuestProgress.Params
		>({
			query: ({ ...body }) => ({
				url: "/quest/quests",
				method: "POST",
				body,
			}),
			invalidatesTags: ["ParticipatedQuests"],
		}),
		createQuestProgress: builder.mutation<
			CreateQuestProgress.Response,
			CreateQuestProgress.Params
		>({
			query: ({ ...body }) => ({
				url: "/questor/participate",
				method: "POST",
				body,
			}),
			invalidatesTags: ["ParticipatedQuests"],
		}),
		getParticipatedQuests: builder.query<GetAllQuests.Response, string>({
			query: (userId: string) => ({
				url: "/questor/participated-quests",
				params: { userId },
				method: "GET",
			}),
			providesTags: ["ParticipatedQuests"],
		}),
		getCompletedQuests: builder.query<GetAllQuests.Response, string>({
			query: (userId: string) => ({
				url: "/questor/completed-quests",
				params: { userId },
				method: "GET",
			}),
			providesTags: ["CompletedQuests"],
		}),
		getQuestQuesters: builder.query<GetQuesters.Response, string>({
			query: (id: string) => ({
				url: `/quest/questor/${id}`,
				method: "GET",
			}),
			providesTags: ["ParticipatedQuests"],
		}),
		getQuesters: builder.query<GetQuesters.Response, GetQuesters.Params>({
			query: ({ pageIndex, length }) => {
				return {
					url: `/quest/leaderboard/all`,
					params: { pageIndex, length },
					method: "GET",
				};
			},
		}),
		getLeaderboardDaily: builder.query<GetQuesters.Response, GetQuesters.Params>({
			query: ({ pageIndex, length }) => {
				return {
					url: `/quest/leaderboard/daily`,
					params: { pageIndex, length },
					method: "GET",
				};
			},
		}),
		getLeaderboardMonthly: builder.query<GetQuesters.Response, GetQuesters.Params>({
			query: ({ pageIndex, length }) => {
				return {
					url: `/quest/leaderboard/monthly`,
					params: { pageIndex, length },
					method: "GET",
				};
			},
		}),
		getUserData: builder.query<GetUserData.Response, GetUserData.Params>({
			query: (walletAddress) => ({
				url: `/quest/fetch-data/${walletAddress}`,
				method: "GET",
			}),
		}),
		updateTaskStatus: builder.mutation<UpdateTaskStatus.Response, UpdateTaskStatus.Params>({
			query: (body) => ({
				url: `/questor/update-task`,
				method: "PATCH",
				body,
			}),
		}),
		getTaskResponse: builder.query<getTaskResponse.Response, string>({
			query: (url) => ({
				url: `/tasks/${url}`,
				method: "GET",
			}),
		}),
		getReferralCode: builder.mutation<GetReferralCode.Response, GetReferralCode.Params>({
			query: ({ ...body }) => ({
				url: "/tasks/referral",
				method: "POST",
				body,
			}),
		}),
		updateQuestStatus: builder.mutation<void, UpdateQuestStatus.Params>({
			query: ({ ...body }) => ({
				url: "/creator/update-quest-status",
				method: "PATCH",
				body,
			}),
		}),
		updateTaskInQuestProgress: builder.mutation<
			UpdateTaskInQuestProgress.Response,
			UpdateTaskInQuestProgress.Params
		>({
			query: ({ ...body }) => ({
				url: "quest/update-task",
				method: "PATCH",
				body,
			}),
		}),
		getUserQuestProgress: builder.query<UserQuestProgress.Response, UserQuestProgress.Params>({
			query: ({ questId, userId }) => ({
				url: "questor/quest-progress",
				method: "GET",
				params: { questId, userId },
			}),
		}),
		// TWITTER
		followUser: builder.mutation<TwitterFollow.Response, TwitterFollow.Params>({
			query: (body) => ({
				url: "/tasks/twitter/follow",
				method: "POST",
				body,
			}),
		}),
		likeTweet: builder.mutation<TwitterFollow.Response, TwitterFollow.Params>({
			query: (body) => ({
				url: "/tasks/twitter/createLike",
				method: "POST",
				body,
			}),
		}),
		retweetTweet: builder.mutation<TwitterFollow.Response, TwitterFollow.Params>({
			query: (body) => ({
				url: "/tasks/twitter/retweet",
				method: "POST",
				body,
			}),
		}),

		// Refactor
		verifyQuest: builder.mutation<void, VerifyQuest.Params>({
			query: ({ questId, type, body, token }) => ({
				url: `/tasks/verify/${type}/quest/${questId}`,
				method: "GET",
				body,
				headers: {
					AUTHORIZATION: `Bearer ${token}`,
				},
			}),
		}),
		getRewards: builder.query<GetRewards.Response, GetRewards.Params>({
			query: ({ questId, tokenAddress }) => ({
				url: `/questor/getRewards/${questId}`,
				method: "GET",
				params: { tokenAddress },
			}),
		}),
	}),
});

export const {
	useGetAllQuestsQuery,
	useGetQuestQuestersQuery,
	useGetReferralCodeMutation,
	useGetUserDataQuery,
	useUpdateTaskStatusMutation,
	useUpdateQuestStatusMutation,
	useUpdateTaskInQuestProgressMutation,
	useCreateQuestProgressMutation,
	useGetParticipatedQuestsQuery,
	useGetCompletedQuestsQuery,
	useUpdateQuestProgressMutation,
	useGetTaskResponseQuery,
	useGetQuestersQuery,
	useLazyGetLeaderboardDailyQuery,
	useLazyGetLeaderboardMonthlyQuery,
	useLazyGetUserQuestProgressQuery,
	useGetQuestQuery,
	// TWITTER
	useFollowUserMutation,
	useLikeTweetMutation,
	useRetweetTweetMutation,
	// Refactor
	useVerifyQuestMutation,
	//getRewards
	useGetRewardsQuery,
} = questApi;
