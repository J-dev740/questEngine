import { gql } from "@apollo/client";

export const GET_PROFILE_POSTS = gql`
	query getProfilePosts($wallet: AddressEVM!, $first: Int!, $after: Cursor) {
		address(address: $wallet) {
			wallet {
				primaryProfile {
					profileID
					postCount
					posts(first: $first, after: $after) {
						totalCount
						pageInfo {
							endCursor
						}
						edges {
							node {
								... on Post {
									body
									title
									authorAddress
									authorHandle
									contentID
									createdAt
									likeCount
									dislikeCount
									commentCount
									likedStatus(me: $wallet) {
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
													updatedAt
													likeCount
													dislikeCount
													likedStatus(me: $wallet) {
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
		}
	}
`;
