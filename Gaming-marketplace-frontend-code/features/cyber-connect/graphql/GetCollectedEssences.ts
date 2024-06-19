import { gql } from "@apollo/client";

export const GET_COLLECTED_ESSENCES = gql`
	query getCollectedEssences($wallet: AddressEVM!, $first: Int!, $after: Cursor) {
		address(address: $wallet) {
		wallet {
			collectedEssences(appId: "${process.env.NEXT_PUBLIC_APP_ID}", orderBy: {direction: DESC}, first: $first, after: $after) {
				totalCount
				edges {
					node {
						essence {
						createdBy {
							avatar
							owner {
								address
							}
							metadataInfo {
								displayName
								bio
								avatar
							}
							profileID
							handle
						}
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
