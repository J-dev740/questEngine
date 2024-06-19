import { gql } from "@apollo/client";

export const GET_PRIMARY_PROFILE = gql`
	query getPrimaryProfile($address: AddressEVM!, $me: AddressEVM!) {
		address(address: $address) {
			wallet {
				primaryProfile {
					profileID
					handle
					avatar
					metadataInfo {
						avatar
						displayName
						bio
					}
					subscriberCount
					followerCount
					postCount
					essences(appID: "${process.env.NEXT_PUBLIC_APP_ID}") {
						totalCount
					}
					subscribers {
						edges {
							node {
								wallet {
									primaryProfile {
										profileID
										handle
										avatar
										metadataInfo {
											avatar
											displayName
											bio
										}
										isSubscribedByMe(me: $me)
										isFollowedByMe(me: $me)
										subscribeMw {
											type
											contractAddress
											data
										}
									}
								}
							}
						}
					}
					followers {
						totalCount
						edges {
							node {
								address {
									wallet {
										profiles {
											edges {
												node {
													profileID
													handle
													avatar
													metadataInfo {
														avatar
														displayName
														bio
													}
													isSubscribedByMe(me: $me)
													isFollowedByMe(me: $me)
													subscribeMw {
														type
														contractAddress
														data
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
