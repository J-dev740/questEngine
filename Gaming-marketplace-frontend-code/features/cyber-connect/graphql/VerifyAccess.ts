import { gql } from "@apollo/client";

export const VERIFY_ACCESS_TOKEN = gql`
	query verifyAccessToken($input: VerifyAccessTokenInput!) {
		verifyAccessToken(input: $input) {
			isValid
		}
	}
`;
