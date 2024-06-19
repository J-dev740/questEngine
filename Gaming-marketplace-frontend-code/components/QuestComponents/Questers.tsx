import Image from "next/image";
import { getAvatarSrc } from "../../services/helper";
import { Button5 } from "../common/form/button";

const Questers = (props: any) => {
	const { players } = props;
	let currentLength = 0;
	function skewElement(event: any) {
		// const skewDiv = document.getElementById('skewDiv');
		const e = event;
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
		const rotateX = (midY - (mouseY - (rect?.top || 0))) / 90; // Adjust the value for the skew effect
		const rotateY = (midX - (mouseX - (rect?.left || 0))) / 90; // Adjust the value for the skew effect
		// console.log('rotateX',rotateX)
		// console.log('rotateY',rotateY)
		e.target.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.2)`;
	}
	function resetSkew(event: any) {
		const e = event;
		e.target.style.transform = `perspective(1000px) rotateX(${0}deg) rotateY(${0}deg) scale(1)`;
	}

	return (
		<div className="m-6 flex  flex-row gap-[20px] overflow-x-auto p-4">
			{players.map((player: any) => {
				currentLength++;
				return (
					<div className="w-auto  rounded-xl  bg-gradient-to-tr from-black via-amber-800 to-yellow-500  ring-2  ring-slate-200 ">
						<div
							key={player._id}
							className="all group relative flex w-[200px]  min-w-[200px] flex-col  items-center justify-center gap-[25px] rounded-[16px] border border-[#212121] bg-[#111111] p-3 ring-2 ring-slate-200 transition duration-100 hover:-translate-x-2 hover:-translate-y-2"
						>
							<div className="flex w-[75%] flex-col items-center justify-end">
								<div className="rounded-full bg-gradient-to-tr  from-black  via-amber-800 to-yellow-500  ring-2  ring-slate-200 ">
									<Image
										src={getAvatarSrc(player.walletAddress)}
										className="w-[100%] rounded-full object-fill ring-2 ring-slate-200 group-hover:z-10 group-hover:-translate-x-2 group-hover:-translate-y-2 "
										alt="quester img"
										width={0}
										height={0}
										sizes="100vw"
									/>
								</div>
								<span className="absolute mb-[-15px] flex h-[40px] w-[40px] items-center  justify-center rounded-[50%] bg-[#000000] text-[25px]">
									{currentLength}
								</span>
							</div>
							<div className="flex flex-col items-center justify-center gap-[5px]">
								<span className="mb-2 text-[16px] font-semibold leading-[21px]">
									{player.walletAddress && player?.walletAddress.slice(0, 4)}...
									{player.walletAddress && player?.walletAddress.slice(-4)}
								</span>
								<span className="gradient">
									<span>
										{/* <span className="flex w-[100px] justify-center rounded-[30px] border-[1px] bg-gradient-to-r from-[#296BBD] to-[#296BBD] px-[10px] py-[10px] text-[14px] font-[600px] leading-[21px]"> */}
										<button
											type="button"
											className="gradient-border w-full bg-clip-text px-6 py-2 text-center font-extrabold uppercase text-transparent"
										>
											{player.gems} XP
										</button>
									</span>
								</span>
								{/* </span> */}
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default Questers;
