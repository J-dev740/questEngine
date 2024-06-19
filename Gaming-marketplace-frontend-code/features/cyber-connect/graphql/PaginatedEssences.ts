import { gql } from "@apollo/client";
//CyberConnect query to get paginated essences from the graph

// export const PAGINATED_ESSENCES = gql`
// 	query getPaginatedEssences(
// 		$appID: String!
// 		$me: AddressEVM!
// 		$orderBy: EssenceOrder!
// 		$first: Int
// 		$after: Cursor
// 	) {
// 		essencesBy(appID: $appID, orderBy: $orderBy, first: $first, after: $after) {
// 			pageInfo {
// 				endCursor
// 				startCursor
// 			}
// 			edges {
// 				node {
// 					essenceID
// 					tokenURI
// 					collectedBy {
// 						totalCount
// 					}
// 					metadata {
// 						content
// 						image
// 						image_data
// 						media {
// 							media_type
// 						}
// 						issue_date
// 					}
// 					collectMw {
// 						contractAddress
// 						data
// 						type
// 					}
// 					createdBy {
// 						avatar
// 						handle
// 						profileID
// 						owner {
// 							address
// 						}
// 						metadataInfo {
// 							displayName
// 							bio
// 							avatar
// 						}
// 						isFollowedByMe(me: $me)
// 						isSubscribedByMe(me: $me)

// 						subscribeMw {
// 							type
// 							contractAddress
// 							data
// 						}
// 					}
// 					isCollectedByMe(me: $me)
// 					contentID
// 					likeCount
// 					dislikeCount
// 					commentCount
// 					likedStatus(me: $me) {
// 						liked
// 						disliked
// 					}
// 					comments {
// 						edges {
// 							node {
// 								... on Comment {
// 									authorHandle
// 									title
// 									contentID
// 									body
// 									createdAt
// 									likedStatus(me: $me) {
// 										liked
// 										disliked
// 									}
// 									updatedAt
// 									likeCount
// 									dislikeCount
// 								}
// 							}
// 						}
// 					}
// 				}
// 			}
// 		}
// 	}
// `;
