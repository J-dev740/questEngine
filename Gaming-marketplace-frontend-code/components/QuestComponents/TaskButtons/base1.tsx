/* eslint-disable react/jsx-indent */
/* eslint-disable max-len */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable indent */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-case-declarations */
import React, { useState, useEffect } from "react";
import TaskButtonIcon from "./TaskButtonIcon";
import { Task, TaskOption, TaskType } from "../../../constants/quest/task";
import { useSelector } from "react-redux";
import {
	walletAddressSelector,
	accTokenSelector,
	refTokenSelector,
} from "../../../features/auth/auth.selectors";
import axios from "axios";
import TelegramLoginWidget from "./TelegramLoginWidget";
// import TelegramLoginButton from "./TelegramLogin";
import { questActions } from "../../../features/quest-engine/quest.slice";
import { useDispatch } from "react-redux";
import TelegramLoginButton from "telegram-login-button";
import { useRouter } from "next/router";
// import React from 'react-html-parser'
import { useNetwork } from "wagmi";

import toast from "react-hot-toast";
import { selectedTelegramCodeSelector } from "../../../features/quest-engine/quest.selectors";
import { BigNumber } from "ethers";
// import {} from "../../../constants/task"
// Initialization for ES Users
// import {
//     Ripple,
//     initTE,
//   } from "tw-elements";
//     // initTE({ Ripple });

const BaseButton1 = ({
	taskData,
	updateTask,
	userQuestProgress,
	onVerify,
	onConnect,
	onView,
	completed,
	LinkResponse,
	QuizResponse,
	userID,
}: any) => {
	const router = useRouter();
	const questId = router.query.questId as string;
	const walletAddress: string = useSelector(walletAddressSelector);
	const { chain, chains } = useNetwork();
	// console.log('chainId---------->',chain.id)

	const accessToken = useSelector(accTokenSelector);
	const [isComplete, setIsComplete] = useState(false);
	const [isopen, setIsOpen] = useState(false);
	const baseUrl=process.env.NEXT_PUBLIC_BACKEND_URL

	return (
		<div className=" rounded-xl border-white  bg-slate-950">
			<div
				className="hover:bg-primary-600 mt-2 flex w-64 -translate-y-3 translate-x-3 items-center justify-between whitespace-nowrap 
				 rounded-lg border-b-2 border-white bg-[#212121] bg-opacity-40 bg-gradient-to-tr bg-clip-padding px-6 py-4 pb-2 pt-2.5
				  font-medium uppercase backdrop-blur-sm backdrop-filter transition-all duration-150 ease-in-out hover:-translate-y-1 hover:translate-x-1
				   hover:from-teal-400 hover:to-cyan-300 sm:w-full "
				data-te-dropdown-toggle-ref
				data-te-ripple-color="light"
			>
				<div className="flex animate-pulse items-center ">
					{" "}
					<div className=" animate-wiggle text-yellow-400">
						<TaskButtonIcon task={taskData.category} />
					</div>
					<span className="text-2xl mx-3">{taskData.name}</span>
					<span className="  text-md animate-wiggle_bounce rounded-full  bg-gradient-to-tr from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% px-3 py-1">
						{taskData.points} XP
					</span>
				</div>
				<div className="flex">
					{(() => {
						switch (taskData.category) {
							//twitter task to be completed
							case TaskOption.TWITTER_TASK:
								// eslint-disable-next-line no-case-declarations
								const [isOpenFollow, setIsOpenFollow] = useState(false); // const [isLoading, setIsLoading] = useState(false);

								// eslint-disable-next-line no-case-declarations
								const loginURI = `${baseUrl}/tasks/twitter/login?walletId=${walletAddress}?Authorization=Bearer ${accessToken}`;

								// console.log(taskDetails.customisation);
								const twitterId =
									taskData?.customisation?.twitter_id || "akshaykumar";
								const likeTweetId = taskData?.customisation?.like || "";
								const retweetTweetId = taskData?.customisation?.retweet || "";
								const id = likeTweetId;
								console.log(id);

								console.log(twitterId, likeTweetId, retweetTweetId);

								const followUser = () => {
									// const body = {
									// 	walletId: `${walletAddress}`,
									// 	twitterId: twitterId || "IronMan",
									// };
									setIsOpenFollow(!isOpenFollow);
									window.open(`https://twitter.com/${twitterId}`, "_blank");

									// axios.post("http://localhost:4000/tasks/twitter/follow", body).then((res) => {
									// axios.get(`https://ed3e-223-186-94-254.ngrok-free.app/v1/tasks/twitter/get/${twitterId}`, {
									//     params: {
									//         walletId: walletAddress,
									//     },
									// })
									//     .then((res) => {
									//         console.log("RES", res);
									//     });
								};

								const retweet = () => {
									const body = {
										walletId: `${walletAddress}`,
										// tweetId: retweetTweetId.split("status/")[1].split("?")[0],
										tweetId: likeTweetId.split("status/")[1],
									};

									axios
										.post("http://localhost:4000/tasks/twitter/retweet", body)
										.then((res) => {
											console.log("RES", res);
										});
								};

								const like = () => {
									const body = {
										walletId: `${walletAddress}`,
										// tweetId: likeTweetId.split("status/")[1].split("?")[0],
										tweetId: likeTweetId.split("status/")[1],
									};

									axios
										.post(
											"http://localhost:4000/tasks/twitter/createLike",
											body,
										)
										.then((res) => {
											console.log("RES", res);
										});
								};
								return (
									<div>
										{twitterId !== "" ? (
											<div className="flex">
												{userQuestProgress?.taskStatus?.includes(
													taskData._id,
												) ? (
													<div>
														<button
															type="button"
															disabled
															className="mx-2 flex w-full flex-row items-center justify-center rounded-full border-2 bg-gradient-to-r  from-[#f37629] to-[#69ce36] p-2 px-8 text-white  hover:z-[2px] hover:bg-slate-600 "
														>
															Completed
														</button>
													</div>
												) : (
													<div className="flex flex-row space-x-7 rounded-xl border-b-2 ">
														{/* <a href={loginURI} target="_blank" rel="noreferrer"> */}

														<button
															type="button"
															onClick={() => {
																console.log("...connecting");
																axios
																	.get(
																		`${baseUrl}/tasks/twitter/login?walletId=${walletAddress}`,
																		{
																			headers: {
																				Authorization: `Bearer ${accessToken}`,
																			},
																			// method:'GET',
																			// mode:'no-cors',
																			withCredentials: true,
																		},
																	)
																	.then((res) => {
																		console.log(
																			"responseData",
																			res.data,
																		);
																		window.open(
																			res.data.redirectUrl,
																			"_blank",
																		);
																		// router.push(res.data.redirectUrl)
																	})
																	.catch((e) => {
																		console.log(
																			"axios Error",
																			e.message,
																		);
																	});
															}}
															className="border-1 mx-2  flex w-full flex-row items-center justify-center rounded-full bg-gradient-to-r from-[#296BBD] to-[#AC85FF] p-2 px-8 text-white  shadow-xl transition-all duration-100 hover:z-[2px] hover:-translate-y-1   hover:translate-x-1 hover:bg-slate-600 "
														>
															Connect
														</button>
														{/* </a> */}

														<button
															type="button"
															onClick={() => {
																followUser();
																QuizResponse(true);
															}}
															className="border-1 mx-2 flex w-full flex-row items-center justify-center rounded-[16px] bg-gradient-to-r from-[#296BBD] to-[#AC85FF] px-5 text-white shadow-xl transition-all  duration-100 hover:z-[2px]  hover:-translate-y-1   hover:translate-x-1 hover:bg-slate-600 "
														>
															Follow
														</button>
														<button
															type="button"
															onClick={() => {
																const body = {
																	twitterId: twitterId,
																	taskID: taskData._id,
																};
																console.log(
																	"verifying follow user....",
																);
																axios
																	.post(
																		`${baseUrl}/tasks/verify/followUser/quest/${questId}`,
																		body,
																		{
																			headers: {
																				Authorization: `Bearer ${accessToken}`,
																				walletAddress:
																					walletAddress,
																			},
																		},
																	)
																	.then((res) => {
																		console.log(
																			"verified",
																			res,
																		);
																	})
																	.catch((e) => {
																		console.log(
																			"error_msg",
																			e.message,
																		);
																	});
															}}
															className={
																isOpenFollow
																	? "border-1 mx-2 flex w-full flex-row items-center justify-center rounded-[16px] bg-gradient-to-r from-[#296BBD] to-[#AC85FF] px-5 text-white shadow-xl transition-all  duration-100 hover:z-[2px]  hover:-translate-y-1   hover:translate-x-1 hover:bg-slate-600 "
																	: "hidden"
															}
														>
															verify
														</button>
													</div>
												)}
											</div>
										) : (
											<div />
										)}
										{likeTweetId !== "" ? (
											<>
												<div className="flex">
													{userQuestProgress?.taskStatus?.includes(
														taskData._id,
													) ? (
														<>
															<button
																type="button"
																disabled
																className="border-1 mx-2 flex w-full flex-row items-center justify-center rounded-full bg-gradient-to-r  from-[#296BBD] to-[#AC85FF] p-2 px-8 text-white  hover:z-[2px] hover:bg-slate-600 "
															>
																Completed
															</button>
														</>
													) : (
														<>
															<a
																href={loginURI}
																target="_blank"
																rel="noreferrer"
															>
																<button
																	type="button"
																	onClick={() => {
																		console.log(
																			"...connecting",
																		);
																	}}
																	className="border-1 mx-2 flex w-full flex-row items-center justify-center rounded-full bg-gradient-to-r from-[#296BBD] to-[#AC85FF] p-2 px-8 text-white  shadow-xl transition-all duration-100 hover:z-[2px] hover:-translate-y-1   hover:translate-x-1 hover:bg-slate-600 "
																>
																	Connect
																</button>
															</a>
															<button
																type="button"
																onClick={() => {
																	like();
																	QuizResponse(true);
																}}
																className="border-1 mx-2 flex w-full flex-row items-center justify-center rounded-[16px] bg-gradient-to-r from-[#296BBD] to-[#AC85FF] px-5 text-white shadow-xl transition-all  duration-100 hover:z-[2px]  hover:-translate-y-1   hover:translate-x-1 hover:bg-slate-600 "
															>
																Like
															</button>
														</>
													)}
												</div>
											</>
										) : (
											<div />
										)}
										{retweetTweetId !== "" ? (
											<>
												<div className="flex">
													{userQuestProgress?.taskStatus?.includes(
														taskData._id,
													) ? (
														<>
															<button
																type="button"
																disabled
																className="border-1 mx-2 flex w-full flex-row items-center justify-center rounded-full bg-gradient-to-r  from-[#296BBD] to-[#AC85FF] p-2 px-8 text-white  hover:z-[2px] hover:bg-slate-600 "
															>
																Completed
															</button>
														</>
													) : (
														<>
															<a
																href={loginURI}
																target="_blank"
																rel="noreferrer"
															>
																<button
																	type="button"
																	onClick={() => {
																		console.log(
																			"...connecting",
																		);
																	}}
																	className="border-1 mx-2 flex w-full flex-row items-center justify-center rounded-full bg-gradient-to-r from-[#296BBD] to-[#AC85FF] p-2 px-8 text-white  shadow-xl transition-all duration-100 hover:z-[2px] hover:-translate-y-1   hover:translate-x-1 hover:bg-slate-600 "
																>
																	Connect
																</button>
															</a>
															<button
																type="button"
																onClick={() => {
																	retweet();
																	QuizResponse(true);
																}}
																className="border-1 mx-2 flex w-full flex-row items-center justify-center rounded-[16px] bg-gradient-to-r from-[#296BBD] to-[#AC85FF] px-5 text-white shadow-xl transition-all  duration-100 hover:z-[2px]  hover:-translate-y-1   hover:translate-x-1 hover:bg-slate-600 "
															>
																Retweet
															</button>
														</>
													)}
												</div>
											</>
										) : (
											<div />
										)}
									</div>
								);
							case TaskOption.DISCORD_TASK:
								// const[isOpenDiscord,setIsOpenDiscord]=useState(false)
								// const [isDiscordComplete,setIsDiscordComplete]=useState(false)
								const taskUri =
									taskData?.customisation?.link ??
									"https://discord.com/invite/fKknYbzSfQ";
								const guildId = taskUri.split("channels/")[1].split("/")[0];
								// console.log('taskStatus')
								if (
									userQuestProgress?.taskStatus?.some((obj: any) => {
										if (obj.taskId === taskData._id) return true;
									})
								) {
									console.log("taskStatus_complete", taskData._id);
								} else {
									console.log("taskIncompelete", taskData._id);
								}
								// console.log(guildId)
								return (
									<>
										{isComplete ||
										userQuestProgress?.taskStatus?.some((obj: any) => {
											if (obj.taskId === taskData._id) return true;
										}) ? (
											<div>
												<button
													type="button"
													disabled
													className="border-1 mx-2 flex w-full flex-row items-center justify-center rounded-full bg-gradient-to-r  from-[#296BBD] to-[#AC85FF] p-2 px-8 text-white  hover:z-[2px] hover:bg-slate-600 "
												>
													Completed
												</button>
											</div>
										) : (
											<>
												<a
													className="flex items-center justify-center"
													target="_blank"
													href="https://discord.com/api/oauth2/authorize?client_id=1156970329416159363&redirect_uri=http%3A%2F%2Flocalhost%3A5000%2Fv1%2Ftasks%2Fdiscord%2Fverify&response_type=code&scope=identify%20guilds.join%20guilds"
													rel="noreferrer"
												>
													<button
														type="button"
														onClick={() => {
															// axios.get('https://discord.com/api/oauth2/authorize?client_id=1156970329416159363&redirect_uri=http%3A%2F%2Flocalhost%3A5000%2Fv1%2Ftasks%2Fdiscord%2Fverify&response_type=code&scope=identify%20guilds.join%20guilds')
															// .then((res)=>{
															// 	window.open(res.data,"_blank")
															// }).catch((e=>{
															// 	console.log(e)
															// }))
														}}
														// className="rounded-[10px] border-2 border-blue-500 px-4 py-2 text-[#fff] duration-300 hover:bg-blue-500 hover:text-blue-100"
														className="border-1 mx-2  flex w-full flex-row items-center justify-center rounded-full bg-gradient-to-r from-[#296BBD] to-[#AC85FF] p-2 px-8 text-white  shadow-xl transition-all duration-100 hover:z-[2px] hover:-translate-y-1   hover:translate-x-1 hover:bg-slate-600 "
													>
														connect
													</button>
												</a>
												<button
													type="button"
													onClick={() => {
														const body = {
															uri: taskUri,
														};
														setIsOpen(!isopen);
														console.log("discordUri", taskUri);
														// console.log(typeof(taskUri))
														axios
															.post(
																`${baseUrl}/tasks/discord`,
																body,
																{
																	headers: {
																		Authorization: `Bearer ${accessToken}`,
																	},
																},
															)
															.then((res) => {
																console.log(
																	"discordJoinResult",
																	res,
																);
																window.open(res.data.Uri, "_blank");
															});
													}}
													// className="rounded-[10px] border-2 border-blue-500 px-4 py-2 text-[#fff] duration-300 hover:bg-blue-500 hover:text-blue-100"
													className="border-1 mx-2  flex w-full flex-row items-center justify-center rounded-full bg-gradient-to-r from-[#296BBD] to-[#AC85FF] p-2 px-8 text-white  shadow-xl transition-all duration-100 hover:z-[2px] hover:-translate-y-1   hover:translate-x-1 hover:bg-slate-600 "
												>
													Join
												</button>
												<button
													type="button"
													onClick={() => {
														const params = {
															GuildID: guildId,
														};
														console.log(
															"verifying Join discord  user....",
														);
														console.log("guildId", guildId);
														axios
															.get(
																`${baseUrl}/tasks/discord/verify/callback`,
																{
																	params: params,
																	// headers:{
																	// 	Authorization:`Bearer ${accessToken}`
																	// }
																},
															)
															.then((res) => {
																console.log({ response: res.data });
																if (res.data == true) {
																	updateTask(taskData)
																		.then(() => {
																			console.log(
																				"DiscordTaskUpdated",
																			);
																			if (
																				userQuestProgress?.taskStatus?.some(
																					(obj: any) => {
																						if (
																							obj.taskId ===
																							taskData._id
																						)
																							return true;
																					},
																				)
																			)
																			console.log("setIscomplete True");
																				setIsComplete(true);
																			console.log(
																				"DiscordTaskCompleted",
																			);
																		})
																		.catch((e: any) => {
																			console.log(
																				"DiscordFrontendError:",
																				e,
																			);
																		});
																} else {
																	console.log("taskIncomplete");
																}
															})
															.catch((e) => {
																console.log("error:", e.message);
															});
													}}
													className={
														isopen
															? "border-1 mx-2 flex w-full flex-row items-center justify-center rounded-[16px] bg-gradient-to-r from-[#296BBD] to-[#AC85FF] px-5 text-white shadow-xl transition-all  duration-100 hover:z-[2px]  hover:-translate-y-1   hover:translate-x-1 hover:bg-slate-600 "
															: "hidden"
													}
												>
													verify
												</button>
											</>
										)}
									</>
								);
							case TaskOption.TELEGRAM_TASK:
								// const channelLink=taskData?.customisation?.link ?? "https://t.me/testChannel740";
								const channelLink = "https://t.me/testChannel740";

								const channelName = channelLink.split("t.me/")[1];
								const dispatch = useDispatch();
								const TeleUserId = useSelector(selectedTelegramCodeSelector);

								const handleTelegramResponse = (response: any) => {
									// Handle the response from Telegram
									console.log(response);
									dispatch(questActions.setTelegramCode(response.id));
								};

								return (
									<>
										<button
											type="button"
											className="rounded-[10px]  border-blue-500 px-4 py-2 text-[#fff] duration-300 hover:bg-blue-500 hover:text-blue-100"
										>
											<TelegramLoginButton
												dataOnauth={handleTelegramResponse}
												botName="Quester02_Bot"
												requestAccess
												// redirectUrl="https://0730-223-186-6-203.ngrok-free.app/auth/telegram/callback"
											/>
											{/* <TelegramLoginButton/> */}
										</button>
										<button
											type="button"
											onClick={() => {
												setIsOpen(!isopen);
												console.log("telegramUri", channelLink);
												// console.log(typeof(taskUri))
												window.open(channelLink, "_blank");
											}}
											// className="rounded-[10px] border-2 border-blue-500 px-4 py-2 text-[#fff] duration-300 hover:bg-blue-500 hover:text-blue-100"
											className="border-1 mx-2  flex w-full flex-row items-center justify-center rounded-full bg-gradient-to-r from-[#296BBD] to-[#AC85FF] p-2 px-8 text-white  shadow-xl transition-all duration-100 hover:z-[2px] hover:-translate-y-1   hover:translate-x-1 hover:bg-slate-600 "
										>
											Join
										</button>
										<button
											type="button"
											onClick={() => {
												console.log(typeof TeleUserId);
												const body = {
													channelName: channelName,
													userID: TeleUserId.toString(),
													taskID: taskData._id,
												};
												console.log("verifying Join telegram user....");
												axios
													.post(
														`${baseUrl}/tasks/verify/user/quest/${questId}`,
														body,
														{
															headers: {
																Authorization: `Bearer ${accessToken}`,
																walletAddress: walletAddress,
															},
														},
													)
													.then((res) => {
														console.log({ response: res.data });
														if (res.data == true) {
															updateTask(taskData)
																.then(() => {
																	console.log(
																		"TelegramTaskUpdated",
																	);
																	if (
																		userQuestProgress?.taskStatus?.some(
																			(obj: any) => {
																				if (
																					obj.taskId ===
																					taskData._id
																				)
																					return true;
																			},
																		)
																	)
																		setIsComplete(true);
																	console.log(
																		"TelegramTaskCompleted",
																	);
																})
																.catch((e: any) => {
																	console.log(
																		"DiscordFrontendError:",
																		e,
																	);
																});
														} else {
															console.log("taskIncomplete");
														}
													})
													.catch((e) => {
														console.log("error:", e.message);
													});
											}}
											className={
												isopen
													? "border-1 mx-2 flex w-full flex-row items-center justify-center rounded-[16px] bg-gradient-to-r from-[#296BBD] to-[#AC85FF] px-5 text-white shadow-xl transition-all  duration-100 hover:z-[2px]  hover:-translate-y-1   hover:translate-x-1 hover:bg-slate-600 "
													: "hidden"
											}
										>
											verify
										</button>
									</>
								);
							case TaskOption.REDIRECT:
								return (
									<>
										{isComplete ||
										userQuestProgress?.taskStatus?.some((obj: any) => {
											if (obj.taskId === taskData._id) return true;
										}) ? (
											<div>
												<button
													type="button"
													disabled
													className="border-1 mx-2 flex w-full flex-row items-center justify-center rounded-full bg-gradient-to-r  from-[#296BBD] to-[#AC85FF] p-2 px-8 text-white  hover:z-[2px] hover:bg-slate-600 "
												>
													Completed
												</button>
											</div>
										) : (
											<button
												type="button"
												onClick={() => {
													LinkResponse(true);
													window.open(
														taskData.customisation.link,
														"_blank",
													);
													try {
														updateTask(taskData)
															.then(() => {
																setIsComplete(true);
															})
															.catch((e: any) => console.log(e));
													} catch (error) {
														console.log(error);
													}
												}}
												className="border-1 mx-2 flex w-full flex-row items-center justify-center rounded-[16px] bg-gradient-to-r from-[#296BBD]  to-[#AC85FF] p-3  text-white   hover:z-[2px] hover:bg-slate-600 "
											>
												Redirect
											</button>
										)}
									</>
								);
							case TaskOption.REFERRAL:
								const [referralCode, setReferralCode] = useState("");
								const [walletID, setwalletID] = useState("");
								const [Url, setUrl] = useState("");
								const [clicked, setClick] = useState(false);

								const handleSubmit = async (e: any) => {
									e.preventDefault();
									// console.log('hello world')
									console.log("called");
									// const questId = router.asPath.split("/")[2];
									const body = {
										walletAddress: walletAddress,
									};

									axios
										.post(`${baseUrl}/tasks/referral`, body, {
											headers: {
												Authorization: `Bearer ${accessToken}`,
											},
										})
										.then((code_res) => {
											//here we are getting the referral code
											console.log("referral code", code_res.data);
											const baseUrl = `http://localhost:3000/quest/${questId}`;
											const queryParams = new URLSearchParams();
											// queryParams.append('walletId',walletID);
											queryParams.append("referCode", code_res.data);
											const encodedParams = queryParams.toString();
											const finalUrl = `${baseUrl}?${encodedParams}`;
											setReferralCode(code_res.data);
											setUrl(finalUrl);
											console.log("finalUrl", finalUrl);
											setClick(true);

											// `http://localhost:3000/quest/${questId}/${userID}/${taskData._id}`,
											// const body={
											// 	questId:questId,
											// 	walletId:walletID
											// }
											// axios.patch(`${baseUrl}/tasks/referral/${code_res.data}`,body,{
											// 	headers:{
											// 	Authorization:`Bearer ${accessToken}`
											// 	}
											// }).then((res)=>{
											// 	console.log('referralupdate',res.data)
											// 	const baseUrl=`http://localhost:3000/quest/${questId}`
											// 	const queryParams=new URLSearchParams();
											// 	// queryParams.append('walletId',walletID);
											// 	queryParams.append('referCode',code_res.data);
											// 	const encodedParams=queryParams.toString();
											// 	const finalUrl = `${baseUrl}?${encodedParams}`;
											// 	setReferralCode(code_res.data);
											// 	setUrl(finalUrl)
											// 	console.log('finalUrl',finalUrl);
											// 	// console.log('current referralcode',referralCode)
											// }).catch((e)=>console.log('patch Error',e.message))
										})
										.catch((e) => console.log("PostError", e.message));
								};
								// const generateReferralCode = (walletId: string) => { };
								console.log("referral task");
								return (
									<>
										{isComplete ||
										userQuestProgress?.taskStatus?.some((obj: any) => {
											if (obj.taskId === taskData._id) return true;
										}) ? (
											<div>
												<button
													type="button"
													disabled
													className="border-1 mx-2 flex w-full flex-row items-center justify-center rounded-full bg-gradient-to-r  from-[#296BBD] to-[#AC85FF] p-2 px-8 text-white  hover:z-[2px] hover:bg-slate-600 "
												>
													Completed
												</button>
											</div>
										) : (
											<div className="align-right flex flex-row items-center justify-between ">
												<button
													type="button"
													onClick={handleSubmit}
													className={
														clicked
															? "hidden"
															: "text-bold m-2 flex w-fit justify-center rounded-lg bg-gradient-to-r from-[#296BBD] to-[#AC85FF] px-6 py-3 text-header3 font-bold text-white hover:shadow-xl"
													}
												>
													generate referral
												</button>
												<button
													type="button"
													className={
														clicked
															? "my-2 cursor-pointer break-words rounded-xl bg-lime-500 p-3 text-center font-semibold"
															: "hidden"
													}
													onClick={() => {
														navigator.clipboard.writeText(Url);
														toast.success("Url Copied Successfully");
													}}
												>
													{/* {referralCode} */}
													copyUrl
												</button>
												<button
													type="button"
													onClick={() => {
														const body = {
															referralCode: referralCode,
															minCount: 2,
															taskID: taskData._id,
														};
														// console.log('referralVerify')
														axios
															.post(
																`${baseUrl}/tasks/verify/referral-count/quest/${questId}`,
																body,
																{
																	headers: {
																		Authorization: `Bearer ${accessToken}`,
																		walletAddress:
																			walletAddress,
																	},
																},
															)
															.then((res) => {
																console.log(
																	"referralverify",
																	res.data,
																);
																if (res.data) {
																	console.log(
																		"updating verification task",
																	);
																	updateTask(taskData);
																	console.log(
																		"verificationTask Updated",
																	);
																	// setIsComplete(true)
																}else{
																	toast.error("Referral Count not reached",{
																		duration:2000
																	})
																}
															})
															.catch((e) => {
																console.log(e.message);
																toast.error(e.message);
															});
													}}
													className={
														clicked
															? "border-1 mx-2 flex w-full flex-row items-center justify-center rounded-[16px] bg-gradient-to-r from-[#296BBD] to-[#AC85FF] p-3 px-5 text-white shadow-xl  transition-all duration-100  hover:z-[2px]   hover:-translate-y-1 hover:translate-x-1 hover:bg-slate-600 "
															: "hidden"
													}
												>
													verify
												</button>
											</div>
										)}
									</>
								);
							case TaskOption.QUIZ:
								// const [isOpenQuiz, setIsOpenQuiz] = useState(false); // const [isLoading, setIsLoading] = useState(false);

								const verifyAnswer = (answer: string) => {
									// if (answer === taskData?.customisation?.answer || "No Answer")
									// console.log('QuizAnswer',taskData.customisation.answer)
									if (answer == taskData?.customisation?.answer) {
										console.log("calling quizResponse");
										QuizResponse(true);
										if (
											!userQuestProgress?.taskStatus?.some((obj: any) => {
												if (obj.taskId == taskData._id) return true;
											})
										) {
											updateTask(taskData).then(() => {
												console.log("QuizTaskupdated");
												setIsComplete(true);
											});
										}
										console.log("QuizTaskupdated");
										if (
											userQuestProgress?.taskStatus?.some((obj: any) => {
												if (obj.taskId == taskData._id) return true;
											})
										) {
											console.log("quizTaskcompleted ");
											setIsComplete(true);
										} else {
											console.log(
												"quizTaskIncomplete",
												userQuestProgress?.taskStatus,
											);
										}
										// router.reload();
									} else {
										console.log("wrongAnswer");
									}
								};
								return (
									<>
										{isComplete ||
										userQuestProgress?.taskStatus?.some((obj: any) => {
											if (obj.taskId === taskData._id) return true;
										}) ? (
											<div>
												<button
													type="button"
													disabled
													className="border-1 mx-2 flex w-full flex-row items-center justify-center rounded-full bg-gradient-to-r  from-[#296BBD] to-[#AC85FF] p-2 px-8 text-white  hover:z-[2px] hover:bg-slate-600 "
												>
													Completed
												</button>
											</div>
										) : (
											<ul
												className=" relative z-[1000] float-left m-0 mb-3 flex h-full w-full min-w-max list-none flex-col items-baseline gap-[10px] overflow-auto  rounded-2xl border  border-none border-gray-100 bg-[#13141D] bg-opacity-20 bg-clip-padding align-baseline backdrop-blur-sm backdrop-filter"
												aria-labelledby="dropdownMenuButton2"
												data-te-dropdown-menu-ref
											>
												<button
													type="button"
													onClick={() => {
														setIsOpen(!isopen);
													}}
													// className="border-1 mx-2  flex w-full flex-row items-center justify-center rounded-full bg-gradient-to-r from-[#296BBD] to-[#AC85FF] p-2 px-8 text-white  shadow-xl transition-all duration-100 hover:z-[2px] hover:-translate-y-1   hover:translate-x-1 hover:bg-slate-600 "
													className="text-xs border-1 w-full rounded-2xl border-white bg-gradient-to-r from-[#296BBD] to-[#AC85FF] p-3  text-[#fff] duration-300  hover:text-blue-100"
												>
													{taskData.customisation.question}
												</button>

												<div
													className={
														isopen
															? "flex w-full flex-col gap-1 "
															: "hidden"
													}
												>
													{taskData.customisation.options.map(
														(option: string, index: number) => (
															<button
																type="button"
																className="text-xs border-1  rounded-2xl border-blue-500 bg-black px-4 py-2 text-white  duration-300 hover:bg-blue-500 hover:text-blue-100"
																onClick={() => {
																	verifyAnswer(option);
																}}
															>
																{option}
															</button>
														),
													)}
												</div>
											</ul>
										)}
									</>
								);
							case TaskOption.YOUTUBE:
								return (
									<>
										{isComplete ||
										userQuestProgress?.taskStatus?.some((obj: any) => {
											if (obj.taskId === taskData._id) return true;
										}) ? (
											<div>
												<button
													type="button"
													disabled
													className="border-1 mx-2 flex w-full flex-row items-center justify-center rounded-full bg-gradient-to-r  from-[#296BBD] to-[#AC85FF] p-2 px-8 text-white  hover:z-[2px] hover:bg-slate-600 "
												>
													Completed
												</button>
											</div>
										) : (
											<>
												{/* {onVerify && (
													<button
														type="button"
														onClick={() => {
															// onVerify(taskData);
															// setIsComplete(true);
															try {
																updateTask(taskData)
																	.then(() => {
																		setIsComplete(true);
																	})
																	.catch((e: any) => console.log(e));
															} catch (error) {
																console.log(error);
															}
														}}
														className="mx-2 flex w-full  flex-row items-center justify-center rounded-full bg-gradient-to-r from-[#296BBD]  to-[#AC85FF] p-2 px-8 text-white  hover:z-[2px] hover:bg-slate-600 "
													>
														Verify
													</button>
												)} */}
												{onView && (
													<button
														type="button"
														onClick={() => {
															onView(taskData).then(() => {
																setIsComplete(true);
															})
															// try {
															// 	updateTask(taskData)
															// 		.then(() => {
															// 			console.log("youtube task updated ")
															// 			setIsComplete(true);
															// 		})
															// 		.catch((e: any) => console.log(e));
															// } catch (error) {
															// 	console.log(error);
															// }
														}}
														className="border-1 mx-2 flex w-full flex-row items-center justify-center rounded-[16px] bg-gradient-to-r from-[#296BBD]  to-[#AC85FF] px-5  text-white   hover:z-[2px] hover:bg-slate-600 "
													>
														View
													</button>
												)}
											</>
										)}
									</>
								);
							default:
								const [body, setBody] = useState({});
								switch (taskData.type) {
									case TaskType.WALLET_BALANCE_VERIFY:
										setBody({
											taskID: taskData._id as string,
											minBalance: taskData.customisation
												.minBalance as BigNumber,
										});
										break;
									case TaskType.GAS_FEES_SPENT:
										setBody({
											taskID: taskData._id as string,
											minBalance: taskData.customisation.minBalance as number,
										});
										break;
									case TaskType.TOTAL_NUMBER_OF_TRANSACTIONS:
										setBody({
											taskID: taskData._id as string,
										});
										break;
									case TaskType.NFT_COUNT:
										setBody({
											taskID: taskData._id as string,
											minCount: taskData.customisation.minCount as number,
										});

										break;
									case TaskType.ENS_COUNT_VERIFY:
										setBody({
											taskID: taskData._id as string,
											minCount: taskData.customisation.minCount as number,
										});
										break;
									case TaskType.SPECIFIED_NFT_PURCHASES:
										setBody({
											taskID: taskData._id as string,
											minCount: taskData.customisation.minCount as number,
											contractAddress: taskData.customisation
												.contractAddress as string,
										});
										break;
									case TaskType.PURCHASED_NFT_VALUE:
										setBody({
											taskID: taskData._id as string,
											minValue: taskData.cusomisation.minValue as number,
										});
										break;
									case TaskType.SPECIFIED_NFT_PURCHASES_VALUE:
										setBody({
											taskID: taskData._id as string,
											minValue: taskData.cusomisation.minValue as number,
											contractAddress: taskData.customisation
												.contractAddress as string,
										});
										break;
								}
								return (
									<>
										{userQuestProgress?.taskStatus?.some((obj: any) => {
											if (obj.taskId === taskData._id) return true;
										}) ? (
											<button
												type="button"
												onClick={onConnect}
												className="border-1 mx-2 flex w-full flex-row items-center justify-center rounded-full bg-gradient-to-r  from-[#296BBD] to-[#AC85FF] p-2 px-8 text-white  hover:z-[2px] hover:bg-slate-600 "
											>
												Completed
											</button>
										) : (
											<>
												{onConnect && (
													<button
														type="button"
														onClick={onConnect}
														className="border-1 mx-2 flex w-full flex-row items-center justify-center rounded-full bg-gradient-to-r  from-[#296BBD] to-[#AC85FF] p-2 px-8 text-white   hover:z-[2px] hover:bg-slate-600 "
													>
														Connect
													</button>
												)}
												{onVerify && (
													<button
														type="button"
														onClick={() => {
															const type = taskData.type;
															axios
																.post(
																	`${baseUrl}/tasks/verify/${type}/quest/${questId}?chainId=${chain?.id}`,
																	body,
																	{
																		headers: {
																			Authorization: `Bearer ${accessToken}`,
																			walletAddress:
																				walletAddress,
																		},
																	},
																)
																.then((res) => {
																	console.log(
																		"onChainVerificationResult",
																		res.data,
																	);
																});
														}}
														className="mx-2 flex w-full  flex-row items-center justify-center rounded-full bg-gradient-to-r from-[#296BBD]  to-[#AC85FF] p-2 px-8 text-white  hover:z-[2px] hover:bg-slate-600 "
													>
														Verify
													</button>
												)}
												{onView && (
													<button
														type="button"
														onClick={() => {
															onView(taskData);
														}}
														className="border-1 mx-2 flex w-full flex-row items-center justify-center rounded-[16px] bg-gradient-to-r from-[#296BBD]  to-[#AC85FF] px-5  text-white   hover:z-[2px] hover:bg-slate-600 "
													>
														View
													</button>
												)}
											</>
										)}
									</>
								);
						}
					})()}
				</div>
			</div>
		</div>
	);
};

export default BaseButton1;

//   initTE({ Ripple });
