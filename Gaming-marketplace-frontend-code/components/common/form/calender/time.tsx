/* eslint-disable react/require-default-props */

import { compareAsc, eachMinuteOfInterval, endOfDay, startOfDay, toDate } from "date-fns";
import { useEffect, useRef, useState } from "react";
import { Option } from "../selectField/option";

export interface SelectFieldProps {
	label: string;
	name: string;
	error: string | null;
	date: Date;
	multiple?: boolean;
	disabled?: boolean;
	required?: boolean;
	size?: number;
	className?: string;
	handleTime: (_date: Date) => void;
	onChange?: (_event: React.ChangeEvent<HTMLSelectElement>) => void;
}

type AMPM = "AM" | "PM";

interface TimeObject {
	hours: number;
	minutes: number;
	ampm: AMPM;
	date: Date;
}

const timeGenerator = (selectedDate: Date): Array<TimeObject> => {
	const rawIntervals: Array<Date> = eachMinuteOfInterval(
		{
			start: startOfDay(selectedDate),
			end: endOfDay(selectedDate),
		},
		{ step: 15 },
	);
	return rawIntervals.map((item) => {
		let hours = item.getHours();
		let ampm: AMPM = "AM";

		if (hours > 12) {
			hours -= 12;
			ampm = "PM";
		}

		return { date: item, hours, minutes: item.getMinutes(), ampm };
	});
};

const compareTime = (day: Date): boolean => {
	const comp = compareAsc(Date.now(), day);
	if (comp === -1) return false;
	return true;
};

const convertToDate = (value: string) => toDate(parseInt(value));

export const CalenderTime = ({
	label,
	name,
	error = null,
	date,
	className = "",
	handleTime,
	...selectProps
}: SelectFieldProps) => {
	const [calTime, setCalTime] = useState<Date>(new Date());
	const selectRef = useRef<HTMLSelectElement>(null);

	useEffect(() => {
		const nextTime = convertToDate(selectRef.current?.value as string);
		handleTime(nextTime);
		setCalTime(nextTime);
	}, []);

	useEffect(() => handleTime(calTime), [calTime]);
	return (
		<div className="">
			<label htmlFor={name} className="text-md">
				{label}
				{error && <span className="italic text-red-500">{` :${error}`}</span>}
			</label>
			<br />
			<select
				ref={selectRef}
				name={name}
				onChange={(e) => setCalTime(convertToDate(e.currentTarget.value))}
				{...selectProps}
				className={`text-md  min-w-full rounded-md border-2 border-solid border-form-child-border bg-form-child-bg p-2 pl-[0.75rem] text-form-child-text selection:select-none placeholder:text-form-child-placeholder hover:cursor-pointer focus:border-indigo-500 focus:outline-none ${className}`}
			>
				{timeGenerator(date)
					.filter((item) => !compareTime(item.date))
					.map((op) => (
						<Option
							key={op.date.toString()}
							value={op.date.getTime()}
							text={`${op.hours === 0 ? "12" : op.hours}:${
								op.minutes === 0 ? "00" : op.minutes
							} ${op.ampm}`}
						/>
					))}
			</select>
		</div>
	);
};
