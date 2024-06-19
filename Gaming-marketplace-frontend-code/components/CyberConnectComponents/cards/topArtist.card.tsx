import Image from "next/image";

interface TopArtistCardProps {
	img: string;
	name: string;
	followers: number;
	pos: number;
}

const TopArtistCard = ({ img, name, followers, pos }: TopArtistCardProps) => {
	return (
		<div className="relative aspect-square w-[250px] min-w-[250px] rounded-[20px] border border-[#212121] bg-[#111111] p-6 duration-150 hover:scale-110 hover:bg-[#212121]">
			<div className="absolute rounded-[50%] bg-black px-2 text-textMedium2 text-white">
				{pos}
			</div>
			<div className="flex flex-col items-center space-y-6 rounded">
				<Image
					src={img}
					alt="user"
					height={0}
					width={0}
					sizes="100vw"
					className="aspect-square w-[120px] rounded-full"
				/>
				<div className="text-center">
					<span className="text-textMedium2 font-[600]">{name}</span>
					<div className="flex justify-between space-x-2 font-poppins text-textMedium2 font-light text-gray-400 ">
						<span className="text-card-text">Total Sales:</span>
						<span className="bg-gradient-to-r from-[#296BBD] to-[#AC85FF] bg-clip-text font-[400] text-transparent">
							100 ETH
						</span>
					</div>
				</div>
				<div className="w-full flex-grow">
					<button
						type="button"
						className="w-full rounded-2xl bg-gradient-to-r from-[#296BBD] to-[#AC85FF] py-3 font-[700] text-white"
					>
						Follow
					</button>
				</div>
			</div>
		</div>
	);
};

export default TopArtistCard;
