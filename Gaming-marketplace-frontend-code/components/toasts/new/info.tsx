import Image from "next/image";
import info from "../../../assets/toast/info.png";

const Info = () => {
	return (
		<div className="flex h-20 w-80 flex-row items-center justify-start gap-[16px] rounded-[8px] border-[2px] border-gray-800 bg-gradient-to-t  from-[#404040] to-[#49505700] pl-[16px] text-white backdrop-blur-[50px]">
			<div>
				<Image src={info} alt="info" width={35} height={35} />
			</div>
			<div className="flex flex-col gap-[4px]">
				<div className="font-500 font-poppins text-[14px] leading-[20px]">
					We’ve updated a few things!
				</div>
				<div className="font-500 font-poppins text-[14px] leading-[20px] text-[#838383]">
					Check it out!
				</div>
			</div>
		</div>
	);
};

export default Info;
