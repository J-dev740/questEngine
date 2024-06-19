import { skipToken } from "@reduxjs/toolkit/dist/query";
import { useEffect, useState } from "react";
import { BiGasPump } from "react-icons/bi";
import { BsDiscord, BsTelegram } from "react-icons/bs";
import { FaEthereum, FaWallet } from "react-icons/fa";
import { RiTwitterFill } from "react-icons/ri";
import { SiOpensea } from "react-icons/si";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { TaskOption } from "../../constants/quest/task";
import { walletAddressSelector } from "../../features/auth/auth.selectors";
import { activeUserSelector } from "../../features/profile-page/profile.selectors";
import {
	useGetReferralCodeMutation,
	useGetTaskResponseQuery,
	useUpdateTaskInQuestProgressMutation,
} from "../../features/quest-engine/quest.api";
import {
	// activeUserSelector,
	selectedDiscordCodeSelector,
	selectedTelegramCodeSelector,
} from "../../features/quest-engine/quest.selectors";
import { GetVerificationURL } from "../../services/quest/task";
import QuizTaskButton from "./TaskButtons/quizTaskButton";
import RedirectLinkTaskButton from "./TaskButtons/RedirectLinkTaskButton";
import ReferralTaskButton from "./TaskButtons/ReferralTaskButton";
import TwitterTaskButton from "./TaskButtons/TwitterTaskButton";

import TelegramLoginWidget from "./TaskButtons/TelegramLoginWidget";

interface TaskButtonProps {
	taskData: any;
	participatedQuest: any;
	userQuestProgress: any;
}

const TaskButton = (props: TaskButtonProps) => {
	const { participatedQuest, taskData, userQuestProgress } = props;
	console.log({ participatedQuest, taskData, userQuestProgress });
	const [taskUrl, setTaskUrl] = useState<string | null>(null);
	const walletAddress = useSelector(walletAddressSelector);
	const { data, isSuccess } = useGetTaskResponseQuery((taskUrl as string) ?? skipToken);

	const [quizResponse, setQuizResponse] = useState(false);
	const [linkResponse, setLinkResponse] = useState(false);

	const [updateTaskStatus] = useUpdateTaskInQuestProgressMutation();

	useEffect(() => {
		if (data === true || quizResponse || linkResponse) {
			setIsLoading(false);

			updateTaskStatus({
				questID: participatedQuest?._id,
				userID: activeUser?._id,
				taskID: taskData._id,
			});
			// TOAST TO BE ADDED
		}
		if (data === false) {
			setIsLoading(false);
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Try Again",
			});
		}
	}, [isSuccess, quizResponse, linkResponse]);

	const [isOpen, setIsOpen] = useState(false);
	const [discord, isDiscord] = useState(false);
	const [telegram, isTelegram] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const activeUser = useSelector(activeUserSelector);

	const handleQuizResponse = (response: boolean) => {
		setQuizResponse(response);
	};
	const handleLinkResponse = (response: boolean) => {
		setLinkResponse(response);
	};

	const setOpen = (questProgressTasks: string) => {
		setIsOpen(!isOpen);
	};

	useEffect(() => {
		if (taskData.task === TaskOption.DISCORD_TASK) {
			isDiscord(true);
		} else {
			isDiscord(false);
		}
	}, [taskData]);

	const discordAuthCode = useSelector(selectedDiscordCodeSelector);
	const telegramAuthCode = useSelector(selectedTelegramCodeSelector);

	const handleVerify = async () => {
		setTaskUrl(GetVerificationURL(props, discordAuthCode, telegramAuthCode, walletAddress));

		setOpen(userQuestProgress);
	};
	const taskdetails = taskData.customisation;

	// if (taskDetails.task === "opensea") {
	// 	return (
	// 		<>
	// 			{taskdetails.purchased_count ? (
	// 				<TaskButton
	// 					key={TaskOption.OPENSEA_NFT_PURCHASE_CHECK}
	// 					task={TaskOption.OPENSEA_NFT_PURCHASE_CHECK}
	// 					taskDetails={{
	// 						task: TaskOption.OPENSEA_NFT_PURCHASE_CHECK,
	// 						customisation: {
	// 							purchased_count: taskdetails.purchased_count,
	// 						},
	// 					}}
	// 				/>
	// 			) : (
	// 				<>{} </>
	// 			)}
	// 			{taskdetails.constract_purchase_count && taskdetails.contract_purchase ? (
	// 				<TaskButton
	// 					key={TaskOption.OPENSEA_SPECIFIED_NFT_PURCHASE_CHECK}
	// 					task={TaskOption.OPENSEA_SPECIFIED_NFT_PURCHASE_CHECK}
	// 					taskDetails={{
	// 						task: TaskOption.OPENSEA_SPECIFIED_NFT_PURCHASE_CHECK,
	// 						customisation: {
	// 							constract_purchase_count: taskdetails.constract_purchase_count,
	// 							contract_purchase: taskdetails.contract_purchase,
	// 						},
	// 					}}
	// 				/>
	// 			) : (
	// 				<>{} </>
	// 			)}
	// 			{taskdetails.purchased_count_value ? (
	// 				<TaskButton
	// 					key={TaskOption.OPENSEA_NFT_VALUE_CHECK}
	// 					task={TaskOption.OPENSEA_NFT_VALUE_CHECK}
	// 					taskDetails={{
	// 						task: TaskOption.OPENSEA_NFT_VALUE_CHECK,
	// 						customisation: {
	// 							purchased_count_value: taskdetails.purchased_count_value,
	// 						},
	// 					}}
	// 				/>
	// 			) : (
	// 				<>{} </>
	// 			)}
	// 			{taskdetails.contract_purchased_count && taskdetails.contract_purchase_value ? (
	// 				<TaskButton
	// 					key={TaskOption.OPENSEA_SPECIFIED_NFT_VALUE_CHECK}
	// 					icon="O"
	// 					task={TaskOption.OPENSEA_SPECIFIED_NFT_VALUE_CHECK}
	// 					taskDetails={{
	// 						task: TaskOption.OPENSEA_SPECIFIED_NFT_VALUE_CHECK,
	// 						customisation: {
	// 							contract_purchased_count: taskdetails.contract_purchased_count,
	// 							contract_purchase_value: taskdetails.contract_purchase_value,
	// 						},
	// 					}}
	// 				/>
	// 			) : (
	// 				<>{} </>
	// 			)}
	// 			{taskdetails.sale_count ? (
	// 				<TaskButton
	// 					key={TaskOption.OPENSEA_NFT_SOLD_CHECK}
	// 					icon="O"
	// 					task={TaskOption.OPENSEA_NFT_SOLD_CHECK}
	// 					taskDetails={{
	// 						task: TaskOption.OPENSEA_NFT_SOLD_CHECK,
	// 						customisation: {
	// 							sale_count: taskdetails.sale_count,
	// 						},
	// 					}}
	// 				/>
	// 			) : (
	// 				<>{} </>
	// 			)}
	// 			{taskdetails.constract_sale_count && taskdetails.contract_sale ? (
	// 				<TaskButton
	// 					key={TaskOption.OPENSEA_SPECIFIED_NFT_SOLD_CHECK}
	// 					icon="O"
	// 					task={TaskOption.OPENSEA_SPECIFIED_NFT_SOLD_CHECK}
	// 					taskDetails={{
	// 						task: TaskOption.OPENSEA_SPECIFIED_NFT_SOLD_CHECK,
	// 						customisation: {
	// 							constract_sale_count: taskdetails.constract_sale_count,
	// 							contract_sale: taskdetails.contract_sale,
	// 						},
	// 					}}
	// 				/>
	// 			) : (
	// 				<>{} </>
	// 			)}
	// 			{taskdetails.sale_count_value ? (
	// 				<TaskButton
	// 					key={TaskOption.OPENSEA_SOLD_NFT_VALUE_CHECK}
	// 					icon="O"
	// 					task={TaskOption.OPENSEA_SOLD_NFT_VALUE_CHECK}
	// 					taskDetails={{
	// 						task: TaskOption.OPENSEA_SOLD_NFT_VALUE_CHECK,
	// 						customisation: {
	// 							sale_count_value: taskdetails.sale_count_value,
	// 						},
	// 					}}
	// 				/>
	// 			) : (
	// 				<>{} </>
	// 			)}
	// 			{taskdetails.contract_sale_count && taskdetails.contract_sale_value ? (
	// 				<TaskButton
	// 					key={TaskOption.OPENSEA_SPECIFIED_SOLD_NFT_VALUE_CHECK}
	// 					icon="O"
	// 					task={TaskOption.OPENSEA_SPECIFIED_SOLD_NFT_VALUE_CHECK}
	// 					taskDetails={{
	// 						task: TaskOption.OPENSEA_SPECIFIED_SOLD_NFT_VALUE_CHECK,
	// 						customisation: {
	// 							contract_sale_count: taskdetails.contract_sale_count,
	// 							contract_sale_value: taskdetails.contract_sale_value,
	// 						},
	// 					}}
	// 				/>
	// 			) : (
	// 				<>{} </>
	// 			)}
	// 		</>
	// 	);
	// }

	const renderQuiz = (task: string) => {
		switch (task) {
			default:
				return (
					<div className="relative" data-te-dropdown-ref>
						<button
							type="button"
							disabled={
								userQuestProgress?.taskStatus.filter((item: any) => item.taskId)
									.length > 0
							}
							className="hover:bg-primary-600 my-2 flex h-full w-full items-center whitespace-nowrap rounded-md bg-[#ffffff] bg-clip-padding px-6 py-2 pb-2 pt-2.5 font-medium uppercase text-[#111111] backdrop-blur-sm backdrop-filter transition duration-150 ease-in-out"
							onClick={() => {
								setOpen(userQuestProgress);
							}}
							data-te-dropdown-toggle-ref
							aria-expanded="false"
							data-te-ripple-init
							data-te-ripple-color="light"
						>
							<span>
								{task === "nft_check_task" ? (
									<RiTwitterFill />
								) : task === "discord_task" ? (
									<BsDiscord />
								) : task === "telegram_task" ? (
									<BsTelegram />
								) : task?.slice(0, 7) === "opensea" ? (
									<SiOpensea />
								) : task === "gas_fee" ? (
									<BiGasPump />
								) : task === "wallet_balance_task" ? (
									<FaWallet />
								) : task === "ens" ? (
									<FaEthereum />
								) : (
									<div />
								)}
							</span>
							<span className="mx-5"> {task}</span>
						</button>
						<ul
							className={
								isOpen
									? "relative z-[1000] float-left m-0 mb-3 flex h-full w-full min-w-max list-none items-baseline gap-[10px] overflow-hidden rounded-md border  border-none border-gray-100 bg-[#13141D] bg-opacity-40 bg-clip-padding align-baseline backdrop-blur-sm backdrop-filter"
									: "hidden"
							}
							aria-labelledby="dropdownMenuButton2"
							data-te-dropdown-menu-ref
						>
							{task === "discord_task" ? (
								<a
									className="flex items-center justify-center"
									target="_blank"
									href="https://discord.com/api/oauth2/authorize?client_id=1072853722075516989&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fquest%2FdiscordVerify&response_type=code&scope=guilds"
									rel="noreferrer"
								>
									<button
										type="button"
										className="rounded-[10px] border-2 border-blue-500 px-4 py-2 text-[#fff] duration-300 hover:bg-blue-500 hover:text-blue-100"
									>
										Connect
									</button>
								</a>
							) : task === "telegram_task" ? (
								<button
									type="button"
									className="rounded-[10px]  border-blue-500 px-4 py-2 text-[#fff] duration-300 hover:bg-blue-500 hover:text-blue-100"
								>
									<TelegramLoginWidget />
								</button>
							) : task === "twitter_task" ? (
								<button
									type="button"
									className="rounded-[10px] border-2 border-blue-500 px-4 py-2 text-[#fff] duration-300 hover:bg-blue-500 hover:text-blue-100"
								>
									{" "}
									connect
								</button>
							) : (
								<div />
							)}
							{discord || telegram ? (
								<a
									className="flex items-center justify-center"
									target="_blank"
									href={taskdetails.join_discord_link}
									rel="noreferrer"
								>
									<button
										type="button"
										className="text-xs rounded-[10px] border-2 border-blue-500 px-4 py-2 text-[#fff] duration-300 hover:bg-blue-500 hover:text-blue-100"
									>
										follow
									</button>{" "}
								</a>
							) : (
								<div />
							)}

							{task === "telegram_task" ? (
								<a
									className="flex items-center justify-center"
									target="_blank"
									href={taskdetails.join_telegram}
									rel="noreferrer"
								>
									<button
										type="button"
										className="text-xs rounded-[10px] border-2 border-blue-500 px-4 py-2 text-[#fff] duration-300 hover:bg-blue-500 hover:text-blue-100"
									>
										follow
									</button>{" "}
								</a>
							) : (
								<div />
							)}

							<button
								type="button"
								className="text-xs rounded-[10px] border-2 border-blue-500 px-4 py-2 text-[#fff] duration-300 hover:bg-blue-500 hover:text-blue-100"
								onClick={() => {
									handleVerify();
									setIsLoading(true);
								}}
							>
								verify
								<span className={isLoading ? " px-2" : " hidden px-2"}>
									<div
										className="inline-block h-3 w-3 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] text-[#FD5B74] motion-reduce:animate-[spin_1.5s_linear_infinite]"
										role="status"
									/>
								</span>
							</button>
						</ul>
					</div>
				);
		}
	};

	return renderQuiz(taskData.task);
};
export default TaskButton;
