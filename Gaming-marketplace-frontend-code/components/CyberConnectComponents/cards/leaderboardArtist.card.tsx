import Image from "next/image";
import { GradientBtn } from "../buttons";

interface TileProps {
	index: number;
	img: string;
	name: string;
	change: number;
	nfts: number;
	volume: string;
	isFollowing: boolean;
	handle: string;
	onFollow: (k: string) => void;
}

const ArtistTile = ({
	change,
	img,
	index,
	name,
	nfts,
	volume,
	handle,
	isFollowing,
	onFollow,
}: TileProps) => {
	return (
		<div className="flex h-[90px] w-full items-center rounded-[20px] border border-[#363636] bg-[#212121] px-12 text-textMedium2">
			{/* <div className="flex w-full items-center"> */}
			<span className="w-[5%] text-start">
				<div className="w-fit rounded-full bg-[#111111] px-2">{index}</div>
			</span>
			<span className="flex w-[35%] items-center space-x-5 text-start">
				<Image
					src={img}
					alt="img"
					height={0}
					width={0}
					sizes="100vw"
					className="aspect-square h-auto w-[50px] rounded-full"
				/>
				<span className="text-textMedium3 font-[600]">{name}</span>
			</span>
			<span
				className={`w-[15%] text-start text-textMedium2 ${
					change > 0 ? "text-green-500" : "text-red-500"
				}`}
			>
				{change > 0 ? `+${change}%` : `${change}%`}
			</span>
			<span className="w-[15%] text-start font-mono">{nfts}</span>
			<span className="w-[15%] text-start text-textMedium2 text-green-500">{volume}</span>
			{/* </div> */}
			<div className="w-[15%]">
				<GradientBtn
					title={isFollowing ? "Following" : "Follow"}
					className="m-[1px]  !bg-[#212121] px-5 text-textMedium3 font-[700]"
					onClick={() => onFollow(handle)}
				/>
			</div>
		</div>
	);
};

export default ArtistTile;
