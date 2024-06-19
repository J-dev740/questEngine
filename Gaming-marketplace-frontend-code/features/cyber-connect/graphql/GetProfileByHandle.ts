import { gql } from "@apollo/client";

export const GET_PROFILE_BY_HANDLE = gql`
	query profileByHandle($handle: String!, $me: AddressEVM!) {
		profileByHandle(handle: $handle) {
			handle
			profileID
			metadataInfo {
				displayName
				avatar
				bio
			}
			owner {
				address
			}
			avatar
			isFollowedByMe(me: $me)
			isSubscribedByMe(me: $me)
			followerCount
			subscriberCount
			subscribeMw {
				contractAddress
				type
				data
			}
		}
	}
`;
