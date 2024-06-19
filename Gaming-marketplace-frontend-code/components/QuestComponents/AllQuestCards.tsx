import { AllQuestCards } from "../../features/quest-engine/quest.types";
import RecommendedTaskCard from "./recommendedTaskCard";

const AllQuestCards = (props: AllQuestCards) => {
	const { quests } = props;
	return (
		<div className="grid grid-cols-2 gap-4 2xl:grid-cols-3 3xl:grid-cols-3 bgxl:grid-cols-4 bgxl:gap-8">
			{quests?.map((q: any) => (
				<RecommendedTaskCard
					img_url={q.imageurl}
					category="btc"
					_id={q._id}
					gems={q.gemsReward}
					quest_status={q.status}
					quest_title={q.questTitle}
					quest_description={q.questDescription}
					key={q._id}
					tag={q.tag}
				/>
			))}
		</div>
	);
};

export default AllQuestCards;
