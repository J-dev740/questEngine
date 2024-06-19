import { Player } from "@livepeer/react";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import Image from "next/image";
import { useEffect, useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { useGetCourseByIdQuery } from "../../features/profile-page/course/courses.api";
import { VideoInfo } from "../../features/types";
import { Button2 } from "../common/form/button";
import Modal from "../util/modal";

interface VideoCardProps {
	courseId: string | string[] | undefined;
}

const VideoLessonAccordion = ({ courseId }: VideoCardProps) => {
	const [previewOpen, setPreviewOpen] = useState(false);
	const [videoDetails, setVideoDetails] = useState<Partial<VideoInfo> | undefined>(undefined);
	const [open, setOpen] = useState(0);
	const [preview, setPreview] = useState(0);
	const { data: course } = useGetCourseByIdQuery((courseId as string) ?? skipToken);

	useEffect(() => {
		if (course?.videos) {
			if (course?.videos?.length <= 1) {
				setPreview(0);
			} else if (course?.videos?.length === 2) {
				setPreview(1);
			} else {
				setPreview(2);
			}
		}
	}, [course]);

	const onClose = () => {
		setPreviewOpen(false);
	};

	const openPreview = (video: Partial<VideoInfo>) => () => {
		if (!video) return;
		setPreviewOpen(true);
		setVideoDetails(video);
	};

	if (!course)
		return <div className="text-2xl m-5 font-semibold">There are no Video Lessons to show</div>;

	return (
		<div className="flex flex-col space-y-3 overflow-y-scroll">
			{course.videos?.map((item, index) => (
				<div className="flex min-h-fit w-full flex-col rounded-2xl border border-card-border-parent font-poppins backdrop-blur-md">
					<button
						type="button"
						className={`leading-[36px]text-white flex cursor-pointer flex-row items-center justify-between bg-[#ffffff13] p-3 px-8 text-textLarge font-bold ${
							open === index ? "border-b-[1px] border-card-border-parent" : ""
						}  `}
						onClick={() => setOpen(index)}
					>
						<span className="font-600 font-poppins text-[24px] leading-[36px]">
							{index + 1}. {item.title}
						</span>

						<div className="flex items-center justify-center ">
							{open === index ? (
								<MdKeyboardArrowUp className="inline h-[40px] w-[50px]" />
							) : (
								<MdKeyboardArrowDown className="inline h-[40px] w-[50px]" />
							)}
						</div>
					</button>
					<div hidden={!(open === index)} className="p-8">
						<p className="text-textMedium2 font-bold leading-7 text-card-text">
							{item.description} <br />
							{preview === 0 && null}
							{preview === 1 &&
								(index === 0 ? (
									<Button2
										className="mt-4"
										text="Preview"
										onClick={openPreview(item)}
									/>
								) : null)}
							{preview === 2 &&
								(index === 0 || index === 1 ? (
									<Button2
										className="mt-4"
										text="Preview"
										onClick={openPreview(item)}
									/>
								) : null)}
						</p>
					</div>
				</div>
			))}
			{previewOpen && (
				<Modal title="" handleExit={onClose}>
					<div className="flex h-full w-full flex-col items-center space-y-6 font-Anek">
						<div className="text-center text-textMedium2 font-[500]">
							<p>{videoDetails?.title}</p>
							<p>{videoDetails?.description}</p>
						</div>
						<div className="flex space-x-6">
							<div className="aspect-video h-auto w-full">
								<Player
									playbackId={videoDetails?.playbackId}
									showPipButton
									showTitle={false}
									poster={
										<Image
											src={videoDetails?.icon ?? ""}
											alt=""
											width="0"
											height="0"
											sizes="w-full"
											className="h-auto w-fit"
										/>
									}
									controls={{
										autohide: 3000,
									}}
									theme={{
										borderStyles: { containerBorderStyle: "solid" },
										radii: { containerBorderRadius: "10px" },
									}}
								/>
							</div>
						</div>
					</div>
				</Modal>
			)}
		</div>
	);
};

export default VideoLessonAccordion;
