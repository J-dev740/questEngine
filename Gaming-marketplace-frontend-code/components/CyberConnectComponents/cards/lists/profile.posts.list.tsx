import { useLazyQuery, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { walletAddressSelector } from "../../../../features/auth/auth.selectors";
import { IPostCard, IPrimaryProfileCard } from "../../../../features/cyber-connect/cyber.types";
import { GET_PROFILE_POSTS } from "../../../../features/cyber-connect/graphql/GetProfilePosts";
import { GET_PROFILES_FROM_HANDLES } from "../../../../features/cyber-connect/graphql/GetProfilesByHandles";
import PostModal from "../../utils/modals/postModal";
import PostCard from "../PostCard";

interface Props {
	primaryProfile: IPrimaryProfileCard;
}

const ProfilePostsList = ({ primaryProfile }: Props) => {
	const [selected, setSelected] = useState<number>(0);
	const [openPostModal, setOpenPostModal] = useState<boolean>(false);

	const walletAddress = useSelector(walletAddressSelector);
	const { data, loading, error } = useQuery(GET_PROFILE_POSTS, {
		variables: {
			wallet: walletAddress,
			first: 5,
		},
	});

	const [getHandles, { data: data2, loading: loading2, error: error2 }] =
		useLazyQuery(GET_PROFILES_FROM_HANDLES);

	useEffect(() => {
		if (loading) return;
		if (!data) return;
		if (data.length === 0) return;
		const posts: IPostCard[] = data.address.wallet.primaryProfile.posts.edges.map(
			(item: any) => item.node,
		);

		getHandles({
			variables: {
				handles: posts.map((post) => post.authorHandle),
				me: walletAddress,
			},
		});
	}, [data, loading]);

	const handleClick = (ind: number) => {
		setSelected(ind);
		setOpenPostModal(true);
	};

	if (loading2) return <div>Loading posts</div>;
	if (error2) return <div>Error loading posts</div>;

	if (loading) return <div>Loading data</div>;
	if (error) return <div>Error loading data</div>;

	if (!data || !data2) return <div>Something went wrong :(</div>;

	const posts: IPostCard[] = data.address.wallet.primaryProfile.posts.edges.map(
		(item: any) => item.node,
	);

	if (posts.length === 0) return <div>Looks like there are no posts to show</div>;

	return (
		<div>
			{openPostModal && (
				<PostModal
					index={selected}
					posts={posts}
					profiles={data2.profilesByHandles}
					primaryProfile={primaryProfile}
					onClose={() => setOpenPostModal(false)}
				/>
			)}
			<div className="flex w-full justify-items-start space-x-4 overflow-x-scroll">
				{posts.map((post, index) => (
					<PostCard
						post={post}
						key={post.contentID}
						profile={data2.profilesByHandles[index]}
						primaryProfile={primaryProfile}
						onClick={() => handleClick(index)}
					/>
				))}
			</div>
		</div>
	);
};

export default ProfilePostsList;
