/* eslint-disable react/require-default-props */

import React, { useState } from "react";

interface NewTabProps {
	Tab1Title: string | React.ReactNode;
	Tab2Title: string | React.ReactNode;
	Tab1Content: React.ReactNode;
	Tab2Content: React.ReactNode;
	className?: string;
}

const TabGroupNew = ({
	Tab1Title,
	Tab2Title,
	Tab1Content,
	Tab2Content,
	className,
}: NewTabProps) => {
	const [activeTab, setActiveTab] = useState(0);

	const handleTabClick = (tabIndex: number) => {
		setActiveTab(tabIndex);
	};

	return (
		<div className={`flex min-h-fit flex-col ${className}`}>
			<ul className="flex text-textxl leading-10">
				<li
					className="relative my-auto w-2/4 cursor-pointer px-4 py-2 text-center"
					onClick={() => handleTabClick(0)}
				>
					{/* Tab1Title */}
					<p
						className={`my-4 rounded-xl text-textMedium2 font-semibold text-white ${
							activeTab === 0
								? " bg-gradient-to-r from-[#296BBD] to-[#AC85FF]"
								: "border border-[#212121] bg-[#111111]"
						}`}
					>
						{Tab1Title}
					</p>
				</li>
				<li
					className="relative my-auto w-2/4 cursor-pointer px-4 py-2 text-center"
					onClick={() => handleTabClick(1)}
				>
					{/* Tab2Title */}
					<p
						className={`my-4 rounded-xl text-textMedium2 font-semibold text-white ${
							activeTab === 1
								? " bg-gradient-to-r from-[#296BBD] to-[#AC85FF]"
								: "border border-[#212121] bg-[#111111]"
						}`}
					>
						{Tab2Title}
					</p>
				</li>
			</ul>
			<div className="h-fit overflow-y-scroll p-1">
				{activeTab === 0 && (
					<div className="h-full p-2">
						{/* Content for Tab 1 */}
						{Tab1Content}
					</div>
				)}
				{activeTab === 1 && (
					<div className="p-2">
						{/* Content for Tab 2 */}
						{Tab2Content}
					</div>
				)}
			</div>
		</div>
	);
};

export default TabGroupNew;
