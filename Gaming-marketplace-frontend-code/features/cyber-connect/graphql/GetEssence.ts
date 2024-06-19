import { gql } from "@apollo/client";

export const ESSENCES_BY = gql`
	query essencesBy($me: AddressEVM!, $orderBy: EssenceOrder!, $first: Int) {
		essencesBy(appID: "${process.env.NEXT_PUBLIC_APP_ID}", orderBy: $orderBy, first: $first) {
			edges {
				node {
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
						media {
							media_type
						}
					}
					collectMw {
						contractAddress
						data
						type
					}
					createdBy {
						owner {
							address
						}
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
				}
			}
		}
	}
`;
