import { useLazyQuery } from "@apollo/client";
import { useCallback, useEffect, useRef, useState } from "react";
import { InView } from "react-intersection-observer";
import { IEssenceCard, IPrimaryProfileCard } from "../../../../features/cyber-connect/cyber.types"; //can be used for nft card
// import { PAGINATED_ESSENCES } from "../../../../features/cyber-connect/graphql/PaginatedEssences";
import NFTCard from "../nft.card";

interface Props {
	primaryProfile: IPrimaryProfileCard | null;
	address: string;
}
//gql for a list of latest nfts created by the user

// const LatestNFTs = ({ address, primaryProfile }: Props) => {
// 	const [getData, { loading, error }] = useLazyQuery(PAGINATED_ESSENCES);

// 	const pageLength = 5;
// 	const [pageCursor, setPageCursor] = useState<string | null>(null);

// 	const [essenceList, setEssenceList] = useState<IEssenceCard[]>([]);

// 	useEffect(() => {
// 		if (loading) return;
// 		fetchMore();
// 	}, []);

// 	const fetchMore = () => {
// 		getData({
// 			variables: {
// 				me: address,
// 				appID: process.env.NEXT_PUBLIC_APP_ID,
// 				first: pageLength,
// 				after: pageCursor,
// 				orderBy: {
// 					direction: "DESC",
// 				},
// 			},
// 		}).then((res) => {
// 			if (res.data) {
// 				setEssenceList([
// 					...essenceList,
// 					...res.data.essencesBy.edges
// 						.map((item: any) => item.node)
// 						.filter(
// 							(essence: IEssenceCard) =>
// 								essence.collectMw.type !== "COLLECT_LIMITED_TIME_PAID",
// 						),
// 				]);
// 				setPageCursor(res.data.essencesBy.pageInfo.endCursor);
// 			}
// 		});
// 	};

// 	if (error) return <div>Error loading nfts...</div>;

// 	return (
// 		<div
// 			className="min-h-80 flex h-auto max-h-fit w-full gap-8 overflow-x-scroll py-4 pl-5"
// 			id="latest-essence-list"
// 		>
// 			{essenceList.map((nft, index) => {
// 				return (
// 					<>
// 						{index === essenceList.length - 2 && (
// 							<InView
// 								onChange={async (inView) => {
// 									if (inView) {
// 										fetchMore();
// 									}
// 								}}
// 							/>
// 						)}
// 						<NFTCard
// 							primaryProfile={primaryProfile}
// 							address={address}
// 							img={nft.metadata.image as string}
// 							type={nft.metadata.media![0]?.media_type || "image"}
// 							name={nft.createdBy.metadataInfo.displayName}
// 							handle={nft.createdBy.handle}
// 							userImage={nft.createdBy.avatar}
// 							isCollected={nft.isCollectedByMe}
// 							collectMw={nft.collectMw}
// 							collectedCount={nft.collectedBy.totalCount}
// 							isSelf={nft.createdBy.owner.address === address}
// 						/>
// 					</>
// 				);
// 			})}
// 		</div>
// 	);
// };

// export default LatestNFTs;
