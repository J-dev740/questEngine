/* eslint-disable react/button-has-type */

import { useEffect, useState } from "react";
import { MdContentCopy } from "react-icons/md";

export interface CopyToClipboardProps {
	streamKey: string | undefined;
}

export const CopyClipboard = ({ streamKey }: CopyToClipboardProps) => {
	const [isCopied, setIsCopied] = useState(false);

	useEffect(() => {
		if (!isCopied) return;
		const timer = setTimeout(() => setIsCopied(false), 1500);

		return () => clearTimeout(timer);
	}, [isCopied]);

	const handleCopyToClipboard = () => {
		if (!streamKey) return;
		navigator.clipboard.writeText(streamKey);
		setIsCopied(true);
	};

	if (isCopied) {
		return (
			<div
				className="ml-auto flex cursor-pointer items-center rounded-lg bg-white px-2 py-4 font-semibold text-black  hover:bg-slate-100"
				onClick={handleCopyToClipboard}
			>
				Copied!
			</div>
		);
	} else {
		return (
			<div
				className="flex w-[12vw] cursor-pointer items-center rounded-lg bg-white px-4 py-4 font-semibold text-black hover:bg-slate-100 "
				onClick={handleCopyToClipboard}
			>
				<div className=" truncate">Copy Key: {streamKey}</div>

				<button className="ml-2 rounded-lg bg-white text-black">
					<MdContentCopy className="text-[20px]" />
				</button>
			</div>
		);
	}
};
