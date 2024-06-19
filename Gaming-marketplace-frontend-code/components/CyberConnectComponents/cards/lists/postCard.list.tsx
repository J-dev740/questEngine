import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { InView } from "react-intersection-observer";
import {
	IPageInfo,
	IPostCard,
	IPrimaryProfileCard,
	IProfileCard,
} from "../../../../features/cyber-connect/cyber.types";
import { GET_POSTS_BY_PROFILE_IDS } from "../../../../features/cyber-connect/graphql/GetProfileByIDs";
import PostModal from "../../utils/modals/postModal";
import PostCard from "../post.card";

interface Props {
	primaryProfile: IPrimaryProfileCard | null;
	address: string;
}

const PostCardList = ({ address, primaryProfile }: Props) => {
	const [page, setPage] = useState(1);
	const [cursor, setCursor] = useState<string | null>(null);
	const [selected, setSelected] = useState<number>(0);
	const [openPostModal, setOpenPostModal] = useState<boolean>(false);
	const [profilesByIDs, setProfilesByIDs] = useState<IPostCard[]>([]);
	const [profiles, setProfiles] = useState<IProfileCard[]>([]);
	const [pageInfo, setPageInfo] = useState<IPageInfo>({} as IPageInfo);
	const {
		data: posts,
		loading,
		error,
		fetchMore,
	} = useQuery(GET_POSTS_BY_PROFILE_IDS, {
		variables: {
			me: address,
			ids: [
				134, 1464, 155, 232, 323, 386, 433, 479, 525, 629, 662, 727, 774, 815, 838, 840,
				870, 889, 908, 922, 1044, 1195, 1196, 1328, 1337,
			],
			first: 1,
			after: cursor,
		},
	});

	const formatProfile = (posts: { profilesByIDs: IPostCard[] }) => {
		const profilePosts: IPostCard[] = posts.profilesByIDs.map((item: any) => {
			if (item.posts.edges.length !== 0) return item.posts.edges[0].node;
		});
		const profileInfo: IProfileCard[] = posts.profilesByIDs.map((item: IProfileCard & any) => {
			const { posts, ...data } = item;
			return data;
		});
		const profilePageInfo: IPageInfo = posts.profilesByIDs.reduce(
			(acc: any, curr: any) => ({
				endCursor: curr.posts.pageInfo.endCursor,
				startCursor: curr.posts.pageInfo.startCursor,
				hasNextPage: curr.posts.pageInfo.hasNextPage || acc.hasNextPage,
				hasPreviousPage: curr.posts.pageInfo.hasPreviousPage || acc.hasPreviousPage,
			}),
			{ hasNextPage: false, hasPreviousPage: false },
		);
		return {
			posts: profilePosts,
			profiles: profileInfo,
			pageInfo: profilePageInfo,
		};
	};

	useEffect(() => {
		if (posts) {
			const data = formatProfile(posts);
			setProfilesByIDs(data.posts);
			setProfiles(data.profiles);
			setPageInfo(data.pageInfo);
		}
	}, [posts]);

	if (loading) return <div>Loading data...</div>;
	if (error) return <div>Error loading posts...</div>;
	if (!posts) return <div>There are no posts to show</div>;

	if (profilesByIDs.length === 0) return <div>There are no posts to show</div>;

	const handleClick = (ind: number) => {
		setSelected(ind);
		setOpenPostModal(true);
	};

	const updateQuery = (previousData: any, { fetchMoreResult }: any) => {
		if (fetchMoreResult) {
			const data = formatProfile(fetchMoreResult);
			setProfilesByIDs([...profilesByIDs, ...data.posts]);
			setProfiles([...profiles, ...data.profiles]);
			setPageInfo(data.pageInfo);
		}
	};

	return (
		<div className="flex-grow">
			{openPostModal && (
				<PostModal
					index={selected}
					posts={profilesByIDs}
					profiles={profiles}
					primaryProfile={primaryProfile}
					onClose={() => setOpenPostModal(false)}
				/>
			)}
			<div className="my-2 flex h-full w-full flex-col justify-between gap-6 overflow-y-scroll pr-4">
				{profilesByIDs.length > 0 &&
					profilesByIDs.map((post, index) => {
						if (!post) return null;
						return (
							<>
								{index === profilesByIDs.length - 10 && (
									<InView
										onChange={async (inView) => {
											if (inView) {
												fetchMore({
													variables: {
														after: pageInfo.endCursor,
													},
													updateQuery,
												});
											}
										}}
									/>
								)}
								<PostCard
									data={post}
									profile={profiles[index]}
									address={address}
									primaryProfile={primaryProfile}
									key={JSON.stringify(post)}
									onClick={() => handleClick(index)}
								/>
							</>
						);
					})}
			</div>
		</div>
	);
};

export default PostCardList;
