import api from "../../api";
import { GetCourses, GetGame, GetGameExpert, GetReviews } from "./game.types";

export const gameApi = api.injectEndpoints({
	endpoints: (builder) => ({
		getGame: builder.query<GetGame.Response, string>({
			query: (gameId) => ({
				url: `/games/profile/${gameId}`,
				method: "GET",
			}),
			// issue #18
		}),
		getGameExperts: builder.query<GetGameExpert.Response, string>({
			query: (gameId) => ({
				// url: `/games/data/${gameId}/experts`,
				url: `/data/${gameId}/experts`,

				method: "GET",
			}),
		}),
		getGameCourses: builder.query<GetCourses.Response, string>({
			query: (gameId: string) => ({
				// url: `/games/data/${gameId}`,
				url: `/data/${gameId}/courses`,

				method: "GET",
			}),
			// issue #18
		}),
		getGameReviews: builder.query<GetReviews.Response, string>({
			query: (gameId: string) => ({
				// url: `/games/reviews/${gameId}`,
				url: `/reviews/${gameId}`,

				method: "GET",
			}),
			// issue #18
		}),
	}),
});

export const {
	useGetGameQuery,
	useGetGameExpertsQuery,
	useGetGameReviewsQuery,
	useGetGameCoursesQuery,
} = gameApi;
