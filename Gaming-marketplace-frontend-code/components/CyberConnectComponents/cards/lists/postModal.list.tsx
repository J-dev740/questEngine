import { format, parseISO } from "date-fns";
import Image from "next/image";
import { KeyboardEvent, useState } from "react";
import toast from "react-hot-toast";
import { AiFillHeart, AiOutlineHeart, AiOutlineSend } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaComment } from "react-icons/fa";
import { HiOutlineArrowLongDown } from "react-icons/hi2";
import { IoClose } from "react-icons/io5";
import ReactMarkdown from "react-markdown";
import { useSelector } from "react-redux";
import { walletAddressSelector } from "../../../../features/auth/auth.selectors";
// import { cyberConnectSelector } from "../../../../features/cyber-connect/cyber.selectors";
import {
	ICommentCard,
	IPostCard,
	IPrimaryProfileCard,
	IProfileCard,
} from "../../../../features/cyber-connect/cyber.types";
import { GET_POSTS_BY_PROFILE_IDS } from "../../../../features/cyber-connect/graphql/GetProfileByIDs";
import { apolloClient } from "../../../util/init/apollo.config";
import PostDropdown from "../../utils/post.dropdown";
import CommentCard from "../comment.card";

const Imgs = ({ node, ...props }: { node: any }) => (
	<Image src="" alt="post-img" width="300" height="300" className="my-2 rounded" {...props} />
);

interface Props {
	post: IPostCard;
	profile: IProfileCard;
	primaryProfile: IPrimaryProfileCard | null;
	onClose: () => void;
}

const PostModalList = ({ onClose, post, primaryProfile, profile }: Props) => {
	const [comment, setComment] = useState("");
	const [_open, _setOpen] = useState<boolean>(false);

	const address = useSelector(walletAddressSelector);
	// const cyberConnect = useSelector(cyberConnectSelector);

	const selfView = post.authorAddress === address;

	// const handleSend = async () => {
	// 	await handleComment();
	// };

	// const handleEnter = async (event: KeyboardEvent) => {
	// 	if (event.key === "Enter") {
	// 		await handleComment();
	// 	}
	// };

	// const handleLike = async () => {
	// 	if (!cyberConnect) return;
	// 	const tx = await cyberConnect
	// 		.like(post.contentID)
	// 		.catch(() => toast.error("Error in operation"));
	// 	if (tx.status === "SUCCESS") {
	// 		apolloClient.refetchQueries({ include: [GET_POSTS_BY_PROFILE_IDS] });
	// 	}
	// };

	// const handleDisLike = async () => {
	// 	if (!cyberConnect) return;
	// 	const tx = await cyberConnect
	// 		.dislike(post.contentID)
	// 		.catch(() => toast.error("Error in operation"));

	// 	if (tx === "SUCCESS") {
	// 		apolloClient.refetchQueries({ include: [GET_POSTS_BY_PROFILE_IDS] });
	// 	}
	// };

	// const handleCancelReaction = async () => {
	// 	if (!cyberConnect) return;
	// 	const tx = await cyberConnect
	// 		.cancelReaction(post.contentID)
	// 		.catch(() => toast.error("Error in operation"));
	// 	if (tx === "SUCCESS") {
	// 		apolloClient.refetchQueries({ include: [GET_POSTS_BY_PROFILE_IDS] });
	// 	}
	// };

	// const handleComment = async () => {
	// 	if (!cyberConnect) return;
	// 	const tx = await cyberConnect
	// 		.createComment(post.contentID, {
	// 			title: "",
	// 			body: comment,
	// 			author: primaryProfile?.handle,
	// 		})
	// 		.catch(() => toast.error("Error in operation"));

	// 	if (tx.status === "SUCCESS") {
	// 		apolloClient.refetchQueries({ include: [GET_POSTS_BY_PROFILE_IDS] });
	// 		setComment("");
	// 	}
	// };

	const comments: { node: ICommentCard }[] = post.comments.edges;

	return (
		<>
			<div className="border-1 flex h-[75vh] w-[800px] flex-col space-y-3 rounded-3xl border border-[#212121] bg-[#111111] p-8">
				<div className="flex w-full items-center justify-between">
					<div className="flex">
						<Image
							src={
								profile?.metadataInfo?.avatar ||
								profile?.avatar ||
								`https://api.multiavatar.com/${profile?.owner.address}.svg`
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
							<h2 className="text-textSmall text-[#B5B5B5]">@{profile?.handle}</h2>
						</div>
					</div>
					<div className="flex items-center ">
						{primaryProfile && !selfView && (
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
				<div className="w-full flex-grow p-2 font-poppins">
					<ReactMarkdown className="text-textMedium3 font-[500]">
						{post.title}
					</ReactMarkdown>
					<ReactMarkdown
						components={{
							img: Imgs,
						}}
						className="line-clamp-none w-full p-1 text-textMedium2 text-card-text"
					>
						{post.body}
					</ReactMarkdown>
				</div>
				<div className="flex space-x-2 font-poppins text-textMedium2">
					<span className="flex items-center rounded-lg bg-[#080808] px-4 py-2 ">
						{post.likedStatus.liked ? (
							<div className="flex items-center space-x-1">
								<AiFillHeart
									className="text-[#FD5B74] hover:cursor-pointer"
									// onClick={handleCancelReaction}
								/>
								<h3 className="text-[#FD5B74] ">{post.likeCount}</h3>
							</div>
						) : (
							<div className="flex items-center space-x-1 ">
								<AiOutlineHeart
									className="hover:cursor-pointer"
									// onClick={handleLike}
								/>
								<h3>{post.likeCount}</h3>
							</div>
						)}
					</span>
					<span className="flex items-center space-x-1 rounded-lg bg-[#080808] px-4 py-2">
						<FaComment />
						<h3>{post.commentCount}</h3>
					</span>
					<span className="flex items-center rounded-lg bg-[#080808] px-4 py-2">
						{post.likedStatus.disliked ? (
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

						<h3>{post.dislikeCount}</h3>
					</span>
				</div>
				<h2 className="my-auto text-textMedium text-card-text">
					{format(parseISO(post.createdAt), "cccc, do MMMM yyyy")}
				</h2>
			</div>
			<div className="border-1 flex h-[75vh] w-[33vw] flex-col space-y-3 rounded-3xl border border-[#212121] bg-[#111111] p-8">
				<div className="flex items-center">
					<div className="text-textLarge font-[600] text-white">Comments</div>
					<IoClose
						className="ml-auto rounded-lg bg-black p-1 text-text3xl hover:cursor-pointer"
						onClick={onClose}
					/>
				</div>
				<div className="h-[90%] flex-grow overflow-y-scroll">
					{comments.map((comment) => (
						<CommentCard comment={comment.node} />
					))}
				</div>
				{primaryProfile && (
					<div className="flex space-x-3">
						<Image
							src={
								primaryProfile.avatar ??
								`https://api.multiavatar.com/${profile?.owner.address}.svg`
							}
							alt="image"
							height={50}
							width={50}
							className="rounded-full"
						/>
						<input
							type="text"
							className="w-full rounded-2xl border border-[#212121] bg-[#363636] px-6 py-3 text-textMedium2 font-[500] text-white"
							placeholder="comment"
							value={comment}
							onChange={(e) => setComment(e.target.value)}
							// onKeyDown={handleEnter}
						/>
						<button type="button" className="relative">
							<AiOutlineSend
								// onClick={handleSend}
								className="absolute bottom-3.5 right-6 text-textMedium3 font-thin text-[#667085]"
							/>
						</button>
					</div>
				)}
			</div>
		</>
	);
};

export default PostModalList;
