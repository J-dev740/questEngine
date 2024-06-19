import { gql } from "@apollo/client";

export const PRIMARY_PROFILE_ESSENCES = gql`
	query primaryProfilesEssences($address: AddressEVM!, $appID: String!, $me: AddressEVM!) {
		address(address: $address) {
			wallet {
				primaryProfile {
					essences(appID: $appID) {
						edges {
							node {
								essenceID
								id
								likedStatus(me: $address) {
									liked
									disliked
								}
								collectedBy {
									totalCount
								}
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
								collectMw {
									contractAddress
									data
									type
								}
								isCollectedByMe(me: $me)
								createdBy {
									profileID
									handle
									avatar
									metadataInfo {
										displayName
										bio
										avatar
									}
								}
								tokenURI
								metadata {
									content
									metadata_id
									app_id
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
