import Image from "next/image";
import BNBIcon from "../../assets/icons/bnb.svg";
import RewardIcon from "../../assets/icons/diamond.svg";
import ETHIcon from "../../assets/icons/eth.svg";
import { rewardType } from "../../constants/quest/reward";
import { FC } from "react";

interface Props {
	// RewardType:rewardType,
	RewardName:string,
	amount:number,
	Gems:number,
	chainName:string,

}
const RewardBox:FC<Props> = ({amount,RewardName,Gems,chainName}) => {
	return (
		<div className="flex w-full flex-col gap-5 rounded-2xl border-[#212121] bg-[#111] p-6 text-textMedium3 lg:text-textMedium2">
			<div className="flex w-full gap-8">
				<div className="flex w-full flex-col items-center gap-2 rounded-2xl bg-[#212121] p-3">
					<span className="mb-2 ml-3 self-start font-semibold text-white">{RewardName}</span>
					<div className="flex items-center gap-2 rounded-lg bg-[#2C2C2C] px-4 py-3">
						<div className="rounded bg-[#373737] p-1">
							<Image src={ETHIcon} alt="coin" />
						</div>
						<div className="whitespace-nowrap">{amount}</div>
					</div>
				</div>

				<div className="flex w-full flex-col items-center gap-2 rounded-2xl bg-[#212121] p-3">
					<span className="mb-2 ml-3 self-start font-semibold text-white">Gems</span>
					<div className="flex items-center gap-2 rounded-lg bg-[#2C2C2C] px-4 py-3 ">
						<div className="rounded bg-[#373737] p-1">
							<Image src={RewardIcon} alt="coin" />
						</div>
						<div>{Gems}</div>
					</div>
				</div>
			</div>
			<div className="flex justify-center">
				<div className="flex items-center justify-center gap-2 rounded-lg bg-[#212121] px-4 py-2">
					<Image src={BNBIcon} width={20} height={20} alt="coin" />
					{chainName}
				</div>
			</div>
		</div>
	);
};
export default RewardBox;
