import { skipToken } from "@reduxjs/toolkit/dist/query";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LivestreamAccordion from "../../components/accordions/livestream.accordion";
import ReviewCard from "../../components/cards/reviewCard";
import About from "../../components/profile/about";
import Header from "../../components/profile/header";
import { walletAddressSelector } from "../../features/auth/auth.selectors";
import { useGetLanguagesQuery } from "../../features/misc/misc.api";
import { useGetExpertQuery, useGetSelfQuery } from "../../features/profile-page/expert/expert.api";

import Head from "next/head";
import ExpertCoursesList from "../../components/cards/lists/expert.courses.list";
import NewCourseForm from "../../components/forms/newCourse/newCourse.form";
import NewLivestreamForm from "../../components/forms/newLivestream/livestream.form";
import TabGroup2 from "../../components/util/tabGroup";

enum FormTypes {
	COURSE,
	LIVESTREAM,
}

const ExpertPage = () => {
	const router = useRouter();
	const { expertId } = router.query;

	// check if user is viewing his own profile or not
	const walletAddress = useSelector(walletAddressSelector);
	const { data: self } = useGetSelfQuery(walletAddress ?? skipToken);
	const [isSelf, setIsSelf] = useState(false);
	useEffect(() => {
		if (!self) return;
		if (!expertId) return;

		setIsSelf(self._id === (expertId as string));
	}, [self, expertId]);

	const {
		data: expert,
		isLoading,
		isError,
	} = useGetExpertQuery((expertId as string) ?? skipToken);
	const { data: languages } = useGetLanguagesQuery();

	const [openCourse, setOpenCourse] = useState(false);
	const [openStream, setOpenStream] = useState(false);

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

	if (isLoading)
		return (
			<h1 className="text-2xl mb-auto mt-auto text-center font-semibold ">
				Searching for the expert...
			</h1>
		);
	if (isError)
		return (
			<h1 className="text-2xl mb-auto mt-auto text-center font-semibold">
				Expert not found {"<Insert 404 page>"}
			</h1>
		);
	if (!expert)
		return (
			<h1 className="text-2xl mb-auto mt-auto text-center font-semibold">
				Something unexpected happened
			</h1>
		);

	return (
		<>
			<Head>
				<title>Expert - {expert.username}</title>
			</Head>
			<div className="page-expert w-full overflow-y-scroll pl-6">
				<Header icon={expert.icon} name={expert.username} bio={expert.bio} />
				<div className="px-20">
					<div className="flex flex-col ">
						<TabGroup2
							className="mt-[-150px]"
							Tab1Title="About"
							Tab2Title="Reviews"
							Tab1Content={
								<About
									streamKey={expert.stream.key}
									isSelf={isSelf}
									handleCourse={() => setOpenCourse(true)}
									handleLivestream={() => setOpenStream(true)}
									data={[
										{
											field: "Description",
											content: `${expert.about}`,
										},
										{
											field: "Languages",
											content: `${
												languages?.find(
													(item) => item._id === expert.language,
												)?.name
											}`,
										},
									]}
								/>
							}
							Tab2Content={
								<ReviewCard
									data-tab-title="Reviews"
									id={expert._id}
									type="Expert"
								/>
							}
						/>
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
						<div>
							<h2 className="my-4 font-Anek text-header1 font-bold leading-[70px] text-white">
								Courses: Training plans
							</h2>
							<ExpertCoursesList expertId={expert._id} />
						</div>
						<div className="flex w-full flex-col">
							<h2 className="my-4 font-Anek text-header1 font-bold leading-[70px] text-white">
								Live Streams
							</h2>
							<LivestreamAccordion expertId={expert._id} />
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ExpertPage;
