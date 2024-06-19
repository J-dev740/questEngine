import { UserRoles } from "../types";

export interface IAuth {
	role: UserRoles;
	walletAddress: string;
	accessToken: string | null;
	refreshToken: string | null;
	// cyberAccessToken: string | null;
}

export namespace ConnectWallet {
	export interface Params {
		walletAddress: string;
		role: UserRoles;
	}
	export type Response = { accessToken: string; refreshToken: string };
}

export namespace BecomeExpert {
	export interface Params {
		role: UserRoles;
		username: string;
		walletAddress: string;
		signature: string;
		language: string;
		game: string;
		about: string;
		icon: string;
		streamKey: string;
		streamId: string;
	}

	export type Response = { accessToken: string; refreshToken: string };
}

export namespace GetAccessToken {
	export interface Params {
		role: UserRoles;
		walletAddress: string;
		refreshToken: string;
		signature: string;
	}
	export type Response = { accessToken: string };
}
