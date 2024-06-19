/* eslint-disable react/require-default-props */

interface CardProps {
	children: React.ReactNode;
	className?: string;
	onClick?: () => void;
}

const CardContainerHorizontal = ({ children, className = "", onClick }: CardProps) => {
	return (
		<div
			onClick={onClick}
			className={`flex h-fit w-full flex-col justify-center rounded-md border-[1px] border-gray-800 ${className}`}
		>
			<div className="rounded-lg p-1 ">{children}</div>
		</div>
	);
};

export default CardContainerHorizontal;
