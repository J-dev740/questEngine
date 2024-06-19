// import { Quest } from "../../features/quest-engine/quest.types";
import RecommendedTaskCard from "./recommendedTaskCard";
import QuestCard from "./questCard";

import { useGetCompletedQuestsQuery } from "../../features/quest-engine/quest.api";

interface Quest {
	_id: string;
	questTitle: string;
	questDescription: string;
	imageurl: string;
	gemsReward: number;
	status: string;
}

const CompletedQuests = (props: { user: any }) => {
	const { user } = props;
	const { data: quests, isLoading, isError } = useGetCompletedQuestsQuery(user._id);
	if (isLoading) return <div>Loading</div>;
	if (isError) return <div>Error</div>;
	if (!quests) return <div>No Quest Found</div>;

	return (
		<>
			{quests.length === 0 && <div>No Quest Found!</div>}
			<div className="scrollbar-hide flex flex-row gap-4 overflow-x-scroll p-4">
				{quests?.map((q: Quest) => (
					<RecommendedTaskCard
						img_url={q.imageurl}
						category="btc"
						_id={q._id}
						gems={q.gemsReward}
						quest_status={q.status}
						quest_title={q.questTitle}
						quest_description={q.questDescription}
						key={q._id}
					/>
				))}
			</div>
		</>
	);
};

export default CompletedQuests;
