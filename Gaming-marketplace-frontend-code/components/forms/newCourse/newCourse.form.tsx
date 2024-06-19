import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useCreateExpertCourseMutation } from "../../../features/profile-page/expert/expert.api";
import { CourseInfo, VideoInfo } from "../../../features/types";
import ProgressBarCard from "../../common/cards/progressBar.card";
import { Button2 } from "../../common/form/button";
import ModalVideo from "../../util/modalVideo";
import Confirm from "./confirm";
import CourseForm, { ResultType } from "./course.form";
import Done from "./done";
import VideoForm from "./video.form";

enum Progress {
	CREATING_COURSE,
	CREATING_VIDEOS,
	CONFIRM,
	DONE,
	CLOSED,
}

interface NewCourseProps {
	expertId: string;
	onClose: () => void;
	onResult: () => void;
}

interface _Video {
	size: number;
	videoSize: number;
	title: string;
	description: string;
	progressBar: number;
	isProgressCard: false;
	videoName: string;
	progressFormatted: string;
}

export interface _VideoMetadata {
	size: number;
}

const NewCourseForm = ({ onClose, onResult, expertId }: NewCourseProps) => {
	const [create] = useCreateExpertCourseMutation();
	const [progress, setProgress] = useState<Progress>(Progress.CREATING_COURSE);
	const [data, setData] = useState<Partial<CourseInfo>>({ videos: [] });
	const [_videos, _setVideos] = useState<Array<_Video>>([]);

	useEffect(() => {
		switch (progress) {
			case Progress.DONE: {
				toast.promise(create({ ...data, expertId }).unwrap(), {
					loading: "Creating course...",
					error: "something went wrong :(",
					success: () => {
						setData({});
						return "course created successfully!";
					},
				});

				break;
			}
			case Progress.CLOSED: {
				setData({});
				onClose();
				break;
			}
		}
	}, [progress, onClose, onResult]);

	const handleCourse = (result: ResultType) => {
		setData({ ...result, videos: [] });
		setProgress(Progress.CREATING_VIDEOS);
	};

	const handleVideo = () => {
		setProgress(Progress.CONFIRM);
	};

	const handleClose = () => {
		setProgress(Progress.CLOSED);
	};

	const handleMoreVideos = (result: VideoInfo & _VideoMetadata) => {
		const { size, ...res } = result;
		const tempData = { ...data };
		tempData.videos?.push(res);
		setData(tempData);

		const _tempVideos = [..._videos];
		_tempVideos.push({
			description: tempData.description as string,
			isProgressCard: false,
			progressBar: 0,
			videoSize: 0,
			title: res.title as string,
			size,
			videoName: "",
			progressFormatted: "",
		});
		_setVideos(_tempVideos);
	};

	return (
		<div>
			{progress === Progress.CREATING_COURSE && (
				<CourseForm onResult={handleCourse} onClose={handleClose} expertId={expertId} />
			)}
			{progress === Progress.CREATING_VIDEOS && data.videos && (
				<ModalVideo>
					<div className="flex max-h-min rounded-[14px] border-form-border bg-form-bg">
						{data.videos.length > 0 && (
							<div className="flex max-h-[100%] min-w-fit flex-col space-y-4  overflow-y-scroll rounded-l-[14px] border-[2px] border-r-0  border-[#404040] p-[40px] font-Anek">
								<div className="font-400 text-[20px] text-[#FFFFFF]">
									Uploaded videos
								</div>
								{_videos && _videos.map((item) => <ProgressBarCard {...item} />)}
								<Button2
									text="Finish"
									onClick={handleVideo}
									className="m-2 !mt-auto w-fit self-end px-5 "
								/>
							</div>
						)}
						{data.videos.length > 0 && (
							<div className=" my-10 h-[550px] w-[1px] justify-center bg-[#3F3F3F]" />
						)}
						<VideoForm
							videoLength={data.videos.length}
							id={data.videos.length + 1}
							onMoreVideos={handleMoreVideos}
							onClose={onClose}
							expertId={expertId}
						/>
					</div>
				</ModalVideo>
			)}
			{progress === Progress.CONFIRM && (
				<Confirm
					onYes={() => setProgress(Progress.DONE)}
					onNo={() => setProgress(Progress.CREATING_VIDEOS)}
				/>
			)}
			{progress === Progress.DONE && <Done onClose={() => onResult()} />}
		</div>
	);
};

export default NewCourseForm;
