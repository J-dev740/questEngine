import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

import { useSelector } from "react-redux";
import AllRecommendedQuests from "../../components/QuestComponents/AllRecommendedQuests";
import ParticipatedQuests from "../../components/QuestComponents/ParticipatedQuests";
import CompletedQuests from "../../components/QuestComponents/CompletedQuests";
import SimpleSlider from "../../components/QuestComponents/Carousel";
import Questers from "../../components/QuestComponents/Questers";
import { useGetAllQuestsQuery, useGetQuestersQuery } from "../../features/quest-engine/quest.api";
import { activeUserSelector } from "../../features/profile-page/profile.selectors";
import LoL from "../../public/LoL.png";
import cyberpunk from "../../public/cyberpunk.png";

const Event = () => {
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
	const events = quests.filter((quest: any) => {
		if (quest.tag) {
			return quest.tag === "event";
		}
	});
	// console.log('events',events )
	quests.map((e: any) => {
		if (e.status !== "FINISHED" && topThreeeQuests.length < 3) {
			topThreeeQuests.push(e);
		}
	});
	// function skewElement(e: any) {
	// 	// const skewDiv = document.getElementById('skewDiv');
	// 	const rect = e.target.getBoundingClientRect();
	// 	const mouseX = e.clientX;
	// 	const mouseY = e.clientY;
	// 	//   console.log({X:mouseX,Y:mouseY})
	// 	const midX = e.target.offsetWidth / 2;
	// 	const midY = e.target.offsetHeight / 2;
	// 	// console.log({left:rect?.left,top:rect?.top})
	// 	// const centerX=(rect?.left||0)+midX;
	// 	// const centerY=(rect?.top||0)+midY;
	// 	// console.log('centerX',centerX)
	// 	// console.log('centerY',centerY)

	// 	// const rotateX = (centerY - mouseY) /100; // Adjust the value for the skew effect
	// 	// const rotateY = (centerX - mouseX) /100; // Adjust the value for the skew effect
	// 	const rotateX = (midY - (mouseY - (rect?.top || 0))) / 90; // Adjust the value for the skew effect
	// 	const rotateY = (midX - (mouseX - (rect?.left || 0))) / 90; // Adjust the value for the skew effect
	// 	// console.log('rotateX',rotateX)
	// 	// console.log('rotateY',rotateY)
	// 	e.target.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.2)`;
	// }
	// function resetSkew(e: any) {
	// 	e.target.style.transform = `perspective(1000px) rotateX(${0}deg) rotateY(${0}deg) scale(1)`;
	// }

	return (
		<div className="mb-10 flex flex-row gap-[4px] overflow-y-scroll px-0 text-[#FCFCFD] lg:px-5">
			<div className="flex w-full flex-col gap-12  rounded-bl-[48px] rounded-tl-[48px]">
				<div className="mt-[12vh] flex flex-col items-start px-6">
					<span className="font-poppins  text-text4xl font-extrabold leading-[46px]">
						Events
					</span>
				</div>
				{/* slider */}
				<div className="flex items-center justify-center">
					<SimpleSlider quests={topThreeeQuests} />
				</div>
				{/* banner */}
				{/* <div 
            className="relative h-[600px] w-full rounded-[30px] flex items-center justify-center transition-all duration-150 hover:shadow-lime-200 hover:shadow-xl  hover:translate-x-2 hover:-translate-y-4 bg-cover bg-blend-darken bg-no-repeat bg-center scale-95  border-b-8 border-gray-600 "
            style={{ backgroundImage: `url(https://w0.peakpx.com/wallpaper/277/379/HD-wallpaper-cyberpunk-2077-yellow-background-cyberpunk-2077-logo-new-games-cyberpunk.jpg` }}>
                <div
                // id="controller"
                  onMouseMove={skewElement}
                  onMouseLeave={resetSkew}
                 className=" relative flex justify-center items-center  ">
                    <div

                        className="  h-[600px] w-full ">
                        <Image
                            // src={questDatafromAllQuests.imageurl??questBanner} // change this later on
                            src={cyberpunk} // change this later on

                            unoptimized
                            className=" saturate-100 h-[600px] w-full h-inherit rounded-[30px]  object-cover object-center   p-4"
                            alt="Quest-Banner"
                            // style={{}}
                            width={120}
                            height={20}
                        />


                    </div>
                 

                </div>
            </div> */}

				<div className="mt-6 flex flex-col gap-5 px-6">
					<div className="text-textxl font-semibold">Recommended Events</div>
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
					<AllRecommendedQuests quests={events} fetchMore={HandleFetchMoreAll} />
				</div>
				{/* <div className="flex flex-col gap-5 px-6 py-4">
					<span className="flex flex-row justify-between text-[24px] leading-[120%]">
						<div className="text-textxl font-semibold">Top Questers</div>
						<Link href="/quest/leaderboard" className="text-[18px] font-medium">
							Leaderboard <span className="ml-4">{"  >"}</span>
						</Link>
					</span>
					<div className="flex flex-row gap-[20px] overflow-x-auto">
						<Questers players={data ?? []} />
					</div>
				</div> */}

				{activeUser && (
					// <div className="mt-6 flex flex-col gap-5 px-6">
					// 	<div className="text-textxl font-semibold">Participated Quests</div>
					// 	<span className="flex flex-row items-center justify-between font-poppins leading-none">
					// 		<p className="mr-5 text-[14px] lg:text-[18px]">
					// 			Description Cras convallis lacus orci, tristique tincidunt magna
					// 			consequat in.
					// 		</p>
					// 		{/* <Link
					// 			href="/quest/all"
					// 			className="flex items-center text-[14px] font-medium lg:text-[18px]"
					// 		>
					// 			Explore All <span className="ml-4">{"  >"}</span>
					// 		</Link> */}
					// 	</span>
					// 	<ParticipatedQuests user={activeUser} />
					// </div>
					<div />
				)}
				{activeUser && (
					// <div className="mt-6 flex flex-col gap-5 px-6">
					// 	<div className="text-textxl font-semibold">Completed Quests</div>
					// 	<span className="flex flex-row items-center justify-between font-poppins leading-none">
					// 		<p className="mr-5 text-[14px] lg:text-[18px]">
					// 			Description Cras convallis lacus orci, tristique tincidunt magna
					// 			consequat in.
					// 		</p>
					// 		{/* <Link
					// 			href="/quest/all"
					// 			className="flex items-center text-[14px] font-medium lg:text-[18px]"
					// 		>
					// 			Explore All <span className="ml-4">{"  >"}</span>
					// 		</Link> */}
					// 	</span>
					// 	<CompletedQuests user={activeUser} />
					// </div>
					<div />
				)}
			</div>
		</div>
	);
};

export default Event;
