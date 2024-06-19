/* eslint-disable react/require-default-props */
import { useQuery } from "@apollo/client";
import { ethers } from "ethers";
import Image from "next/image";
import { useEffect, useState } from "react";
import { BsFire, BsThreeDotsVertical } from "react-icons/bs";
import { IPrimaryProfileCard } from "../../../features/cyber-connect/cyber.types";
import { GET_PROFILE_BY_HANDLE } from "../../../features/cyber-connect/graphql/GetProfileByHandle";
import PostDropdown from "../utils/post.dropdown";
import { Player } from "@livepeer/react";

interface NFTCardProps {
	primaryProfile: IPrimaryProfileCard | null;
	address: string;
	img: string;
	type: string;
	name: string;
	handle: string;
	userImage: string;
	isCollected: boolean;
	collectedCount: number;
	collectMw: {
		contractAddress: string;
		data: string;
		type: "COLLECT_LIMITED_TIME_PAID" | "COLLECT_PAID" | "COLLECT_FREE";
	};
	isSelf: boolean;
	innerRef?: any;
	className?: string;
}
interface Countdown {
	countdownDays: string;
	countdownHours: string;
	countdownMinutes: string;
	countdownSeconds: string;
}

interface LtdProps {
	countdownTime: Countdown;
	countdownEnded: boolean;
	remaining: number;
}

const CollectLimited = ({ countdownEnded, countdownTime, remaining }: LtdProps) => {
	const { countdownDays, countdownHours, countdownMinutes, countdownSeconds } = countdownTime;
	return (
		<span className=" w-full font-poppins text-textMedium2 text-[#FEBF1E]">
			{!countdownEnded && (
				<div className="flex w-full items-center space-x-2 px-2">
					<span className="flex flex-grow items-center">
						<BsFire className="text-textMedium3" />
						{`${countdownDays}d ${countdownHours}h ${countdownMinutes}m ${countdownSeconds}s`}
					</span>
					<span className=" text-gray-400">{remaining} Left</span>
				</div>
			)}
			{countdownEnded && <span>Countdown ended!</span>}
		</span>
	);
};

interface PaidProps {
	remaining: number;
}

const CollectPaid = ({ remaining }: PaidProps) => {
	return (
		<div className=" w-full font-poppins text-textMedium2 text-[#FEBF1E]">
			<div className="w-full text-center text-gray-400">{remaining} Left</div>
		</div>
	);
};

const NFTCard = ({
	img,
	name,
	type,
	handle,
	userImage,
	collectMw,
	isCollected,
	collectedCount,
	address,
	primaryProfile,
	innerRef,
	isSelf,
	className,
}: NFTCardProps) => {
	const [isPlaying, setIsPlaying] = useState<boolean>(false);
	const [price, setPrice] = useState<number>(0);
	const [remaining, setRemaining] = useState<number>(0);
	const [countdownEnded, setCountdownEnded] = useState(false);
	const [countdownTime, setCountdownTime] = useState({
		countdownDays: "00",
		countdownHours: "00",
		countdownMinutes: "00",
		countdownSeconds: "00",
	});

	const { data, loading, error } = useQuery(GET_PROFILE_BY_HANDLE, {
		variables: { me: address, handle },
	});

	const [_open, _setOpen] = useState<boolean>(false);

	useEffect(() => {
		if (collectMw.type !== "COLLECT_LIMITED_TIME_PAID") return;
		function myTimer() {
			const countdownDateTime = JSON.parse(collectMw.data).EndTimestamp;
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

	useEffect(() => {
		if (collectMw.type === "COLLECT_FREE") return;
		const data = JSON.parse(collectMw.data);
		switch (collectMw.type) {
			case "COLLECT_LIMITED_TIME_PAID":
				setRemaining(data.TotalSupply - collectedCount);
				setPrice(Number(ethers.utils.formatEther(data.Price)));
				break;
			case "COLLECT_PAID":
				setRemaining(data.TotalSupply - collectedCount);
				setPrice(Number(ethers.utils.formatEther(data.Amount)));
				break;
		}
	}, [collectMw]);

	if (countdownEnded) return null;

	if (loading) return <div>Loading nfts...</div>;
	if (error) return <div>Error loading nfts...</div>;
	if (!data) return <div>Something went wrong</div>;

	const profile: IPrimaryProfileCard = data.profileByHandle;

	return (
		<div
			ref={innerRef}
			className={`flex min-h-[350px] w-[450px] min-w-[450px] flex-col items-center space-y-6 rounded-3xl border border-[#212121] bg-[#111111] p-6 duration-150 hover:scale-105 hover:bg-[#212121] ${className}`}
		>
			<div className="relative">
				{type === "video" ? (
					<div
						className="z-0 aspect-[16/10] w-fit rounded-2xl"
						onMouseEnter={() => setIsPlaying(true)}
						onMouseLeave={() => setIsPlaying(false)}
					>
						<Player
							title="test vid"
							src={img}
							autoPlay={isPlaying}
							muted
							showTitle={false}
							controls={{
								autohide: 100,
							}}
							autoUrlUpload={{ fallback: true, ipfsGateway: "https://w3s.link" }}
						/>
					</div>
				) : (
					<Image
						src={img}
						width={0}
						height={0}
						sizes="100vw"
						alt="img*"
						className="aspect-[16/10] w-[400px] rounded-2xl"
					/>
				)}

				{collectMw.type !== "COLLECT_FREE" && (
					<span className="absolute bottom-2 left-2 z-10 z-10 flex items-center rounded-xl bg-[#080808] p-2">
						{price} LINK
					</span>
				)}
			</div>
			<div className="flex w-full flex-grow flex-col justify-around space-y-6">
				<div className="flex">
					<div className="flex flex-grow space-x-3">
						<Image
							src={userImage}
							width={0}
							height={0}
							sizes="100vw"
							alt="img*"
							className="aspect-square w-[50px] self-start rounded-full"
						/>
						<div className="flex w-[calc(100%-50px)]">
							<div className="flex w-[90%] flex-col items-start justify-start font-poppins">
								<span className="w-[90%] truncate text-textMedium2 font-[600]">
									{name}
								</span>
								<span className="w-[90%] truncate text-textMedium font-[500] text-gray-400">
									@{handle}
								</span>
							</div>
						</div>
					</div>
					{primaryProfile && !isSelf && (
						<div
							className="self-start rounded-lg p-0.5 text-textMedium3 duration-500 hover:bg-slate-500"
							onClick={() => _setOpen((state) => !state)}
						>
							<BsThreeDotsVertical className="cursor-pointer rounded-full text-white" />
						</div>
					)}
					{_open && (
						<div className="relative pt-1.5">
							<PostDropdown
								profile={profile}
								isFollowed={profile.isFollowedByMe}
								isSubscribed={profile.isSubscribedByMe}
							/>
						</div>
					)}
				</div>
				{collectMw.type !== "COLLECT_FREE" && (
					<div className="my-4 flex w-full flex-row items-center justify-between rounded-lg bg-[#080808] p-3 font-poppins text-textMedium2 text-gray-400">
						{collectMw.type === "COLLECT_LIMITED_TIME_PAID" && (
							<CollectLimited
								countdownTime={countdownTime}
								countdownEnded={countdownEnded}
								remaining={remaining}
							/>
						)}
						{collectMw.type === "COLLECT_PAID" && <CollectPaid remaining={remaining} />}
					</div>
				)}
				{!isSelf && (
					<button
						type="button"
						className="flex h-12 w-full items-center justify-center self-end rounded-lg  bg-gradient-to-r from-[#296BBD] to-[#AC85FF]"
					>
						<span className="font-poppins text-textMedium3 font-[700] text-white">
							{isCollected ? "Already collected" : "Collect"}
						</span>
					</button>
				)}
			</div>
		</div>
	);
};

export default NFTCard;
