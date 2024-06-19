/* eslint-disable react/require-default-props */

export interface ButtonProps {
	text: string | React.ReactNode;
	type?: "button" | "submit" | "reset" | undefined;
	stretch?: boolean;
	disabled?: boolean;
	name?: string;
	className?: string;
	onClick?: (_event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Button2 = ({ text, className, ...buttonProps }: ButtonProps) => (
	<button
		type="button"
		className={`group rounded-lg bg-gradient-to-r from-[#296BBD] to-[#AC85FF] p-1 px-6 py-3 font-semibold text-white transition-all duration-300 ease-in-out hover:scale-105 hover:bg-teal-500 focus:outline-none ${className}`}
		{...buttonProps}
	>
		{text}
	</button>
);
