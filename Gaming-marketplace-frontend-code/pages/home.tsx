import Head from "next/head";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import CourseCardHorizontal from "../components/cards/courseCard.horizontal";
import ExpertCardHorizontal from "../components/cards/expertCard.horizontal";
import { Button } from "../components/common/form/button";
import NewFeedbackForm from "../components/forms/newFeedback/feedback.form";
import Modal from "../components/util/modal";
import { useGetCoursesQuery } from "../features/profile-page/course/courses.api";
import { useLazyGetExpertsQuery } from "../features/profile-page/expert/expert.api";
import { ExpertInfo } from "../features/types";
import web3game2 from "../public/web3game2.png";

const Home = () => {
	const [feedbackModal, setFeedbackModal] = useState(false);
	const [expertsModal, setExpertsModal] = useState(false);
	const [coursesModal, setCoursesModal] = useState(false);

	const pageLength = 3;
	const [pageCursor, setPageCursor] = useState<number>(0);

	const [expertList, setExpertList] = useState<ExpertInfo[]>([]);
	const [getExperts, { isLoading }] = useLazyGetExpertsQuery();

	const observer = useRef<IntersectionObserver | null>(null);
	const lastCompRef = useCallback(
		(node: any) => {
			if (isLoading) return;
			if (observer.current) observer.current.disconnect();
			observer.current = new IntersectionObserver(
				(entires) => {
					if (entires[0].isIntersecting) {
						setPageCursor((state) => state + pageLength);
					}
				},
				{
					threshold: 0.9,
					root: document.getElementById("expert-list"),
				},
			);
			if (node) observer.current.observe(node);
		},
		[isLoading],
	);

	const { data: courses } = useGetCoursesQuery();

	useEffect(() => {
		if (!expertsModal) return;
		getExperts({ cursor: pageCursor, length: pageLength }).then((res) => {
			if (res.data) {
				setExpertList([...expertList, ...res.data.result]);
			}
		});
	}, [expertsModal, pageCursor]);

	if (!expertList && !courses) return <div>Loading ...</div>;

	// console.log(experts);
	return (
		<>
			<Head>
				<title>Home</title>
			</Head>
			<div className="mt-[100px] flex h-screen w-full flex-row space-x-[14px] bg-transparent ">
				<div className="z-0 flex flex-col pl-16 pt-28 ">
					<div className="font-500 font-poppins text-[32px] leading-[48px] tracking-[2px]">
						Welcome to the
					</div>
					<div className="mt-[16px] font-poppins text-[80px] font-bold leading-[105px] tracking-[2px]">
						Hall of Heroes
					</div>
					<div className="mt-5 bg-clip-text text-[#D9D9D9] ">
						Agilizamos el proceso de desarrollo web <br />a través de una plataforma
						creada para que crezcas
					</div>
					<div className="mt-[48px] flex flex-row space-x-[32px]">
						<Button
							text="Courses"
							onClick={() => setCoursesModal(true)}
							className="cursor-pointer rounded-[12px] !bg-gradient-to-r !from-[#296BBD] !to-[#AC85FF] !px-[24px] !py-[12px] font-poppins text-[20px] font-medium leading-[30px]"
						/>

						<Button
							text="Experts1234"
							onClick={() => setExpertsModal(true)}
							className="rounded-[12px] !bg-gradient-to-r !from-[#ffffff] !to-[#ffffff] !px-[24px] !py-[12px] font-poppins text-[20px] font-medium leading-[30px] text-[#130936] hover:cursor-pointer"
						/>
					</div>
				</div>
				<div className="mt-24">
					<Image
						src={web3game2}
						// src='/public/web3game2.png'
						alt="Hero Image"
						width="0"
						height="0"
						sizes="100vw"
						className="fixed bottom-[-16px] right-[2px] h-[600px] w-[713.42px]"
					/>
					<div className="fixed bottom-20 right-16">
						<div
							onClick={() => setFeedbackModal(true)}
							className="flex h-[4rem] w-[4rem] cursor-pointer items-center justify-center !rounded-full bg-gradient-to-r !from-[#296BBD] !to-[#AC85FF] !p-4"
						>
							<AiFillEdit className="h-full w-auto" />
						</div>
					</div>
				</div>

				{feedbackModal && (
					<NewFeedbackForm
						onClose={() => setFeedbackModal(false)}
						onResult={() => setFeedbackModal(false)}
					/>
				)}

				{expertsModal && (
					<Modal title="Experts" handleExit={() => setExpertsModal(false)}>
						<div
							className="h-[60vh] space-y-3 overflow-y-scroll pr-5 sm:w-[80vw] md:w-[60vw] lg:w-[40vw]"
							id="expert-list"
						>
							{expertList.map((expert, index) => {
								if (index === expertList.length - 1)
									return (
										<ExpertCardHorizontal
											innerRef={lastCompRef}
											expert={expert}
										/>
									);
								return <ExpertCardHorizontal expert={expert} />;
							})}
						</div>
					</Modal>
				)}
				{coursesModal && (
					<Modal title="Courses" handleExit={() => setCoursesModal(false)}>
						<div className="flex h-[60vh] flex-col gap-8 overflow-y-scroll pr-5 sm:w-[80vw] md:w-[60vw] lg:w-[40vw]">
							{courses?.map((course) => (
								<CourseCardHorizontal course={course} />
							))}
						</div>
					</Modal>
				)}
			</div>
		</>
	);
};

export default Home;
