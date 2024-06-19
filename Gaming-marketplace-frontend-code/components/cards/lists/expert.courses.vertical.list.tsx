import { useGetExpertCoursesQuery } from "../../../features/profile-page/expert/expert.api";
import CardsList from "../../common/cards/cardList";
import CourseCardDataVertical from "../courseCard.data.vertical";

interface ListProps {
	expertId: string;
	isSelf: boolean;
}

const ExpertVerticalCoursesList = ({ expertId, isSelf }: ListProps) => {
	const { data, isLoading, isError } = useGetExpertCoursesQuery(expertId);

	if (isLoading)
		return (
			<h1 className="text-center text-textxl font-semibold ">Searching for the expert...</h1>
		);
	if (isError) return <h1 className="text-center text-textxl font-semibold">Expert not found</h1>;
	if (!data)
		return (
			<h1 className="text-center text-textxl font-semibold">Something unexpected happened</h1>
		);

	if (data.length === 0)
		return (
			<h1 className="text-center text-textxl font-semibold">
				Looks like there is nothing to show
			</h1>
		);

	return (
		<CardsList className="px-4">
			{data?.map((course) => (
				<CourseCardDataVertical isSelf={isSelf} course={course} />
			))}
		</CardsList>
	);
};

export default ExpertVerticalCoursesList;
