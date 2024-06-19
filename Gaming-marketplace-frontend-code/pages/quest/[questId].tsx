/* eslint-disable indent */
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
	useGetRewardsQuery,
	useLazyGetUserQuestProgressQuery,
} from "../../features/quest-engine/quest.api";
// import { activeUserSelector } from "../../features/quest-engine/quest.selectors";
import BaseTaskButton from "../../components/QuestComponents/TaskButtons";
import { activeUserSelector } from "../../features/profile-page/profile.selectors";
import questBanner from "../../public/quest_banner.png";
import axios from "axios";
import { accTokenSelector } from "../../features/auth/auth.selectors";
import { BsFillArrowDownCircleFill } from "react-icons/bs";
import { IoIosArrowDropdown, IoIosArrowDropup } from "react-icons/io";
import { useNetwork } from "wagmi";

const QuestId = () => {
	let divs:any=Array(0);
	const router = useRouter();
	// const [rewards, setRewards] = useState<any[]>([]);

	const questId = router.query.questId as string;
	// console.log('skipToken',skipToken.description);
	const referCode = router.query.referCode as string;
	const activeUser = useSelector(activeUserSelector);
	const accessToken = useSelector(accTokenSelector);
	const{chain,chains}=useNetwork();
	// console.log("chain",chains)
	// console.log('chain',chain)

	const { data: questers } = useGetQuestQuestersQuery(questId ?? skipToken);
	const userId = activeUser?._id;
	const { data: participatedQuests } = useGetParticipatedQuestsQuery(
		activeUser?._id ?? skipToken,
	);
	// console.log('questId',questId);

	//   const options:any = {
	//     particles: {
	//       number: {
	//         value: 80,
	//         density: {
	//           enable: true,
	//           area: 1000
	//         }
	//       },
	//       color: {
	//         // value: ["#2EB67D", "#ECB22E", "#E01E5B", "#36C5F0"]
	// 		value:["#FFFFFF"]
	//       },
	//       shape: {
	//         type: "bubble"
	//       },
	//       opacity: {
	//         value: 1
	//       },
	//       size: {
	//         value: { min: 1, max: 3 }
	//       },
	//       links: {
	//         enable: true,
	//         distance: 150,
	//         color: "#808080",
	//         opacity: 0.4,
	//         width: 1
	//       },
	//       move: {
	//         enable: true,
	//         speed: 5,
	//         direction: "none",
	//         random: false,
	//         straight: false,
	//         outModes: "out"
	//       }
	//     },
	//     interactivity: {
	//       events: {
	//         onHover: {
	//           enable: true,
	//           mode: "grab"
	//         },
	//         onClick: {
	//           enable: true,
	//           mode: "push"
	//         }
	//       },
	//       modes: {
	//         grab: {
	//           distance: 140,
	//           links: {
	//             opacity: 1
	//           }
	//         },
	//         push: {
	//           quantity: 4
	//         }
	//       }
	//     }
	//   };

	//   const particlesInit = useCallback(async (engine:any) => {
	//     await loadFull(engine);
	//   }, []);

	// const participatedQuests: any = [];

	const { data: questDatafromAllQuests } = useGetQuestQuery(questId ?? skipToken);
	const [getUsersQuestProgress, UserQuestProgressResponse] = useLazyGetUserQuestProgressQuery();
	//reward distribution data
	const reward_address=questDatafromAllQuests?.rewards[0]?.address;
	const rewardName=questDatafromAllQuests?.rewards[0]?.name;
	const rewardAmount=questDatafromAllQuests?.rewards[0]?.amount;
	const gemAmount=questDatafromAllQuests?.gemsReward;
	const{data:questReward,isSuccess}=
	useGetRewardsQuery({questId:questId??skipToken,tokenAddress:reward_address??skipToken});
	// console.log("questReward",questReward);
	if(isSuccess){
		console.log("questReward",questReward);
		 divs = questReward?.map((item:any,index:number) => (
			<div
				key={item._id}
				className="dropdown-item  all flex w-[513px] transform flex-row
				 items-center justify-between gap-[4px] rounded-lg border-[1px]
				  border-neutral-800 bg-[#212121] px-4 py-[10px] transition duration-150"
			>
				<span className=" font-semibold font-gruppo text-[20px]">{index+1}th </span> 
				<span className="font-bold text-[24px] font-gruppo">PRIZE</span><span className="  font-Nosifer">{item}</span>
				 <span className=" font-extrabold font-gruppo text-[28px]">{rewardName}</span>
			</div>
		));
	}

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

	const { data: quests, isLoading, isError } = useGetAllQuestsQuery({ length: 20, pageIndex: 0 });

	const [isOpen, setIsOpen] = useState(false); // State to control dropdown visibility
	const items = ["Item 1", "Item 2", "Item 3", "Item 4"]; // Dynamic content


	return (
		<div
			className="overflow-y-scroll"
			// style={{ backgroundImage: `url(${questDatafromAllQuests.imageurl})` }}
		>
			{/* <Particles options={options} init={particlesInit}
			/> */}
			<Image
				// src={questDatafromAllQuests.imageurl??questBanner} // change this later on
				src={questBanner ?? questDatafromAllQuests.imageurl} // change this later on
				unoptimized
				className="relative h-[500px] w-full rounded-[30px] bg-[##212121] object-cover object-center p-4 hover:object-scale-down"
				alt="Quest-Banner"
				width={120}
				height={20}
			/>
			<div className="relative -top-[30vh] flex basis-full px-2 lg:px-5">
				<div className="flex h-full w-full flex-col gap-4">
					<nav className="w-full rounded-md">
						<Link
							href="#"
							className="hover:text-primary-600 focus:text-primary-600 active:text-primary-700 light:text-primary-400 light:hover:text-primary-500 light:focus:text-primary-500 light:active:text-primary-600 text-text3xl font-semibold text-white transition duration-150 ease-in-out"
						>
							{questDatafromAllQuests && questDatafromAllQuests.questTitle}
						</Link>
					</nav>

					<div className="flex flex-row gap-4">
						<RoundButton
							text={questDatafromAllQuests && questDatafromAllQuests.status}
						/>
						<RoundButton text={date} />
					</div>

					<div className="mt-2 flex w-full flex-col-reverse  justify-start gap-8 xl:flex-row">
						<div className="flex flex-grow-[3] flex-col gap-6">
							<div className="flex flex-col justify-evenly gap-3 px-1 text-white ">
								<BaseTaskButton
									questData={questDatafromAllQuests}
									questProgress={UserQuestProgressResponse.data}
								/>
							</div>

							<div className="flex flex-col justify-center gap-1 px-3">
								<div className="w-[100%] text-textLarge font-bold leading-8 text-white">
									Description:
								</div>
								<p className="pt-1 text-textMedium text-gray-300">
									{questDatafromAllQuests?.questDescription}
								</p>
							</div>
							{/* <div className="flex flex-col justify-center gap-1 px-3">
								<div className="w-[100%] text-textLarge font-bold leading-8 text-white">
									Gems:
								</div>
								<p className="pt-1 text-textMedium text-gray-300">
									{questDatafromAllQuests?.gemsReward}
								</p>
							</div> */}
							<div className="flex flex-col items-center gap-4 px-2 lg:items-start">
								<div className="text-base w-full font-semibold leading-10 text-white">
									<div className="flex w-[90%] justify-between text-textxl max-md:w-full">
										Recommended Quests
										<span>
											<Link
												href="/quest/all"
												className="flex items-center text-[16px] font-normal"
											>
												View All <span className="ml-4">{"  >"}</span>
											</Link>
										</span>
									</div>
								</div>
								<AllQuestCards quests={quests} noOfColumns={3} />
							</div>
						</div>
						<div className="mt-2 flex flex-col items-center gap-8 px-2">
							<div className="flex w-full flex-row justify-between">
								<div className="text-base flex-grow-1 text-textMedium3 font-semibold leading-8 text-white">
									Rewards{" "}
									<span className="text-textMedium2 font-medium">
										( {activeUser?.gems ? activeUser?.gems : 0}/
										{questDatafromAllQuests?.gemsReward} )
									</span>
								</div>
							</div>
							<Timer dateTime={dateString} />
							<RewardBox  amount={rewardAmount}
								RewardName={rewardName} Gems={gemAmount} chainName={chain?.name??"BNB Chain"}/>
							{/* Price Distribution Content */}
							<div className="flex flex-col justify-center items-center">
								<div
								// 	onClick={() => {
								// 		axios
								// 			.get(
								// 				`http://localhost:5000/v1/questor/getRewards/${questId}`,
								// 			)
								// 			.then((res) => {
								// 				console.log("rewards", res.data);
								// 				if (res.data.length > 0) {
								// 					setRewards(res.data);
								// 				}
								// 			})
								// 			.then(() => {
								// 				setIsOpen(!isOpen);
								// 			});
								// 	}}
									className="all flex w-[513px] transform flex-row items-center justify-between gap-[8px] rounded-md border-[1px] border-neutral-800 bg-[#212121] px-4 py-[10px] transition duration-150"
									onClick={() => setIsOpen(!isOpen)}
								>
									<p className=" font-gruppo text-[28px] font-bold text-white">
										Prize Distribution
									</p>
									<div className="h-8 w-8 items-center justify-center rounded-full bg-[#181616] p-2">
										{!isOpen?(
											<IoIosArrowDropdown className="scale-150"/>

										):(
											<IoIosArrowDropup className="scale-150"/>


										)}
										
									</div>
								</div>
								<div>
									{isOpen && (
										<div className="flex w-full flex-col items-center justify-center mx-auto">
											{divs.length==0?"loading":divs}
										</div>
									)}
								</div>
							</div>

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
							<div className="flex w-full flex-col items-start gap-3 px-2">
								<span className="flex items-center justify-center gap-2 font-poppins text-header2 font-semibold text-white">
									Questers
									<span className="pt-1 text-textMedium2 font-medium">
										({questers?.length})
									</span>
								</span>
								<QuesterList questers={questers} />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default QuestId;
