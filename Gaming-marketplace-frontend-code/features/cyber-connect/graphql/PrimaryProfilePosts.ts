import { gql } from "@apollo/client";

export const PRIMARY_PROFILE_POSTS = gql`
	query PrimaryProfilePosts($address: AddressEVM!) {
		address(address: $address) {
			wallet {
				primaryProfile {
					posts {
						edges {
							node {
								... on Post {
									contentID
									authorHandle
									authorAddress
									title
									body
									createdAt
									dislikeCount
									likeCount
									commentCount
									comments {
										edges {
											node {
												... on Comment {
													contentID
													authorHandle
													title
													body
													createdAt
													dislikeCount
													likeCount
													likedStatus(me: $address) {
														liked
														disliked
													}
												}
											}
										}
									}
								}
								likedStatus(me: $address) {
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
`;
