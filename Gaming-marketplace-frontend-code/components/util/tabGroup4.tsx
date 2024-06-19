/* eslint-disable react/require-default-props */

import React, { useState } from "react";

interface TabGroup4Props {
	Tab1Title: string | React.ReactNode;
	Tab2Title: string | React.ReactNode;
	Tab3Title: string | React.ReactNode;
	Tab4Title: string | React.ReactNode;
	Tab1Content: React.ReactNode;
	Tab2Content: React.ReactNode;
	Tab3Content: React.ReactNode;
	Tab4Content: React.ReactNode;
	className?: string;
}

const TabGroup4 = ({
	Tab1Title,
	Tab2Title,
	Tab3Title,
	Tab4Title,
	Tab1Content,
	Tab2Content,
	Tab3Content,
	Tab4Content,
	className,
}: TabGroup4Props) => {
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
				<li
					className="relative my-auto w-2/4 cursor-pointer px-4 py-2 text-center"
					onClick={() => handleTabClick(2)}
				>
					{/* Tab2Title */}
					<p
						className={`my-4 rounded-xl text-textMedium2 font-semibold text-white ${
							activeTab === 2
								? " bg-gradient-to-r from-[#296BBD] to-[#AC85FF]"
								: "border border-[#212121] bg-[#111111]"
						}`}
					>
						{Tab3Title}
					</p>
				</li>
				<li
					className="relative my-auto w-2/4 cursor-pointer px-4 py-2 text-center"
					onClick={() => handleTabClick(3)}
				>
					{/* Tab2Title */}
					<p
						className={`my-4 rounded-xl text-textMedium2 font-semibold text-white ${
							activeTab === 3
								? " bg-gradient-to-r from-[#296BBD] to-[#AC85FF]"
								: "border border-[#212121] bg-[#111111]"
						}`}
					>
						{Tab4Title}
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
				{activeTab === 2 && (
					<div className="p-2">
						{/* Content for Tab 2 */}
						{Tab3Content}
					</div>
				)}
				{activeTab === 3 && (
					<div className="p-2">
						{/* Content for Tab 2 */}
						{Tab4Content}
					</div>
				)}
			</div>
		</div>
	);
};

export default TabGroup4;
