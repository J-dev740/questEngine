import { useEffect, useState } from "react";

interface TimerProps {
	dateTime: string;
}

const Timer = ({ dateTime }: TimerProps) => {
	const [countdownTime, setCountdownTime] = useState({
		countdownDays: "00",
		countdownHours: "00",
		countdownMinutes: "00",
		countdownSeconds: "00",
	});

	const [expiryTime, setExpiryTime] = useState(dateTime);
	const [countdownEnded, setCountdownEnded] = useState(false);

	function myTimer() {
		const countdownDateTime = new Date(expiryTime).getTime();
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

	// const countdownTimer = () => {
	// };

	// useEffect(() => {
	// 	countdownTimer();
	// }, []);

	useEffect(() => {
		clearTimeout(timeInterval);
		setExpiryTime(dateTime);

		const countdownDateTime = new Date(dateTime).getTime();
		const currentTime = new Date().getTime();

		const remainingDayTime = countdownDateTime - currentTime;

		if (remainingDayTime < 0) {
			setCountdownEnded(true);
		} else {
			setCountdownEnded(false);
		}
	}, [dateTime]);

	const timeInterval = setTimeout(myTimer, 1000);

	if (countdownEnded) {
		return (
			<div className="bg-white-500 flex w-full flex-col items-center justify-center rounded-xl border border-[#212121] bg-[#11111] bg-opacity-50 bg-clip-padding p-6 font-poppins text-text2xl backdrop-blur-md backdrop-filter">
				Timer Ended
			</div>
		);
	} else {
		return (
			<div className="bg-white-500 flex w-full flex-col items-center justify-center rounded-xl border border-[#212121] bg-[#111111] px-10 py-6">
				<div className="flex w-full justify-evenly gap-4 text-[40px] lg:gap-6">
					<div className="flex flex-col items-center">
						<div className="font-bold">{countdownTime.countdownDays}</div>
						<div className=" text-[18px]">Days</div>
					</div>
					<div className="flex flex-col items-center">
						<div className="font-bold">{countdownTime.countdownHours}</div>
						<div className=" text-[18px]">Hours</div>{" "}
					</div>
					<div className="flex flex-col items-center">
						<div className="font-bold">{countdownTime.countdownMinutes} </div>
						<div className=" text-[18px]">Minutes</div>
					</div>
					<div className="flex flex-col items-center">
						<div className="font-bold">{countdownTime.countdownSeconds} </div>
						<div className=" text-[18px]">Seconds</div>
					</div>
				</div>
			</div>
		);
	}
};

export default Timer;
