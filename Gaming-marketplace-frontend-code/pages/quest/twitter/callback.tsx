import axios from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { walletAddressSelector } from "../../../features/auth/auth.selectors";
import { selectedQuestSelector } from "../../../features/quest-engine/quest.selectors";

const Callback = () => {
	const router = useRouter();
	const { code } = router.query;
	const { state } = router.query;
	const walletAddress = useSelector(walletAddressSelector);
	const quests = useSelector(selectedQuestSelector);

	console.log(code);
	console.log(state);
	console.log(walletAddress);
	console.log(quests);

	useEffect(() => {
		if (code) {
			axios.get(
				`http://localhost:5000/v1/tasks/twitter/callback/${walletAddress}?code=${code}&state=${state}`,
			);

			router.push({
				pathname: `/quest/${quests}`,
			});
		}
	}, [code, state]);

	return <div />;
};

export default Callback;
