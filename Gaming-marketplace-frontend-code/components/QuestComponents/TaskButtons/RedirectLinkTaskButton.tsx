import { useState } from "react";
import { MdQuiz } from "react-icons/md";
import TaskButtonIcon from "./TaskButtonIcon";
import { ITaskButtonComponent } from "../../../features/quest-engine/quest.types";

const RedirectLinkTaskButton = (props: ITaskButtonComponent) => {
	const { taskDetails, onData, userQuestProgress } = props;
	const [isOpen, setIsOpen] = useState(false); // const [isLoading, setIsLoading] = useState(false);

	const handleTask = () => {
		onData(true);
	};

	return (
		<div className="relative" data-te-dropdown-ref>
			{userQuestProgress?.taskStatus?.includes(taskDetails._id) ? (
				<button
					type="button"
					disabled
					className="flex w-full items-center whitespace-nowrap rounded-lg bg-[#1e1e1e] bg-clip-padding px-6 pb-2 pt-2.5 font-medium uppercase text-white backdrop-blur-sm backdrop-filter transition duration-150 ease-in-out"
					data-te-dropdown-toggle-ref
					aria-expanded="false"
					data-te-ripple-init
					data-te-ripple-color="light"
				>
					<div className="flex flex-grow">
						<TaskButtonIcon task={taskDetails.task} />
						<span className="mx-5"> {taskDetails.task}</span>
					</div>
					<span className="rounded-xl px-4 font-normal capitalize text-green-300">
						Completed
					</span>
				</button>
			) : (
				<button
					type="button"
					className="hover:bg-primary-600 flex w-full items-center whitespace-nowrap rounded-lg border-2 border-[#A18CD1] bg-opacity-40 bg-clip-padding px-6 py-2 pb-2 pt-2.5 font-medium uppercase backdrop-blur-sm backdrop-filter transition duration-150 ease-in-out"
					data-te-dropdown-toggle-ref
					aria-expanded="false"
					data-te-ripple-init
					onClick={() => {
						setIsOpen(!isOpen);
					}}
					data-te-ripple-color="light"
				>
					<TaskButtonIcon task={taskDetails.task} />
					<span className="mx-5"> {taskDetails.task}</span>
				</button>
			)}

			<ul
				className={
					isOpen
						? "relative z-[1000] mt-3 flex w-full flex-col items-baseline gap-[10px] overflow-hidden rounded-md border  border-none border-gray-100 bg-[#13141D] bg-opacity-40 bg-clip-padding align-baseline backdrop-blur-sm backdrop-filter"
						: "hidden"
				}
				aria-labelledby="dropdownMenuButton2"
				data-te-dropdown-menu-ref
			>
				<button
					type="button"
					className="text-xs w-full rounded-2xl border-2 border-blue-500 px-4 py-2 text-[#fff] duration-300  hover:text-blue-100"
					onClick={() => {
						handleTask();
						window.open(taskDetails.customisation.link, "_blank");
					}}
				>
					View
				</button>
			</ul>
		</div>
	);
};

export default RedirectLinkTaskButton;
