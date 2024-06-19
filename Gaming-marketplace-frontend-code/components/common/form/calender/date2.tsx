/* eslint-disable react/require-default-props */
import {
	add,
	eachDayOfInterval,
	endOfMonth,
	endOfWeek,
	format,
	getDay,
	isEqual,
	isPast,
	isSameMonth,
	isToday,
	parse,
	startOfToday,
	startOfWeek,
} from "date-fns";
import { useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import ModalCalender from "../../../util/modalCalender";
// import DatePicker from "tailwind-datepicker-react"

function classNames(...classes: Array<boolean | string>) {
	return classes.filter(Boolean).join(" ");
}

export interface CaldenderDateProps {
	label: string;
	placeholder: string;
	name: string;
	error: string | null;
	type?: "text" | "number";
	value?: string | null;
	disabled?: boolean;
	required?: boolean;
	className?: string;
	handleDate: (_date: Date) => void;
}

export interface CalenderDateRawProps {
	handleDate: (_date: Date) => void;
}

const CalenderDateRaw = ({ handleDate }: CalenderDateRawProps) => {
	const today = startOfToday();
	const [selectedDay, setSelectedDay] = useState(today);
	const [currentMonth, setCurrentMonth] = useState(format(today, "MMM-yyyy"));
	const firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date());

	const days = eachDayOfInterval({
		start: startOfWeek(firstDayCurrentMonth),
		end: endOfWeek(endOfMonth(firstDayCurrentMonth)),
	});

	function previousMonth() {
		const firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
		setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
	}

	function nextMonth() {
		const firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
		setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
	}

	return (
		<div>
			<div className="md:grid lg:grid">
				<div>
					<div className="flex items-center">
						<h2 className="flex-auto font-semibold text-white">
							{format(firstDayCurrentMonth, "MMMM yyyy")}
						</h2>
						<button
							type="button"
							onClick={previousMonth}
							className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
						>
							<span className="sr-only">Previous month</span>
							<FaAngleLeft />
						</button>
						<button
							onClick={nextMonth}
							type="button"
							className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
						>
							<span className="sr-only">Next month</span>
							<FaAngleRight />
						</button>
					</div>
					<div className="text-xs mt-5 grid grid-cols-7 text-center leading-6 text-gray-500">
						<div className="text-red-400">S</div>
						<div>M</div>
						<div>T</div>
						<div>W</div>
						<div>T</div>
						<div>F</div>
						<div className="text-red-400">S</div>
					</div>
					<div className="mt-2 grid grid-cols-7">
						{days.map((day, dayIdx) => (
							<div
								key={day.toString()}
								className={`py-0.5 ${
									dayIdx === 0 ? `col-start-${getDay(day) + 1}` : ""
								}`}
							>
								<button
									type="button"
									disabled={!(isToday(day) || !isPast(day))}
									onClick={() => {
										setSelectedDay(day);
										handleDate(day);
									}}
									className={classNames(
										!(isToday(day) || !isPast(day)) && "!text-gray-600",
										isEqual(day, selectedDay) && "text-white",
										!isEqual(day, selectedDay) &&
											isToday(day) &&
											"text-red-500",
										!isEqual(day, selectedDay) &&
											!isToday(day) &&
											isSameMonth(day, firstDayCurrentMonth) &&
											"text-white",
										!isEqual(day, selectedDay) &&
											isPast(day) &&
											isSameMonth(day, firstDayCurrentMonth) &&
											"text-gray-600",
										!isEqual(day, selectedDay) &&
											!isToday(day) &&
											!isSameMonth(day, firstDayCurrentMonth) &&
											"text-gray-600",
										isEqual(day, selectedDay) && isToday(day) && "bg-red-500",
										isEqual(day, selectedDay) && !isToday(day) && "bg-zinc-600",
										!isEqual(day, selectedDay) &&
											!isPast(day) &&
											"hover:bg-stone-400",
										(isEqual(day, selectedDay) || isToday(day)) &&
											"font-semibold",
										"mx-auto flex h-8 w-8 select-none items-center justify-center rounded-full ",
									)}
								>
									<time dateTime={format(day, "yyyy-MM-dd")} className="">
										{format(day, "d")}
									</time>
								</button>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export const CalenderDate2 = ({
	label,
	name,
	placeholder,
	error = null,
	type = "text",
	className = "",
	value,
	handleDate,
	...inputProps
}: CaldenderDateProps) => {
	// new code start
	// Use state to track the visibility of the modal
	const [isOpen, setIsOpen] = useState(false);

	// Function to handle modal open
	const handleOpen = () => {
		setIsOpen(true);
	};

	// Function to handle modal close
	const handleClose = () => {
		setIsOpen(false);
	};

	// new code end

	const handleChange = (date: Date) => {
		handleDate(date);
		handleClose();
	};

	return (
		<div>
			{/* <CalenderDateRaw handleDate={handleDate} /> */}
			<div className="">
				<label htmlFor={name} className="text-md">
					{label}
					{error && <span className="italic text-red-500">{` :${error}`}</span>}
				</label>
				<br />
				<input
					type="text"
					name={name}
					// disabled
					value={value ?? ""}
					placeholder={placeholder}
					className={`text-md rounded-md border-2 border-solid border-form-child-border bg-form-child-bg p-2 selection:select-none placeholder:text-form-child-placeholder hover:cursor-pointer focus:border-indigo-500 focus:outline-none ${className}`}
					{...inputProps}
					onClick={handleOpen}
				/>
			</div>
			<ModalCalender isOpen={isOpen} onClose={handleClose}>
				<CalenderDateRaw handleDate={handleChange} />
			</ModalCalender>
		</div>
	);
};
