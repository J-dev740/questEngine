import { gql } from "@apollo/client";

export const GET_POSTS_BY_PROFILE_IDS = gql`
	query postsByProfileID($ids: [ProfileID!]!, $first: Int, $after: Cursor, $me: AddressEVM!) {
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
			posts(first: $first, after: $after) {
				pageInfo {
					hasNextPage
					hasPreviousPage
					startCursor
					endCursor
				}
				totalCount
				edges {
					node {
						... on Post {
							title
							contentID
							likedStatus(me: $me) {
								liked
								disliked
							}
							body
							authorHandle
							likeCount
							dislikeCount
							commentCount
							createdAt
							comments {
								edges {
									node {
										... on Comment {
											contentID
											title
											body
											likeCount
											dislikeCount
											authorHandle
											authorAddress
											likedStatus(me: $me) {
												liked
												disliked
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
`;
