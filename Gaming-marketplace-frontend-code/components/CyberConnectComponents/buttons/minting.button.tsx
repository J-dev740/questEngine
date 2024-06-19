/* eslint-disable react/require-default-props */

import Image from "next/image";
import { MouseEvent, useState } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import CyberHandleForm from "../forms/handle/handle.form";

interface Props {
	text: string;
	className?: string;
}

const StartMinting = ({ text, className }: Props) => {
	const [_open, _setOpen] = useState(false);

	const handleOutsideClick = (event: MouseEvent) => {
		const modalContent = document.getElementById("modal-content2");
		if (modalContent && !modalContent.contains(event.target as Node)) {
			_setOpen(false);
		}
	};

	return (
		<div className="relative" onClick={handleOutsideClick}>
			{_open && (
				<CyberHandleForm onClose={() => _setOpen(false)} onResult={() => _setOpen(false)} />
			)}
			<section className="relative m-2 flex h-14 w-[300px] justify-center rounded-xl border border-none bg-gradient-to-r from-[#296BBD] to-[#AC85FF]">
				<Image
					src="/cyberConnect/assets/btnCircle1.png"
					alt="ImgCircle1"
					width={100}
					height={0}
					className="absolute left-0 top-0 rounded-ss-xl"
				/>
				<button
					type="button"
					className={`text-base z-2 flex w-full items-center justify-center rounded-xl px-2 text-center font-semibold text-white hover:cursor-pointer ${className}`}
					onClick={() => _setOpen((state) => !state)}
				>
					{text}
					<AiOutlineArrowRight />
				</button>
				<Image
					src="/cyberConnect/assets/btnCircle2.png"
					alt="ImgCircle2"
					width={100}
					height={0}
					className="absolute bottom-0 right-0 rounded-ee-xl"
				/>
			</section>
		</div>
	);
};

export default StartMinting;
