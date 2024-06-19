import { useState, useEffect } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import AllRecommendedQuests from "../../components/QuestComponents/AllRecommendedQuests";
import ParticipatedQuests from "../../components/QuestComponents/ParticipatedQuests";
import CompletedQuests from "../../components/QuestComponents/CompletedQuests";
import SimpleSlider from "../../components/QuestComponents/Carousel";
import Questers from "../../components/QuestComponents/Questers";
import { useGetAllQuestsQuery, useGetQuestersQuery } from "../../features/quest-engine/quest.api";
import { activeUserSelector } from "../../features/profile-page/profile.selectors";

const Quest = () => {
	const [allQuestPage, setAllQuestPage] = useState(0);

	const activeUser = useSelector(activeUserSelector);
	const args = {
		pageIndex: 0,
		length: 6,
	};
	const questState = useSelector((state: any) => state.quest.main.quests);
	const { data } = useGetQuestersQuery(args);

	const {
		data: quests,
		isLoading,
		isError,
	} = useGetAllQuestsQuery({ length: 20, pageIndex: allQuestPage });

	const [allQuestData, setAllQuestData] = useState<any[]>([]);

	// useEffect(() => {
	// 	const current = quests?.length > 0 ? quests : [];
	// 	setAllQuestData((prev) => [...prev, ...current]);
	// 	console.log("allQuestPage", { quests	 });
	// }, [quests]);

	const HandleFetchMoreAll = () => {
		console.log("fetch more");
		// setAllQuestPage((prev) => prev + 1);

		// const { data, isLoading, isError } = useGetAllQuestsQuery({
		// 	length: 10,
		// 	pageIndex: allQuestPage,
		// });
		// setAllQuestData((prev) => [...prev, ...data]);
	};

	const topThreeeQuests: any[] = [];

	if (isLoading) return <div>Loading</div>;
	if (isError) return <div>Error</div>;
	if (!quests) return <div>No Quest Found</div>;

	quests.map((e: any, index: number) => {
		if (e.status !== "FINISHED" && topThreeeQuests.length < 3) {
			topThreeeQuests.push(quests[quests.length - 1 - index]);
		}
	});

	return (
		<div className="mb-10 flex flex-row gap-[4px] overflow-y-scroll px-0 text-[#FCFCFD] lg:px-5">
			<div className="flex w-full flex-col gap-12  rounded-bl-[48px] rounded-tl-[48px]">
				<div className="mt-[12vh] flex flex-col items-start px-6">
					<span className="font-poppins text-text3xl font-semibold leading-[46px]">
						Quest
					</span>
				</div>
				<div className="flex items-center justify-center   rounded-[40px]   bg-black p-4">
					<SimpleSlider quests={topThreeeQuests} />
				</div>
				<div className="mt-6 flex flex-col gap-5 px-6">
					<div className="  text-[30px] font-extrabold leading-6 text-white">
						Recommended Quests
					</div>
					<span className="flex flex-row items-center justify-between font-poppins leading-none">
						<p className="mr-5 text-[14px] lg:text-[18px]">
							Description Cras convallis lacus orci, tristique tincidunt magna
							consequat in.
						</p>
						<Link
							href="/quest/all"
							className="flex items-center text-[14px] font-medium lg:text-[18px]"
						>
							Explore All <span className="ml-4">{"  >"}</span>
						</Link>
					</span>
					<div className=" min-h-fit  rounded-3xl bg-gradient-to-r from-black to-slate-900 p-2 ring-4 ring-slate-950">
						<AllRecommendedQuests
							//  quests={questState}
							quests={quests}
							fetchMore={HandleFetchMoreAll}
						/>
					</div>
				</div>
				<div className="flex flex-col gap-5 px-6 py-4">
					<span className="flex flex-row justify-between text-[24px] leading-[120%]">
						<div className="text-[30px]  font-extrabold leading-8 text-white">
							Top Questers
						</div>
						<Link href="/quest/leaderboard" className="text-[18px] font-medium">
							Leaderboard <span className="ml-4">{"  >"}</span>
						</Link>
					</span>
					<div className="flex flex-row gap-[20px] overflow-x-auto">
						<Questers players={data ?? []} />
					</div>
				</div>
				{activeUser && (
					<div className="mt-6 flex flex-col gap-5 px-6">
						<div className="text-textxl font-semibold">Participated Quests</div>
						<span className="flex flex-row items-center justify-between font-poppins leading-none">
							<p className="mr-5 text-[14px] lg:text-[18px]">
								Description Cras convallis lacus orci, tristique tincidunt magna
								consequat in.
							</p>
							{/* <Link
								href="/quest/all"
								className="flex items-center text-[14px] font-medium lg:text-[18px]"
							>
								Explore All <span className="ml-4">{"  >"}</span>
							</Link> */}
						</span>
						<div className="p-4">
							<ParticipatedQuests user={activeUser} />
						</div>
					</div>
				)}
				{activeUser && (
					<div className="mt-6 flex flex-col gap-5 px-6">
						<div className="text-textxl font-semibold">Completed Quests</div>
						<span className="flex flex-row items-center justify-between font-poppins leading-none">
							<p className="mr-5 text-[14px] lg:text-[18px]">
								Description Cras convallis lacus orci, tristique tincidunt magna
								consequat in.
							</p>
							{/* <Link
								href="/quest/all"
								className="flex items-center text-[14px] font-medium lg:text-[18px]"
							>
								Explore All <span className="ml-4">{"  >"}</span>
							</Link> */}
						</span>
						<CompletedQuests user={activeUser} />
					</div>
				)}
			</div>
		</div>
	);
};

export default Quest;
