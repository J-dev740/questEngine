import { Button2, Button5 } from "../../common/form/button";
import Modal from "../../util/modal";

interface ConfirmProps {
	onYes: () => void;
	onNo: () => void;
}

const Confirm = ({ onNo, onYes }: ConfirmProps) => {
	return (
		<Modal title="" handleExit={onNo}>
			<div className="flex h-[215px] w-[400px] flex-col items-center space-y-6 font-Anek">
				<div className="text-center text-textMedium3 font-[500]">
					<p>Are you done with adding video?</p>
					<p>Do you want to finish?</p>
				</div>
				<div className="flex w-[50%] space-x-6">
					<Button5 text="No" className="basis-1/2 text-[18px]" onClick={onNo} />
					<Button2 text="Yes" className="basis-1/2 text-[18px]" onClick={onYes} />
				</div>
			</div>
		</Modal>
	);
};

export default Confirm;
