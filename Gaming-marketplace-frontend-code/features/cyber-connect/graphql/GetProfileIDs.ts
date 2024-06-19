import { gql } from "@apollo/client";

export const GET_PROFILE_IDS = gql`
	query getProfiles($wallet: AddressEVM!) {
		address(address: $wallet) {
			wallet {
				profiles {
					edges {
						node {
							handle
							profileID
							metadataInfo {
								avatar
								bio
								displayName
							}
						}
					}
				}
			}
		}
	}
`;
