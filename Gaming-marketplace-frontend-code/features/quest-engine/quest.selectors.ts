import { RootState } from "../store";

export const selectedQuestSelector = (state: RootState) => state.quest.main.selectedQuest;
export const selectedDiscordCodeSelector = (state: RootState) => state.quest.main.discordCode;
export const selectedReferalCodeSelector = (state: RootState) => state.quest.main.referralCode;
export const selectedTelegramCodeSelector = (state: RootState) => state.quest.main.telegramCode;
export const selectedReferalObjectSelector = (state: RootState) => state.quest.main.referalObject;

// export const activeUserSelector = (state: RootState) => state.quest.system.activeUser;
