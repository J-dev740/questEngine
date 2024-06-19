/* eslint-disable react/require-default-props */

import React, { useState } from "react";

interface TabProps {
	Tab1Title: string | React.ReactNode;
	Tab2Title: string | React.ReactNode;
	Tab1Content: React.ReactNode;
	Tab2Content: React.ReactNode;
	className?: string;
}

const TabGroup2 = ({ Tab1Title, Tab2Title, Tab1Content, Tab2Content, className }: TabProps) => {
	const [activeTab, setActiveTab] = useState(0);

	const handleTabClick = (tabIndex: number) => {
		setActiveTab(tabIndex);
	};

	return (
		<div
			className={`flex min-h-fit flex-col rounded-3xl border-[1px] border-solid border-pallete1 bg-[#ffffff0b] backdrop-blur-sm ${className}`}
		>
			<ul className="flex border-b-[1px] border-pallete2 text-textxl leading-10">
				<li
					className="relative my-auto w-2/4 cursor-pointer px-4 py-2 text-center"
					onClick={() => handleTabClick(0)}
				>
					{/* Tab1Title */}
					<p
						className={`my-4 text-textxl font-bold ${
							activeTab === 0 ? "text-blue-900" : "text-card-text"
						}`}
					>
						{Tab1Title}
					</p>
					{activeTab === 0 && (
						<span
							className="-translate-y-1 rounded-t-lg after:absolute after:inset-x-0 after:bottom-0 after:h-1 after:transform after:bg-gradient-to-r after:from-blue-500 after:to-blue-900"
							aria-hidden="true"
						/>
					)}
				</li>
				<li
					className="relative my-auto w-2/4 cursor-pointer px-4 py-2 text-center"
					onClick={() => handleTabClick(1)}
				>
					{/* Tab2Title */}
					<p
						className={`my-4 text-textxl font-bold ${
							activeTab === 1 ? "text-blue-900" : "text-card-text"
						}`}
					>
						{Tab2Title}
					</p>
					{activeTab === 1 && (
						<span
							className="-translate-y-1 rounded-t-lg after:absolute after:inset-x-0 after:bottom-0 after:h-1 after:transform after:bg-gradient-to-r after:from-blue-500 after:to-blue-900"
							aria-hidden="true"
						/>
					)}
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

export default TabGroup2;
