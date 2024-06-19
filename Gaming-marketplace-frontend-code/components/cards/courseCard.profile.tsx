import Image from "next/image";
import Link from "next/link";
import { CourseInfo } from "../../features/types";
import CardContainerVertical from "../common/cards/cardContainerVertical";

export interface ProfileCoursesCard {
	data: CourseInfo;
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

export const ProfileCoursesCard = ({ data }: ProfileCoursesCard) => {
	return (
		<CardContainerVertical className="h-max min-h-[250px] w-[20vw] min-w-[250px]">
			<Link href={`/dashboard/courses/${data._id}`}>
				<div className="flex justify-center">
					<PosterImage imageLink={data.icon} />
				</div>
				<div className="">
					<div className="text-textLarge">{data.title}</div>
					<div className="text-textMedium text-[#757575]">
						{data.users.length} Players Purchased
					</div>
				</div>
			</Link>
		</CardContainerVertical>
	);
};
