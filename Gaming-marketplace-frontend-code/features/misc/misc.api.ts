import api from "../api";
import { CreateFeedback, GetCurrencies, GetGames, GetLanguages } from "./misc.types";

export const miscApi = api.injectEndpoints({
	endpoints: (builder) => ({
		getGames: builder.query<GetGames.Response, void>({
			query: () => ({
				url: "/misc/games",
				method: "GET",
			}),
		}),
		getLanguages: builder.query<GetLanguages.Response, void>({
			query: () => ({
				url: "/misc/languages",
				method: "GET",
			}),
		}),
		getCurrency: builder.query<GetCurrencies.Response, void>({
			query: () => ({
				url: "/misc/currency",
				method: "GET",
			}),
		}),
		createFeedback: builder.mutation<void, CreateFeedback.Params>({
			query: ({ ...body }) => ({
				url: "/misc/feedback",
				method: "POST",
				body,
			}),
		}),
	}),
});

export const {
	useGetGamesQuery,
	useGetCurrencyQuery,
	useGetLanguagesQuery,
	useCreateFeedbackMutation,
} = miscApi;
