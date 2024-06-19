import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { FLUSH, PAUSE, PERSIST, persistReducer, PURGE, REGISTER, REHYDRATE } from "redux-persist";
import storage from "redux-persist/lib/storage";
import api from "./api";
import { authApi } from "./auth/auth.api";
import { authReducer } from "./auth/auth.slice";
// import { cyberReducer } from "./cyber-connect/cyber.slice";
import { discoverApi } from "./discover-page/discover.api";
import { miscApi } from "./misc/misc.api";
import { miscReducer } from "./misc/misc.slice";
import { courseApi } from "./profile-page/course/courses.api";
import { expertApi } from "./profile-page/expert/expert.api";
import { gameApi } from "./profile-page/games/game.api";
import { livestreamApi } from "./profile-page/livestream/livestream.api";
import { profileReducer } from "./profile-page/profile.slice";
import { questApi } from "./quest-engine/quest.api";
import { questReducer } from "./quest-engine/quest.slice";

const persistConfig = {
	key: "root",
	version: 1,
	storage,
	blacklist: [
		authApi.reducerPath,
		discoverApi.reducerPath,
		miscApi.reducerPath,
		courseApi.reducerPath,
		expertApi.reducerPath,
		gameApi.reducerPath,
		livestreamApi.reducerPath,
		questApi.reducerPath,
	],
};

const reducer = combineReducers({
	[api.reducerPath]: api.reducer,
	auth: authReducer,
	misc: miscReducer,
	quest: questReducer,
	profile: profileReducer,
	// cyber: cyberReducer,
});
const persisted = persistReducer(persistConfig, reducer);

const store = configureStore({
	devTools: true,
	reducer: persisted,
	middleware: (gDM) =>
		gDM({
			serializableCheck: {
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
				ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}).concat(api.middleware),
});

setupListeners(store.dispatch);

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type RootDispatch = typeof store.dispatch;
