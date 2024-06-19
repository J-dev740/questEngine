import { useDiscoverCoursesQuery } from "../../../features/discover-page/discover.api";
import CardsList from "../../common/cards/cardList";
import CourseCardIdVertical from "../courseCard.id.vertical";

const DiscoverCoursesList = () => {
	const { data, isLoading, isError } = useDiscoverCoursesQuery();

	if (isLoading)
		return (
			<h1 className="text-2xl mb-auto mt-auto text-center font-semibold ">
				Searching for the expert...
			</h1>
		);
	if (isError)
		return (
			<h1 className="text-2xl mb-auto mt-auto text-center font-semibold">Games not found</h1>
		);
	if (!data)
		return (
			<h1 className="text-2xl mb-auto mt-auto text-center font-semibold">
				Something unexpected happened
			</h1>
		);

	return (
		<CardsList className="px-4">
			{data.map((course) => (
				<CourseCardIdVertical courseId={course.course_id} />
			))}
		</CardsList>
	);
};

export default DiscoverCoursesList;
