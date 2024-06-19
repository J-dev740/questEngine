import React, { useState } from "react";
import TaskButtonIcon from "./TaskButtonIcon";
import { Task, TaskOption } from "../../../constants/quest/task";

const BaseButton = ({ taskData, onVerify, onConnect, onView, completed }: any) => {
	return (
		<div
			className="hover:bg-primary-600 mt-2 flex w-64 items-center justify-between whitespace-nowrap rounded-lg bg-[#212121] bg-opacity-40 bg-clip-padding px-6 py-2 pb-2 pt-2.5 font-medium uppercase backdrop-blur-sm backdrop-filter transition duration-150 ease-in-out sm:w-full"
			data-te-dropdown-toggle-ref
			data-te-ripple-color="light"
		>
			<div className="flex items-center">
				<TaskButtonIcon task={taskData.category} />
				<span className="text-2xl mx-3">{taskData.name}</span>
				<span className="text-md rounded-full bg-[#2C2C2C] px-3 py-1">
					{taskData.points} XP
				</span>
			</div>
			<div className="flex">
				{completed ? (
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
									onVerify(taskData);
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
			</div>
		</div>
	);
};

export default BaseButton;
