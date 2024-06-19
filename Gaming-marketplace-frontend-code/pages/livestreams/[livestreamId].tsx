import { Player, useStream } from "@livepeer/react";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import { format, parseISO } from "date-fns";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { RiPencilFill } from "react-icons/ri";
import avatar from "../../assets/avatar.png";
import { Button5 } from "../../components/common/form/button";
import NewReviewForm from "../../components/forms/newReviews/review.form";
import { useGetExpertQuery } from "../../features/profile-page/expert/expert.api";
import { useGetLivestreamByIdQuery } from "../../features/profile-page/livestream/livestream.api";

const delay = (ms: number | undefined) => new Promise((resolve) => setTimeout(resolve, ms));

const Livestream = () => {
	const router = useRouter();
	const { livestreamId } = router.query;
	const [playbackID, setPlaybackID] = useState<string>("");
	const [isStreamActive, setStreamActive] = useState(false);
	const [streamId, setStreamId] = useState<string>("");
	const [openReview, setOpenReview] = useState(false);

	const { data: stream2 } = useStream({
		streamId,
		refetchInterval: (stream2) => (!stream2?.isActive ? 1000 : false),
	});

	const {
		data: livestream,
		isLoading,
		isError,
	} = useGetLivestreamByIdQuery((livestreamId as string) ?? skipToken);

	const { data: expert } = useGetExpertQuery((livestream?.owner as string) ?? skipToken);

	useEffect(() => {
		if (expert) {
			setStreamId(expert.stream.id);
		}
	}, [expert]);

	async function makeRequest() {
		await delay(30000);
		setStreamActive(true);
		setPlaybackID(stream2?.playbackId ?? "");
	}

	useEffect(() => {
		if (stream2?.isActive === true) {
			makeRequest();
		}
	}, [stream2]);

	if (isLoading)
		return (
			<h1 className="text-2xl mb-auto mt-auto text-center font-semibold ">
				Searching for the Live Stream...
			</h1>
		);

	if (isError) {
		return (
			<h1 className="text-2xl mb-auto mt-auto text-center font-semibold">
				Live Stream not found
			</h1>
		);
	}

	if (!livestream)
		return (
			<h1 className="text-2xl mb-auto mt-auto text-center font-semibold">
				Something unexpected happened
			</h1>
		);

	return (
		<div className="flex flex-col space-y-4 divide-y-2 overflow-x-hidden overflow-y-scroll px-4 pl-8 pt-[10vh]">
			<div className="space-y-4">
				{!livestream?.playbackId && isStreamActive && (
					<div className="z-10">
						<div className="relative mx-auto mt-5 text-header3">
							<Player
								title={expert?.username + "(Host)"}
								autoPlay
								muted
								playbackId={playbackID}
								poster={livestream.icon}
								theme={{
									borderStyles: { containerBorderStyle: "solid" },
									radii: { containerBorderRadius: "10px" },
								}}
							/>
						</div>
					</div>
				)}
				{!isStreamActive && (
					<div className="relative mx-auto mt-5 w-full">
						<h1 className="absolute left-[40%] top-2/4 text-center text-text3xl font-[500]">
							Stream is not Active Yet
						</h1>
						<Image
							src={livestream.icon}
							height={0}
							width={0}
							sizes="100vw"
							alt="Stream Not Active Thumbnail"
							className="aspect-video h-auto w-full rounded-[10px] object-fill"
						/>
					</div>
				)}
				<div className="flex space-y-1">
					<div>
						<div className="font-courseFont text-text2xl font-[500]">
							Livestream Course : {livestream.title}
						</div>
						<div className="font-courseFont text-textLarge font-[500] text-card-text">
							{format(parseISO(livestream.streamStart), "do' 'MMMM', 'yyyy")}
						</div>
					</div>
					<Button5
						text={
							<div className="flex items-center space-x-2 font-poppins text-textMedium2">
								<RiPencilFill /> <span>Write a review</span>
							</div>
						}
						onClick={() => setOpenReview(true)}
						className="ml-auto self-start"
					/>
					{openReview && (
						<NewReviewForm
							onClose={() => setOpenReview(false)}
							onResult={() => setOpenReview(false)}
							id={livestream._id}
							type="Livestream"
						/>
					)}
				</div>
			</div>

			<div className="pt-4 font-poppins">
				<div className="flex items-center space-x-4">
					<Image
						src={expert?.icon || avatar}
						height={100}
						width={100}
						className="h-[90px] w-[90px] rounded-full"
						alt="User Image"
					/>
					<div className="text-textLarge font-[500]">{expert?.username}</div>
				</div>
				<div className="space-y-1 pl-[calc(90px+16px)] ">
					<div className="font-courseFont text-textLarge font-[500]">
						Description of livestream
					</div>
					<div className=" font-courseFont text-textMedium3 font-[500] text-card-text">
						{livestream?.description}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Livestream;
