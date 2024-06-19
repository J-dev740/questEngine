import { gql } from "@apollo/client";

export const PRIMARY_PROFILE_COLLECTED_ESSENCES = gql`
	query primaryProfilesCollectedEssences($address: AddressEVM!, $appID: String!) {
		address(address: $address) {
			wallet {
				collectedEssences(appId: $appID) {
					edges {
						node {
							essence {
								id
								collectedBy {
									totalCount
								}
								essenceID
								likedStatus(me: $address) {
									liked
									disliked
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
									type
								}
								tokenURI
								metadata {
									content
									metadata_id
									app_id
									image
								}
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
							}
						}
					}
				}
			}
		}
	}
`;
