import { gql } from "@apollo/client";

export const GET_CONTENT = gql`
	query getContent($id: String!, $me: AddressEVM!) {
		content(id: $id) {
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
								likedStatus(me: $me) {
									liked
									disliked
								}
							}
						}
					}
				}
			}
			... on Essence {
				essenceID
				tokenURI
				collectedBy {
					totalCount
				}
				metadata {
					content
					image
					image_data
					issue_date
				}
				collectMw {
					contractAddress
					data
					type
				}
				createdBy {
					avatar
					handle
					profileID
					metadataInfo {
						displayName
						bio
						avatar
					}
					isFollowedByMe(me: $me)
					isSubscribedByMe(me: $me)
					subscribeMw {
						type
						contractAddress
						data
					}
				}
				isCollectedByMe(me: $me)
				contentID
				likeCount
				dislikeCount
				commentCount
				likedStatus(me: $me) {
					liked
					disliked
				}
				comments {
					edges {
						node {
							... on Comment {
								authorHandle
								title
								contentID
								body
								createdAt
								likedStatus(me: $me) {
									liked
									disliked
								}
								updatedAt
								likeCount
								dislikeCount
							}
						}
					}
				}
			}
		}
	}
`;
