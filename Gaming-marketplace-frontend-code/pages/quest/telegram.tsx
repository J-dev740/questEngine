import { AiFillCheckCircle } from "react-icons/ai";
import TelegramLoginWidget from "../../components/QuestComponents/TaskButtons/TelegramLoginWidget";

const Telegram = () => {
	return (
		<div>
			Telegram
			<TelegramLoginWidget />
			<AiFillCheckCircle size={20} className="text-[#50d71e]" />
		</div>
	);
};

export default Telegram;
