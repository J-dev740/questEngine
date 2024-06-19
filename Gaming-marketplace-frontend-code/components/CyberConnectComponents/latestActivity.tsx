import Image from "next/image";

const activityData = [
	{
		img: "/cyberConnect/assets/img2.png",
		name: "Tiara, sehent and 16 others started following you",
		time: "5 minutes ago",
	},
	{
		img: "/cyberConnect/assets/img1.png",
		name: "aliqua dolor do amet sint. Velit officia consequat",
		time: "12PM",
	},
	{
		img: "/cyberConnect/assets/img3.png",
		name: "Tiara, sehent and 16 others started following you",
		time: "12PM",
	},
];

const LatestActivity = () => {
	return (
		<div className="py-9">
			<span className="mb-6 flex flex-row justify-between font-poppins text-textMedium2 font-semibold">
				Latest Activity
				<span className="bg-gradient-to-r from-[#296BBD] to-[#AC85FF] bg-clip-text text-textMedium font-semibold text-transparent">
					{"View All >"}
				</span>
			</span>
			<div className="mt-5">
				<span className="flex flex-row justify-between font-poppins text-textSmall text-gray-400">
					Today
				</span>
				{activityData.map((data) => (
					<div className="flex w-full flex-row items-center justify-between rounded-xl px-5 py-4">
						<div className="flex flex-row">
							<Image
								src={data.img}
								alt="user"
								height="0"
								width="50"
								className="rounded-full"
							/>
							<div className="ml-4">
								<span className="flex flex-row justify-between font-poppins text-textSmall">
									{data.name}
								</span>
								<span className="flex flex-row justify-between font-poppins text-textXs text-gray-400">
									{data.time}
								</span>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default LatestActivity;
