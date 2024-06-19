import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authApi } from "./auth.api";
import { IAuth } from "./auth.types";

const initialState: IAuth = {
	walletAddress: "",
	accessToken: null,
	refreshToken: null,
	role: "new",
	// cyberAccessToken: null,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setExpert: (state) => {
			state.role = "expert";
		},
		disconnectWallet: (state) => {
			state.accessToken = initialState.accessToken;
			state.refreshToken = initialState.refreshToken;
			state.role = initialState.role;
			state.walletAddress = initialState.walletAddress;
		},
		// setCyberToken: (state, action: PayloadAction<string>) => {
		// 	state.cyberAccessToken = action.payload;
		// },
	},
	extraReducers: (builder) => {
		builder.addMatcher(authApi.endpoints.connectWallet.matchFulfilled, (state, action) => {
			state.accessToken = action.payload.accessToken;
			state.walletAddress = action.meta.arg.originalArgs.walletAddress;
			state.role = "member";
			if (!action.payload.refreshToken) return;
			state.refreshToken = action.payload.refreshToken;
		});
		builder.addMatcher(authApi.endpoints.createExpert.matchFulfilled, (state, action) => {
			state.accessToken = action.payload.accessToken;
			state.refreshToken = action.payload.refreshToken;
			state.walletAddress = action.meta.arg.originalArgs.walletAddress;
			state.role = "expert";
		});
		builder.addMatcher(authApi.endpoints.getAccessToken.matchFulfilled, (state, action) => {
			state.accessToken = action.payload.accessToken;
			state.walletAddress = action.meta.arg.originalArgs.walletAddress;
			state.role = "expert";
		});
	},
});

export const authReducer = authSlice.reducer;
export const authActions = authSlice.actions;
