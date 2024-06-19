import { gql } from "@apollo/client";

export const GET_PROFILES_DATA = gql`
	query profileIDData($ids: [ProfileID!]!, $first: Int, $after: Cursor, $me: AddressEVM!) {
		profilesByIDs(profileIDs: $ids) {
			handle
			avatar
			owner {
				address
			}
			profileID
			subscribeMw {
				type
				data
				contractAddress
			}
			followerCount
			subscriberCount
			isFollowedByMe(me: $me)
			isSubscribedByMe(me: $me)
			metadataInfo {
				avatar
				displayName
			}
		}
	}
`;
