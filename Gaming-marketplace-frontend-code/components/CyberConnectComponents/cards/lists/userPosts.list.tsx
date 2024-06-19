import { useQuery } from "@apollo/client";
import { useState } from "react";
import { useSelector } from "react-redux";
import { walletAddressSelector } from "../../../../features/auth/auth.selectors";
import { IPostCard, IPrimaryProfileCard } from "../../../../features/cyber-connect/cyber.types";
import { GET_PROFILES_FROM_HANDLES } from "../../../../features/cyber-connect/graphql/GetProfilesByHandles";
import PostModal from "../../utils/modals/postModal";
import PostCard from "../PostCard";

interface Props {
	posts: IPostCard[];
	primaryProfile: IPrimaryProfileCard;
}

const UserPostList = ({ posts, primaryProfile }: Props) => {
	const [selected, setSelected] = useState<number>(0);
	const [openPostModal, setOpenPostModal] = useState<boolean>(false);

	const walletAddress = useSelector(walletAddressSelector);
	const { data, loading, error } = useQuery(GET_PROFILES_FROM_HANDLES, {
		variables: {
			handles: posts.map((post) => post.authorHandle),
			me: walletAddress,
		},
	});

	const handleClick = (ind: number) => {
		setSelected(ind);
		setOpenPostModal(true);
	};

	if (posts.length === 0) return <div>Looks like there is nothing to show!</div>;

	if (loading) return <div>Loading posts</div>;
	if (error) return <div>Error loading posts</div>;
	if (!data) return <div>Something went wrong :(</div>;

	return (
		<div>
			{openPostModal && (
				<PostModal
					index={selected}
					posts={posts}
					profiles={data.profilesByHandles}
					primaryProfile={primaryProfile}
					onClose={() => setOpenPostModal(false)}
				/>
			)}
			<div className="grid grid-cols-1 gap-4 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
				{posts.map((post, index) => (
					<PostCard
						post={post}
						key={post.contentID}
						profile={data.profilesByHandles[index]}
						primaryProfile={primaryProfile}
						onClick={() => handleClick(index)}
					/>
				))}
			</div>
		</div>
	);
};

export default UserPostList;
