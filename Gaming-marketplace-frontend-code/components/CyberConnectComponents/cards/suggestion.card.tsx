import Image from "next/image";
import { GradientBtn } from "../buttons";

interface SuggestionCardProps {
	img: string;
	name: string;
	followers: number;
}

const SuggestionCard = ({ img, name, followers }: SuggestionCardProps) => {
	return (
		<div className="flex w-[190px] flex-col items-center justify-between rounded-xl bg-[#111111] px-4 py-4">
			<div className="mb-3">
				<Image src={img} alt="user" height="80" width="80" className="rounded-full" />
			</div>
			<span className="mb-2 flex flex-row justify-between font-poppins text-textMedium2">
				{name}
			</span>
			<div className="mb-5 flex flex-row justify-between font-poppins text-textSmall text-gray-400">
				Followers:{" "}
				<span className="ml-3 bg-gradient-to-r from-[#296BBD] to-[#AC85FF] bg-clip-text font-semibold text-transparent">
					{followers}
				</span>
			</div>
			<div className="w-full">
				<GradientBtn title="Follow" />
			</div>
		</div>
	);
};

export default SuggestionCard;
