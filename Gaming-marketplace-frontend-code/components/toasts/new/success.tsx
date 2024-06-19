import Image from "next/image";
import success from "../../../assets/toast/success.png";

const Success = () => {
	return (
		<div className="flex h-16 w-64 flex-row items-center justify-center gap-[16px] rounded-[8px] border-[2px] border-gray-800  bg-gradient-to-t from-[#404040] to-[#49505700] text-white backdrop-blur-[50px]">
			<div>
				<Image src={success} alt="success" width={35} height={35} />
			</div>
			<div className="font-500 font-poppins text-[14px] leading-[20px]">
				Successfully toasted!
			</div>
		</div>
	);
};

export default Success;
