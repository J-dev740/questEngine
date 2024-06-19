/* eslint-disable react/require-default-props */

export interface TextAreaProps {
	label: string;
	placeholder: string;
	name: string;
	error: string | null;
	minLength?: number;
	maxLength?: number;
	disabled?: boolean;
	required?: boolean;
	rows?: number;
	className?: string;
	onChange?: (_event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const TextArea = ({
	label,
	name,
	placeholder,
	className = "",
	error = null,
	...props
}: TextAreaProps) => (
	<div>
		<label htmlFor={name} className="text-md">
			{label}
			{error && <p className="italic text-red-500">{error}</p>}
		</label>
		<textarea
			name={name}
			placeholder={placeholder}
			className={`text-md mb-1 min-w-full resize-none rounded-md border-2 border-solid border-form-child-border bg-form-child-bg p-1 pl-[0.75rem] text-form-child-text selection:bg-red-500 placeholder:text-form-child-placeholder focus:outline-none ${className}
			${error ? "border-red-500" : "focus:border-indigo-500"}`}
			{...props}
		/>
	</div>
);
