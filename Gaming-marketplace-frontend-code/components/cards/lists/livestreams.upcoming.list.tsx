import { parseISO } from "date-fns";
import { useGetUpcomingLivestreamsQuery } from "../../../features/profile-page/livestream/livestream.api";
import CardsList from "../../common/cards/cardList";
import LivestreamCardData from "../livestreamCard.upcoming";

const UpcomingLivestreamsList = () => {
	const { data, isLoading, isError } = useGetUpcomingLivestreamsQuery(undefined, {
		pollingInterval: 15000,
	});
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
						game: item.game,
						owner: item.owner,
						streamStart: parseISO(item.streamStart),
						icon: item.icon,
					}}
				/>
			))}
		</CardsList>
	);
};

export default UpcomingLivestreamsList;
