import Image from "next/image";
import { FC } from "react";
import Link from "next/link";
// import { useMotionValue, useTransform, motion } from "framer-motion";

interface Props {
	_id: string;
	category: string;
	quest_title: string;
	quest_description: string;
	quest_status: string;
	gems: number;
	// eslint-disable-next-line react/require-default-props
	taskLength?: number;
	img_url: string;
	// eslint-disable-next-line react/require-default-props
	tag?: string;
}

const QuestCard: FC<Props> = ({
	_id,
	category,
	quest_title,
	quest_description,
	quest_status,
	gems,
	img_url,
	tag = " ",
	taskLength = 0,
}) => {
	// const soundEffect=new Audio("C:/Users/user/Desktop/quest/Gaming-marketplace-frontend-code/assets/click")
	// const soundEffect=new Audio("C:\\Users\\user\\Desktop\\quest\\Gaming-marketplace-frontend-code\\assets\\click.mp3")

	// const x = useMotionValue(0);
	// const y = useMotionValue(0);
	// const rotateX = useTransform(y, [-100, 100], [30, -30]);
	// const rotateY = useTransform(x, [-100, 100], [-30, 30]);
	function skewElement(event: any) {
		const e = event;
		// const skewDiv = document.getElementById('skewDiv');
		const rect = e.target.getBoundingClientRect();
		const mouseX = e.clientX;
		const mouseY = e.clientY;
		//   console.log({X:mouseX,Y:mouseY})
		const midX = e.target.offsetWidth / 2;
		const midY = e.target.offsetHeight / 2;
		// console.log({left:rect?.left,top:rect?.top})
		// const centerX=(rect?.left||0)+midX;
		// const centerY=(rect?.top||0)+midY;
		// console.log('centerX',centerX)
		// console.log('centerY',centerY)

		// const rotateX = (centerY - mouseY) /100; // Adjust the value for the skew effect
		// const rotateY = (centerX - mouseX) /100; // Adjust the value for the skew effect
		const rotateX = (midY - (mouseY - (rect?.top || 0))) / 10; // Adjust the value for the skew effect
		const rotateY = (midX - (mouseX - (rect?.left || 0))) / 10; // Adjust the value for the skew effect
		// console.log('rotateX',rotateX)
		// console.log('rotateY',rotateY)
		e.target.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.2)`;
	}
	function resetSkew(event: any) {
		const e = event;
		e.target.style.transform = `perspective(1000px) rotateX(${0}deg) rotateY(${0}deg) scale(1)`;
	}

	return (
		// <div style={{perspective:1000}}
		// className="flex w-fit flex-grow py-4 px-3 lg:scale-110 ">
		<Link href={tag=="event" ? `/events/${_id}` : `/quest/${_id}`} className="w-fit">
			<div
				//  style={{x,y,rotateX,rotateY,z:100}}
				// drag
				// dragElastic={0.18}
				// dragConstraints={{top:0,left:0,right:0,bottom:0}}
				// whileTap={{cursor:"grabbing"}}
				className="group   flex  min-w-[350px] max-w-[700px]  grow flex-col items-center justify-start gap-1 rounded-xl border  
			 border-[#212121]  bg-slate-950 bg-opacity-10 px-2 py-1 ring-8 ring-black backdrop-blur-xl  transition-all  duration-150 ease-in-out hover:-translate-y-3
              hover:translate-x-2 hover:shadow-2xl hover:shadow-lime-300  hover:ring-2 hover:ring-purple-900"
			>
				{/* <Image
					src={img_url}
					className="h-40 w-[100%] rounded-[30px] object-fill p-4 lg:h-48"
					alt="quest img"
					width={120}
					height={20}
				/> */}
				{/* <div 
							//  style={{x,y,rotateX,rotateY,z:10000, backgroundImage: `url(${img_url})` }}
							//  drag
							//  dragElastic={0.18}
							//  dragConstraints={{top:0,left:0,right:0,bottom:0,}}
							//  whileTap={{cursor:"grabbing"}}
				className="h-40 w-[100%] rounded-[30px] object-fill p-4 lg:h-48  bg-center bg-no-repeat  bg-cover saturate-50 group-hover:saturate-200"
				style={{ backgroundImage: `url(${img_url})` }}
				onMouseMove={skewElement}
				onMouseLeave={resetSkew}

		
				>
					
				</div>
                {/* quest banner  */}
				<div className="w-full grow ">
					<div
						className=" relative h-[200px] w-full  min-w-fit rounded-lg    bg-cover bg-center  bg-no-repeat saturate-50 group-hover:saturate-200"
						style={{ backgroundImage: `url(${img_url})` }}
						// onMouseMove={skewElement}
						// onMouseLeave={resetSkew}
					>
						{/* rounded organisation div */}
						<div
							className="absolute -bottom-8  right-2 h-[50px] w-[50px] rounded-full bg-gradient-to-r from-black via-violet-700 to-violet-900 bg-cover bg-center
                         bg-no-repeat ring-4 ring-black saturate-100"
							style={{ backgroundImage: `url(${img_url})` }}
						/>
					</div>
				</div>
				{/* quest title */}
				<div className="flex w-full flex-col items-center justify-start">
					<div className="w-full  p-2 text-start font-Nosifer text-[15px] font-light leading-6 text-white">
						{quest_title}
					</div>
					{/* quest description */}
					<div className="flex  w-full flex-row justify-between p-2 text-start font-gruppo text-[20px] font-bold leading-6 text-white">
						{quest_description.length > 20
							? quest_description.slice(0, quest_description.length / 2) + "...."
							: quest_description}
						{/* noof questers */}
						<div className="flex scale-110 flex-row items-center text-[10px] font-extrabold">
							<div className="flex flex-row items-center pr-2">
								<div
									className="flex h-[12px] w-[12px] items-center justify-center rounded-full  ring-2 ring-white"
									style={{ backgroundImage: `url(${img_url})` }}
								/>
								<div
									className="-ml-1 flex h-[12px] w-[12px] items-center justify-center rounded-full ring-2  ring-white"
									style={{ backgroundImage: `url(${img_url})` }}
								/>
							</div>
							<span>9.6K+</span>
						</div>
					</div>
				</div>
				{/* reward  and tasks */}
				<div className="flex w-full flex-row items-center justify-between">
					{/* reward section */}
					<div className="flex w-full  flex-row justify-start gap-4 px-2 text-[10px] font-medium  ">
						<div className=" rounded-md bg-lime-600 ring-2  ring-black">
							<div className=" -translate-x-1  -translate-y-1  rounded-md bg-gradient-to-tr from-lime-500 via-lime-200 to-lime-400 p-2  text-black  ring-2 ring-black  ">
								{gems}{" "}
								<span className="space-x-2 font-extrabold italic  text-black ">
									GEMS
								</span>
							</div>
						</div>
						<div className="rounded-md bg-lime-600 ring-2 ring-black">
							<div className=" -translate-x-1  -translate-y-1  rounded-md bg-gradient-to-tr from-lime-500 via-lime-200 to-lime-400 p-2 px-1  text-black ring-2 ring-black ">
								{gems + (Math.random() * 10).toFixed(0)}{" "}
								<span className="space-x-2 font-extrabold italic  text-black">
									USDT
								</span>
							</div>
						</div>
					</div>
					{/* no.of tasks */}
					<div className=" w-1/4 p-2 text-[12px] font-extrabold text-slate-400">
						0/{taskLength} Tasks
					</div>
				</div>
			</div>
		</Link>
	);
};

export default QuestCard;
