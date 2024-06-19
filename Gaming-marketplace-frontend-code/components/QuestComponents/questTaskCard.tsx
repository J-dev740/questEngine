/* eslint-disable react/require-default-props */
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
	taskLength?: number;
	img_url: string;
	tag?: string;
}

const QuestTaskCard: FC<Props> = ({
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
		<div style={{ perspective: 1000 }} className="flex w-fit flex-grow px-3 py-4 lg:scale-110 ">
			<Link href={tag=="event" ? `/events/${_id}` : `/quest/${_id}`} className="w-fit">
				<div
					//  style={{x,y,rotateX,rotateY,z:100}}
					// drag
					// dragElastic={0.18}
					// dragConstraints={{top:0,left:0,right:0,bottom:0}}
					// whileTap={{cursor:"grabbing"}}
					className="group   flex min-w-[250px] max-w-[500px]  flex-grow flex-col items-center justify-start gap-1 rounded-xl border  
			 border-[#212121]  bg-gradient-to-tr from-black  to-slate-950 px-2 py-1 ring-4  ring-teal-950 transition-all  duration-150 ease-in-out hover:-translate-y-3
              hover:translate-x-2 hover:shadow-2xl  hover:shadow-lime-300  hover:ring-2 hover:ring-purple-900"
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
                {/* community */}
					<div className=" flex w-full flex-row  items-start justify-self-start p-1 text-[10px] font-bold">
						<div className="flex items-center justify-center p-1">
							<div className="h-[10px] w-[10px] rounded-full bg-gradient-to-br from-red-500  to-amber-300">
								{" "}
							</div>
							{/* <div className="w-[10px] h-[10px] rounded-full bg-gradient-to-br from-red-500  to-amber-300">{" "}</div> */}
						</div>
						<div className="flex items-center justify-center font-bold  text-slate-100">
							SpinBlade
						</div>
					</div>
					{/* image and questName */}
					<div className=" flex w-full flex-grow flex-row items-center justify-start py-2">
						{/* image */}
						<div
							className=" h-[90px] w-[111px]  min-w-fit rounded-md    bg-cover bg-center  bg-no-repeat saturate-50 group-hover:saturate-200"
							style={{ backgroundImage: `url(${img_url})` }}
							onMouseMove={skewElement}
							onMouseLeave={resetSkew}
						/>
						{/* <div className="p-4 bg-white col-span-2 w-full ">image</div> */}

						{/* quest Name and xp */}
						<div className="ml-3 flex flex-col items-center justify-start  gap-1 space-x-2 p-1   ">
							{/* quest name */}
							<div className="w-full p-2 text-start text-[15px] font-extrabold leading-6 text-violet-500">
								{quest_title}
							</div>
							{/* xp */}
							<div className="flex w-full  flex-row justify-start px-2 text-[6px] font-medium  ">
								<span className="  rounded-lg  bg-gradient-to-tr   from-orange-900  via-red-500 to-black px-1 ">
									{gems}{" "}
									<span className="space-x-2 font-bold text-white ">GEMS</span>
								</span>
							</div>
						</div>
					</div>
					{/* questers and no.of tasks */}
					<div className=" flex w-full flex-row items-center justify-between py-1   ">
						{/* questers part */}
						<div className="flex flex-row items-center text-[10px] font-extrabold">
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
						{/* no of tasks part */}
						<div className=" p-2  text-[12px] font-extrabold text-slate-400">
							0/{taskLength} Tasks
						</div>
					</div>
				</div>
			</Link>
		</div>
	);
};

export default QuestTaskCard;
