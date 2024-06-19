import Image from "next/image";
import { IoIosClose } from "react-icons/io";
import infoImage from "../../assets/toast/infoImage.png";

const Info = () => (
	<div
		className="flex h-[415px]  w-[413px] translate-y-2  flex-col items-center gap-[20px] rounded-[16px] border-[2px] border-gray-800 bg-gradient-to-t from-[#404040] to-[#49505700]
				px-[48px] pb-[48px] pt-[32px] font-poppins font-bold  text-white backdrop-blur-[50px] duration-500 ease-in-out hover:translate-y-5 hover:shadow-none "
	>
		<div className="absoulute right-10 top-10 flex w-full cursor-pointer justify-end">
			<IoIosClose className="h-10 w-10 text-[#FFFFFF]" />
		</div>
		<div>
			<Image src={infoImage} alt="info" width={154} height={115} />
		</div>
		<div className="text-center text-[20px] leading-[32px] text-[#D9D9D9]">
			New features available <br /> on your course!
		</div>
		<div className="flex h-[60px] w-[253px] cursor-pointer items-center justify-center rounded-[11px] bg-gradient-to-r from-[#2A84C0] to-[#294A8D]  px-[24px] py-[18px] text-[18px] leading-[30px] text-[#FFFFFF]">
			Explore!
		</div>
	</div>
);

export default Info;
