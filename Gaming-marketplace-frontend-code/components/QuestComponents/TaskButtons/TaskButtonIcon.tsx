import { FC } from "react";
import { BiGasPump } from "react-icons/bi";
import { BsDiscord, BsTelegram } from "react-icons/bs";
import { FaEthereum, FaWallet } from "react-icons/fa";
import { MdQuiz } from "react-icons/md";
import { RiTwitterFill } from "react-icons/ri";
import { SiOpensea } from "react-icons/si";
import { TaskOption } from "../../../constants/quest/task";

interface Props {
	task: TaskOption;
}

const TaskButtonIcon: FC<Props> = ({ task }) => {
	const renderIcon = () => {
		switch (task) {
			case TaskOption.DISCORD_TASK:
				return <BsDiscord size={22} />;
			case TaskOption.TELEGRAM_TASK:
				return <BsTelegram size={20} />;
			case TaskOption.TWITTER_TASK:
				return <RiTwitterFill size={20} />;
			case TaskOption.ENS_CHECK:
				return <FaEthereum size={20} />;
			case TaskOption.GAS_FEE:
				return <BiGasPump size={20} />;
			case TaskOption.WALLET_BALANCE_TASK:
				return <FaWallet size={20} />;
			case TaskOption.OPENSEA:
				return <SiOpensea size={20} />;
			default:
				return <MdQuiz size={20} />;
		}
	};

	return <span>{renderIcon()}</span>;
};

export default TaskButtonIcon;
