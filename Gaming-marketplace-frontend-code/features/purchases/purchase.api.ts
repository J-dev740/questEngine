import api from "../api";
import { EnrollUser, GetPurchasedCourses, MakePayment } from "./purchase.types";

export const purchaseApi = api.injectEndpoints({
	endpoints: (builder) => ({
		getPurchasedCourses: builder.query<GetPurchasedCourses.Response, string>({
			query: (walletAddress: string) => ({
				// url: `/users/content/purchased/courses`,
				url: "/content/purchased/courses",
				method: "GET",
				params: { walletAddress },
			}),
			providesTags: ["Self"],
		}),
		makeCoursePayment: builder.mutation<void, MakePayment.Param>({
			query: ({ ...body }) => ({
				url: "/payment/course",
				method: "POST",
				body,
			}),

			invalidatesTags: ["Self"],
		}),
		enrollUser: builder.mutation<boolean, EnrollUser.Param>({
			query: ({ id, walletAddress }) => ({
				url: `/courses/update/${id}`,
				method: "PATCH",
				params: { walletAddress },
			}),

			invalidatesTags: ["Self"],
		}),
	}),
});

export const { useGetPurchasedCoursesQuery, useMakeCoursePaymentMutation, useEnrollUserMutation } =
	purchaseApi;
