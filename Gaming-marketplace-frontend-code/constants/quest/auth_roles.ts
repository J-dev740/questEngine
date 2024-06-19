type AuthPayload = {
	// signature: string;
	wallet_id: string;
};

export type TRequestWithAuth = Request & AuthPayload;
