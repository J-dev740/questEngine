import { gql } from "@apollo/client";

export const GET_PROFILES_FROM_HANDLES = gql`
	query profileHandleData($handles: [String!]!, $me: AddressEVM!) {
		profilesByHandles(handles: $handles) {
			handle
			avatar
			metadataInfo {
				avatar
				displayName
				bio
			}
			profileID
			followerCount
			subscriberCount
			postCount
			essences {
				totalCount
			}
			isSubscribedByMe(me: $me)
			isFollowedByMe(me: $me)
			subscribeMw {
				type
				contractAddress
				data
			}
			owner {
				address
			}
		}
	}
`;
