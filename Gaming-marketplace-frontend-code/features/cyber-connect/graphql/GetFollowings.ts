import { gql } from "@apollo/client";

export const GET_FOLLOWING = gql`
	query getFollowings($address: AddressEVM!) {
		address(address: $address) {
			followingCount
			followings {
				edges {
					node {
						profile {
							profileID
							handle
							avatar
							isFollowedByMe(me: $address)
							isSubscribedByMe(me: $address)
							metadataInfo {
								displayName
								bio
								avatar
							}
						}
					}
				}
			}
		}
	}
`;
