import api from "../api";
import { GetCourses, GetExperts, GetGames } from "./discover.types";

export const discoverApi = api.injectEndpoints({
	endpoints: (builder) => ({
		discoverCourses: builder.query<GetCourses.Response, GetCourses.Params>({
			query: () => ({
				// url: "/users/discover/courses",
				url: "/discover/courses",

				method: "GET",
			}),
		}),
		discoverExperts: builder.query<GetExperts.Response, GetExperts.Params>({
			query: () => ({
				// url: "/users/discover/experts",
				url: "/discover/experts",

				method: "GET",
			}),
		}),
		discoverGames: builder.query<GetGames.Response, GetGames.Params>({
			query: () => ({
				url: "/games/profile",
				method: "GET",
			}),
		}),
		// getLivestreams: builder.query<GetLivestreams.Response, GetLivestreams.Params>({
		// 	query: () => ({
		// 		url: "/users/discover/livestreams",
		// 		method: "GET",
		// 	}),
		// }),
	}),
});

export const { useDiscoverGamesQuery, useDiscoverCoursesQuery, useDiscoverExpertsQuery } =
	discoverApi;
