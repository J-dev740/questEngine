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
	img_url: string;
	tag?: string;
}

const RecommendedTaskCard: FC<Props> = ({
	_id,
	category,
	quest_title,
	quest_description,
	quest_status,
	gems,
	img_url,
	tag = " ",
}) => {
	// const soundEffect=new Audio("C:/Users/user/Desktop/quest/Gaming-marketplace-frontend-code/assets/click")
	// const soundEffect=new Audio("C:\\Users\\user\\Desktop\\quest\\Gaming-marketplace-frontend-code\\assets\\click.mp3")
	RecommendedTaskCard.defaultProps = {
		tag: " ",
	};
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
	// console.log('questImage',img_url)
	return (
		<div style={{ perspective: 2000 }} className="p-4 lg:scale-110 lg:p-6 ">
			<Link href={tag=="event" ? `/events/${_id}` : `/quest/${_id}`} className="w-fit">
				<div
					//  style={{x,y,rotateX,rotateY,z:100}}
					// drag
					// dragElastic={0.18}
					// dragConstraints={{top:0,left:0,right:0,bottom:0}}
					// whileTap={{cursor:"grabbing"}}
					className="group flex  w-60 cursor-grab flex-col  rounded-xl border border-[#212121] 
			bg-[#111111] p-2 ring-4 ring-teal-950 transition-all  duration-150 ease-in-out hover:-translate-y-3 hover:translate-x-2
			 hover:shadow-2xl hover:shadow-lime-300 hover:ring-2 hover:ring-purple-900 lg:w-72"
				>
					{/* <Image
					src={img_url}
					className="h-40 w-[100%] rounded-[30px] object-fill p-4 lg:h-48"
					alt="quest img"
					width={120}
					height={20}
				/> */}
					<div
						//  style={{x,y,rotateX,rotateY,z:10000, backgroundImage: `url(${img_url})` }}
						//  drag
						//  dragElastic={0.18}
						//  dragConstraints={{top:0,left:0,right:0,bottom:0,}}
						//  whileTap={{cursor:"grabbing"}}
						className="h-40 w-[100%] rounded-[30px] bg-cover bg-center bg-no-repeat  object-fill p-4  saturate-50 group-hover:saturate-200 lg:h-48"
						style={{ backgroundImage: `url(${img_url})` }}
						onMouseMove={skewElement}
						onMouseLeave={resetSkew}
					/>

					<div className="flex h-[150px] w-full flex-col gap-5 p-4">
						<div className="flex flex-grow flex-col gap-1 px-1">
							<div className="flex items-center justify-between">
								<div className="text-[18px] font-semibold text-[#EFEFEF]">
									{quest_title}
								</div>
								{quest_status === "FINISHED" ? (
									<h4 className="rounded-2xl bg-slate-700 px-5 py-[6px]  text-[12px] text-[#EFEFEF]">
										{quest_status}
									</h4>
								) : null}
							</div>
							<p className="text-[14px] leading-4 text-[#EFEFEF] opacity-[0.6] ">
								{
									quest_description
									// (quest_description.slice(0,quest_description.length/2)+'....')
								}
							</p>
						</div>
						<div className="flex">
							<button
								type="button"
								className="rounded-[50px] bg-gradient-to-r   from-[#296BBD] to-[#AC85FF] px-5 py-2 text-[14px]"
							>
								Claim Now
							</button>
						</div>
					</div>
				</div>
			</Link>
		</div>
	);
};

export default RecommendedTaskCard;
