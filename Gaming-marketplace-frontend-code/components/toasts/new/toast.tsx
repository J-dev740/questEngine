import Image from "next/image";
import error from "../../../assets/toast/error.png";
import success from "../../../assets/toast/success.png";

interface ToastProps {
	message: string;
	condition: boolean;
}

const Toast = ({ message, condition }: ToastProps) => {
	return (
		<div className="flex h-16 w-64 flex-row items-center justify-center gap-[16px] rounded-[8px] border-[2px] border-[#3F3F3F] bg-[#3F3F3F] text-white backdrop-blur-[50px]">
			<div>
				{condition ? (
					<Image src={success} alt="success" width={35} height={35} />
				) : (
					<Image src={error} alt="error" width={35} height={35} />
				)}
			</div>
			<div className="font-500 font-poppins text-[14px] leading-[20px]">{message}</div>
		</div>
	);
};

export default Toast;
