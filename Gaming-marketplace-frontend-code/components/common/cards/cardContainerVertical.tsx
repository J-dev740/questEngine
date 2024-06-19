/* eslint-disable react/require-default-props */
interface CardProps {
	children: React.ReactNode;
	className?: string;
}

const CardContainerVertical = ({ children, className }: CardProps) => {
	return (
		<div
			className={`rounded-3xl border border-[#212121] bg-[#111111] p-6 backdrop-blur-lg backdrop-filter ${className}`}
		>
			{children}
		</div>
	);
};

export default CardContainerVertical;
