/* eslint-disable react/require-default-props */
import Image from "next/image";
import { useRouter } from "next/router";
import { ExpertInfo } from "../../features/types";
import CardContainerHorizontal from "../common/cards/cardContainerHorizontal";

interface CardProps {
	innerRef?: any;
	expert: ExpertInfo;
}

const ExpertCardHorizontal = ({ expert, innerRef }: CardProps) => {
	const router = useRouter();
	if (!expert) return <div>Loading...</div>;

	return (
		<CardContainerHorizontal
			onClick={() => router.push(`/expert/${expert._id}`)}
			className="rounded-lg border-2 border-[#3F3F3F] bg-card-graybody bg-opacity-5 bg-clip-padding p-6 backdrop-blur-[36.5px] backdrop-filter hover:cursor-pointer"
		>
			<div ref={innerRef} className="flex h-fit w-[80%] space-x-4">
				<Image
					src={expert.icon}
					alt="expert-image!"
					width="0"
					height="0"
					sizes="100vw"
					className="aspect-square w-[10rem] rounded-md"
				/>
				<div className="flex w-fit flex-col space-y-1 ">
					<h1 className="text-lg font-poppins text-textLarge tracking-wide !text-card-header">
						{expert.username}
					</h1>
					<h3 className="line-clamp-3 w-fit text-ellipsis font-sans tracking-wide text-gray-500">
						{expert.about ??
							"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."}
					</h3>
					{expert.courses && expert.courses.length > 0 && (
						<span className="text-base mt-auto w-fit rounded-lg bg-white bg-opacity-10 px-3 py-2">
							{expert.courses.length} Courses
						</span>
					)}
				</div>
			</div>
		</CardContainerHorizontal>
	);
};

export default ExpertCardHorizontal;
