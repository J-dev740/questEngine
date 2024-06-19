import { useQuery } from "@apollo/client";
import Head from "next/head";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useAccount } from "wagmi";
import PostCardList from "../../components/CyberConnectComponents/cards/lists/postCard.list";
import PostInput from "../../components/CyberConnectComponents/cards/post.input.card";
import LatestActivity from "../../components/CyberConnectComponents/latestActivity";
import MintProfile from "../../components/CyberConnectComponents/mintProfile";
import SuggestedUsers from "../../components/CyberConnectComponents/suggestedUsers";
import { IPrimaryProfileCard } from "../../features/cyber-connect/cyber.types";
import { GET_PRIMARY_PROFILE } from "../../features/cyber-connect/graphql/PrimaryProfile";

const Home = () => {
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

	if (error && address) return toast.error("Error loading profile");

	if (!profile) return toast("Invalid profile");

	const primaryProfile: IPrimaryProfileCard | null = profile.address.wallet.primaryProfile;

	return (
		<>
			<Head>
				<title>Social</title>
			</Head>
			<div className="flex overflow-x-hidden font-poppins">
				<div className="h-full w-full px-5 pt-[100px]">
					{!primaryProfile && <MintProfile />}
					<section className="my-2 flex ">
						<div className="w-9/12 px-3">
							{primaryProfile && <PostInput primaryProfile={primaryProfile} />}
							<PostCardList address={address} primaryProfile={primaryProfile} />
						</div>
						<div className="w-3/12 px-3">
							<input
								type="text"
								placeholder="Search handle"
								className="h-12 w-full rounded-lg bg-[#151515] px-4 text-textSmall placeholder-white"
							/>
							<SuggestedUsers />
							<LatestActivity />
						</div>
					</section>
				</div>
			</div>
		</>
	);
};

export default Home;
