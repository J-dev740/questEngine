/* eslint-disable indent */
import { useCreateAsset } from "@livepeer/react";
import { FormEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { IoClose } from "react-icons/io5";
import { ValidationError } from "yup";
import { VideoInfo } from "../../../features/types";
import { UploadToS3 } from "../../../services/aws.upload";
import ProgressBarCard from "../../common/cards/progressBar.card";
import { Button2 } from "../../common/form/button";
import { Dropzone } from "../../common/form/dropzone";
import { InputField } from "../../common/form/inputField";
import { TextArea } from "../../common/form/textArea";
import { _VideoMetadata } from "./newCourse.form";
import { videoSchema, VideoType } from "./newCourse.validation";

enum Progress {
	FILLING_FORM,
	UPLOADING_ASSETS,
}

interface VideoProps {
	id: number;
	onMoreVideos: (_data: VideoInfo & _VideoMetadata) => void;
	videoLength: number;
	onClose: () => void;
	expertId: string;
}

interface CustomElements extends HTMLFormControlsCollection {
	title: HTMLInputElement;
	description: HTMLTextAreaElement;
}

interface NewCourseFormElements extends HTMLFormElement {
	readonly elements: CustomElements;
}

const VideoForm = ({ id, onMoreVideos, videoLength, onClose, expertId }: VideoProps) => {
	const formRef = useRef<HTMLFormElement>(null);
	const [data, setData] = useState<(VideoType & { uploadedLink: string }) | null>(null);
	const [errors, setErrors] = useState<{ [k: string]: string | null }>({});
	const [totalProgress, setTotalProgress] = useState<Progress>(Progress.FILLING_FORM);
	const [video, setVideo] = useState<File | null>(null);
	const [progressBar, setProgressBar] = useState(0);

	const [poster, setPoster] = useState<File | null>(null);
	const [posterProgress, setPosterProgress] = useState(false);
	const [showCard, setShowCard] = useState(false);

	const {
		mutate: createAsset,
		data: asset,
		progress,
	} = useCreateAsset(video ? { sources: [{ name: video.name, file: video }] as const } : null);

	useEffect(() => {
		if (!progress) return;

		setProgressBar(Math.round(progress[0].progress * 100));
	}, [progress]);

	useEffect(() => {
		if (!asset) return;
		if (!data) return;
		const videoObj: VideoInfo & _VideoMetadata = {
			seq_id: data.id,
			title: data.title,
			size: video?.size ?? 0,
			duration: Math.round(asset[0].videoSpec?.duration as number),
			playbackId: asset[0].playbackId as string,
			icon: data.uploadedLink,
			assetId: "", // complete later
			description: data.description,
		};
		onMoreVideos(videoObj);
		setTotalProgress(Progress.FILLING_FORM);
		clearForm();
	}, [asset, onMoreVideos]);

	const onVideoUpload = useCallback(async (videoFiles: File[]) => {
		setVideo(videoFiles[0]);

		const err = { ...errors };
		err.videoFile = null;
		setErrors(err);
	}, []);

	const onPosterUpload = useCallback(async (posterFiles: File[]) => {
		setPoster(posterFiles[0]);

		const err = { ...errors };
		err.posterFile = null;
		setErrors(err);
	}, []);

	const handleSubmit = async (e: FormEvent<NewCourseFormElements>) => {
		e.preventDefault();
		const { title, description } = e.currentTarget.elements;

		try {
			const result = await videoSchema.validate(
				{
					id,
					title: title.value,
					description: description.value,
					posterFile: poster,
					videoFile: video,
				},
				{ abortEarly: false },
			);
			setShowCard(true);
			const uploadedLink = await UploadToS3(
				poster,
				"NewCourse",
				`${expertId}/courses/${title.value}/videos`,
			);
			setPosterProgress(true);
			setData({
				...result,
				uploadedLink: uploadedLink,
			});
			setTotalProgress(Progress.UPLOADING_ASSETS);
			createAsset?.();
		} catch (error) {
			const errs: typeof errors = {};
			if (error instanceof ValidationError) {
				error.inner.forEach((item) => {
					errs[item.path!] = item.message;
				});
				setErrors(errs);
			}
		}
	};

	const handleChange = async (e: React.ChangeEvent<HTMLElement & { name: string }>) => {
		const err = { ...errors };
		err[e.target.name] = null;
		setErrors(err);
	};

	const clearForm = () => {
		formRef.current?.reset();
		// setVideo(null);
		setPoster(null);
		setData(null);
		setErrors({});
		setShowCard(false);
		setProgressBar(0);
	};

	const progressFormatted = useMemo(
		() =>
			progress?.[0].phase === "failed"
				? "Failed to process video."
				: progress?.[0].phase === "waiting"
				? "Waiting"
				: progress?.[0].phase === "uploading"
				? `Uploading...`
				: progress?.[0].phase === "processing"
				? `Processing... `
				: progress?.[0].phase === "ready"
				? "Success"
				: null,
		[progress],
	);

	return (
		<form
			ref={formRef}
			onSubmit={(e: React.FormEvent<any>) => handleSubmit(e)}
			className={` ${
				videoLength > 0 ? "rounded-l-none border-l-0" : ""
			} flex min-h-fit w-[33vw] max-w-[33vw] flex-col rounded-[14px]  border-2  border-[#404040]  p-[40px] font-Anek `}
		>
			<div className="flex w-full flex-row items-center justify-between">
				<div className="font-600 text-[24px] text-[#FFFFFF]">Upload video</div>
				<div>
					<IoClose
						className="cursor-pointer text-[30px] text-[#FFFFFF]"
						onClick={onClose}
					/>
				</div>
			</div>
			<h2 className="text-textxl font-semibold">
				#<output>{id}</output>
			</h2>
			<InputField
				label="Title"
				name="title"
				placeholder="Enter details..."
				disabled={totalProgress === Progress.UPLOADING_ASSETS}
				error={errors.title ?? null}
				onChange={handleChange}
			/>
			<TextArea
				label="Description"
				name="description"
				placeholder="Enter description..."
				disabled={totalProgress === Progress.UPLOADING_ASSETS}
				rows={4}
				error={errors.description ?? null}
				onChange={handleChange}
			/>
			<div className="flex w-full space-x-2">
				<div className="flex w-[50%] flex-col space-y-2">
					<Dropzone
						label="Upload a video:"
						name="video"
						fileTypes={{ "video/*": [] }}
						error={errors.videoFile ?? null}
						onDrop={onVideoUpload}
						disabled={totalProgress === Progress.UPLOADING_ASSETS}
					/>
					{showCard && (
						<ProgressBarCard
							videoSize={video?.size ?? 0}
							videoName={video?.name ?? ""}
							progressBar={progressBar}
							title=""
							description=""
							size={0}
							isProgressCard
							progressFormatted={progressFormatted ?? ""}
						/>
					)}
				</div>
				<div className="flex w-[50%] flex-col space-y-2">
					<Dropzone
						label="Upload a poster:"
						name="poster"
						fileTypes={{ "image/*": [] }}
						error={errors.posterFile ?? null}
						onDrop={onPosterUpload}
						disabled={totalProgress === Progress.UPLOADING_ASSETS}
					/>
					{showCard && (
						<ProgressBarCard
							videoSize={poster?.size ?? 0}
							videoName={poster?.name ?? ""}
							progressBar={posterProgress ? 100 : 0}
							title=""
							description=""
							size={0}
							isProgressCard
							progressFormatted={posterProgress ? "Success" : "Uploading..."}
						/>
						// <div className="flex h-full w-full max-w-full rounded-lg bg-[#ffffff25] p-4 shadow-md">
						// 	<div className="flex w-full items-center justify-center">
						// 		{isUploading ? (
						// 			<div
						// 				className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] text-[#AC85FF] motion-reduce:animate-[spin_1.5s_linear_infinite]"
						// 				role="status"
						// 			/>
						// 		) : imageUploaded ? (
						// 			<AiFillCheckCircle size={30} className="text-[#50d71e]" />
						// 		) : (
						// 			<div />
						// 		)}
						// 	</div>
						// </div>
					)}
				</div>
			</div>
			<div className="m-2 mt-auto flex flex-row">
				<Button2
					type="submit"
					text="Add more videos"
					className="ml-auto"
					disabled={totalProgress === Progress.UPLOADING_ASSETS}
				/>
			</div>
		</form>
	);
};

export default VideoForm;
