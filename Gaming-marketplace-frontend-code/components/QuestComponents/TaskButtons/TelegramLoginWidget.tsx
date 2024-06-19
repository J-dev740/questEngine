import { useDispatch } from "react-redux";
import TelegramLoginButton from "telegram-login-button";
import { questActions } from "../../../features/quest-engine/quest.slice";

const TelegramLoginWidget = () => {
	const dispatch = useDispatch();

	const handleTelegramResponse = (response: any) => {
		// Handle the response from Telegram
		dispatch(questActions.setTelegramCode(response.id as string));
	};

	return (
		<div>
			<TelegramLoginButton
				dataOnauth={handleTelegramResponse}
				botName="QEngine01Bot"
				requestAccess="write"
			/>
		</div>
	);
};

export default TelegramLoginWidget;
