import api from "../../api";
import {
	CreateCourseReview,
	DeleteCourse,
	GetCourse,
	GetCourseReviews,
	GetCourses,
	UpdatePayOptions,
} from "./course.types";

export const courseApi = api.injectEndpoints({
	endpoints: (builder) => ({
		getCourses: builder.query<GetCourses.Response, void>({
			query: () => ({
				url: "/courses/data/",
				method: "GET",
			}),
		}),
		getCourseById: builder.query<GetCourse.Response, string>({
			query: (courseId: string) => ({
				url: `/courses/data/${courseId}`,
				method: "GET",
			}),
			providesTags: (result, error, arg) => [{ type: "Course", id: arg }],
		}),
		// getCoursePreviewById: builder.query<GetCourse.Response, string>({
		// 	query: (courseId: string) => ({
		// 		url: `/courses/data/${courseId}/preview`,
		// 		method: "GET",
		// 	}),
		// 	providesTags: (result, error, arg) => [{ type: "Course", id: arg }],
		// }),
		getCourseReviews: builder.query<GetCourseReviews.Response, string>({
			query: (courseId: string) => ({
				url: `/courses/reviews/${courseId}`,
				method: "GET",
			}),
			providesTags: (result, error, arg) => [{ type: "Review", id: "list" }],
		}),
		createCourseReview: builder.mutation<CreateCourseReview.Response, CreateCourseReview.Param>(
			{
				query: ({ courseId, ...body }) => ({
					url: `/courses/reviews/${courseId}`,
					method: "POST",
					body,
				}),
			},
		),
		deleteCourse: builder.mutation<DeleteCourse.Response, string>({
			query: (courseId: string) => ({
				url: `/courses/${courseId}`,
				method: "DELETE",
			}),
		}),
		updatePayOptions: builder.mutation<UpdatePayOptions.Response, UpdatePayOptions.Params>({
			query: ({ courseId, _expertId, ...body }) => ({
				url: `/courses/payment/${courseId}`,
				method: "PUT",
				body,
			}),
			invalidatesTags: (result, error, arg) => [
				{ type: "Course", id: arg.courseId },
				{ type: "Course", id: `expert-${arg._expertId}` },
			],
		}),
	}),
});
export const {
	useGetCoursesQuery,
	useGetCourseByIdQuery,
	// getCoursePreviewById,
	useGetCourseReviewsQuery,
	useCreateCourseReviewMutation,
	useDeleteCourseMutation,
	useUpdatePayOptionsMutation,
} = courseApi;
