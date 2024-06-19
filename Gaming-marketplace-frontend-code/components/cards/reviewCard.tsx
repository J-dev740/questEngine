import {
	differenceInDays,
	differenceInHours,
	differenceInMinutes,
	differenceInMonths,
	differenceInWeeks,
	differenceInYears,
	parseISO,
} from "date-fns";
import { BsStarFill, BsStarHalf } from "react-icons/bs";
import { useGetCourseReviewsQuery } from "../../features/profile-page/course/courses.api";
import { useGetExpertReviewsQuery } from "../../features/profile-page/expert/expert.api";
import { useGetGameReviewsQuery } from "../../features/profile-page/games/game.api";
import CardContainerHorizontal from "../common/cards/cardContainerHorizontal";
import ReadMore from "../util/readMore";

interface ReviewCardProps {
	id: string;
	type: "Expert" | "Course" | "Game";
}

const getTimeDiff = (date: Date) => {
	const today = Date.now();
	let temp: number;
	temp = differenceInMinutes(today, date);
	if (temp < 10) return `Just now`;
	if (temp < 60) return `${temp} minutes ago..`;
	temp = differenceInHours(today, date);
	if (temp < 24) return `${temp} hours ago..`;
	temp = differenceInDays(today, date);
	if (temp < 7) return `${temp} days ago..`;
	temp = differenceInWeeks(today, date);
	if (temp < 4) return `${temp} weeks ago..`;
	temp = differenceInMonths(today, date);
	if (temp < 12) return `${temp} months ago..`;
	temp = differenceInYears(today, date);
	if (temp < 5) return `${temp} years go..`;
	return "A long time ago..";
};

const getStarDiff = (rating: number): React.ReactNode => {
	let _rating = Math.round(rating * 2);
	const elements = [];

	for (let i = 0; i < Math.floor(_rating / 2); i++) elements.push(<BsStarFill />);
	if (_rating % 2 === 1) {
		elements.push(<BsStarHalf />);
		_rating--;
	}
	elements.reduce((result, item) => (
		<>
			{result}
			{item}
		</>
	));

	return elements;
};

const ReviewCard = ({ id, type }: ReviewCardProps) => {
	let useGetReviewQuery;

	// select a hook according to type
	switch (type) {
		case "Course": {
			useGetReviewQuery = useGetCourseReviewsQuery;
			break;
		}
		case "Expert": {
			useGetReviewQuery = useGetExpertReviewsQuery;
			break;
		}
		case "Game": {
			useGetReviewQuery = useGetGameReviewsQuery;
			break;
		}
	}
	//63ca3466c8b56896d9681e4c
	const { data } = useGetReviewQuery(id);

	if (!data || data.length === 0)
		return <div className="my-auto text-center font-poppins text-textxl">Wow, such empty</div>;

	return (
		<div className="h-[500px] w-full space-y-4 overflow-y-scroll rounded-xl px-2 py-2 text-white">
			{/* This data.map was repeated 3 times */}
			{data.map((item) => (
				<CardContainerHorizontal>
					<h1 className="text-textxl">{item.title}</h1>
					<div className="text-slate-500">
						{item.createdAt && getTimeDiff(parseISO(item.createdAt))}
					</div>
					<div className="flex space-x-1.5 text-yellow-400">
						{item.rating && getStarDiff(item.rating)}
					</div>
					<div className="text-textMedium2">
						<ReadMore text={item.content ?? ""} maxLength={250} />
					</div>
				</CardContainerHorizontal>
			))}
		</div>
	);
};

export default ReviewCard;
