/* eslint-disable react/require-default-props */
import { skipToken } from "@reduxjs/toolkit/dist/query";
import Image from "next/image";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { walletAddressSelector } from "../../features/auth/auth.selectors";
import {
	useDeleteExpertCourseMutation,
	useGetExpertQuery,
	useGetSelfQuery,
} from "../../features/profile-page/expert/expert.api";
import { CONTRACT_STATUS, CourseInfo } from "../../features/types";
import CardContainerVertical from "../common/cards/cardContainerVertical";
import { Button5 } from "../common/form/button";
import PaymentHandler from "../util/payment/payment.handler";
import game from "../../public/main/game.png";

interface CourseCardProps {
	isSelf?: boolean;
	course: CourseInfo;
}

const CourseCardDataVertical = ({ course, isSelf = false }: CourseCardProps) => {
	const router = useRouter();

	const walletAddress = useSelector(walletAddressSelector);
	const { data: self } = useGetSelfQuery((walletAddress as string) ?? skipToken);
	const { data: expert } = useGetExpertQuery((course.owner as string) ?? skipToken);
	const [handleDelete] = useDeleteExpertCourseMutation();

	const courseConfirmed = course.status === CONTRACT_STATUS.confirmed;
	const courseSuccess = course.status === CONTRACT_STATUS.success;
	const isPurchased = self?.purchasedCourses.includes(course._id);

	console.log({ isSelf, courseSuccess });

	if (!course.status) return <div>error loading course</div>;
	if (!course.primaryCurrency) return <div>outdated course</div>;
	if (!expert) return <div>Something unexpected happened</div>;

	return (
		<CardContainerVertical className="min-h-max">
			<div className="flex h-full w-[350px] flex-col space-y-5">
				<Image
					// src={course.icon}
					// src={course.icon ?? "/images/placeholder.png"}

					src={game}
					alt="course-image!"
					width="0"
					height="0"
					sizes="100vw"
					className="aspect-video h-auto w-full rounded-2xl object-cover object-center"
				/>
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
					<h2 className="w-full truncate font-poppins text-text3xl font-bold text-card-header">
						{course.title}
					</h2>
					<ul className="max-h-[80px] list-inside list-disc overflow-y-scroll text-card-text">
						{course.videos?.map((item) => (
							<li className="w-full truncate">{item.title}</li>
						))}
					</ul>
				</div>
				{isSelf && courseSuccess && (
					<div className="w-full font-poppins text-[18px] font-bold leading-7 backdrop-blur-md">
						Please wait for the course to be approved
					</div>
				)}
				<div className="flex w-auto space-x-4">
					<Button5
						onClick={() => router.push(`/course/${course._id}`)}
						className="w-full font-poppins text-[18px] font-bold leading-7 backdrop-blur-md"
						text="View Details"
					/>
					{!isSelf && !isPurchased && courseConfirmed && (
						<Button5
							className="w-full font-poppins text-[18px] font-bold leading-7 backdrop-blur-md"
							text={
								<PaymentHandler
									text={`Buy - ${course.primaryAmount}`}
									details={{
										courseId: course._id,
										receiver: expert.walletAddress as `0x${string}`,
										price: {
											amount: course.primaryAmount,
											currency: course.primaryCurrency,
										},
									}}
								/>
							}
						/>
					)}
					{isPurchased && courseConfirmed && (
						<Button5
							onClick={() => router.push(`/dashboard/courses/${course._id}`)}
							className="w-full font-poppins text-[18px] font-bold leading-7 backdrop-blur-md"
							text="Go to course"
						/>
					)}
					{isSelf && !courseSuccess && (
						<Button5
							onClick={() => handleDelete(course._id)}
							className="w-full bg-red-600 font-poppins text-[18px] font-bold leading-7 backdrop-blur-md"
							text="Delete Course"
						/>
					)}
				</div>
			</div>
		</CardContainerVertical>
	);
};

export default CourseCardDataVertical;
