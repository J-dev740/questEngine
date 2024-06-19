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

export const Button3 = ({ text, className = "", ...buttonProps }: ButtonProps) => (
	<button
		type="button"
		className={`flex max-w-fit items-center rounded-lg bg-white/20 px-5 py-3 text-center backdrop-blur-md hover:opacity-90 disabled:hover:opacity-100 ${className}`}
		{...buttonProps}
	>
		{text}
	</button>
);
