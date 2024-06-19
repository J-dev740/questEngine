import api from "../../api";
import {
	CreateLivestreamReview,
	GetLivestream,
	GetLivestreamReviews,
	GetLivestreams,
} from "./livestream.types";

export const livestreamApi = api.injectEndpoints({
	endpoints: (builder) => ({
		getLivestreamById: builder.query<GetLivestream.Response, string>({
			query: (livestreamId: string) => ({
				url: `/livestreams/data/${livestreamId}`,
				method: "GET",
			}),
			providesTags: (result, error, arg) => [{ type: "Livestream", id: arg }],
		}),
		getOngoingLivestreams: builder.query<GetLivestreams.Response, void>({
			query: () => ({
				url: `/livestreams/data/ongoing`,
				method: "GET",
			}),
			providesTags: (result, error, arg) => [{ type: "Livestream", id: "ongoing" }],
		}),
		getUpcomingLivestreams: builder.query<GetLivestreams.Response, void>({
			query: () => ({
				url: `/livestreams/data/upcoming`,
				method: "GET",
			}),
			providesTags: (result, error, arg) => [{ type: "Livestream", id: "upcoming" }],
		}),
		getLivestreamReviews: builder.query<GetLivestreamReviews.Response, string>({
			query: (livestreamId: string) => ({
				url: `/livestreams/reviews/${livestreamId}`,
				method: "GET",
			}),
			providesTags: (result, error, arg) => [{ type: "Review", id: "list" }],
		}),
		createLivestreamReview: builder.mutation<
			CreateLivestreamReview.Response,
			CreateLivestreamReview.Param
		>({
			query: ({ livestreamId, ...body }) => ({
				url: `/livestreams/reviews/${livestreamId}`,
				method: "POST",
				body,
			}),
		}),
	}),
});
export const {
	useGetOngoingLivestreamsQuery,
	useGetUpcomingLivestreamsQuery,
	useCreateLivestreamReviewMutation,
	useGetLivestreamByIdQuery,
	useGetLivestreamReviewsQuery,
} = livestreamApi;
