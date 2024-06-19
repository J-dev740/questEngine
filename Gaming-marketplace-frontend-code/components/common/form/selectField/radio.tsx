/* eslint-disable react/require-default-props */
import React from "react";

interface RadioProps {
	value: string;
	name: string;
	text: string;
	id: string;
	checked?: boolean;
}

export interface SelectFieldProps {
	label: string;
	name: string;
	error: string | null;
	multiple?: boolean;
	disabled?: boolean;
	required?: boolean;
	size?: number;
	className?: string;
	options: Array<RadioProps>;
	onChange?: (_event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const Radio = ({
	label,
	name,
	error = null,
	options = [],
	className = "",
	...selectProps
}: SelectFieldProps) => {
	console.log({ options });

	return (
		<div className="flex-grow">
			<label htmlFor={name} className="text-md">
				{label}
				{error && <p className="text-sm italic text-red-500">{error}</p>}
			</label>
			<br />
			<div className={`flex w-full space-x-3 ${className}`}>
				{options.map((item) => (
					<div className="space-x-4 font-[500]">
						<input type="radio" name={item.name} id={item.id} value={item.value} />
						<label htmlFor={item.name}>{item.text}</label>
					</div>
				))}
			</div>
		</div>
	);
};
