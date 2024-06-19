import Image from "next/image";
import { IoIosClose } from "react-icons/io";
import errorImage from "../../assets/toast/errorImage.png";

const Error = () => (
	<div
		className="flex h-[415px]  w-[413px] translate-y-2  flex-col items-center gap-[20px] rounded-[16px] border-[2px] border-gray-800 bg-gradient-to-t from-[#404040] to-[#49505700]
				px-[48px] pb-[48px] pt-[32px] font-poppins font-bold  text-white backdrop-blur-[50px] duration-500 ease-in-out hover:translate-y-5 hover:shadow-none "
	>
		<div className="absoulute right-10 top-10 flex w-full cursor-pointer justify-end">
			<IoIosClose className="h-10 w-10 text-[#FFFFFF]" />
		</div>
		<div>
			<Image src={errorImage} alt="error" width={102} height={102} />
		</div>
		<div className="text-center text-[20px] leading-[32px] text-[#D9D9D9]">
			Error has occurred while <br />
			adding the course
		</div>
		<div className="flex h-[60px] w-[253px] cursor-pointer items-center justify-center rounded-[11px] border-[1px] border-[#FFFFFF] px-[24px] py-[18px] text-[18px] leading-[30px] text-[#FFFFFF]">
			Try Again
		</div>
	</div>
);

export default Error;
