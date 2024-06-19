import Image from "next/image";
import Link from "next/link";
import RoundButton from "../../components/QuestComponents/RoundButton";
import Particles from "react-particles";
import { useCallback } from "react";
import { loadFull } from "tsparticles";

interface Props {
	id: string;
	quest_title: string;
	quest_discription: string;
	startimeStamp: any;
	quest_status: string;
	quest_url: string;
}

const CarouselCard = ({
	id,
	quest_title,
	quest_discription,
	startimeStamp,
	quest_url,
	quest_status,
}: Props) => {
	const date = new Date(startimeStamp).toString();
	const options: any = {
		particles: {
			number: {
				value: 80,
				density: {
					enable: true,
					area: 1000,
				},
			},
			color: {
				// value: ["#2EB67D", "#ECB22E", "#E01E5B", "#36C5F0"]
				value: ["#FFFFFF"],
			},
			shape: {
				type: "bubble",
			},
			opacity: {
				value: 1,
			},
			size: {
				value: { min: 1, max: 3 },
			},
			links: {
				enable: true,
				distance: 150,
				color: "#808080",
				opacity: 0.4,
				width: 1,
			},
			move: {
				enable: true,
				speed: 5,
				direction: "none",
				random: false,
				straight: false,
				outModes: "out",
			},
		},
		interactivity: {
			events: {
				onHover: {
					enable: true,
					mode: "grab",
				},
				onClick: {
					enable: true,
					mode: "push",
				},
			},
			modes: {
				grab: {
					distance: 140,
					links: {
						opacity: 1,
					},
				},
				push: {
					quantity: 4,
				},
			},
		},
	};
	const particlesInit = useCallback(async (engine: any) => {
		await loadFull(engine);
	}, []);

	return (
		<Link href={`/quest/${id}`}>
			<div className="m-2 w-auto">
				<div className=" flex  h-[30vh] w-auto content-between rounded-[36px] bg-[#111111] p-2 lg:h-[50vh] ">
					<div className=" grid w-full content-around p-5 py-8">
						<h4 className="text-textxl font-extrabold text-[#EFEFEF]  lg:text-[50px]   ">
							{quest_title}
						</h4>
						<p className="ml-10 text-[#EFEFEF] opacity-[0.6] lg:text-header1">
							{quest_discription}
						</p>
						<div>
							<RoundButton text={date} />
						</div>
						<Particles
							className="flex h-1 w-1"
							options={options}
							init={particlesInit}
						/>

						<button
							type="button"
							className="mt-2 flex  h-8 w-4/12 items-center justify-center rounded-[12px] bg-gradient-to-r from-[#296BBD]  to-[#AC85FF] p-10 text-center    text-[30px] text-white lg:h-10 lg:w-full lg:text-[18px]"
						>
							Claim Now
						</button>
					</div>
					<Image
						src={quest_url}
						className=" h-auto w-[100%] rounded-[30px] bg-[##212121] object-cover object-center  p-4 ring-4 ring-white"
						alt="Picture of the author"
						width={120}
						height={20}
					/>
				</div>
			</div>
		</Link>
	);
};

export default CarouselCard;
