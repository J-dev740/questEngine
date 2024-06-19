import { useSelector } from "react-redux";
import { walletAddressSelector } from "../../../features/auth/auth.selectors";
import { useGetPurchasedCoursesQuery } from "../../../features/purchases/purchase.api";
import CardsList from "../../common/cards/cardList";
import CourseCardDataVertical from "../courseCard.data.vertical";

// interface ListProps {
// 	expertId: string;
// 	isSelf: boolean;
// }

const PurchasedVerticalCoursesList = () => {
	const walletAddress: string = useSelector(walletAddressSelector);

	const walletId = walletAddress.toLowerCase();

	const { data, isLoading, isError } = useGetPurchasedCoursesQuery(walletId as string);

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
				<CourseCardDataVertical isSelf={false} course={course} />
			))}
		</CardsList>
	);
};

export default PurchasedVerticalCoursesList;
