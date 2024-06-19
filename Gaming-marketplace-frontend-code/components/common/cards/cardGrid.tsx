/* eslint-disable react/require-default-props */

interface CardsListProps {
	className?: string;
	children: React.ReactNode;
}

const CardsGrid = ({ children, className }: CardsListProps) => {
	return (
		<div className={`flex w-full flex-nowrap justify-start gap-5 ${className}`}>{children}</div>
	);
};

export default CardsGrid;
