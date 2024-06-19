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

export const Button4 = ({ text, className = "", ...buttonProps }: ButtonProps) => (
	<button
		type="button"
		className={`flex items-center rounded-lg bg-white px-5 py-2.5 text-center text-black ${className}`}
		{...buttonProps}
	>
		{text}
	</button>
);
