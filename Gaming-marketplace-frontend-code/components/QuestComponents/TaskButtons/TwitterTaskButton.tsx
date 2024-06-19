import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import TaskButtonIcon from "./TaskButtonIcon";
import { RiTwitterFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { walletAddressSelector } from "../../../features/auth/auth.selectors";
import { questActions } from "../../../features/quest-engine/quest.slice";
import { ITaskButtonComponent } from "../../../features/quest-engine/quest.types";

const TwitterTaskButton = (props: ITaskButtonComponent) => {
	const { taskDetails, onData, userQuestProgress } = props;
	const [isOpen, setIsOpen] = useState(false); // const [isLoading, setIsLoading] = useState(false);

	const handleTask = () => {
		console.log("called");
		onData(true);
	};
	const walletAddress = useSelector(walletAddressSelector);
	const loginURI = `http://localhost:5000/v1/tasks/twitter/login?walletId=${walletAddress}`;
	// const dispatch = useDispatch();
	// const router = useRouter();
	// const questID = router.asPath.split("/")[2].split("?")[0];
	// dispatch(questActions.selectQuest(questID as string));

	console.log(taskDetails.customisation);
	const twitterId = taskDetails?.customisation?.twitter_id || "akshaykumar";
	const likeTweetId = taskDetails?.customisation?.like || "";
	const retweetTweetId = taskDetails?.customisation?.retweet || "";
	const id = likeTweetId;
	console.log(id);

	console.log(twitterId, likeTweetId, retweetTweetId);

	const followUser = () => {
		const body = {
			walletId: `${walletAddress}`,
			twitterId: twitterId,
		};

		// axios.post("http://localhost:4000/tasks/twitter/follow", body).then((res) => {
		axios
			.get(`https://ed3e-223-186-94-254.ngrok-free.app/v1/tasks/twitter/get/${twitterId}`, {
				params: {
					walletId: walletAddress,
				},
			})
			.then((res) => {
				console.log("RES", res);
			});
	};

	const retweet = () => {
		const body = {
			walletId: `${walletAddress}`,
			tweetId: retweetTweetId.split("status/")[1].split("?")[0],
		};

		axios.post("http://localhost:4000/tasks/twitter/retweet", body).then((res) => {
			console.log("RES", res);
		});
	};

	const like = () => {
		const body = {
			walletId: `${walletAddress}`,
			tweetId: likeTweetId.split("status/")[1].split("?")[0],
		};

		axios.post("http://localhost:4000/tasks/twitter/createLike", body).then((res) => {
			console.log("RES", res);
		});
	};
	// const twitterTask = ()

	return (
		<div
			className="hover:bg-primary-600 mt-2 flex w-64 flex-row items-center justify-between whitespace-nowrap rounded-lg bg-[#212121] bg-opacity-40 bg-clip-padding px-6 py-2 pb-2 pt-2.5 font-medium uppercase backdrop-blur-sm backdrop-filter transition duration-150 ease-in-out sm:w-full"
			data-te-dropdown-toggle-ref
			data-te-ripple-color="light"
		>
			<div className="flex items-center">
				<TaskButtonIcon task={taskDetails.category} />
				<span className="text-2xl mx-3">{taskDetails.name}</span>
				<span className="text-md rounded-full bg-[#2C2C2C] px-3 py-1">
					{taskDetails.points} XP
				</span>
			</div>
			<div>
				{twitterId !== "" ? (
					<div className="flex">
						{userQuestProgress?.taskStatus?.includes(taskDetails._id) ? (
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
							<div className="flex flex-row space-x-7">
								<a href={loginURI} target="_blank" rel="noreferrer">
									<button
										type="button"
										onClick={() => {
											console.log("...connecting");
										}}
										className="border-1 mx-2 flex w-full flex-row items-center justify-center rounded-full bg-gradient-to-r  from-[#296BBD] to-[#AC85FF] p-2 px-8 text-white   hover:z-[2px] hover:bg-slate-600 "
									>
										Connect
									</button>
								</a>
								<button
									type="button"
									onClick={() => {
										followUser();
										handleTask();
									}}
									className="border-1 mx-2 flex w-full flex-row items-center justify-center rounded-[16px] bg-gradient-to-r from-[#296BBD]  to-[#AC85FF] px-5  text-white   hover:z-[2px] hover:bg-slate-600 "
								>
									Follow
								</button>
							</div>
						)}
					</div>
				) : (
					<div />
				)}
				{likeTweetId !== "" ? (
					<div className="flex">
						{userQuestProgress?.taskStatus?.includes(taskDetails._id) ? (
							<button
								type="button"
								disabled
								className="border-1 mx-2 flex w-full flex-row items-center justify-center rounded-full bg-gradient-to-r  from-[#296BBD] to-[#AC85FF] p-2 px-8 text-white  hover:z-[2px] hover:bg-slate-600 "
							>
								Completed
							</button>
						) : (
							<>
								<a href={loginURI} target="_blank" rel="noreferrer">
									<button
										type="button"
										onClick={() => {
											console.log("...connecting");
										}}
										className="border-1 mx-2 flex w-full flex-row items-center justify-center rounded-full bg-gradient-to-r  from-[#296BBD] to-[#AC85FF] p-2 px-8 text-white   hover:z-[2px] hover:bg-slate-600 "
									>
										Connect
									</button>
								</a>
								<button
									type="button"
									onClick={() => {
										like();
										handleTask();
									}}
									className="border-1 mx-2 flex w-full flex-row items-center justify-center rounded-[16px] bg-gradient-to-r from-[#296BBD]  to-[#AC85FF] px-5  text-white   hover:z-[2px] hover:bg-slate-600 "
								>
									Like
								</button>
							</>
						)}
					</div>
				) : (
					<div />
				)}
				{retweetTweetId !== "" ? (
					<div className="flex">
						{userQuestProgress?.taskStatus?.includes(taskDetails._id) ? (
							<button
								type="button"
								disabled
								className="border-1 mx-2 flex w-full flex-row items-center justify-center rounded-full bg-gradient-to-r  from-[#296BBD] to-[#AC85FF] p-2 px-8 text-white  hover:z-[2px] hover:bg-slate-600 "
							>
								Completed
							</button>
						) : (
							<>
								<a href={loginURI} target="_blank" rel="noreferrer">
									<button
										type="button"
										onClick={() => {
											console.log("...connecting");
										}}
										className="border-1 mx-2 flex w-full flex-row items-center justify-center rounded-full bg-gradient-to-r  from-[#296BBD] to-[#AC85FF] p-2 px-8 text-white   hover:z-[2px] hover:bg-slate-600 "
									>
										Connect
									</button>
								</a>
								<button
									type="button"
									onClick={() => {
										retweet();
										handleTask();
									}}
									className="border-1 mx-2 flex w-full flex-row items-center justify-center rounded-[16px] bg-gradient-to-r from-[#296BBD]  to-[#AC85FF] px-5  text-white   hover:z-[2px] hover:bg-slate-600 "
								>
									Retweet
								</button>
							</>
						)}
					</div>
				) : (
					<div />
				)}
			</div>
		</div>
	);
};

export default TwitterTaskButton;
