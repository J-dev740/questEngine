import { Player } from "@livepeer/react";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import { format } from "date-fns";
import parseISO from "date-fns/parseISO";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { RiPencilFill } from "react-icons/ri";
import { useSelector } from "react-redux";
import VideoCard from "../../../components/common/cards/video.card";
import { Button5 } from "../../../components/common/form/button";
import NewReviewForm from "../../../components/forms/newReviews/review.form";
import { walletAddressSelector } from "../../../features/auth/auth.selectors";
import { useGetCourseByIdQuery } from "../../../features/profile-page/course/courses.api";
import game from "../../../public/main/game.png";
import {
	useGetExpertQuery,
	useGetSelfQuery,
} from "../../../features/profile-page/expert/expert.api";

const PurchasedCourse = () => {
	const router = useRouter();
	const { courseId } = router.query;
	const [playbackId, setPlaybackId] = useState<string>();

	const [owner, setOwner] = useState("" as string | null);
	const [courseName, setCourseName] = useState("");
	const [courseDate, setCourseDate] = useState("");
	const [selectedId, setSelectedId] = useState("");
	const [openReview, setOpenReview] = useState(false);
	const [purchased, setPurchased] = useState(false);
	const {
		data: course,
		isLoading: loading,
		isSuccess: success,
	} = useGetCourseByIdQuery((courseId as string) ?? skipToken); // this is the courseId 64219c6b14a68874c040934a

	const { data: expert } = useGetExpertQuery(owner ?? skipToken);

	const walletAddress = useSelector(walletAddressSelector);
	const { data: self } = useGetSelfQuery((walletAddress as string) ?? skipToken);

	useEffect(() => {
		setPurchased(self?.purchasedCourses.includes(courseId as string) ?? false);
	}, [self, courseId]);

	useEffect(() => {
		if (!course) return;
		if (!expert) return;
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		setPlaybackId(course.videos[0].playbackId);
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		// setThumbnail(course.videos[0].icon);
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		// setDescriptionCourse(course.videos[0].description);
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		setSelectedId(course.videos[0]._id);

		setCourseName(course.title);
		const courseFinalDate = format(parseISO(course.createdAt) ?? "", "MMM d, y");
		setOwner(course.owner);

		setCourseDate(courseFinalDate);
	}, [course, expert]);

	const handlePlayback = (playback: string, links: string, id: string) => {
		setPlaybackId(playback);
		setSelectedId(id);
	};

	let totalLength = 0;

	if (loading) {
		return <div>Loading...</div>;
	}

	if (!course) return <div>No course to return</div>;

	if (!purchased) {
		return (
			<h1 className="text-2xl mb-auto mt-auto text-center font-semibold">
				You have not purchased this course
			</h1>
		);
	}

	if (success && purchased) {
		return (
			<div className="flex  h-screen flex-col  gap-[30px] space-y-4 px-4 pl-8 pt-[10vh]">
				<div className="flex min-h-fit w-full  flex-row pb-2 ">
					<div className="w-[80%] space-y-4">
						<div className="aspect-video h-auto w-full">
							<Player
								playbackId={playbackId}
								showPipButton
								showTitle={false}
								poster={
									<Image
										// src={course.icon}
										src={game}
										alt=""
										width="0"
										height="0"
										sizes="w-full"
										className="h-auto w-fit object-cover object-center"
									/>
								}
								controls={{
									autohide: 3000,
								}}
								theme={{
									borderStyles: { containerBorderStyle: "solid" },
									radii: { containerBorderRadius: "10px" },
								}}
							/>
						</div>
						<div className="flex flex-col rounded-xl  p-4 ring-2 ring-slate-600">
							<div className="my-auto flex flex-col items-center">
								<div className="font-courseFont text-text2xl font-[500]">
									Video Course : {courseName}
								</div>
								<div className="font-courseFont text-textLarge font-[500] text-card-text">
									{courseDate}
								</div>
							</div>
							<Button5
								text={
									<div className="flex items-center space-x-2 font-poppins text-textMedium2">
										<RiPencilFill /> <span>Write a review</span>
									</div>
								}
								onClick={() => setOpenReview(true)}
								className="ml-auto self-start"
							/>
							{openReview && (
								<NewReviewForm
									onClose={() => setOpenReview(false)}
									onResult={() => setOpenReview(false)}
									id={course._id}
									type="Course"
								/>
							)}
						</div>
					</div>
					<div className=" flex w-[20%] flex-col space-y-5 overflow-x-hidden overflow-y-scroll">
						{course.videos.map((eachCourse) => {
							totalLength = totalLength + 1;
							return (
								<VideoCard
									links={eachCourse.icon ?? ""}
									img={game}
									length={totalLength}
									title={eachCourse.title as string}
									playbackId={eachCourse.playbackId as string}
									handlePlaybackId={handlePlayback}
									duration={eachCourse.duration as number}
									id={eachCourse._id as string}
									selectedId={selectedId as string}
								/>
							);
						})}
					</div>
				</div>

				<div className="hover-green flex min-h-fit flex-col rounded-xl p-3 pt-2 font-poppins  ring-2 ring-slate-500">
					<div className="flex items-center space-x-4">
						<div className="text-textLarge font-[500]">{expert?.username}</div>
					</div>
					<div className="space-y-1 pl-[calc(90px+16px)] ">
						<div className="font-courseFont text-textLarge font-[500]">
							Description of course
						</div>
						<div className=" font-courseFont text-textMedium3 font-[500] text-card-text">
							{course?.description}
						</div>
					</div>
				</div>
			</div>
		);
	}
};

export default PurchasedCourse;
