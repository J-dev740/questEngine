import { gql } from "@apollo/client";

export const GET_PROFILE_ESSENCES = gql`
	query getProfileEssences($wallet: AddressEVM!, $first: Int!, $after: Cursor) {
		address(address: $wallet) {
		wallet {
			primaryProfile {
				essences(appID: "${process.env.NEXT_PUBLIC_APP_ID}", first: $first, after: $after) {
					totalCount
					pageInfo {
						endCursor
					}
					edges {
						node {
							name
							essenceID
							contentID
							likeCount
							dislikeCount
							commentCount
							likedStatus(me: $wallet) {
								liked
								disliked
							}
							collectedBy {
								totalCount
							}
							createdBy {
								avatar
								metadataInfo {
									displayName
									bio
									avatar
								}
								profileID
								handle
							  }
							tokenURI
							isCollectedByMe(me: $wallet)
							collectMw {
								contractAddress
								type
								data
							  }
							metadata {
								content
								image
							}
						}
					}
				}
			}
		}
	}
}
`;
