import Image from "next/image";
import Modal from "../../util/modal";

interface ConfirmProps {
	onClose: () => void;
}

const Done = ({ onClose }: ConfirmProps) => {
	return (
		<Modal title="" handleExit={onClose}>
			<div className="flex h-[250px] w-[320px] flex-col items-center space-y-6 font-Anek">
				<Image src="/toast/doneImage.png" height={115} width={154} alt="done-image" />
				<p className="w-[75%] text-center text-textMedium3 font-[500]">
					Please wait until the course is confirmed
				</p>
			</div>
		</Modal>
	);
};

export default Done;
