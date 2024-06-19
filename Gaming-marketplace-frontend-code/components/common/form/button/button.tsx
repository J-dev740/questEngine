/* eslint-disable react/require-default-props */

export interface ButtonProps {
	text: string;
	type?: "button" | "submit" | "reset" | undefined;
	stretch?: boolean;
	disabled?: boolean;
	name?: string;
	className?: string;
	onClick?: (_event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Button = ({ text, className = "", ...buttonProps }: ButtonProps) => (
	<button
		type="button"
		className={`text-lg rounded-lg bg-gradient-to-r from-red-400 to-amber-400 p-1 pl-3 pr-3 font-bold hover:opacity-90 disabled:hover:opacity-100 ${className}`}
		{...buttonProps}
	>
		{text}
	</button>
);
