import { useGetAllQuestsQuery } from "../../features/quest-engine/quest.api";
import RecommendedTaskCard from "../../components/QuestComponents/recommendedTaskCard";
import QuestTaskCard from "../../components/QuestComponents/questTaskCard";
import QuestCard from "../../components/QuestComponents/questCard";

const AllQuest = () => {
	const allQuest = useGetAllQuestsQuery({ length: 100, pageIndex: 0 });
	const quests = allQuest.data;

	return (
		<div className="-top-[50vh] flex flex-row gap-[4px]  text-[#FCFCFD]">
			<div className="flex w-full flex-col gap-12 rounded-bl-[48px] rounded-tl-[48px]">
				<div className="mt-[12vh] flex flex-row items-start px-4">
					<span className="pr-2 font-poppins text-text3xl font-semibold leading-[46px]">
						All Quest
					</span>
					<span className="font-poppins text-text3xl font-semibold leading-[46px]">
						({quests?.length})
					</span>
				</div>
				<div className="container grid  w-full grid-flow-row grid-cols-3   items-center  gap-3 px-4 lg:grid-cols-2 lg:gap-3 xl:gap-2 2xl:grid-cols-3 3xl:grid-cols-4 3xl:gap-4 ">
					{quests?.map((q: any) => (
						// <RecommendedTaskCard
						// 	img_url={q.imageurl}
						// 	category="btc"
						// 	_id={q._id}
						// 	gems={q.gemsReward}
						// 	quest_status={q.status}
						// 	quest_title={q.questTitle}
						// 	quest_description={q.questDescription}
						// 	key={q._id}
						// />
						// 	<QuestTaskCard
						// 	img_url={q.imageurl}
						// 	category="btc"
						// 	_id={q._id}
						// 	gems={q.gemsReward}
						// 	quest_status={q.status}
						// 	quest_title={q.questTitle}
						// 	quest_description={q.questDescription}
						// 	key={q._id}
						// 	taskLength={q.tasks.length}
						// />
						<QuestCard
							img_url={q.imageurl}
							category="btc"
							_id={q._id}
							gems={q.gemsReward}
							quest_status={q.status}
							quest_title={q.questTitle}
							quest_description={q.questDescription}
							key={q._id}
							taskLength={q.tasks.length}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default AllQuest;
