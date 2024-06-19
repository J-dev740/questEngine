import Image from "next/image";
import toast from "react-hot-toast";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useSelector } from "react-redux";
// import { cyberConnectSelector } from "../../../features/cyber-connect/cyber.selectors";
import { ICommentCard } from "../../../features/cyber-connect/cyber.types";
// import { GET_POSTS_BY_PROFILE_IDS } from "../../../features/cyber-connect/graphql/GetProfileByIDs";
import { apolloClient } from "../../util/init/apollo.config";

// can this be stuffed up into the props
interface Props {
	comment: ICommentCard;
}

const CommentCard = ({ comment }: Props) => {
	// const cyberConnect = useSelector(cyberConnectSelector);

	// const handleCancelReaction = async () => {
	// 	if (!cyberConnect) return;
	// 	const tx = await cyberConnect
	// 		.cancelReaction(comment.contentID)
	// 		.catch(() => toast.error("Error in operation"));
	// 	if (tx === "SUCCESS") {
	// 		apolloClient.refetchQueries({ include: [GET_POSTS_BY_PROFILE_IDS] });
	// 	}
	// };

	// const handleLike = async () => {
	// 	if (!cyberConnect) return;
	// 	const tx = await cyberConnect
	// 		.like(comment.contentID)
	// 		.catch(() => toast.error("Error in operation"));
	// 	if (tx.status === "SUCCESS") {
	// 		apolloClient.refetchQueries({ include: [GET_POSTS_BY_PROFILE_IDS] });
	// 	}
	// };

	return (
		<div className="flex items-center space-x-3 font-poppins">
			<Image
				src={`https://api.multiavatar.com/${comment.authorAddress}.svg`}
				alt="image"
				height={50}
				width={50}
				className="rounded-full"
			/>
			<div className=" w-[88%] text-textMedium">
				<div className="font-[700] text-white">{comment.authorHandle}</div>
				<div className="line-clamp-2 w-full font-[400] text-[#9B9B9B]"> {comment.body}</div>
				{comment.likedStatus.liked ? (
					<div className="flex items-center space-x-1 text-textMedium text-[#FD5B74]">
						<AiFillHeart
							// onClick={handleCancelReaction}
							className="hover:cursor-pointer"
						/>
						<span> {comment.likeCount} likes</span>
					</div>
				) : (
					<div className="flex items-center space-x-1 text-textMedium text-[#9B9B9B]">
						{/* <AiOutlineHeart onClick={handleLike} className="hover:cursor-pointer" /> */}
						<span>{comment.likeCount} likes</span>
					</div>
				)}
			</div>
		</div>
	);
};

export default CommentCard;
