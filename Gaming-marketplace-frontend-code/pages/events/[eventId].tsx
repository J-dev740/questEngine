import { skipToken } from "@reduxjs/toolkit/dist/query";
// import Particles from 'react-particles';
// import {loadFull} from 'tsparticles'
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AllQuestCards from "../../components/QuestComponents/AllQuestCards";
import EligibilityButton from "../../components/QuestComponents/EligibilityButton";
import QuesterList from "../../components/QuestComponents/QuesterList";
import RoundButton from "../../components/QuestComponents/RoundButton";
import RewardBox from "../../components/QuestComponents/rewardBox";
import Timer from "../../components/QuestComponents/timerBox";

import {
	useGetAllQuestsQuery,
	useGetParticipatedQuestsQuery,
	useGetQuestQuery,
	useGetQuestQuestersQuery,
	useLazyGetUserQuestProgressQuery,
} from "../../features/quest-engine/quest.api";
// import { activeUserSelector } from "../../features/quest-engine/quest.selectors";
import BaseTaskButton from "../../components/QuestComponents/TaskButtons";
import { activeUserSelector } from "../../features/profile-page/profile.selectors";
import questBanner from "../../public/quest_banner.png";
import controller from "../../public/controller.png";
import LoL from "../../public/LoL.png";
import axios from "axios";
import { accTokenSelector } from "../../features/auth/auth.selectors";
import { IoIosArrowDropdown } from "react-icons/io";
import { useNetwork } from "wagmi";

const EventId = () => {
	const router = useRouter();
	const{chain,chains}=useNetwork();
	//update with tag is updated
	const questId = (router.query.eventId as string) || "651d2bf1d86cda01be6383b8";
	// const questId="651d2bf1d86cda01be6383b8";
	// 	// console.log('skipToken',skipToken.description);
	const referCode = router.query.referCode as string;
	const activeUser = useSelector(activeUserSelector);
	const accessToken = useSelector(accTokenSelector);
	


	const { data: questers } = useGetQuestQuestersQuery(questId ?? skipToken);
	const userId = activeUser?._id;
	const { data: participatedQuests } = useGetParticipatedQuestsQuery(
		activeUser?._id ?? skipToken,
	);
	// 	// console.log('questId',questId);

	// //   const options:any = {
	// //     particles: {
	// //       number: {
	// //         value: 80,
	// //         density: {
	// //           enable: true,
	// //           area: 1000
	// //         }
	// //       },
	// //       color: {
	// //         // value: ["#2EB67D", "#ECB22E", "#E01E5B", "#36C5F0"]
	// // 		value:["#FFFFFF"]
	// //       },
	// //       shape: {
	// //         type: "bubble"
	// //       },
	// //       opacity: {
	// //         value: 1
	// //       },
	// //       size: {
	// //         value: { min: 1, max: 3 }
	// //       },
	// //       links: {
	// //         enable: true,
	// //         distance: 150,
	// //         color: "#808080",
	// //         opacity: 0.4,
	// //         width: 1
	// //       },
	// //       move: {
	// //         enable: true,
	// //         speed: 5,
	// //         direction: "none",
	// //         random: false,
	// //         straight: false,
	// //         outModes: "out"
	// //       }
	// //     },
	// //     interactivity: {
	// //       events: {
	// //         onHover: {
	// //           enable: true,
	// //           mode: "grab"
	// //         },
	// //         onClick: {
	// //           enable: true,
	// //           mode: "push"
	// //         }
	// //       },
	// //       modes: {
	// //         grab: {
	// //           distance: 140,
	// //           links: {
	// //             opacity: 1
	// //           }
	// //         },
	// //         push: {
	// //           quantity: 4
	// //         }
	// //       }
	// //     }
	// //   };

	// //   const particlesInit = useCallback(async (engine:any) => {
	// //     await loadFull(engine);
	// //   }, []);

	// const participatedQuests: any = [];

	const { data: questDatafromAllQuests } = useGetQuestQuery(questId ?? skipToken);
	const reward_address=questDatafromAllQuests?.rewards[0]?.address;
	const rewardName=questDatafromAllQuests?.rewards[0]?.name;
	const rewardAmount=questDatafromAllQuests?.rewards[0]?.amount;
	const gemAmount=questDatafromAllQuests?.gemsReward;
	const [getUsersQuestProgress, UserQuestProgressResponse] = useLazyGetUserQuestProgressQuery();

	useEffect(() => {
		const execute = async () => {
			if (questId && userId) {
				console.log("questId", questId);
				const data = await getUsersQuestProgress({ userId, questId } ?? skipToken);
				// console.log('testData',data)
				// console.log('checking inviteCode',referCode)
				if (referCode) {
					console.log(referCode);
					const body = {
						questId: questId,
						walletId: activeUser.walletAddress,
					};

					axios
						.patch(`http://localhost:5000/v1/tasks/referral/${referCode}`, body, {
							headers: {
								Authorization: `Bearer ${accessToken}`,
							},
						})
						.then((res) => {
							console.log("referralupdate", res.data);
						})
						.catch((e) => console.log("patch Error", e.message));
				}
			}
		};
		execute();
	}, [questId, userId]);

	const currParticipatedQuest = participatedQuests?.find((obj: any) => {
		return obj._id === questId;
	});

	const dateString = questDatafromAllQuests?.endTimestamp;
	const date = new Date(dateString).toString();

	// 	const { data: quests, isLoading, isError } = useGetAllQuestsQuery({ length: 20, pageIndex: 0 });
	const divStyle = {
		backgroundImage: `url(${controller})`,
	};

	function skewElement(event: any) {
		const e = event;
		// const skewDiv = document.getElementById('skewDiv');
		const rect = e.target.getBoundingClientRect();
		const mouseX = e.clientX;
		const mouseY = e.clientY;
		//   console.log({X:mouseX,Y:mouseY})
		const midX = e.target.offsetWidth / 2;
		const midY = e.target.offsetHeight / 2;
		// console.log({left:rect?.left,top:rect?.top})
		// const centerX=(rect?.left||0)+midX;
		// const centerY=(rect?.top||0)+midY;
		// console.log('centerX',centerX)
		// console.log('centerY',centerY)

		// const rotateX = (centerY - mouseY) /100; // Adjust the value for the skew effect
		// const rotateY = (centerX - mouseX) /100; // Adjust the value for the skew effect
		const rotateX = (midY - (mouseY - (rect?.top || 0))) / 90; // Adjust the value for the skew effect
		const rotateY = (midX - (mouseX - (rect?.left || 0))) / 90; // Adjust the value for the skew effect
		// console.log('rotateX',rotateX)
		// console.log('rotateY',rotateY)
		e.target.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.2)`;
	}
	function resetSkew(event: any) {
		const e = event;
		e.target.style.transform = `perspective(1000px) rotateX(${0}deg) rotateY(${0}deg) scale(1)`;
	}

	const [isOpen, setIsOpen] = useState(false); // State to control dropdown visibility
	const items = ["Item 1", "Item 2", "Item 3", "Item 4"]; // Dynamic content
	const divs = items.map((item) => (
		<div key={item} className="dropdown-item">
			{item}
		</div>
	));

	return (
		<div
			// style={{backgroundImage:`url(https://emerging-europe.com/wp-content/uploads/2021/01/ss-b3685fcab4d6f60c9fd54ffe8757ccaaef803d9e1920x1080.jpg)`,backdropFilter:'blur(100px)'}}
			className="no-scrollbar  h-screen overflow-y-scroll bg-opacity-40 bg-gradient-to-r from-black to-gray-900 bg-cover bg-center bg-no-repeat p-4 backdrop-blur-2xl "
		>
			<div className="flex flex-col items-center justify-center gap-10 space-y-6">
				<div
					className="relative flex h-[600px] w-full scale-95 items-center justify-center rounded-[30px] border-b-8 border-gray-600 bg-cover  bg-center bg-no-repeat bg-blend-darken transition-all duration-150 hover:-translate-y-4 hover:translate-x-2  hover:shadow-xl hover:shadow-lime-200 "
					style={{
						backgroundImage: `url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZ43wjxF-7Lo1HEUHykeXJYh9547kzraziga6YEBJ32CvLpAldWqKT8MJgphBpFZ05tOo&usqp=CAU)`,
					}}
				>
					<div
						id="controller"
						onMouseMove={skewElement}
						onMouseLeave={resetSkew}
						className=" relative flex items-center justify-center  "
					>
						<div className="  h-[600px] w-full ">
							<Image
								// src={questDatafromAllQuests.imageurl??questBanner} // change this later on
								src={LoL} // change this later on
								unoptimized
								className=" h-inherit h-[600px] w-full rounded-[30px] object-cover  object-center p-4   saturate-100"
								alt="Quest-Banner"
								// style={{}}
								width={120}
								height={20}
							/>
						</div>
					</div>
				</div>
				<div className=" mb-4 animate-pulse  rounded-bl-[48px]  rounded-tr-[48px] bg-transparent from-orange-600 to-amber-300 p-16  backdrop-blur-lg">
					<Timer dateTime="2023-10-19" />
				</div>
				<div className=" relative flex w-full flex-row items-center justify-between gap-8 space-x-4 rounded-[30px] bg-transparent p-4 backdrop-blur-lg lg:justify-evenly  lg:pl-16">
					{/* eventPart */}
					<div className=" flex w-auto scale-125 flex-col items-center justify-between gap-4 space-y-4 p-8 ">
						{/* event title */}

						<nav className="flex w-full justify-start rounded-md ">
							<Link
								href="#"
								className="hover:text-primary-600 focus:text-primary-600 active:text-primary-700 light:text-primary-400 light:hover:text-primary-500 light:focus:text-primary-500 light:active:text-primary-600  text-header1 font-semibold text-white transition duration-150 ease-in-out   "
							>
								{questDatafromAllQuests && questDatafromAllQuests.questTitle}
							</Link>
						</nav>

						{/* ongoing/upcoming and endTime */}
						<div className="flex w-full flex-row gap-4 ">
							{/* ongoing/upcoming */}
							<div className="px-3">
								<RoundButton
									text={questDatafromAllQuests && questDatafromAllQuests.status}
								/>
							</div>
							{/* endTime */}
							<div className=" px-3">
								<RoundButton text={date} />
							</div>
						</div>
						{/* tasksPart */}
						<div className="flex flex-col justify-evenly gap-4 p-2 text-white ">
							<BaseTaskButton
								questData={questDatafromAllQuests}
								questProgress={UserQuestProgressResponse.data}
							/>
							<div className="flex flex-col justify-center gap-1 px-3">
								<div className="w-[100%] text-textLarge font-bold leading-8 text-white">
									Description:
								</div>
								<p className="pt-1 text-textMedium text-gray-300">
									{questDatafromAllQuests?.questDescription}
								</p>
							</div>
							<div className="flex flex-col justify-center gap-1 px-3">
								<div className="w-[100%] text-textLarge font-bold leading-8 text-white">
									Gems:
								</div>
								<p className="pt-1 text-textMedium text-gray-300">
									{questDatafromAllQuests?.gemsReward}
								</p>
							</div>
						</div>
					</div>
					{/* questers and rewardBox part */}
					<div className="flex flex-col items-center justify-between gap-8 space-y-4">
						{/* questers part */}
						<div>
							{/* <span className="flex items-center justify-center gap-2 font-poppins text-header2 font-semibold text-white">
									Questers
									<span className="pt-1 text-textMedium2 font-medium">
										({questers?.length})
									</span>
								</span>
								<QuesterList questers={questers} /> */}
						</div>
						{/* rewardBox part */}
						<div className=" gap-4 p-6 lg:scale-150">
							<RewardBox amount={rewardAmount} 
								chainName={chain?.name??"BNB Chain"} 
								RewardName={rewardName} Gems={gemAmount} />
						</div>
						{/* price distribution */}
						<div className="flex flex-col">
							<div
								onClick={() => {
									setIsOpen(!isOpen);
								}}
								className="all flex w-[513px] transform flex-row items-center justify-between gap-[8px] rounded-[24px] border-[1px] border-neutral-800 bg-[#212121] px-4 py-[32px] transition duration-150 hover:-translate-y-4 hover:translate-x-2"
							>
								<p className="font-poppins text-[20px] font-bold text-white">
									Prize Distribution
								</p>
								<div className="h-8 w-8 items-center justify-center rounded-full bg-[#181616] p-2">
									<IoIosArrowDropdown className="scale-150"> </IoIosArrowDropdown>
								</div>
							</div>
							<div>{isOpen && <div className="flex flex-col">{divs}</div>}</div>
						</div>
						{/* participate button */}
						{questDatafromAllQuests && !currParticipatedQuest && (
							<div className="w-72">
								<EligibilityButton
									quest_id={questDatafromAllQuests._id}
									allTasks={questDatafromAllQuests.tasks}
									text="Participate"
								/>
							</div>
						)}
						{questDatafromAllQuests && currParticipatedQuest && (
							<EligibilityButton text="Participated" allTasks={[]} quest_id="" />
						)}
					</div>
				</div>
			</div>
		</div>
	);
};
export default EventId;
