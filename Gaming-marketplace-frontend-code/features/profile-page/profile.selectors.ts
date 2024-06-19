import { RootState } from "../store";

export const roleSelector = (state: RootState) => state.profile.role;

export const activeUserSelector = (state: RootState) => state.profile.activeUser;
