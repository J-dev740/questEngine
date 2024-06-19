import { useQuery } from "@apollo/client";
import Head from "next/head";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAccount } from "wagmi";
import { GradientBtn } from "../../components/CyberConnectComponents/buttons";
// import LatestNFTs from "../../components/CyberConnectComponents/cards/lists/nft.latest"; //30 october
import LimitedEditionNFT from "../../components/CyberConnectComponents/cards/lists/nft.limitedEdition";
import TopNFTArtists from "../../components/CyberConnectComponents/cards/lists/topNFTArtists";
import TopSoldNFT from "../../components/CyberConnectComponents/cards/lists/topSoldNFT";
import CreateProverseEssence from "../../components/CyberConnectComponents/createProverseEssence";
import LatestActivity from "../../components/CyberConnectComponents/latestActivity";
import MintProfile from "../../components/CyberConnectComponents/mintProfile";
import SuggestedUsers from "../../components/CyberConnectComponents/suggestedUsers";
import { IPrimaryProfileCard } from "../../features/cyber-connect/cyber.types";
import { GET_PRIMARY_PROFILE } from "../../features/cyber-connect/graphql/PrimaryProfile";

const Proverse = () => {
	const { address } = useAccount();

	const [_skipProfile, _setSkipProfile] = useState(true);
	const {
		data: profile,
		loading,
		error,
	} = useQuery(GET_PRIMARY_PROFILE, {
		variables: { address, me: address },
		skip: _skipProfile,
	});

	useEffect(() => {
		if (!_skipProfile) return;
		if (address) {
			_setSkipProfile(false);
		}
	}, [address, _skipProfile]);

	if (loading || !address) return toast.loading("Loading profile", { id: "load-profile" });
	else toast.dismiss("load-profile");

	if (error) return toast.error("Error loading profile");

	if (!profile) return toast("Invalid profile");

	const primaryProfile: IPrimaryProfileCard | null = profile.address.wallet.primaryProfile;

	return (
		<>
			<Head>
				<title>Proverse</title>
			</Head>
			<div className="flex overflow-x-hidden overflow-y-scroll">
				<div className="mt-[100px] min-h-screen w-full space-y-10 px-10">
					{!primaryProfile?.handle && <MintProfile />}
					{primaryProfile?.handle && (
						<CreateProverseEssence primaryProfile={primaryProfile} />
					)}
					<section>
						<div className="flex flex-row items-center justify-between font-poppins font-bold">
							<span className="text-text4xl font-semibold ">Top NFT Artists</span>
						</div>
						<TopNFTArtists />
					</section>
					<section>
						<div className="flex items-center justify-between font-poppins">
							<span className=" text-text4xl font-semibold">
								Limited Edition NFTs
							</span>
						</div>
						<LimitedEditionNFT
							primaryProfile={primaryProfile}
							address={address as string}
						/>
					</section>
					<section>
						<div className="flex items-center justify-between font-poppins">
							<span className=" text-text4xl font-semibold">Latest NFTs</span>
						</div>
						{/* <LatestNFTs primaryProfile={primaryProfile} address={address as string} /> */}
					</section>
					<section className="my-2 mt-10 flex">
						<div className="w-fit">
							<div className="flex items-center justify-between px-4 font-poppins">
								<span className=" text-text4xl font-semibold">Top NFTs sold</span>
								<span className="text-textMedium2 text-gray-400">
									<GradientBtn title="Explore" />
								</span>
							</div>
							<TopSoldNFT primaryProfile={primaryProfile} address={address} />
						</div>
						<div className="flex-grow px-1">
							<SuggestedUsers />
							<LatestActivity />
						</div>
					</section>
				</div>
			</div>
		</>
	);
};

export default Proverse;
