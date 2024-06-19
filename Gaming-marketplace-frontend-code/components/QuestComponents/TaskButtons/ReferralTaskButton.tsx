import router from "next/router";
import { useState } from "react";
import { MdQuiz } from "react-icons/md";
import toast from "react-hot-toast";
import { ITaskButtonComponent } from "../../../features/quest-engine/quest.types";

const ReferralTaskButton = (props: ITaskButtonComponent) => {
	const { taskDetails, userID, userQuestProgress } = props;
	const [isOpen, setIsOpen] = useState(false); // const [isLoading, setIsLoading] = useState(false);
	const [referralCode, setReferralCode] = useState("");
	const generateReferralCode = () => {
		console.log("called");
		const questId = router.asPath.split("/")[2];

		setReferralCode(`http://localhost:3000/quest/${questId}/${userID}/${taskDetails._id}`);
	};
	console.log("referral task");

	return (
		<div>
			<div className="w-64 sm:w-full  ">
				<div>
					<div className="relative" data-te-dropdown-ref>
						{userQuestProgress?.includes(taskDetails._id) ? (
							<button
								type="button"
								disabled
								className="hover:bg-primary-600 my-2 flex h-full  w-full items-center whitespace-nowrap rounded-md bg-[#ffffff] bg-clip-padding px-6 py-2 pb-2 pt-2.5 font-medium uppercase text-[#111111] backdrop-blur-sm backdrop-filter transition duration-150 ease-in-out"
								data-te-dropdown-toggle-ref
								aria-expanded="false"
								data-te-ripple-init
								data-te-ripple-color="light"
							>
								<span>
									<MdQuiz />
								</span>
								<span className="mx-5"> Referral</span>
							</button>
						) : (
							<button
								type="button"
								className=" hover:bg-primary-600 my-2 flex h-full w-full items-center whitespace-nowrap rounded-md border-2 border-[#A18CD1] bg-opacity-40 bg-clip-padding px-6 py-2 pb-2 pt-2.5 font-medium uppercase backdrop-blur-sm backdrop-filter transition duration-150 ease-in-out"
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
								<span className="mx-5"> Referral</span>
							</button>
						)}

						<ul
							className={
								isOpen
									? "relative z-[1000] float-left m-0 mb-3 flex h-full w-1/2 list-none flex-col items-baseline gap-[10px] overflow-hidden rounded-md border  border-none border-gray-100 bg-[#13141D] bg-opacity-40 bg-clip-padding align-baseline backdrop-blur-sm backdrop-filter"
									: "hidden"
							}
							aria-labelledby="dropdownMenuButton2"
							data-te-dropdown-menu-ref
						>
							<button
								type="button"
								className="text-xs w-full whitespace-break-spaces rounded-[10px] border-2 border-blue-500 px-4 py-2 text-[#fff] duration-300  hover:text-blue-100"
								onClick={() => {
									generateReferralCode();
								}}
							>
								Generate Referral Code{" "}
								<span
									className="w-1/2 cursor-pointer break-words font-semibold"
									onClick={() => {
										navigator.clipboard.writeText(referralCode);
										toast.success("Copied Successfully");
									}}
								>
									{referralCode}
								</span>
							</button>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ReferralTaskButton;
