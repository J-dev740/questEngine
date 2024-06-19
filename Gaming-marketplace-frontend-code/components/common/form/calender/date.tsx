/* eslint-disable react/require-default-props */
import {
	add,
	eachDayOfInterval,
	endOfMonth,
	endOfWeek,
	format,
	getDay,
	isEqual,
	isSameMonth,
	isToday,
	parse,
	startOfToday,
	startOfWeek,
} from "date-fns";
import { useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

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
		<div className=" max-w-[200px] px-4 sm:px-7 md:max-w-4xl md:px-6">
			<div className="md:grid md:grid-cols-2">
				<div className="md:pr-14">
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
									onClick={() => {
										setSelectedDay(day);
										handleDate(day);
									}}
									className={classNames(
										isEqual(day, selectedDay) && "text-white",
										!isEqual(day, selectedDay) &&
											isToday(day) &&
											"text-red-500",
										!isEqual(day, selectedDay) &&
											!isToday(day) &&
											isSameMonth(day, firstDayCurrentMonth) &&
											"text-white",
										!isEqual(day, selectedDay) &&
											!isToday(day) &&
											!isSameMonth(day, firstDayCurrentMonth) &&
											"text-gray-600",
										isEqual(day, selectedDay) && isToday(day) && "bg-red-500",
										isEqual(day, selectedDay) && !isToday(day) && "bg-zinc-600",
										!isEqual(day, selectedDay) && "hover:bg-stone-400",
										(isEqual(day, selectedDay) || isToday(day)) &&
											"font-semibold",
										"mx-auto flex h-8 w-8 items-center justify-center rounded-full",
									)}
								>
									<time dateTime={format(day, "yyyy-MM-dd")}>
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

export const CalenderDate = ({
	label,
	name,
	placeholder,
	error = null,
	type = "text",
	className = "",
	value,
	handleDate,
	...inputProps
}: CaldenderDateProps) => (
	<div>
		<CalenderDateRaw handleDate={handleDate} />
		<div className="mb-1 flex-grow">
			<label htmlFor={name} className="text-md">
				{label}
				{error && <span className="italic text-red-500">{` :${error}`}</span>}
			</label>
			<br />
			<input
				type={type}
				name={name}
				disabled
				value={value ?? ""}
				placeholder={placeholder}
				className={`text-md mb-1 min-w-full rounded-md border-2 border-solid border-[#404040] bg-transparent p-1 pl-[0.75rem] selection:select-none hover:cursor-pointer focus:border-red-500 focus:outline-none ${className}`}
				{...inputProps}
			/>
		</div>
	</div>
);
