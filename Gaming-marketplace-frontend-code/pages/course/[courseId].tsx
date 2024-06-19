import { skipToken } from "@reduxjs/toolkit/dist/query";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import VideoLessonAccordion from "../../components/accordions/video.accordion";
import ReviewCard from "../../components/cards/reviewCard";
import Header from "../../components/course/header";
import UpdatePayOptionsForm from "../../components/forms/updatePayOptions/payOptions.form";
import CoursesAbout from "../../components/profile/coursesAbout";
import TabGroup2 from "../../components/util/tabGroup";
import { useGetLanguagesQuery } from "../../features/misc/misc.api";
import { useGetCourseByIdQuery } from "../../features/profile-page/course/courses.api";
import { useGetExpertQuery } from "../../features/profile-page/expert/expert.api";
import { useGetGameQuery } from "../../features/profile-page/games/game.api";

const CoursePage = () => {
	const router = useRouter();
	const { courseId } = router.query;
	const {
		data: course,
		isLoading,
		isError,
	} = useGetCourseByIdQuery((courseId as string) ?? skipToken);
	const { data: game } = useGetGameQuery((course?.game as string) ?? skipToken);
	const { data: languages } = useGetLanguagesQuery();
	const { data: owner } = useGetExpertQuery((course?.owner as string as string) ?? skipToken);
	// const [preview, setPreview] = useState(0);
	const [openPayOptions, setOpenPayOptions] = useState(false);

	// useEffect(() => {
	// 	if (course?.videos) {
	// 		if (course?.videos?.length <= 1) {
	// 			setPreview(0);
	// 		} else if (course?.videos?.length === 2) {
	// 			setPreview(1);
	// 		} else {
	// 			setPreview(2);
	// 		}
	// 	}
	// }, [course]);

	if (isLoading)
		return (
			<h1 className="text-2xl mb-auto mt-auto text-center font-semibold ">
				Searching for the course...
			</h1>
		);
	if (isError)
		return (
			<h1 className="text-2xl mb-auto mt-auto text-center font-semibold">
				Course not found {"<Insert 404 page>"}
			</h1>
		);
	if (!course || !owner)
		return (
			<h1 className="text-2xl mb-auto mt-auto text-center font-semibold">
				Something unexpected happened
			</h1>
		);

	return (
		<div className="relative overflow-y-scroll pl-6">
			<Head>
				<title>Course - {course.title}</title>
			</Head>
			<div>
				<Header
					name={course.title}
					owner={owner}
					primaryPrice={course.primaryAmount}
					primaryCurrency={course.primaryCurrency}
					handlePayOptions={() => setOpenPayOptions(true)}
				/>
				{openPayOptions && (
					<UpdatePayOptionsForm
						_expertId={course.owner}
						courseId={course._id}
						prevPrimaryCurrency={course.primaryCurrency}
						prevPayOptions={course.prices}
						onClose={() => setOpenPayOptions(false)}
						onResult={() => setOpenPayOptions(false)}
					/>
				)}
				<div className="w-full flex-col space-y-28 px-20 pb-20">
					<TabGroup2
						className="mt-[-150px]"
						Tab1Title="About"
						Tab2Title="Reviews"
						Tab1Content={
							<CoursesAbout
								details={{
									status: course.status,
									courseId: course._id,
									ownerWallet: owner?.walletAddress as `0x${string}`,
									primaryAmount: course.primaryAmount,
									primaryCurrency: course.primaryCurrency,
								}}
								data={[
									{
										field: "Description",
										content: `${course.description}`,
									},
									{
										field: "Offered games",
										content: (
											<div className="w-fit rounded-full bg-gray-500 p-1 px-2 font-poppins text-textMedium2 text-white backdrop-blur-lg">
												{game?.title}
											</div>
										),
									},
									{
										field: "Languages",
										content: `${
											languages?.find((item) => item._id === "")?.name
										}`,
									},
								]}
							/>
						}
						Tab2Content={
							<ReviewCard data-tab-title="Reviews" id={course._id} type="Course" />
						}
					/>
					<div className="flex w-full flex-col space-y-6">
						<div className="flex flex-row justify-between">
							<h2 className="my-4 font-Anek text-header1 font-bold leading-[70px] text-white">
								Video Lessons
							</h2>
							<div className="font-500 mr-4 flex items-end font-poppins text-[20px]">
								Total {course.videos?.length} Videos
							</div>
						</div>
						<VideoLessonAccordion courseId={courseId} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default CoursePage;
