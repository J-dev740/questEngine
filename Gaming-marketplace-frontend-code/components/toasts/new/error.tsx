import Image from "next/image";
import error from "../../../assets/toast/error.png";

const Error = () => {
	return (
		<div className="flex h-16 w-56 flex-row items-center justify-center gap-[16px] rounded-[8px] border-[2px] border-gray-800  bg-gradient-to-t from-[#404040] to-[#49505700] text-white backdrop-blur-[50px]">
			<div>
				<Image src={error} alt="error" width={35} height={35} />
			</div>
			<div className="font-500 font-poppins text-[14px] leading-[20px]">
				That didn’t work.
			</div>
		</div>
	);
};

export default Error;
