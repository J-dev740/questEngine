import { createSlice } from "@reduxjs/toolkit";
import { CurrencyInfo, GameInfo, LanguageInfo } from "../types";
import { miscApi } from "./misc.api";

interface IMisc {
	languages: Array<LanguageInfo> | null;
	currencies: Array<CurrencyInfo> | null;
	games: Array<GameInfo> | null;
}

const initialState: IMisc = {
	languages: null,
	currencies: null,
	games: null,
};

const miscSlice = createSlice({
	name: "misc",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addMatcher(miscApi.endpoints.getCurrency.matchFulfilled, (state, action) => {
			state.currencies = action.payload;
		});
		builder.addMatcher(miscApi.endpoints.getGames.matchFulfilled, (state, action) => {
			state.games = action.payload;
		});
		builder.addMatcher(miscApi.endpoints.getLanguages.matchFulfilled, (state, action) => {
			state.languages = action.payload;
		});
	},
});

export const miscReducer = miscSlice.reducer;
export const miscActions = miscSlice.actions;
