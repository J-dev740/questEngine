import { createSlice } from "@reduxjs/toolkit";
import { expertApi } from "./expert/expert.api";
import { IProfile } from "./profile.types";

const initialState: IProfile = {
	role: "new",
	activeUser: null,
};

const profileSlice = createSlice({
	name: "profile",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addMatcher(expertApi.endpoints.getSelf.matchFulfilled, (state, action) => {
			state.role = action.payload.role[0];
			state.activeUser = action.payload;
		});
	},
});

export const profileReducer = profileSlice.reducer;
export const profileActions = profileSlice.actions;
