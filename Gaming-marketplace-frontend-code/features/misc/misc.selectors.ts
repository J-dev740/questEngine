import { RootState } from "../store";

export const getCurrenciesSelector = (state: RootState) => state.misc.currencies;
export const getGamesSelector = (state: RootState) => state.misc.games;
export const getLanguagesSelector = (state: RootState) => state.misc.languages;
