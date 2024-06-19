import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectedReferalObjectSelector } from "../../features/quest-engine/quest.selectors";
import { questActions } from "../../features/quest-engine/quest.slice";

const ExpertSlug = () => {
	const router = useRouter();
	const questId = router.asPath.split("/")[2];
	const referrelUserObjectId = router.asPath.split("/")[3];
	const taskId = router.asPath.split("/")[4];
	const dispatch = useDispatch();
	const object = {
		questId: questId,
		referrelUserObjectId: referrelUserObjectId,
		taskId: taskId,
	};

	useEffect(() => {
		dispatch(questActions.setReferalObject(object));
		console.log("test log------------------------>");
		if (taskId) {
			{
				router.push({
					pathname: questId,
				});
			}
		}
	}, [taskId]);

	const response = useSelector(selectedReferalObjectSelector);
	console.log("response of SLug", response);

	return (
		<h1 className="text-2xl mb-auto mt-auto text-center font-semibold ">
			REDIRECTING TO QUEST...
			<p>{questId}</p>
			<p>{referrelUserObjectId}</p>
			<p>{taskId}</p>
		</h1>
	);
};

export default ExpertSlug;
