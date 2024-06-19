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

export const Button6 = ({ text, className, ...buttonProps }: ButtonProps) => (
	<button
		type="button"
		className={`rounded-xl bg-gradient-to-r from-[#296BBD] to-[#AC85FF] px-6 py-3 text-textMedium2 duration-75 hover:scale-105 ${className}`}
		{...buttonProps}
	>
		{text}
	</button>
);
