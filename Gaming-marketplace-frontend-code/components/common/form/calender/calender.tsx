/* eslint-disable react/require-default-props */

import { format } from "date-fns";
import { useEffect, useState } from "react";
import { InputField } from "../inputField";
import { CalenderDate2 } from "./date2";
import { CalenderTime } from "./time";

export interface CalenderProps {
	// label: string;
	error: string | null;
	className?: string;
	handleDate: (_date: Date) => void;
}

// make calender to be a popover
export const Calender = ({
	// label,
	error = null,
	handleDate,
	className = "",
}: CalenderProps) => {
	const [calDate, setCalDate] = useState(new Date());
	useEffect(() => handleDate(calDate), [calDate]);

	return (
		<div>
			<div className={`flex space-x-3 ${className}`}>
				<div className="basis-1/3">
					<CalenderDate2
						label="Select a date"
						name="date"
						placeholder="Enter details..."
						error={null}
						value={format(calDate, "MMM dd, yyy")}
						handleDate={(day) => setCalDate(day)}
					/>
				</div>
				<div className="basis-1/3">
					<CalenderTime
						label="Select a time"
						name="time"
						date={calDate}
						error={null}
						handleTime={(day) => setCalDate(day)}
					/>
				</div>
				<div className="basis-1/3">
					<InputField
						label="duration (minutes)"
						name="duration"
						error={error}
						placeholder="Enter duration..."
					/>
				</div>
			</div>
		</div>
	);
};
