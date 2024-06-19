import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	selectedDiscordCodeSelector,
	selectedQuestSelector,
} from "../../features/quest-engine/quest.selectors";
import { questActions } from "../../features/quest-engine/quest.slice";

const DiscordVerify = () => {
	const router = useRouter();
	const { code } = router.query;
	const quests = useSelector(selectedQuestSelector);
	const selectedQuest = quests;
	const dispatch = useDispatch();
	if (code) {
		dispatch(questActions.setDiscordCode(code as string));
	}
	const discordCode = useSelector(selectedDiscordCodeSelector);
	useEffect(() => {
		if (code === discordCode) {
			router.push({
				pathname: selectedQuest,
			});
		}
	});

	return (
		<div className="flex h-screen w-screen items-center justify-center	">
			<button type="button" className=" btn btn-outline btn-success ">
				{code}
			</button>
		</div>
	);
};

export default DiscordVerify;
