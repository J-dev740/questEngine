import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { RxEnterFullScreen, RxLink2 } from "react-icons/rx";
import CardContainerVertical from "../common/cards/cardContainerVertical";

interface Props {
	data: {
		owner: { _id: string; username: string };
		game: { _id: string; title: string };
		_id: string;
		icon: string;
	};
}

const LivestreamCardData = ({ data }: Props) => {
	const router = useRouter();
	return (
		<Link href={`/livestreams/${data._id}`}>
			<CardContainerVertical className="min-h-max w-80 min-w-[25rem]">
				<div className="space-y-6">
					<div className="flex justify-center">
						<Image
							src={data.icon}
							alt="noImage"
							width="0"
							height="0"
							sizes="100vw"
							className="aspect-[16/10] h-auto w-full rounded-2xl"
						/>
					</div>
					<div className="w-full space-y-2 ">
						<div className="flex w-full items-center space-x-1 font-poppins text-textLarge font-[600]">
							<span className="max-w-[80%] truncate">{data.owner.username}</span>
							<Link href={`/expert/${data.owner._id}`}>
								<RxLink2 className="text-textLarge" />
							</Link>
							<RxEnterFullScreen
								style={{ marginLeft: "auto" }}
								className="font-[500] hover:cursor-pointer"
								onClick={() => router.push(`/livestreams/${data._id}`)}
							/>
						</div>
						<div className="font-poppins text-textMedium3 font-[500] text-card-header2">
							{data.game.title}
						</div>
					</div>
				</div>
			</CardContainerVertical>
		</Link>
	);
};

export default LivestreamCardData;
