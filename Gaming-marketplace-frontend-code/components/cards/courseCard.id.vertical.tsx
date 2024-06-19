import { skipToken } from "@reduxjs/toolkit/dist/query";
import Image from "next/image";
import { useRouter } from "next/router";
import { useGetCourseByIdQuery } from "../../features/profile-page/course/courses.api";
import { useGetExpertQuery } from "../../features/profile-page/expert/expert.api";
import CardContainerVertical from "../common/cards/cardContainerVertical";
import { Button5 } from "../common/form/button";

interface CourseCardProps {
	courseId: string;
}

const CourseCardIdVertical = ({ courseId }: CourseCardProps) => {
	const {
		data: course,
		isLoading,
		isError,
	} = useGetCourseByIdQuery((courseId as string) ?? skipToken);
	const { data: expert } = useGetExpertQuery((course?.owner as string) ?? skipToken);
	const router = useRouter();

	if (isLoading)
		return <h1 className="mb-auto mt-auto text-center">Searching for the course...</h1>;
	if (isError)
		return (
			<h1 className="mb-auto mt-auto text-center">Expert not found {"<Insert 404 page>"}</h1>
		);
	if (!course)
		return <h1 className="mb-auto mt-auto text-center">Something unexpected happened</h1>;
	return (
		<CardContainerVertical className="min-h-max">
			<div className="flex h-full w-[350px] flex-col space-y-5">
				<div className="flex w-full items-start space-x-3">
					<Image
						src={course.icon}
						alt="course-image!"
						width="0"
						height="0"
						sizes="100vw"
						className="aspect-square h-auto w-4/12 rounded-2xl"
					/>
					<div className="w-8/12 space-y-1">
						<h2 className="truncate font-poppins text-textLarge font-bold text-card-header">
							{expert?.username}
						</h2>
						<p className="line-clamp-3 text-ellipsis font-poppins text-textMedium2 font-light text-card-text">
							{expert?.about ??
								"In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available."}
						</p>
					</div>
				</div>
				<div className="relative flex space-x-4 font-poppins text-textMedium text-card-pill">
					<p className="w-5/12 rounded-xl border border-card-border-child p-1 text-center font-semibold leading-7">
						{course.videos?.length} LESSONS
					</p>
					<p className="w-7/12 rounded-xl border border-card-border-child p-1 text-center font-semibold leading-7">
						{Math.round(
							(course.videos?.reduce((acc, curr) => acc + (curr.duration ?? 0), 0) ??
								0) / 60,
						)}{" "}
						HOURS OF VIDEOS
					</p>
				</div>
				<div className="max-h-full w-full flex-grow overflow-y-hidden">
					<h2 className="font-poppins text-text3xl font-bold text-card-header">
						Courses
					</h2>
					<ul className="max-h-[80px] w-full list-inside list-disc overflow-y-scroll text-card-text">
						{course.videos?.map((item) => (
							<li className="w-full truncate">{item.title}</li>
						))}
					</ul>
				</div>
				<div className="flex w-auto space-x-4">
					<Button5
						className="w-full font-poppins text-[18px] font-bold leading-7 backdrop-blur-md"
						text="View Details"
						onClick={() => router.push(`/course/${course._id}`)}
					/>
				</div>
			</div>
		</CardContainerVertical>
	);
};

export default CourseCardIdVertical;
