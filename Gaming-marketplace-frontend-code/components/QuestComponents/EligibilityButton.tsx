import { useSelector } from "react-redux";
import { activeUserSelector } from "../../features/profile-page/profile.selectors";
import { useCreateQuestProgressMutation } from "../../features/quest-engine/quest.api";
import { TaskStatus } from "../../constants/quest/task";
import { walletAddressSelector } from "../../features/auth/auth.selectors";
import {
	// activeUserSelector,
	selectedReferalObjectSelector,
} from "../../features/quest-engine/quest.selectors";
import { IEligibilityButton } from "../../features/quest-engine/quest.types";

const EligibilityButton = (props: IEligibilityButton) => {
	const { text, allTasks, quest_id } = props;

	const activeUser = useSelector(activeUserSelector);
	const referralObject = useSelector(selectedReferalObjectSelector);

	const [createQuestProgress] = useCreateQuestProgressMutation();

	const handleParticipate = async (quest_id: string) => {
		if (!activeUser) return;
		const userId = activeUser._id;

		createQuestProgress({
			questId: quest_id,
			userId,
		}).unwrap();
	};
	if (text === "Participated") {
		return (
			<button
				type="button"
				disabled
				className="border-1 flex w-full flex-row items-center justify-center rounded-[16px] bg-[#212121] p-3  text-white "
			>
				{text}
			</button>
		);
	} else {
		return (
			<button
				type="button"
				onClick={() => handleParticipate(quest_id)}
				className="border-1 flex w-full flex-row items-center justify-center rounded-[16px] bg-gradient-to-r  from-[#296BBD] to-[#AC85FF] p-3  text-white   hover:z-[2px] hover:bg-slate-600 "
			>
				{text}
			</button>
		);
	}
};
export default EligibilityButton;
