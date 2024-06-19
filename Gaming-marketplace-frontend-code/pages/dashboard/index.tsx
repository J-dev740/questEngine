import { skipToken } from "@reduxjs/toolkit/dist/query";
import Head from "next/head";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import CoachingCoursesList from "../../components/cards/lists/coaching.courses.list";
import ExpertCoursesList from "../../components/cards/lists/expert.courses.list";
import ExpertLivestreamsList from "../../components/cards/lists/expert.livestreams.list";
import { Button2 } from "../../components/common/form/button";
import { CopyClipboard } from "../../components/copyToClipboard";
import NewCourseForm from "../../components/forms/newCourse/newCourse.form";
import NewLivestreamForm from "../../components/forms/newLivestream/livestream.form";
import { walletAddressSelector } from "../../features/auth/auth.selectors";
import { useGetExpertQuery, useGetSelfQuery } from "../../features/profile-page/expert/expert.api";
import { useGetPurchasedCoursesQuery } from "../../features/purchases/purchase.api";
import { GetPurchasedCourses } from "../../features/purchases/purchase.types";

enum FormTypes {
	COURSE,
	LIVESTREAM,
}

const Purchases = () => {
	const [totalCourse, setTotalCourse] = useState({});

	const walletAddress: string = useSelector(walletAddressSelector);
	const { data: self } = useGetSelfQuery((walletAddress as string) ?? skipToken);
	// console.log(self)
	console.log("wallletAddress", walletAddress);
	const walletId = walletAddress.toLowerCase();
	const { data: course, error } = useGetPurchasedCoursesQuery(walletId as string);
	console.log("purchased courses", course);

	const [openCourse, setOpenCourse] = useState(false);
	const [openStream, setOpenStream] = useState(false);
	const [expertId, setExpertId] = useState("");

	const { data: expert } = useGetExpertQuery((expertId as string) ?? skipToken);

	useEffect(() => {
		if (!self) return;
		setExpertId(self._id);
	}, [self]);

	const handleResult = (formType: FormTypes) => {
		switch (formType) {
			case FormTypes.COURSE: {
				setOpenCourse(false);
				break;
			}
			case FormTypes.LIVESTREAM: {
				setOpenStream(false);
				break;
			}
			default:
				return;
		}
	};

	const handleClose = (formType: FormTypes) => {
		switch (formType) {
			case FormTypes.COURSE: {
				setOpenCourse(false);
				break;
			}
			case FormTypes.LIVESTREAM: {
				setOpenStream(false);
				break;
			}
			default:
				return;
		}
	};

	useEffect(() => {
		if (error) {
			if ("status" in error && "data" in error) {
				if (error.status === 400) {
					toast.error(`Error: Invalid User`);
				}
			}
		}
		if (!course) return;
		setTotalCourse(course);
	}, [error, course]);

	useEffect(() => {
		if (!walletAddress) return;
	}, [walletAddress]);

	if (course?.length == 0 || !course)
		return (
			<div className="text-2xl m-5 font-semibold">There are no Purchased Courses to show</div>
		);

	return (
		<>
			<Head>
				<title>Dashboard</title>
			</Head>
			{self?.role.includes("expert") ? (
				<div className="overflow-y-scroll pl-8 pt-[10vh]">
					<h1 className="mt-5 font-Anek text-header1 font-bold text-white">
						Livestreams
					</h1>
					<div className="mx-5 my-7 rounded-xl border border-[#212121] bg-[#111111] p-6">
						<h1 className="text-textLarge">Start Livestream</h1>
						<div className="mt-3 flex flex-row items-center justify-between">
							<Button2
								text="Create a livestream"
								onClick={() => setOpenStream(true)}
								className="h-12 w-60 text-textMedium2 font-bold"
							/>
							<CopyClipboard streamKey={expert?.stream?.key} />
						</div>
					</div>
					<ExpertLivestreamsList expertId={expertId} />
					<div className="mr-5 flex flex-row items-center justify-between">
						<h1 className="mt-5 font-Anek text-header1 font-bold text-white">
							My Courses
						</h1>
						<Button2
							text="Create a course"
							onClick={() => setOpenCourse(true)}
							className="h-12 w-60 text-textMedium2  font-bold"
						/>
					</div>

					<ExpertCoursesList expertId={expertId} />
					<h1 className="mt-5 font-Anek text-header1 font-bold text-white">
						Your Purchased Courses
					</h1>
					<CoachingCoursesList />
					<span className="mt-5 h-6" />
					{openCourse && (
						<NewCourseForm
							expertId={expertId as string}
							onResult={() => handleResult(FormTypes.COURSE)}
							onClose={() => handleClose(FormTypes.COURSE)}
						/>
					)}
					{openStream && (
						<NewLivestreamForm
							expertId={expertId as string}
							onResult={() => handleResult(FormTypes.LIVESTREAM)}
							onClose={() => handleClose(FormTypes.LIVESTREAM)}
						/>
					)}
				</div>
			) : (
				<div className="overflow-y-scroll pl-8 pt-[10vh]">
					<h1 className="font-Anek text-header1 font-bold text-white">
						Your Purchased Courses
					</h1>
					<CoachingCoursesList />
				</div>
			)}
		</>
	);
};

export default Purchases;
