import { useGetPurchasedCoursesQuery } from "../../../features/purchases/purchase.api";
import CardsList from "../../common/cards/cardList";
import CourseCardDataVertical from "../courseCard.data.vertical";
import { useSelector } from "react-redux";
import { walletAddressSelector } from "../../../features/auth/auth.selectors";

const CoachingCoursesList = () => {
	const walletAddress: string = useSelector(walletAddressSelector);
	const walletId = walletAddress.toLowerCase();
	const { data, isLoading, isError } = useGetPurchasedCoursesQuery(walletId as string);
	console.log("purchased courses", data);

	if (isLoading)
		return (
			<h1 className="text-2xl mb-auto mt-auto text-center font-semibold ">
				Searching for the expert...
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
				Oops You haven&apos;t purchased any courses yet
			</h1>
		);
	return (
		<CardsList className="px-4">
			{data?.map((currElement, index) => {
				return <CourseCardDataVertical course={currElement} />;
			})}
		</CardsList>
	);
};

export default CoachingCoursesList;
