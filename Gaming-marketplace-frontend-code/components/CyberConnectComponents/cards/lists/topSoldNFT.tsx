import { useQuery } from "@apollo/client";
import { IEssenceCard, IPrimaryProfileCard } from "../../../../features/cyber-connect/cyber.types";
import { ESSENCES_BY } from "../../../../features/cyber-connect/graphql/GetEssence";
import TopNFTCard from "../topNft.card";

interface Props {
	primaryProfile: IPrimaryProfileCard | null;
	address: string;
}

const TopSoldNFT = ({ address, primaryProfile }: Props) => {
	// change this to rest api calls
	const { data, loading, error } = useQuery(ESSENCES_BY, {
		variables: {
			me: address,
			appID: process.env.NEXT_PUBLIC_APP_ID,
			first: 5,
			orderBy: {
				direction: "DESC",
			},
		},
	});
	if (loading) return <div>Loading nfts...</div>;
	if (error) return <div>Error loading nfts...</div>;
	if (!data) return <div>There are no nfts to show</div>;

	const essences: IEssenceCard[] = data?.essencesBy?.edges.map((item: any) => item.node);

	return (
		<div className="min-h-80 grid h-auto max-h-fit min-w-[40vw] justify-items-center gap-6 overflow-x-scroll px-5 py-4 xl:grid-cols-1 2xl:min-w-[50vw] 2xl:grid-cols-2">
			{essences.map((nft) => (
				<TopNFTCard
					primaryProfile={primaryProfile}
					address={address}
					img={nft.metadata.image as string}
					type={nft.metadata.media![0]?.media_type || "image"}
					name={nft.createdBy.metadataInfo.displayName}
					handle={nft.createdBy.handle}
					userImage={nft.createdBy.avatar}
					isCollected={nft.isCollectedByMe}
					collectMw={nft.collectMw}
					collectedCount={nft.collectedBy.totalCount}
				/>
			))}
		</div>
	);
};

export default TopSoldNFT;
