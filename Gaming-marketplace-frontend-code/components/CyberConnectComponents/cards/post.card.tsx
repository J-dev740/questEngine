import { format, parseISO } from "date-fns";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaComment } from "react-icons/fa";
import { HiOutlineArrowLongDown } from "react-icons/hi2";
import ReactMarkdown from "react-markdown";
import { useSelector } from "react-redux";
// import { cyberConnectSelector } from "../../../features/cyber-connect/cyber.selectors";
import {
	IPostCard,
	IPrimaryProfileCard,
	IProfileCard,
} from "../../../features/cyber-connect/cyber.types";
import { GET_POSTS_BY_PROFILE_IDS } from "../../../features/cyber-connect/graphql/GetProfileByIDs";

import { apolloClient } from "../../util/init/apollo.config";
import PostDropdown from "../utils/post.dropdown";

const Imgs = ({ node, ...props }: { node: any }) => (
	<Image src="" alt="post-img" width="300" height="300" className="my-2 rounded" {...props} />
);

interface Props {
	primaryProfile: IPrimaryProfileCard | null;
	data: IPostCard;
	address: string;
	profile: IProfileCard;
	onClick: () => void;
}

const PostCard = ({
	primaryProfile,
	onClick,
	data: {
		contentID,
		authorHandle,
		title,
		body,
		likeCount,
		dislikeCount,
		commentCount,
		likedStatus,
		createdAt,
	},
	profile,
	address,
}: Props) => {
	const [_open, _setOpen] = useState<boolean>(false);
	// const cyberConnect = useSelector(cyberConnectSelector);

	// const handleLike = async () => {
	// 	if (!cyberConnect) return;
	// 	const tx = await cyberConnect
	// 		.like(contentID)
	// 		.catch(() => toast.error("Error in operation"));
	// 	if (tx.status === "SUCCESS") {
	// 		apolloClient.refetchQueries({ include: [GET_POSTS_BY_PROFILE_IDS] });
	// 	}
	// };

	// const handleDisLike = async () => {
	// 	if (!cyberConnect) return;
	// 	const tx = await cyberConnect
	// 		.dislike(contentID)
	// 		.catch(() => toast.error("Error in operation"));

	// 	if (tx === "SUCCESS") {
	// 		apolloClient.refetchQueries({ include: [GET_POSTS_BY_PROFILE_IDS] });
	// 	}
	// };

	// const handleCancelReaction = async () => {
	// 	if (!cyberConnect) return;
	// 	const tx = await cyberConnect
	// 		.cancelReaction(contentID)
	// 		.catch(() => toast.error("Error in operation"));
	// 	if (tx === "SUCCESS") {
	// 		apolloClient.refetchQueries({ include: [GET_POSTS_BY_PROFILE_IDS] });
	// 	}
	// };

	return (
		<div className="mx-auto my-2 w-full space-y-3 rounded-lg border border-[#212121] bg-[#111111] px-5 py-3 font-poppins">
			<section className="flex justify-between">
				<div className="my-3 flex w-full items-center justify-between">
					<div className="flex">
						<Image
							src={
								profile?.metadataInfo?.avatar ||
								profile?.avatar ||
								`https://api.multiavatar.com/${profile.owner.address}.svg`
							}
							alt=""
							height="100"
							width="100"
							className="h-14 w-14 rounded-full"
						/>
						<div className="ml-4">
							<h2 className="text-base mt-1 text-textMedium2">
								{profile?.metadataInfo?.displayName || "John Doe"}
							</h2>
							<h2 className="text-textSmall text-[#B5B5B5]">@{authorHandle}</h2>
						</div>
					</div>
					<div className="flex items-center ">
						{primaryProfile && (
							<div
								className="rounded-lg p-0.5 text-textMedium3 duration-500 hover:bg-slate-500"
								onClick={() => _setOpen((state) => !state)}
							>
								<BsThreeDotsVertical className="cursor-pointer rounded-full text-white" />
							</div>
						)}
						{_open && (
							<div className="relative">
								<PostDropdown
									profile={profile}
									isFollowed={profile.isFollowedByMe}
									isSubscribed={profile.isSubscribedByMe}
								/>
							</div>
						)}
					</div>
				</div>
			</section>
			<div className="my-2 w-full hover:cursor-pointer" onClick={onClick}>
				<ReactMarkdown className="text-base my-2 ">{title}</ReactMarkdown>
				<ReactMarkdown
					components={{
						img: Imgs,
					}}
					className="text-sm my-2 line-clamp-none w-full text-card-text"
				>
					{body}
				</ReactMarkdown>
			</div>
			<section className="flex flex-col font-poppins">
				<div className="flex space-x-3 font-poppins text-textMedium2 font-[500]">
					<span className="flex items-center rounded-lg bg-[#080808] px-4 py-2 ">
						{likedStatus.liked ? (
							<div className="flex items-center space-x-1">
								<AiFillHeart
									className="text-[#FD5B74] hover:cursor-pointer"
									// onClick={handleCancelReaction}
								/>
								<h3 className="text-[#FD5B74] ">{likeCount}</h3>
							</div>
						) : (
							<div className="flex items-center space-x-1 ">
								<AiOutlineHeart
									className="hover:cursor-pointer"
									// onClick={handleLike}
								/>
								<h3>{likeCount}</h3>
							</div>
						)}
					</span>
					<span className="flex items-center space-x-1 rounded-lg bg-[#080808] px-4 py-2">
						<FaComment />
						<h3>{commentCount}</h3>
					</span>
					<span className="flex items-center rounded-lg bg-[#080808] px-4 py-2">
						{likedStatus.disliked ? (
							<HiOutlineArrowLongDown
								// onClick={handleCancelReaction}
								className="text-[#FD5B74] hover:cursor-pointer"
							/>
						) : (
							<HiOutlineArrowLongDown
								// onClick={handleDisLike}
								className=" hover:cursor-pointer"
							/>
						)}

						<h3>{dislikeCount}</h3>
					</span>
				</div>
			</section>
			<h2 className="my-auto text-textMedium text-card-text">
				{format(parseISO(createdAt), "cccc, do MMMM yyyy")}
			</h2>
			{/* {primaryProfile && (
				<div className="flex h-fit items-center space-x-5">
					<Image
						src={primaryProfile.avatar ?? `https://api.multiavatar.com/${address}.svg`}
						alt="image"
						height={0}
						width={0}
						sizes="100vw"
						className="aspect-square h-[45px] w-[45px] self-center rounded-full"
					/>
					<div className="w-full">
						<input
							type="text"
							className="w-full rounded-2xl border border-[#212121] bg-black px-6 py-2.5 font-poppins text-textMedium2 font-[500] text-[#98A2B3]"
							placeholder="comment"
							value={comment}
							onChange={(e) => setComment(e.target.value)}
							onKeyDown={handleEnter}
						/>
						<button type="button" className="relative">
							<AiOutlineSend className="absolute -bottom-1.5 right-4 text-textLarge font-thin text-[#667085]" />
						</button>
					</div>
				</div>
			)} */}
			{!primaryProfile && (
				<p className="flex justify-start">Mint your profile to comment...</p>
			)}
		</div>
	);
};

export default PostCard;
