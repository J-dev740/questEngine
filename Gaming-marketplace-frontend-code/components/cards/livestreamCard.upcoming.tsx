import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { RxLink2 } from "react-icons/rx";
import CardContainerVertical from "../common/cards/cardContainerVertical";

interface Props {
	data: {
		owner: { _id: string; username: string };
		game: { _id: string; title: string };
		_id: string;
		streamStart: Date;
		icon: string;
	};
}

const LivestreamCardData = ({ data }: Props) => {
	const [countdownEnded, setCountdownEnded] = useState(false);
	const [countdownTime, setCountdownTime] = useState({
		countdownDays: "00",
		countdownHours: "00",
		countdownMinutes: "00",
		countdownSeconds: "00",
	});

	useEffect(() => {
		function myTimer() {
			const countdownDateTime = new Date(data.streamStart).getTime();
			const currentTime = new Date().getTime();

			const remainingDayTime = countdownDateTime - currentTime;

			let totalDays = Math.floor(remainingDayTime / (1000 * 60 * 60 * 24)).toString();
			let totalHours = Math.floor(
				(remainingDayTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
			).toString();
			let totalMinutes = Math.floor(
				(remainingDayTime % (1000 * 60 * 60)) / (1000 * 60),
			).toString();
			let totalSeconds = Math.floor((remainingDayTime % (1000 * 60)) / 1000).toString();

			if (parseInt(totalDays) >= 0 && parseInt(totalDays) <= 9) {
				totalDays = `0${totalDays}`;
			}

			if (parseInt(totalHours) >= 0 && parseInt(totalHours) <= 9) {
				totalHours = `0${totalHours}`;
			}

			if (parseInt(totalMinutes) >= 0 && parseInt(totalMinutes) <= 9) {
				totalMinutes = `0${totalMinutes}`;
			}

			if (parseInt(totalSeconds) >= 0 && parseInt(totalSeconds) <= 9) {
				totalSeconds = `0${totalSeconds}`;
			}

			if (remainingDayTime < 0) {
				clearTimeout(timeInterval);
				setCountdownEnded(true);
			}

			const runningCountdownTime = {
				countdownDays: totalDays.toString(),
				countdownHours: totalHours.toString(),
				countdownMinutes: totalMinutes.toString(),
				countdownSeconds: totalSeconds.toString(),
			};

			setCountdownTime(runningCountdownTime);
		}

		const timeInterval = setInterval(myTimer, 1000);
		return () => clearInterval(timeInterval);
	}, []);

	return (
		<CardContainerVertical className="min-h-max w-80 min-w-[25rem]">
			<div className="w-full space-y-6">
				<div className="flex justify-center">
					<Image
						src={data.icon}
						alt="noImage"
						width="0"
						height="0"
						sizes="100vw"
						className="aspect-[16/10] h-auto w-full rounded-2xl"
					/>
				</div>
				<div className="w-full space-y-2 ">
					<div className="flex w-full items-center space-x-1 font-poppins text-textLarge font-[600]">
						<span className="max-w-[90%] truncate">{data.owner.username}</span>
						<Link href={`/expert/${data.owner._id}`}>
							<RxLink2 className="text-textLarge" />
						</Link>
					</div>
					<div className="font-poppins text-textMedium3 font-[500] text-card-header2">
						{data.game.title}
					</div>
				</div>
				<div className="mx-auto flex w-full items-center justify-center space-x-2 rounded-2xl bg-[#080808] p-4 font-poppins text-textMedium2 font-[500]">
					{!countdownEnded && (
						<div className="inline-flex items-center space-x-1">
							<Image src="/icons/alarm_24px.svg" alt="clock" width="24" height="24" />
							<span className="inline-block bg-gradient-to-r from-[#296BBD] to-[#AC85FF] bg-clip-text text-transparent">{`${countdownTime.countdownDays}d ${countdownTime.countdownHours}h ${countdownTime.countdownMinutes}m ${countdownTime.countdownSeconds}s`}</span>
						</div>
					)}
					{countdownEnded && (
						<div className="inline-flex items-center space-x-1">
							<span className="inline-block bg-gradient-to-r from-[#296BBD] to-[#AC85FF] bg-clip-text text-transparent">
								Livestream ongoing!
							</span>
						</div>
					)}
				</div>
			</div>
		</CardContainerVertical>
	);
};

export default LivestreamCardData;
