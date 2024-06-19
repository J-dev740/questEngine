import Image from "next/image";

import leaderboardBanner from "../../public/leaderboard.png";
import { getAvatarSrc } from "../../services/helper";

const LeaderboardTable = (props: any) => {
	const { activeData, indexing } = props;

	return (
		<div>
			<div className="m-0">
				<Image
					src={leaderboardBanner}
					className="relative h-[400px] w-full rounded-[30px] bg-[##212121] object-fill p-4"
					alt="Quest-Banner"
					width={0}
					height={0}
				/>
			</div>
			<div className="items-evenly flex w-full flex-col justify-center gap-5">
				<div className="flex flex-row gap-[4px] rounded-[25px]  border-b-[1px] border-[#363636] bg-[#212121] p-[25px]">
					<span className="flex flex-[0.9] items-center justify-center"> # </span>
					<span className="flex flex-[2.3] items-center">#Members</span>
					<span className="flex flex-[1.2] items-center">Gems</span>
					{/* <span className="flex flex-[1.2] items-center">NFTs Sold</span>
				<span className="flex flex-[1.2] items-center">Volume</span>
				<span className="flex flex-[0.8] items-center"> </span> */}
				</div>
				{activeData &&
					activeData?.map((rank: any, i: number) => (
						<div
							key={rank.key}
							className="flex flex-row gap-[4px] rounded-[25px] border-b-[1px] border-[#212121] bg-[#111111] p-[25px]"
						>
							<span className="flex flex-[0.9] items-center justify-center   ">
								<div className="flex h-[40px] items-center justify-center rounded-[50%] bg-[#212121] p-4">
									{i + 1 + indexing}
								</div>
							</span>
							<span className="flex flex-[2.3] items-center justify-start gap-[5px]">
								<Image
									className="h-14 w-14 rounded-[50%]"
									src={rank.icon ?? getAvatarSrc(rank.walletAddress)}
									alt="Rank Avatar"
									width="0"
									height="0"
									sizes="100vw"
								/>
								<span className="flex flex-col gap-[2px]">
									<h1>{rank?.username}</h1>
								</span>
							</span>
							<span className="flex flex-[1.2] items-center">{rank.gems}</span>
						</div>
					))}
			</div>
		</div>
	);
};

export default LeaderboardTable;
