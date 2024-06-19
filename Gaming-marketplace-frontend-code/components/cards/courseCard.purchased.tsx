import { skipToken } from "@reduxjs/toolkit/dist/query";
import Image from "next/image";
import Link from "next/link";
import { useGetExpertQuery } from "../../features/profile-page/expert/expert.api";
import { CourseInfo } from "../../features/types";
import CardContainerVertical from "../common/cards/cardContainerVertical";

export interface PurchasedCoursesCard {
	data: CourseInfo & { username: string };
}

interface PosterImageProps {
	imageLink: string;
}

const PosterImage = ({ imageLink }: PosterImageProps) => {
	return (
		<Image
			src={imageLink}
			alt="noImage"
			width="0"
			height="0"
			sizes="w-fit"
			className="aspect-video h-auto w-full rounded-xl"
		/>
	);
};

export const PurchasedCoursesCard = ({ data }: PurchasedCoursesCard) => {
	const { data: expert } = useGetExpertQuery((data.owner as string) ?? skipToken);
	return (
		<CardContainerVertical className="w-[20vw]">
			<Link href={`/dashboard/courses/${data._id}`}>
				<div className="flex justify-center">
					<PosterImage imageLink={data.icon} />
				</div>
				<div className="">
					<div className="text-textLarge">{data.title}</div>
					<div className="text-textMedium2 text-card-header2">By {expert?.username}</div>
					<div className="text-textMedium2 text-[#757575]">{data.description}</div>
				</div>
			</Link>
		</CardContainerVertical>
	);
};
