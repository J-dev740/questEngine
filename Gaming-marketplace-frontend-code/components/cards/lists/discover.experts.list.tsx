import { useDiscoverExpertsQuery } from "../../../features/discover-page/discover.api";
import CardsList from "../../common/cards/cardList";
import ExpertCardDataVertical from "../expertCard.data.vertical";

const DiscoverExpertsList = () => {
	const { data, isLoading, isError } = useDiscoverExpertsQuery();

	if (isLoading)
		return (
			<h1 className="text-2xl mb-auto mt-auto text-center font-semibold ">
				Searching for the Experts...
			</h1>
		);
	if (isError)
		return (
			<h1 className="text-2xl mb-auto mt-auto text-center font-semibold">
				Experts not found
			</h1>
		);
	if (!data)
		return (
			<h1 className="text-2xl mb-auto mt-auto text-center font-semibold">
				Something unexpected happened
			</h1>
		);

	return (
		<CardsList className="px-4">
			{data.map((expertItem) => (
				<ExpertCardDataVertical expert={expertItem} />
			))}
		</CardsList>
	);
};

export default DiscoverExpertsList;
