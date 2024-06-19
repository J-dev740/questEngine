import { skipToken } from "@reduxjs/toolkit/dist/query";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ExpertVerticalCoursesList from "../../components/cards/lists/expert.courses.vertical.list";
import PurchasedVerticalCoursesList from "../../components/cards/lists/purchased.courses.vertical.list";
import TabGroupNew from "../../components/util/tabGroupNew";
import { walletAddressSelector } from "../../features/auth/auth.selectors";
import { useGetSelfQuery } from "../../features/profile-page/expert/expert.api";

const ProfileCourses = () => {
	const walletAddress = useSelector(walletAddressSelector);
	const { data: self } = useGetSelfQuery(walletAddress ?? skipToken);

	const [id, setId] = useState("");

	useEffect(() => {
		if (!self) return;
		setId(self._id);
	}, [self]);

	return (
		<div>
			<Head>
				<title>Profile - Courses</title>
			</Head>
			<div className="h-screen overflow-y-scroll pl-6 pt-[15vh]">
				<h1 className="mt ml-3 text-text4xl font-bold">Courses</h1>
				<div className="page-game relative overflow-y-scroll">
					<TabGroupNew
						className=""
						Tab1Title="My Courses"
						Tab2Title="Purchased Courses"
						Tab1Content={
							<div>
								{self?.role.includes("expert") ? (
									<ExpertVerticalCoursesList
										expertId={id}
										isSelf={self?.role.includes("expert")}
									/>
								) : (
									<div className="text-center text-textxl">
										You are not an expert but you can be one! <br />
										Click on Become a Expert Button Now!
									</div>
								)}
							</div>
						}
						Tab2Content={<PurchasedVerticalCoursesList />}
					/>
				</div>
			</div>
		</div>
	);
};

export default ProfileCourses;
