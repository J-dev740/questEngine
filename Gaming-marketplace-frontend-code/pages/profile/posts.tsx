import { useQuery } from "@apollo/client";
import Head from "next/head";
import { AiOutlineHeart } from "react-icons/ai";
import { IoIosImages } from "react-icons/io";
import { useSelector } from "react-redux";
import UserPostList from "../../components/CyberConnectComponents/cards/lists/userPosts.list";
import TabGroupNew from "../../components/util/tabGroupNew";
import { walletAddressSelector } from "../../features/auth/auth.selectors";
import { IPostCard, IPrimaryProfileCard } from "../../features/cyber-connect/cyber.types";
import { GET_PROFILE_POSTS } from "../../features/cyber-connect/graphql/GetProfilePosts";
import { GET_PRIMARY_PROFILE } from "../../features/cyber-connect/graphql/PrimaryProfile";

const ProfileAssets = () => {
	const walletAddress = useSelector(walletAddressSelector);

	const { data, loading, error } = useQuery(GET_PROFILE_POSTS, {
		variables: {
			wallet: walletAddress,
			first: 5,
			after: null,
		},
	});

	const {
		data: selfProfile,
		loading: loadingProfile,
		error: errorProfile,
	} = useQuery(GET_PRIMARY_PROFILE, {
		variables: { address: walletAddress, me: walletAddress },
	});

	if (loadingProfile) return <div>Loading profile</div>;
	if (errorProfile) return <div>Error loading profile</div>;

	if (loading) return <div>Loading posts</div>;
	if (error) return <div>Error loading posts</div>;

	if (!data || !selfProfile) return <div>Something went wrong :(</div>;

	const posts: IPostCard[] = data.address.wallet.primaryProfile.posts.edges.map(
		(item: any) => item.node,
	);
	const primaryProfile: IPrimaryProfileCard = selfProfile.address.wallet.primaryProfile;

	const likedPosts = posts.filter((item) => item.likedStatus.liked === true);
	const regularPosts = posts.filter((item) => item.likedStatus.liked === false);

	return (
		<div>
			<Head>
				<title>Profile - Posts</title>
			</Head>
			<div className="h-screen overflow-y-scroll pl-6 pt-[15vh]">
				<h1 className="mt ml-3 text-text4xl font-bold">Posts</h1>
				<div className="page-game relative overflow-y-scroll">
					<TabGroupNew
						className=""
						Tab1Title={
							<div className="flex items-center justify-center gap-1 text-white">
								<IoIosImages color="white" /> My Posts
							</div>
						}
						Tab2Title={
							<div className="flex items-center justify-center gap-1 text-white">
								<AiOutlineHeart color="white" /> Liked
							</div>
						}
						Tab1Content={
							<UserPostList posts={regularPosts} primaryProfile={primaryProfile} />
						}
						Tab2Content={
							<UserPostList posts={likedPosts} primaryProfile={primaryProfile} />
						}
					/>
				</div>
			</div>
		</div>
	);
};

export default ProfileAssets;
