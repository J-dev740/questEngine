/* eslint-disable react/require-default-props */
import { IoClose } from "react-icons/io5";

interface IModal {
	children: React.ReactNode;
	handleExit?: () => void;
	title: string;
}

export const Modal = ({ children, handleExit, title }: IModal) => {
	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm">
			<div className="flex min-h-fit min-w-fit flex-col items-center justify-center space-y-5 rounded-[14px] border-[2px] border-form-border bg-form-bg  p-[40px] font-Anek backdrop-blur-lg">
				<div className="flex w-full flex-row items-center justify-between gap-8">
					<div className="font-poppins text-textLarge font-bold text-[#FFFFFF]">
						{title}
					</div>
					<div>
						<IoClose
							className="cursor-pointer text-[30px] text-[#FFFFFF]"
							onClick={handleExit}
						/>
					</div>
				</div>
				{children}
			</div>
		</div>
	);
};

export default Modal;
