import { useState } from "react";
import { MdQuiz } from "react-icons/md";

interface Props {
	taskDetails: any;
	onData: any;
	userQuestProgress: any;
}

const QuizTaskButton = (props: Props) => {
	const { taskDetails, onData, userQuestProgress } = props;
	const [isOpen, setIsOpen] = useState(false); // const [isLoading, setIsLoading] = useState(false);

	const verifyAnswer = (answer: string) => {
		if (answer === taskDetails.customisation.answer) {
			onData(true);
		}
	};

	return (
		<div className="w-64 sm:w-full">
			<div className="relative flex flex-col gap-2" data-te-dropdown-ref>
				{userQuestProgress?.includes(taskDetails._id) ? (
					<button
						type="button"
						disabled
						className="hover:bg-primary-600 flex h-full  w-full items-center whitespace-nowrap rounded-lg bg-[#ffffff] bg-clip-padding px-6 py-2 pb-2 pt-2.5 font-medium uppercase text-[#111111] backdrop-blur-sm backdrop-filter transition duration-150 ease-in-out"
						data-te-dropdown-toggle-ref
						aria-expanded="false"
						data-te-ripple-init
						data-te-ripple-color="light"
					>
						<span>
							<MdQuiz />
						</span>
						<span className="mx-5"> {taskDetails.task}</span>
					</button>
				) : (
					<button
						type="button"
						className="hover:bg-primary-600 flex h-full w-full items-center whitespace-nowrap rounded-lg border-2 border-[#A18CD1] bg-opacity-40 bg-clip-padding px-6 py-2 pb-2 pt-2.5 font-medium uppercase backdrop-blur-sm backdrop-filter transition duration-150 ease-in-out"
						data-te-dropdown-toggle-ref
						aria-expanded="false"
						data-te-ripple-init
						onClick={() => {
							setIsOpen(!isOpen);
						}}
						data-te-ripple-color="light"
					>
						<span>
							<MdQuiz />
						</span>
						<span className="mx-5"> {taskDetails.task}</span>
					</button>
				)}

				<ul
					className={
						isOpen
							? "relative z-[1000] float-left m-0 mb-3 flex h-full w-full min-w-max list-none flex-col items-baseline gap-[10px] overflow-hidden rounded-md border  border-none border-gray-100 bg-[#13141D] bg-opacity-40 bg-clip-padding align-baseline backdrop-blur-sm backdrop-filter"
							: "hidden"
					}
					aria-labelledby="dropdownMenuButton2"
					data-te-dropdown-menu-ref
				>
					<button
						type="button"
						className="text-xs w-full rounded-2xl border-2  border-white bg-blue-500 px-4 py-2 text-[#fff] duration-300  hover:text-blue-100"
					>
						{taskDetails.customisation.question}
					</button>

					<div className="flex w-full flex-col gap-1">
						{taskDetails.customisation.options.map((option: string, index: number) => (
							<button
								type="button"
								className="text-xs rounded-2xl  border-2 border-blue-500 px-4 py-2 text-[#fff] duration-300 hover:bg-blue-500 hover:text-blue-100"
								onClick={() => {
									verifyAnswer(index.toString());
								}}
							>
								{option}
							</button>
						))}
					</div>
				</ul>
			</div>
		</div>
	);
};

export default QuizTaskButton;
