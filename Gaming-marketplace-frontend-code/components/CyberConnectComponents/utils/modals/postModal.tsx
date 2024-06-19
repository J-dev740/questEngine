import { MouseEvent, useState } from "react";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import {
	IPostCard,
	IPrimaryProfileCard,
	IProfileCard,
} from "../../../../features/cyber-connect/cyber.types";
import PostModalList from "../../cards/lists/postModal.list";

interface Props {
	posts: IPostCard[];
	profiles: IProfileCard[];
	index: number;
	primaryProfile: IPrimaryProfileCard | null;
	onClose: () => void;
}

const PostModal = ({ posts, index, primaryProfile, profiles, onClose }: Props) => {
	const [_index, _setIndex] = useState(index);

	const handleOutsideClick = (event: MouseEvent) => {
		const modalContent = document.getElementById("modal-content");
		if (modalContent && !modalContent.contains(event.target as Node)) {
			onClose();
		}
	};

	return (
		<div className="relative" onClick={handleOutsideClick}>
			<div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-30 backdrop-blur-sm">
				<div className="flex space-x-8 font-poppins" id="modal-content">
					{_index > 0 && (
						<MdNavigateBefore
							className="h-[50px] w-[50px] self-center rounded-xl border border-[#212121] bg-[#111111] p-2 text-textMedium3 text-white hover:cursor-pointer"
							onClick={() => _setIndex((state) => state - 1)}
						/>
					)}
					<PostModalList
						onClose={onClose}
						post={posts[_index]}
						profile={profiles[_index]}
						primaryProfile={primaryProfile}
					/>
					{_index < posts.length - 1 && (
						<MdNavigateNext
							className="h-[50px] w-[50px] self-center rounded-xl border border-[#212121] bg-[#111111] p-2 text-textMedium3 text-white hover:cursor-pointer"
							onClick={() => _setIndex((state) => state + 1)}
						/>
					)}
				</div>
			</div>
		</div>
	);
};

export default PostModal;
