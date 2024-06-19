/* eslint-disable react/require-default-props */

import { useState } from "react";
import { AiFillCheckCircle } from "react-icons/ai";
import { BsImage } from "react-icons/bs";
import { ProgressBar } from "../form/utils/progressBar";

interface CardProps {
	videoSize: number;
	videoName: string;
	progressBar: number;
	isProgressCard: boolean;
	title: string;
	description?: string;
	size: number;
	progressFormatted: string;
}

function formatBytes(bytes: number, decimals = 2) {
	if (!+bytes) return "0 Bytes";

	const k = 1024;
	const dm = decimals < 0 ? 0 : decimals;
	const sizes = ["Bytes", "KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"];

	const i = Math.floor(Math.log(bytes) / Math.log(k));

	return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

const ProgressBarCard = ({
	videoSize,
	videoName,
	progressBar,
	isProgressCard,
	title,
	description,
	size,
	progressFormatted,
}: CardProps) => {
	const [error, setError] = useState(false);
	const tempWidth = isProgressCard ? "" : "w-[20vw]";

	if (progressFormatted === "Failed to process video.") {
		setError(true);
	}

	return (
		<div>
			{!error && isProgressCard && (
				<div
					className={`${tempWidth} flex max-w-full rounded-lg border-form-child-border bg-form-child-bg p-4 shadow-md`}
				>
					<div className="w-full ">
						<div className="flex w-full items-center space-x-2">
							<BsImage size={20} />
							<h3 className="text-2xl max-w-full flex-grow truncate font-semibold">
								{videoName}
							</h3>
							{progressFormatted === "Success" && progressBar === 100 && (
								<AiFillCheckCircle size={20} className="text-[#50d71e]" />
							)}
						</div>
						<div className="ml-5">
							<div className="space-y-2">
								<p className="text-[#ffffff]">
									{formatBytes(videoSize)} - {progressFormatted}
								</p>
								<div className="flex">
									<ProgressBar progressBar={progressBar} />

									<div>{progressBar}%</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}

			{!error && !isProgressCard && (
				<div
					className={`${tempWidth} flex max-w-full rounded-lg border-form-child-border bg-form-child-bg p-4 shadow-md`}
				>
					<div className="w-100 flex">
						<div className="mr-2 mt-1">
							<BsImage size={15} />
						</div>

						<div className="ml-0">
							<div className="space-y-2">
								<h3 className="text-2l overflow-hidden text-ellipsis font-semibold">
									{title}
								</h3>
								<p className="text-gray-600">{formatBytes(size)}</p>
							</div>
						</div>
					</div>
				</div>
			)}
			{error && (
				<div
					className={`${tempWidth} flex max-w-full rounded-lg bg-[#ffffff25] p-4 shadow-md`}
				>
					<div className="w-100 flex">
						<div className="mr-2 mt-1">
							<BsImage size={15} className="text-[#D92D20]" />
						</div>

						<div className="ml-0">
							<div className="space-y-2">
								<h3 className="text-2l overflow-hidden text-ellipsis font-semibold text-[#FF584D]">
									{title}
								</h3>
								<p className="text-[#D92D20]">{progressFormatted}</p>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default ProgressBarCard;
