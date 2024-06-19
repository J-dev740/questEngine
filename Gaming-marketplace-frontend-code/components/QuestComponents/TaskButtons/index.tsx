import { FC, useState } from "react";
import { BsDiscord } from "react-icons/bs";
import { useSelector } from "react-redux";
import { Task, TaskOption } from "../../../constants/quest/task";
import { activeUserSelector } from "../../../features/profile-page/profile.selectors";
import RedirectLinkTaskButton from "./RedirectLinkTaskButton";
import ReferralTaskButton from "./ReferralTaskButton";
import TelegramLoginWidget from "./TelegramLoginWidget";
import TwitterTaskButton from "./TwitterTaskButton";
import QuizTaskButton from "./quizTaskButton";
import {
	useVerifyQuestMutation,
	useUpdateTaskStatusMutation,
} from "../../../features/quest-engine/quest.api";
import { accTokenSelector } from "../../../features/auth/auth.selectors";

import BaseButton from "./base";
import BaseButton1 from "./base1";
// interface Props {
// 	taskData: Task;
// 	questData: any;
// 	questProgress: any;
// }
interface Props {
	questData: any;
	questProgress: any;
}
// let taskList: Task[] = [];
// let index: number = 5;
// const BaseTaskButton: FC<Props> = ({ taskData, questData, questProgress }) => {
const BaseTaskButton: FC<Props> = ({ questData, questProgress }) => {
	// const[taskData,setTaskData]=useState<Task>({
	// 	category:TaskOption.NULL,
	// 	_id: "",
	// 	type: "",
	// 	customisation: { link: "" }

	// });
	// console.log("taskData", taskData);
	console.log("questData", questData);
	console.log("questProgress", questProgress);
	// console.log('taskData',taskData)
	// console.log(taskData.category)

	const activeUser = useSelector(activeUserSelector);
	const accToken = useSelector(accTokenSelector);
	console.log("accToken", accToken);
	console.log("activeUser", activeUser);

	const [linkResponse, setLinkResponse] = useState(false);
	const [quizResponse, setQuizResponse] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [isOpen, setIsOpen] = useState(false);

	const [verifyQuest, { isSuccess, data }] = useVerifyQuestMutation();
	const [updateTaskStatus] = useUpdateTaskStatusMutation();
	const setOpen = (questProgressTasks: string) => {
		setIsOpen(!isOpen);
	};

	const onViewHandler = async (taskData: Task) => {
		setIsLoading(true);
		// const taskData: Task = questData?.tasks[index];
		// console.log('indexofTaskData',index)
		console.log("taskData_onViewHandler", taskData);
		await updateTaskStatus({
			questID: questData._id as string,
			userID: activeUser?._id as string,
			taskID: taskData._id as string,
		});
		window.open(taskData.customisation.link, "_blank");
	};

	const verifyQuestHandler = async (taskData: Task) => {
		// const taskData: Task = questData?.tasks[index];
		// console.log('verifyQuestindex',index)
		await verifyQuest({
			questId: questData._id as string,
			type: taskData.type,
			token: accToken,
			body: {},
		});
		console.log("quest verified ...");
	};
	const UpdateTask = async (taskData: Task) => {
		console.log("updating TaskStatus...");
		try {
			await updateTaskStatus({
				questID: questData._id as string,
				userID: activeUser?._id as string,
				taskID: taskData._id as string,
			});
		} catch (e) {
			console.log(e);
		}
		console.log("taskUpdated...");
	};

	// useEffect(() => {
	// 	if (data === true || quizResponse || linkResponse) {
	// 		setIsLoading(false);

	// 		updateTaskStatus({
	// 			questID: participatedQuest?._id,
	// 			userID: activeUser?._id,
	// 			taskID: taskData._id,
	// 		});
	// 		// TOAST TO BE ADDED
	// 	}
	// 	if (data === false) {
	// 		setIsLoading(false);
	// 		Swal.fire({
	// 			icon: "error",
	// 			title: "Oops...",
	// 			text: "Try Again",
	// 		});
	// 	}
	// }, [isSuccess, quizResponse, linkResponse]);

	const handleLinkResponse = (response: boolean) => {
		setLinkResponse(response);
	};

	const handleQuizResponse = (response: boolean) => {
		setQuizResponse(response);
	};

	// const taskdetails = taskData.customisation;

	// const renderTasks = (taskData: Task) => {
	// 	switch (taskData.category) {
	// 		case TaskOption.QUIZ:
	// 			return (
	// 				<QuizTaskButton
	// 					taskDetails={taskData}
	// 					onData={handleQuizResponse}
	// 					userQuestProgress={questProgress}
	// 				/>
	// 			);
	// 		case TaskOption.REFERRAL:
	// 			return (
	// 				<ReferralTaskButton
	// 					taskDetails={taskData}
	// 					userID={activeUser?._id}
	// 					userQuestProgress={questProgress}
	// 					onData={() => console.log("Add Referral")}
	// 				/>
	// 			);
	// 		case TaskOption.REDIRECT:
	// 			return (
	// 				<RedirectLinkTaskButton
	// 					taskDetails={taskData}
	// 					onData={handleLinkResponse}
	// 					userQuestProgress={questProgress}
	// 				/>
	// 			);
	// 		case TaskOption.TWITTER_TASK:
	// 			return (
	// 				<TwitterTaskButton
	// 					taskDetails={taskData}
	// 					onData={handleQuizResponse}
	// 					userQuestProgress={questProgress}
	// 				/>
	// 			);
	// 		case TaskOption.TELEGRAM_TASK:
	// 			return (
	// 				<button
	// 					type="button"
	// 					className="rounded-[10px]  border-blue-500 px-4 py-2 text-[#fff] duration-300 hover:bg-blue-500 hover:text-blue-100"
	// 				>
	// 					<TelegramLoginWidget />
	// 				</button>
	// 			);
	// 		case TaskOption.DISCORD_TASK:
	// 			return (
	// 				<>
	// 					<button
	// 						type="button"
	// 						disabled={
	// 							questProgress?.taskStatus.filter((item: any) => item.taskId)
	// 								.length > 0
	// 						}
	// 						className="hover:bg-primary-600 my-2 flex h-full w-full items-center whitespace-nowrap rounded-md bg-[#ffffff] bg-clip-padding px-6 py-2 pb-2 pt-2.5 font-medium uppercase text-[#111111] backdrop-blur-sm backdrop-filter transition duration-150 ease-in-out"
	// 						onClick={() => {
	// 							setOpen(questProgress);
	// 						}}
	// 						data-te-dropdown-toggle-ref
	// 						aria-expanded="false"
	// 						data-te-ripple-init
	// 						data-te-ripple-color="light"
	// 					>
	// 						<span>
	// 							<BsDiscord />
	// 						</span>
	// 						<span className="mx-5"> {taskData.category}</span>
	// 					</button>
	// 					<a
	// 						className="flex items-center justify-center"
	// 						target="_blank"
	// 						href="https://discord.com/api/oauth2/authorize?client_id=1072853722075516989&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fquest%2FdiscordVerify&response_type=code&scope=guilds"
	// 						rel="noreferrer"
	// 					>
	// 						<button
	// 							type="button"
	// 							className="rounded-[10px] border-2 border-blue-500 px-4 py-2 text-[#fff] duration-300 hover:bg-blue-500 hover:text-blue-100"
	// 						>
	// 							Connect
	// 						</button>
	// 					</a>
	// 				</>
	// 			);
	// 		// case TaskOption.YOUTUBE:
	// 		// 	return (
	// 		// 		<BaseButton taskData={taskData} onView={onViewHandler} onVerify={verifyQuestHandler} />
	// 		// 	)

	// 		default:
	// 			return (
	// 				<BaseButton
	// 					taskData={taskData}
	// 					onView={onViewHandler}
	// 					onVerify={verifyQuestHandler}
	// 				/>
	// 			);
	// 	}
	// };
	const taskDataToRender = questData?.tasks?.map((task: any, indexNum: number) => {
		console.log("taskData", task);
		// index = indexNum;
		// console.log("index", indexNum);
		// return <div key={task._id}>{renderTasks(task)}</div>;
		return (
			<div key={task._id} className=" py-2">
				<BaseButton1
					taskData={task}
					updateTask={UpdateTask}
					onView={onViewHandler}
					onVerify={verifyQuestHandler}
					userQuestProgress={questProgress}
					LinkResponse={handleLinkResponse}
					QuizResponse={handleQuizResponse}
					userID={activeUser?._id}
				/>
			</div>
		);
	});

	return <div>{taskDataToRender}</div>;
};

export default BaseTaskButton;
