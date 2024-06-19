import Image from "next/image";

interface VideoCardProps {
	links: string;
	length: number;
	img: any;
	title: string;
	handlePlaybackId: (message: string, links: string, id: string) => void;
	playbackId: string;
	duration: number;
	id: string;
	selectedId: string;
}

interface PosterImageProps {
	imageLink: string;
}

const PosterImage = ({ imageLink }: PosterImageProps) => {
	return (
		<Image
			src={imageLink}
			// src={img}
			alt="noImage"
			className="aspect-[16/10] h-auto w-full rounded-xl object-cover  object-center "
			width="0"
			height="0"
			sizes="w-full"
		/>
	);
};

const handleDuration = (duration: number) => {
	const date = new Date(0);
	date.setSeconds(duration); // specify value for SECONDS here
	const timeString = date.toISOString().substring(11, 19);

	return timeString;
};

const VideoCard = ({
	links,
	img,
	length,
	title,
	handlePlaybackId,
	playbackId,
	duration,
	id,
	selectedId,
}: VideoCardProps) => {
	const ab = selectedId === id ? "border-yellow-400" : "border-transparent";
	return (
		<div
			className={`relative flex w-full cursor-pointer   flex-col object-contain px-4 `}
			onClick={() => handlePlaybackId(playbackId, links, id)}
		>
			<div className={`rounded-xl border-2 ${ab}`}>
				<PosterImage imageLink={links} />

				<div className=" flex h-full w-full flex-col justify-between  object-contain  ">
					<div className="flex w-full justify-end font-poppins text-textMedium2 font-[500]">
						<div className="absolute right-6 top-2 flex w-[75px] justify-center rounded-full bg-gray-400 backdrop-blur-lg">
							{handleDuration(duration)}
						</div>
					</div>
					<div className="absolute bottom-2 left-6 w-full  overflow-hidden   text-clip text-left ">
						<span className=" overflow-clip ">
							Video {length}- {title}
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default VideoCard;
