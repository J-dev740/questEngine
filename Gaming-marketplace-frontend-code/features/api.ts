import { BaseQueryFn, createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import axios, { AxiosError, AxiosRequestConfig, Method } from "axios";
import { RootState } from "./store";

type QueryProps = {
	url: string;
	method: Method;
	headers?: AxiosRequestConfig["headers"];
	data?: AxiosRequestConfig["data"];
	params?: AxiosRequestConfig["params"];
};

type QueryFn = BaseQueryFn<QueryProps, unknown, unknown>;

const axiosBaseQuery = ({ baseUrl }: { baseUrl: string } = { baseUrl: "" }): QueryFn => {
	const x = async ({ url, method, headers, data, params }: QueryProps) => {
		try {
			const result = await axios({
				url: baseUrl + url,
				headers,
				method,
				data,
				params,
			});
			return { data: result.data };
		} catch (axiosError) {
			const err = axiosError as AxiosError;
			return {
				error: {
					status: err.response?.status,
					data: err.response?.data || err.message,
				},
			};
		}
	};
	return x;
};
const baseQuery = fetchBaseQuery({
	baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL,
	prepareHeaders: (headers, { getState }) => {
		const token = (getState() as RootState).auth.accessToken;
		headers.set("ngrok-skip-browser-warning", "abcd");
		if (token) {
			headers.set("Authorization", `Bearer ${token}`);
		}
		return headers;
	},
});

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 2 });
const axiosBaseQueryWithRetry = retry(axiosBaseQuery(), { maxRetries: 2 });

const api = createApi({
	reducerPath: "api",
	baseQuery: baseQueryWithRetry,
	tagTypes: [
		"Expert",
		"Course",
		"Livestream",
		"Game",
		"Review",
		"Self",
		"Quests",
		"ParticipatedQuests",
		"CompletedQuests",
	],
	endpoints: () => ({}),
});

export default api;
