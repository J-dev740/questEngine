import { useQuery } from "@apollo/client";
import Head from "next/head";
import { BiImages } from "react-icons/bi";
import { IoIosImages } from "react-icons/io";
import { useSelector } from "react-redux";
import UserCollectedNFTList from "../../components/CyberConnectComponents/cards/lists/userCollectedNFT.list";
import UserNFTList from "../../components/CyberConnectComponents/cards/lists/userNFT.list";
import TabGroupNew from "../../components/util/tabGroupNew";
import { walletAddressSelector } from "../../features/auth/auth.selectors";
import { IPrimaryProfileCard } from "../../features/cyber-connect/cyber.types";
import { GET_PRIMARY_PROFILE } from "../../features/cyber-connect/graphql/PrimaryProfile";

const ProfileAssets = () => {
	const walletAddress = useSelector(walletAddressSelector);

	const {
		data: selfProfile,
		loading: loadingProfile,
		error: errorProfile,
	} = useQuery(GET_PRIMARY_PROFILE, {
		variables: { address: walletAddress, me: walletAddress },
	});

	if (loadingProfile) return <div>Loading profile</div>;
	if (errorProfile) return <div>Error loading profile</div>;

	if (!selfProfile) return <div>Something went wrong :(</div>;

	const primaryProfile: IPrimaryProfileCard = selfProfile.address.wallet.primaryProfile;

	return (
		<div>
			<Head>
				<title>Profile - Assets</title>
			</Head>
			<div className="h-screen overflow-y-scroll pl-6 pt-[15vh]">
				<h1 className="mt ml-3 text-text4xl font-bold">Assets</h1>
				<div className="page-game relative overflow-y-scroll">
					<TabGroupNew
						className=""
						Tab1Title={
							<div className="flex items-center justify-center gap-1 text-white">
								<IoIosImages color="white" /> My Assets
							</div>
						}
						Tab2Title={
							<div className="flex items-center justify-center gap-1 text-white">
								<BiImages color="white" /> Collected
							</div>
						}
						Tab1Content={<UserNFTList primaryProfile={primaryProfile} />}
						Tab2Content={<UserCollectedNFTList primaryProfile={primaryProfile} />}
					/>
				</div>
			</div>
		</div>
	);
};

export default ProfileAssets;
