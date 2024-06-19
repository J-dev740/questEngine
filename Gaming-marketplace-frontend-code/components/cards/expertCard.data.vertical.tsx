/* eslint-disable react/require-default-props */
import Image from "next/image";
import { useRouter } from "next/router";
import { ExpertDiscoverInfo } from "../../features/types";
import CardContainerVertical from "../common/cards/cardContainerVertical";
import { Button5 } from "../common/form/button";

interface ExpertCardProps {
	expert: ExpertDiscoverInfo;
}

const ExpertCardDataVertical = ({ expert }: ExpertCardProps) => {
	const router = useRouter();

	// const walletAddress = useSelector(walletAddressSelector);
	// const { data: self } = useGetSelfQuery((walletAddress as string) ?? skipToken);
	// const { data: expert } = useGetExpertQuery((course.owner as string) ?? skipToken);

	return (
		<CardContainerVertical className="min-h-max">
			<div className="flex h-full w-[350px] flex-col space-y-5">
				<div className="flex flex-row justify-start">
					<Image
						src={expert.owner.icon} // change this later on
						alt="course-image!"
						width="100"
						height="100"
						className="mr-10 aspect-square h-auto rounded-2xl"
					/>
					<div className="flex flex-col">
						<span className="text-textLarge font-semibold lg:text-textxl">
							{expert.owner.username}
						</span>
						<span className="text-textMedium">{expert.owner.about}</span>
					</div>
				</div>

				<div className="relative flex space-x-4 font-poppins text-textMedium text-card-pill">
					<p className="w-5/12 rounded-xl border border-card-border-child p-1 text-center font-semibold leading-7">
						{expert.owner.courses?.length} LESSONS
					</p>
					<p className="w-7/12 rounded-xl border border-card-border-child p-1 text-center font-semibold leading-7">
						{expert.owner.livestreams?.length} LIVESTREAMS
					</p>
				</div>
				<div className="max-h-full w-full flex-grow overflow-y-hidden">
					<h2 className="w-full truncate font-poppins text-textLarge font-bold text-card-header lg:text-textxl">
						Courses
					</h2>
					<ul className="max-h-[80px] list-inside list-disc overflow-y-scroll text-card-text">
						{expert.owner.courses?.map((item) => (
							<li className="w-full truncate">{item.title}</li>
						))}
					</ul>
				</div>
				<div className="flex w-auto space-x-4">
					<Button5
						onClick={() => router.push(`/expert/${expert.owner._id}`)}
						className="w-full font-poppins text-textMedium2 font-bold leading-7 backdrop-blur-md lg:text-[18px]"
						text="View Details"
					/>
				</div>
			</div>
		</CardContainerVertical>
	);
};

export default ExpertCardDataVertical;
