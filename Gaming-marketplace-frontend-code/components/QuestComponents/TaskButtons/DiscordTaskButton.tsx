import { FC } from "react";
import TaskButtonIcon from "./TaskButtonIcon";

interface Props {
	taskDetails: any;
	onData: any;
	userQuestProgress: any;
}

const DiscordTaskButton: FC<Props> = ({ taskDetails, onData, userQuestProgress }) => {
	return (
		<div className="relative" data-te-dropdown-ref>
			{userQuestProgress.taskStatus.includes(taskDetails._id) ? (
				<button
					type="button"
					disabled
					className="flex w-full items-center whitespace-nowrap rounded-lg bg-[#1e1e1e] bg-clip-padding px-6 pb-2 pt-2.5 font-medium uppercase text-white backdrop-blur-sm backdrop-filter transition duration-150 ease-in-out"
					aria-expanded={false}
				>
					<div className="flex flex-grow">
						<TaskButtonIcon task={taskDetails.task} />
						<span className="mx-5"> {taskDetails.task}</span>
					</div>
					<span className="rounded-xl px-4 font-normal capitalize text-green-300">
						Completed
					</span>
				</button>
			) : null}
		</div>
	);
};
