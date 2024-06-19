import { useQuery } from "@apollo/client";
import { isPast } from "date-fns";
import { IEssenceCard, IPrimaryProfileCard } from "../../../../features/cyber-connect/cyber.types";
import { ESSENCES_BY } from "../../../../features/cyber-connect/graphql/GetEssence";
import NFTCard from "../nft.card";

interface Props {
	primaryProfile: IPrimaryProfileCard | null;
	address: string;
}

const LimitedEditionNFT = ({ address, primaryProfile }: Props) => {
	const { data, loading, error } = useQuery(ESSENCES_BY, {
		variables: {
			me: address,
			first: null,
			orderBy: {
				direction: "DESC",
			},
		},
	});
	if (loading) return <div>Loading nfts...</div>;
	if (error) return <div>Error loading nfts...</div>;
	if (!data) return <div>There are no nfts to show</div>;

	const essences: IEssenceCard[] = data?.essencesBy?.edges
		.map((item: any) => item.node)
		.filter((essence: IEssenceCard) => {
			if (essence.collectMw.type !== "COLLECT_LIMITED_TIME_PAID") return false;
			if (isPast(JSON.parse(essence.collectMw.data).EndTimestamp)) return false;
			return true;
		});

	if (essences.length === 0) return <div>Looks like there are no essences!</div>;

	return (
		<div className="min-h-80 flex h-auto max-h-fit w-full gap-8 overflow-x-scroll py-4 pl-5">
			{essences.map((nft) => (
				<NFTCard
					primaryProfile={primaryProfile}
					address={address}
					img={nft.metadata.image as string}
					name={nft.createdBy.metadataInfo.displayName}
					handle={nft.createdBy.handle}
					userImage={nft.createdBy.avatar}
					isCollected={nft.isCollectedByMe}
					collectMw={nft.collectMw}
					collectedCount={nft.collectedBy.totalCount}
					isSelf={nft.createdBy.owner.address === address}
					type={nft.metadata.media![0]?.media_type || "image"}
				/>
			))}
		</div>
	);
};

export default LimitedEditionNFT;
