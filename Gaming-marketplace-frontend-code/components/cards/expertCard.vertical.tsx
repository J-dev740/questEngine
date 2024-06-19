import Image from "next/image";
import { useRouter } from "next/router";
import { ExpertInfo } from "../../features/types";

interface CardProps {
	expert: ExpertInfo;
}

const ExpertCardVertical = ({ expert }: CardProps) => {
	const router = useRouter();
	if (!expert) return <div>Loading...</div>;

	return (
		<div
			onClick={() => router.push(`/expert/${expert._id}`)}
			className="flex h-fit max-h-max w-fit min-w-fit flex-col gap-6 rounded-[16px] border-2 border-white bg-[#ffffff0c] p-10 backdrop-blur-lg"
		>
			<Image
				src={expert.icon}
				alt="expert-image!"
				width="0"
				height="0"
				sizes="100vw"
				className="h-[236px] w-[356px] rounded-[16px]"
			/>
			<div className="font-600 font-poppins text-[24px] leading-[36px]  ">
				{expert.username}
			</div>
			{expert.courses && expert.courses.length > 0 ? (
				<div className="font-500 font-poppins text-[16px] leading-[24px] text-[#757575]">
					Total courses - {expert.courses.length}
				</div>
			) : (
				<div className="font-500 font-poppins text-[16px] leading-[24px] text-[#757575]">
					Total courses - 0
				</div>
			)}
		</div>
	);
};

export default ExpertCardVertical;
