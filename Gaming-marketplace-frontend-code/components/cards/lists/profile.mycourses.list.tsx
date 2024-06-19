import { skipToken } from "@reduxjs/toolkit/dist/query";
import { useGetExpertCoursesQuery } from "../../../features/profile-page/expert/expert.api";
import CardsGrid from "../../common/cards/cardGrid";
import { ProfileCoursesCard } from "../courseCard.profile";

interface ProfileMyCoursesListProps {
	expertId: string | undefined;
}

const ProfileMyCoursesList = ({ expertId }: ProfileMyCoursesListProps) => {
	const { data, isLoading, isError } = useGetExpertCoursesQuery(expertId ?? skipToken);

	if (isLoading)
		return (
			<h1 className="text-2xl mb-auto mt-auto text-center font-semibold ">
				Searching for the Courses...
			</h1>
		);
	if (isError)
		return (
			<h1 className="text-2xl mb-auto mt-auto text-center font-semibold">
				There are no Purchased Courses to show
			</h1>
		);
	if (!data)
		return (
			<h1 className="text-2xl mb-auto mt-auto text-center font-semibold">
				Something unexpected happened
			</h1>
		);

	if (data.length === 0)
		return (
			<h1 className="text-2xl mb-auto mt-auto text-center font-semibold">
				There are no Purchased Courses to show
			</h1>
		);

	return (
		<CardsGrid className="">
			{data?.map((currElement, index) => {
				return <ProfileCoursesCard data={currElement} />;
			})}
		</CardsGrid>
	);
};

export default ProfileMyCoursesList;
