import { useRouter } from "next/router";
import { CourseInfo } from "../../features/types";
import CardContainerHorizontal from "../common/cards/cardContainerHorizontal";

interface CardProps {
	course: CourseInfo;
}

const CourseCardHorizontal = ({ course }: CardProps) => {
	const router = useRouter();
	if (!course) return <div>Loading...</div>;

	return (
		<CardContainerHorizontal
			onClick={() => router.push(`/course/${course._id}`)}
			className="rounded-lg border-2 border-[#3F3F3F] bg-card-graybody bg-opacity-5 bg-clip-padding px-4 py-4 backdrop-blur-[36.5px] backdrop-filter hover:cursor-pointer"
		>
			<div className="flex h-fit w-[80%] space-x-4">
				{/* <Image
					src={course.icon}
					alt="course-image!"
					width="0"
					height="0"
					sizes="100vw"
					className="aspect-square w-[10rem] rounded-md"
				/> */}
				<div className="flex w-full flex-col space-y-2 truncate">
					<h1 className="truncate font-poppins text-textLarge tracking-wide !text-card-header">
						{course.title}
					</h1>
					<h3 className="flex-grow truncate font-sans tracking-wide text-gray-500">
						{course.description ?? "Oops, it seems there is no desciption"}
					</h3>
					{course.users && course.users.length > 0 && (
						<span className="text-base w-fit rounded-lg bg-white bg-opacity-10 px-3 py-2">
							{course.users.length} users enrolled!
						</span>
					)}
				</div>
			</div>
		</CardContainerHorizontal>
	);
};

export default CourseCardHorizontal;
