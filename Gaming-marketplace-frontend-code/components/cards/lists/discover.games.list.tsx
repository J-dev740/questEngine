import { useDiscoverGamesQuery } from "../../../features/discover-page/discover.api";
import CardsList from "../../common/cards/cardList";
import GameCardVertical from "../gameCard.vertical";

const DiscoverGamesList = () => {
	const { data, isLoading, isError } = useDiscoverGamesQuery();
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
			{data[0].result.map((game) => (
				<GameCardVertical data={game} />
			))}
		</CardsList>
	);
};

export default DiscoverGamesList;
