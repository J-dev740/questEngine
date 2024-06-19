import { skipToken } from "@reduxjs/toolkit/dist/query";
import { parseISO } from "date-fns";
import { useGetExpertLivestreamsQuery } from "../../../features/profile-page/expert/expert.api";
import CardsList from "../../common/cards/cardList";
import LivestreamCardData from "../livestreamCard.upcoming";

interface ExpertLivestreamsListProps {
	expertId: string | undefined;
}

const ExpertLivestreamsList = ({ expertId }: ExpertLivestreamsListProps) => {
	const { data, isLoading, isError } = useGetExpertLivestreamsQuery(
		(expertId as string) ?? skipToken,
	);
	if (isLoading)
		return (
			<h1 className="text-2xl mb-auto mt-auto text-center font-semibold ">
				Fetching livestreams...
			</h1>
		);
	if (isError)
		return (
			<h1 className="text-2xl mb-auto mt-auto text-center font-semibold">
				Livestreams not found
			</h1>
		);
	if (!data)
		return (
			<h1 className="text-2xl mb-auto mt-auto text-center font-semibold">
				Something unexpected happened
			</h1>
		);

	return (
		<CardsList className="!space-x-8 px-4 pb-5">
			{data.map((item) => (
				<LivestreamCardData
					key={item._id}
					data={{
						_id: item._id,
						game: {
							_id: item.game._id,
							title: item.game.title,
						},
						owner: {
							_id: item.owner._id,
							username: item.owner.username,
						},
						streamStart: parseISO(item.streamStart),
						icon: item.icon, //item.icon
					}}
				/>
			))}
		</CardsList>
	);
};

export default ExpertLivestreamsList;
