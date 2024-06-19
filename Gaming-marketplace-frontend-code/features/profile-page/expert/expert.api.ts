import api from "../../api";
import {
	CreateExpertCourse,
	CreateExpertLivestream,
	DeleteExpertCourse,
	DeleteExpertLivestream,
	GetExpert,
	GetExpertCourse,
	GetExpertCourses,
	GetExpertLivestreams,
	GetExpertReviews,
	GetExperts,
	GetUser,
	UpdateExpert,
} from "./expert.types";

export const expertApi = api.injectEndpoints({
	endpoints: (builder) => ({
		getSelf: builder.query<GetUser.Response, string>({
			query: (walletAddress: string) => ({
				// url: `/users/profile/self`,
				url: `/profile/self`,

				method: "GET",
				params: { walletAddress },
			}),
			providesTags: ["Self"],
		}),
		getExperts: builder.query<GetExperts.Response, GetExperts.Params>({
			query: (params) => ({
				url: params
					? `/profile?cursor=${params.cursor}&length=${params.length}`
					: "/profile",
				method: "GET",
			}),
			providesTags: [{ type: "Expert", id: "list" }],
			transformResponse: (response) => (response as GetExperts.Response[])[0],
		}),
		getExpert: builder.query<GetExpert.Response, GetExpert.Params>({
			query: (expertId: string) => ({
				// url: `/users/profile/${expertId}`,
				url: `/profile/${expertId}`,

				method: "GET",
			}),
			providesTags: (result, error, arg) => [{ type: "Expert", id: arg }],
		}),
		updateExpert: builder.mutation<UpdateExpert.Response, UpdateExpert.Params>({
			query: ({ _id: expertId, ...data }) => ({
				// url: `/users/profile/${expertId}`,
				url: `/profile/${expertId}`,

				method: "PUT",
				body: data,
			}),
			invalidatesTags: (result, error, arg) => [{ type: "Expert", id: arg._id }],
		}),
		getExpertCourses: builder.query<GetExpertCourses.Response, GetExpertCourses.Params>({
			query: (expertId: string) => ({
				// url: `/users/content/created/${expertId}/courses`,
				url: `/content/created/${expertId}/courses`,

				method: "GET",
			}),
			providesTags: (result, err, arg) => [{ type: "Course", id: `expert-${arg}` }],
		}),
		getExpertCourse: builder.query<GetExpertCourse.Response, GetExpertCourse.Params>({
			query: ({ expertId, courseId }) => ({
				// url: `/users/content/created/${expertId}/courses/${courseId}`,
				url: `/content/created/${expertId}/courses/${courseId}`,

				method: "GET",
			}),
			providesTags: (result, error, arg) => [{ type: "Course", id: arg.courseId }],
		}),
		deleteExpertCourse: builder.mutation<
			DeleteExpertCourse.Response,
			DeleteExpertCourse.Params
		>({
			query: (courseId) => ({
				url: `/courses/${courseId}`,
				method: "DELETE",
			}),
			invalidatesTags: (result, error, arg) => [
				{ type: "Course", id: `expert-${result?.owner}` },
			],
		}),
		deleteExpertLivestream: builder.mutation<
			DeleteExpertLivestream.Response,
			DeleteExpertLivestream.Params
		>({
			query: (streamId) => ({
				url: `/livestreams/${streamId}`,
				method: "DELETE",
			}),
			invalidatesTags: (result, error, arg) => [
				{ type: "Livestream", id: `expert-${result?.owner}` },
			],
		}),
		createExpertCourse: builder.mutation<
			CreateExpertCourse.Response,
			CreateExpertCourse.Params
		>({
			query: ({ expertId, ...course }) => ({
				url: "/courses/upload",
				method: "POST",
				body: course,
			}),
			invalidatesTags: (result, err, arg) => [
				{ type: "Course", id: `expert-${arg.expertId}` },
			],
		}),
		getExpertReviews: builder.query<GetExpertReviews.Response, GetExpertReviews.Params>({
			query: (expertId: string) => ({
				url: `/users/reviews/${expertId}`,
				method: "GET",
			}),
		}),
		getExpertLivestreams: builder.query<
			GetExpertLivestreams.Response,
			GetExpertLivestreams.Params
		>({
			query: (expertId: string) => ({
				url: `/content/created/${expertId}/livestreams`,
				method: "GET",
			}),
			providesTags: (result, err, expertId) => {
				return [{ type: "Livestream", id: `expert-${expertId}` }];
			},
		}),
		// not in use
		// getExpertLivestream: builder.query<
		// 	GetExpertLivestream.Response,
		// 	GetExpertLivestream.Params
		// >({
		// 	query: ({ expertId, livestreamId }) => ({
		// 		url: `/users/content/created/${expertId}/livestreams/${livestreamId}`,
		// 		method: "GET",
		// 	}),
		// 	providesTags: (result, error, arg) => [{ type: "Livestream", id: arg.livestreamId }],
		// }),
		createExpertLivestream: builder.mutation<
			CreateExpertLivestream.Response,
			CreateExpertLivestream.Params
		>({
			query: ({ expertId, ...body }) => ({
				url: "/livestreams/upload",
				method: "POST",
				body,
			}),
			invalidatesTags: (result, err, arg) => {
				return [{ type: "Livestream", id: `expert-${arg.expertId}` }];
			},
		}),
	}),
});

export const {
	useGetExpertsQuery,
	useLazyGetExpertsQuery,
	useGetExpertQuery,
	useGetExpertCoursesQuery,
	useGetExpertCourseQuery,
	useGetExpertReviewsQuery,
	useGetExpertLivestreamsQuery,
	// useGetExpertLivestreamQuery,
	useDeleteExpertCourseMutation,
	useDeleteExpertLivestreamMutation,
	useCreateExpertCourseMutation,
	useCreateExpertLivestreamMutation,
	useUpdateExpertMutation,
	useGetSelfQuery,
} = expertApi;
