/* eslint-disable react/require-default-props */

export interface InputFieldProps {
	label: string;
	placeholder: string;
	name: string;
	error: string | null;
	type?: "text" | "number";
	value?: string | number;
	disabled?: boolean;
	required?: boolean;
	className?: string;
	onChange?: (_event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputField2 = ({
	label,
	name,
	placeholder,
	error = null,
	className = "",
	type = "text",
	...inputProps
}: InputFieldProps) => (
	<div>
		<label htmlFor={name} className="text-md flex">
			{label}
			{error && <p className="italic text-red-500">{error}</p>}
		</label>
		<input
			type={type}
			name={name}
			placeholder={placeholder}
			className={`text-md min-w-full rounded-md border-2 border-solid border-form-child-border bg-form-child-bg p-2 pl-3 text-form-child-text selection:bg-red-500  placeholder:text-form-child-placeholder focus:outline-none ${className} ${
				error ? "border-red-500" : "focus:border-indigo-500"
			}`}
			{...inputProps}
		/>
	</div>
);
