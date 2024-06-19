/* eslint-disable react/require-default-props */

interface CardsListProps {
	className?: string;
	children: React.ReactNode;
}

const CardsList = ({ children, className }: CardsListProps) => {
	return (
		<div className={`no-scrollbar flex justify-start space-x-4 overflow-x-scroll ${className}`}>
			{children}
		</div>
	);
};

export default CardsList;
