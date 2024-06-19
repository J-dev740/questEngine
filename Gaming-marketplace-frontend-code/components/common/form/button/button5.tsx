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

export const Button5 = ({ text, className = "", ...buttonProps }: ButtonProps) => (
	<button
		type="button"
		className={`rounded-xl border border-card-border-child p-2 hover:opacity-90 disabled:hover:opacity-100 ${className}`}
		{...buttonProps}
	>
		{text}
	</button>
);
