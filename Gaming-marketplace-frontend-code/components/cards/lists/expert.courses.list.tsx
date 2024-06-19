import { useSelector } from "react-redux";
import { walletAddressSelector } from "../../../features/auth/auth.selectors";
import {
	useGetExpertCoursesQuery,
	useGetSelfQuery,
} from "../../../features/profile-page/expert/expert.api";
import CardsList from "../../common/cards/cardList";
import CourseCardDataVertical from "../courseCard.data.vertical";

interface ListProps {
	expertId: string;
}

const ExpertCoursesList = ({ expertId }: ListProps) => {
	const { data, isLoading, isError } = useGetExpertCoursesQuery(expertId);
	const addr = useSelector(walletAddressSelector);
	const { data: self } = useGetSelfQuery(addr as string);

	if (isLoading)
		return (
			<h1 className="text-center text-textxl font-semibold ">Searching for the expert...</h1>
		);
	if (isError) return <h1 className="text-center text-textxl font-semibold">Expert not found</h1>;
	if (!data || !self)
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
				<CourseCardDataVertical
					isSelf={self._id === course.owner}
					course={course}
					key={course._id}
				/>
			))}
		</CardsList>
	);
};

export default ExpertCoursesList;
