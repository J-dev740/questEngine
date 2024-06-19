import Image from "next/image";
import React, { useState } from "react";

interface Option {
	value: string;
	label: string;
}

interface DropdownInputProps {
	options: Option[];
}

const DropdownInput: React.FC<DropdownInputProps> = ({ options }) => {
	const [selectedOption, setSelectedOption] = useState<string | null>(null);
	const [isOpen, setIsOpen] = useState(false);

	const handleSelectOption = (option: string) => {
		setSelectedOption(option);
		setIsOpen(false);
	};

	return (
		<div className="relative">
			<button
				type="button"
				className="flex w-full items-center justify-between rounded-md border-2 border-solid border-[#404040] bg-transparent px-4 py-2 font-medium text-white focus:border-indigo-500 focus:outline-none"
				onClick={() => setIsOpen(!isOpen)}
			>
				{selectedOption ? (
					<span className="block truncate">{selectedOption}</span>
				) : (
					<span className="block text-gray-400">Select an option</span>
				)}

				<Image
					src="/down.png" // change this later on
					alt="expert-image!"
					width="0"
					height="0"
					sizes="100vw"
					className={`w-[1rem] transform transition-transform duration-200 ${
						isOpen ? "rotate-180" : "rotate-0"
					}`}
				/>
			</button>
			{isOpen && (
				<ul className="absolute z-40 mt-1 w-full rounded-md border border-gray-300 bg-white shadow-lg">
					{options.map((option) => (
						<li
							key={option.value}
							className="cursor-pointer px-4 py-2 text-gray-700 hover:bg-gray-100"
							onClick={() => handleSelectOption(option.label)}
						>
							{option.label}
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default DropdownInput;
