import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { questApi } from "./quest.api";
import { GetAllQuests, GetReferralCode, GetUserData, IQuest } from "./quest.types";

export const initialState: IQuest = {
	main: {
		selectedQuest: "",
		quests: [],
		referralCode: "",
		discordCode: "",
		telegramCode: "",
		referalObject: null,
	},
	system: {
		referCode: "",
	},
};

const questSlice = createSlice({
	name: "quest",
	initialState,
	reducers: {
		selectQuest: (state, action: PayloadAction<string>) => {
			state.main.selectedQuest = action.payload;
			return state;
		},
		setDiscordCode: (state, action: PayloadAction<string>) => {
			state.main.discordCode = action.payload;
			return state;
		},
		setTelegramCode: (state, action: PayloadAction<string>) => {
			state.main.telegramCode = action.payload;
			return state;
		},
		setReferalObject: (state, action: PayloadAction<any>) => {
			state.main.referalObject = action.payload;
			return state;
		},
		setReferalCode: (state, action: PayloadAction<string>) => {
			state.main.referralCode = action.payload;
			return state;
		},
		resetState: (state) => {
			return initialState;
		},
	},
	extraReducers: (builder) => {
		builder.addMatcher(
			questApi.endpoints.getAllQuests.matchFulfilled,
			(state, action: PayloadAction<GetAllQuests.Response>) => {
				// is this correct ?
				const temp = JSON.parse(JSON.stringify(state.main.quests));
				const filter = temp.filter((obj: any) => {
					const set2 = temp.filter((cur: any) => cur._id !== obj._id);
					return set2;
				});

				console.log("temp", filter);
				state.main.quests = [...filter, ...action.payload];
			},
		);
		builder.addMatcher(
			questApi.endpoints.getUserData.matchFulfilled,
			(state, action: PayloadAction<GetUserData.Response>) => {
				// is this correct ?
				// state.system.activeUser = action.payload;
			},
		);
		builder.addMatcher(
			questApi.endpoints.updateTaskStatus.matchFulfilled,
			(state, action: PayloadAction<GetUserData.Response>) => {
				// is this correct ?
				// const participatedQuests = state.system.activeUser?.participated_quests; // change this
				const newParticipatedQuests: any[] = []; // need types for this

				// participatedQuests?.forEach((obj: any) => {
				// 	// need types for this
				// 	if (obj._id === action.payload._id) {
				// 		newParticipatedQuests.push(action.payload);
				// 	} else {
				// 		newParticipatedQuests.push(obj);
				// 	}
				// });

				// state.system.activeUser!.participated_quests = newParticipatedQuests;
			},
		);
		builder.addMatcher(
			questApi.endpoints.getReferralCode.matchFulfilled,
			(state, action: PayloadAction<GetReferralCode.Response>) => {
				state.main.referralCode = action.payload;
			},
		);
	},
});

export const questReducer = questSlice.reducer;
export const questActions = questSlice.actions;
