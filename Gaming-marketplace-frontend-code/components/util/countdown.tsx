import { useEffect, useState } from "react";

interface CountdownProps {
	dateTime: string;
}

const Countdown = ({ dateTime }: CountdownProps) => {
	const [countdownTime, setCountdownTime] = useState({
		countdownDays: "",
		countdownHours: "",
		countdownMinutes: "",
		countdownSeconds: "",
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

	return (
		<div>
			{countdownEnded && (
				<div className="bg-white-500 mb-4 flex h-36 w-96 flex-col items-center justify-center rounded-xl border border-gray-100 bg-opacity-50 bg-clip-padding text-[35px] backdrop-blur-md backdrop-filter">
					Livestream Started
				</div>
			)}

			{!countdownEnded && (
				<div className="bg-white-500 mb-4 flex h-36 w-96 flex-col items-center justify-center rounded-xl border border-gray-100 bg-opacity-50 bg-clip-padding backdrop-blur-md backdrop-filter">
					<div className="mb-3 mr-14 mt-3 w-[75%]">Upcoming Live Session In:</div>
					<div className="mb-5 flex w-full justify-evenly text-[40px]">
						<div className="flex flex-col items-center">
							{countdownTime.countdownDays} <div className=" text-[18px]">Days</div>
						</div>
						<div className="flex flex-col items-center">
							{countdownTime.countdownHours} <div className=" text-[18px]">Hours</div>{" "}
						</div>
						<div className="flex flex-col items-center">
							{countdownTime.countdownMinutes}{" "}
							<div className=" text-[18px]">Minutes</div>
						</div>
						<div className="flex flex-col items-center">
							{countdownTime.countdownSeconds}{" "}
							<div className=" text-[18px]">Seconds</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default Countdown;
