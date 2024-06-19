import { useQuery } from "@apollo/client";
import { useSelector } from "react-redux";
import { walletAddressSelector } from "../../../../features/auth/auth.selectors";
import { IEssenceCard, IPrimaryProfileCard } from "../../../../features/cyber-connect/cyber.types";
import { GET_PROFILE_ESSENCES } from "../../../../features/cyber-connect/graphql/GetProfileEssences";
import NFTCard from "../nft.card";

interface Props {
	primaryProfile: IPrimaryProfileCard;
}

const UserNFTList = ({ primaryProfile }: Props) => {
	const walletAddress = useSelector(walletAddressSelector);
	const { data, loading, error } = useQuery(GET_PROFILE_ESSENCES, {
		variables: {
			wallet: walletAddress,
			first: 10,
			after: null,
		},
	});

	if (loading) return <div>Loading essences</div>;
	if (error) return <div>Error loading essences</div>;
	if (!data) return <div>Something went wrong :(</div>;

	const essences: IEssenceCard[] = data?.address?.wallet?.primaryProfile?.essences?.edges?.map(
		(edge: any) => edge?.node,
	);

	if (essences.length === 0) return <div>Looks like there is nothing to show!</div>;

	return (
		<div className="min-h-80 h-auto max-h-fit">
			<div className="grid grid-cols-1 gap-4 gap-y-5 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
				{essences.map((essence) => (
					<NFTCard
						type={essence.metadata.media![0]?.media_type || "image"}
						collectMw={essence.collectMw}
						primaryProfile={primaryProfile}
						collectedCount={essence.collectedBy.totalCount}
						handle={primaryProfile.handle}
						address={walletAddress}
						img={essence.metadata.image}
						isCollected={essence.isCollectedByMe}
						userImage={
							essence.createdBy.avatar ?? essence.createdBy.metadataInfo.avatar
						}
						name={essence.createdBy.metadataInfo.displayName}
						isSelf
						className="!min-w-[200px] !max-w-[350px]"
					/>
				))}
			</div>
		</div>
	);
};

export default UserNFTList;
