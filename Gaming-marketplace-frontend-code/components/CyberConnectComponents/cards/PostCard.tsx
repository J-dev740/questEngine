import { format, parseISO } from "date-fns";
import Image from "next/image";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { FaComment } from "react-icons/fa";
import { HiOutlineArrowLongDown } from "react-icons/hi2";
import ReactMarkdown from "react-markdown";
import {
	IPostCard,
	IPrimaryProfileCard,
	IProfileCard,
} from "../../../features/cyber-connect/cyber.types";

interface PostCardProps {
	post: IPostCard;
	profile: IProfileCard;
	primaryProfile: IPrimaryProfileCard;
	onClick: (post: unknown) => void | React.MouseEvent<HTMLButtonElement>;
}

const Imgs = ({ node, ...props }: { node: any }) => (
	<Image src="" alt="post-img" width="300" height="300" className="my-2 rounded" {...props} />
);

const PostCard = ({ post, primaryProfile, profile, onClick }: PostCardProps) => {
	return (
		<div className=" my-2 w-fit max-w-[350px] space-y-3 rounded-lg border border-[#212121] bg-[#111111] px-5 py-3 font-poppins">
			<div className="my-2 w-full hover:cursor-pointer" onClick={onClick}>
				<ReactMarkdown className="text-base my-2 ">{post.title}</ReactMarkdown>
				<ReactMarkdown
					components={{
						img: Imgs,
					}}
					className="text-sm my-2 line-clamp-none w-full text-card-text"
				>
					{post.body}
				</ReactMarkdown>
			</div>
			<section className="flex flex-col font-poppins">
				<div className="flex space-x-3 font-poppins text-textMedium2 font-[500]">
					<span className="flex items-center rounded-lg bg-[#080808] px-4 py-2 ">
						{post.likedStatus.liked ? (
							<div className="flex items-center space-x-1">
								<AiFillHeart />
								<h3>{post.likeCount}</h3>
							</div>
						) : (
							<div className="flex items-center space-x-1 ">
								<AiOutlineHeart />
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
							<HiOutlineArrowLongDown />
						) : (
							<HiOutlineArrowLongDown />
						)}

						<h3>{post.dislikeCount}</h3>
					</span>
				</div>
			</section>
			<h2 className="my-auto text-textMedium text-card-text">
				{format(parseISO(post.createdAt), "cccc, do MMMM yyyy")}
			</h2>
		</div>
	);
};

export default PostCard;
