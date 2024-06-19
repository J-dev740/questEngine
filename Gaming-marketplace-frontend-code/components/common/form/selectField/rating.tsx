/* eslint-disable react/require-default-props */

import { useState } from "react";
import { BsStar, BsStarFill } from "react-icons/bs";

interface RatingProps {
	label: string;
	count?: number;
	error: string | null;
	onRating: (k: number) => void;
	className?: string;
}

const Rating = ({ onRating, count = 5, error, label, className }: RatingProps) => {
	const [hover, setHover] = useState(0);
	const [selected, setSelected] = useState(0);

	const handleStar = (id: number) => {
		if (selected >= id) return <BsStarFill className="h-full w-full text-yellow-300" />;
		if (hover >= id) return <BsStarFill className="h-full w-full" />;
		return <BsStar className="h-full w-full" />;
	};

	const handleSelected = (id: number) => {
		setSelected(id);
		onRating(id);
	};

	return (
		<div className="space-y-1">
			<label className="text-md">
				{label}
				{error && <span className="italic text-red-500">{` :${error}`}</span>}
			</label>
			<div
				className={`flex h-fit flex-row-reverse space-x-2 hover:text-white ${className}`}
				onMouseLeave={() => setHover(0)}
			>
				{Array.from(Array(count)).map((id, index) => (
					<div
						onMouseEnter={() => setHover(count - index)}
						onClick={() => handleSelected(count - index)}
						className="peer mx-2 flex-grow text-white hover:cursor-pointer hover:text-white peer-hover:text-white"
					>
						{handleStar(count - index)}
					</div>
				))}
			</div>
		</div>
	);
};

export default Rating;
