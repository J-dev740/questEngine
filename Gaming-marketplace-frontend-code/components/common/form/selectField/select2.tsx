/* eslint-disable react/require-default-props */
import React from "react";
import { IOption, Option } from "./option";

export interface SelectFieldProps {
	label: string;
	name: string;
	error: string | null;
	multiple?: boolean;
	disabled?: boolean;
	required?: boolean;
	size?: number;
	value?: string;
	className?: string;
	options: Array<IOption>;
	onChange?: (_event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const Select2 = ({
	label,
	name,
	error = null,
	options = [],
	className = "",
	...selectProps
}: SelectFieldProps) => {
	return (
		<div className="flex-grow">
			<label htmlFor={name} className="text-md flex">
				{label}
				{error && <p className="italic text-red-500">{error}</p>}
			</label>
			<select
				key={name}
				// defaultValue={defaultValue}
				name={name}
				className={`text-md min-w-full rounded-md border-2 border-solid border-form-child-border bg-form-child-bg p-2 pl-[0.75rem] text-form-child-text selection:bg-red-500 focus:outline-none ${className} ${
					error ? "border-red-500" : "focus:border-indigo-500"
				}`}
				{...selectProps}
			>
				{options.map((op) => (
					<Option key={op.value} {...op} />
				))}
			</select>
		</div>
	);
};
