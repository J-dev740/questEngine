import { RootState } from "../store";

export const walletAddressSelector = (state: RootState) => state.auth.walletAddress;
// export const roleSelector = (state: RootState) => state.auth.role;
export const accTokenSelector = (state: RootState) => state.auth.accessToken;
// export const cyberConnectTokenSelector = (state: RootState) => state.auth.cyberAccessToken;
export const refTokenSelector = (state: RootState) => state.auth.refreshToken;
