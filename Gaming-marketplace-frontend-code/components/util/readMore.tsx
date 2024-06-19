import React, { useState } from "react";

interface ReadMoreProps {
	text: string;
	maxLength: number;
}

const ReadMore: React.FC<ReadMoreProps> = ({ text, maxLength }) => {
	const [isExpanded, setIsExpanded] = useState(false);

	const toggleReadMore = () => {
		setIsExpanded(!isExpanded);
	};

	const truncatedText = text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
	const displayText = isExpanded ? text : truncatedText;

	return (
		<div>
			<p>{displayText}</p>
			{text.length > maxLength && (
				<button type="button" className="text-blue-500" onClick={toggleReadMore}>
					{isExpanded ? "Read less" : "Read more"}
				</button>
			)}
		</div>
	);
};

export default ReadMore;
