import api from "../api";
import { BecomeExpert, ConnectWallet, GetAccessToken } from "./auth.types";

export const authApi = api.injectEndpoints({
	endpoints: (builder) => ({
		connectWallet: builder.mutation<ConnectWallet.Response, ConnectWallet.Params>({
			query: ({ ...body }) => ({
				url: "/auth/connect/wallet",
				method: "POST",
				body,
			}),
		}),
		createExpert: builder.mutation<BecomeExpert.Response, BecomeExpert.Params>({
			query: ({ ...body }) => ({
				url: "/auth/connect/signature",
				method: "POST",
				body,
			}),
			invalidatesTags: ["Self"],
		}),
		getAccessToken: builder.mutation<GetAccessToken.Response, GetAccessToken.Params>({
			query: ({ ...body }) => ({
				url: "/auth/connect/refresh",
				method: "POST",
				body,
			}),
		}),
	}),
});

export const { useConnectWalletMutation, useCreateExpertMutation, useGetAccessTokenMutation } =
	authApi;
