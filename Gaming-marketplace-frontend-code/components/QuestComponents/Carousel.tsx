import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import Image from "next/image";
import CarouselCard from "./CarouselCard";
import LoL from "../../public/LoL.png";
import cyberpunk from "../../public/cyberpunk.png";
import { GrLinkNext } from "react-icons/gr";
import { BsArrowRightSquare, BsArrowLeftSquare } from "react-icons/bs";
import { NextArrow, PrevArrow } from "./CustomArrow";

const ArrowStyle = (props: any) => {
	return (
		<div className="flex h-10 w-10  rounded-xl bg-blue-400 ring-2 ring-black">
			<GrLinkNext />
		</div>
	);
};

const NxtArrow = (props: any) => {
	const { className, style, onClick } = props;
	return (
		<div
			className={className}
			style={{
				...style,
				backgroundColor: "rgba(0, 0, 0, 0.5)",
				borderRadius: "50%",
				width: "40px",
				height: "40px",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				position: "absolute",
				right: "10px",
				top: "50%",
				transform: "translateY(-50%)",
				cursor: "pointer",
			}}
			onClick={onClick}
		>
			<i className="fa fa-arrow-right" style={{ color: "white", fontSize: "20px" }} />
		</div>
	);
};

const SimpleSlider = (props: any) => {
	const { quests } = props;
	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: true,
		nextArrow: <NextArrow />,
		prevArrow: <PrevArrow />,
	};
	// function skewElement(e: any) {
	// 	// const skewDiv = document.getElementById('skewDiv');
	// 	const rect = e.target.getBoundingClientRect();
	// 	const mouseX = e.clientX;
	// 	const mouseY = e.clientY;
	// 	//   console.log({X:mouseX,Y:mouseY})
	// 	const midX = e.target.offsetWidth / 2;
	// 	const midY = e.target.offsetHeight / 2;
	// 	// console.log({left:rect?.left,top:rect?.top})
	// 	// const centerX=(rect?.left||0)+midX;
	// 	// const centerY=(rect?.top||0)+midY;
	// 	// console.log('centerX',centerX)
	// 	// console.log('centerY',centerY)

	// 	// const rotateX = (centerY - mouseY) /100; // Adjust the value for the skew effect
	// 	// const rotateY = (centerX - mouseX) /100; // Adjust the value for the skew effect
	// 	const rotateX = (midY - (mouseY - (rect?.top || 0))) / 50; // Adjust the value for the skew effect
	// 	const rotateY = (midX - (mouseX - (rect?.left || 0))) / 50; // Adjust the value for the skew effect
	// 	// console.log('rotateX',rotateX)
	// 	// console.log('rotateY',rotateY)
	// 	e.target.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.2)`;
	// }
	// function resetSkew(e: any) {
	// 	e.target.style.transform = `perspective(1px) rotateX(${0}deg) rotateY(${0}deg) scale(1)`;
	// }
	return (
		<div
			// className=" w-[70vw] lg:h-[50vh] ring-4 p-8 bg-black"
			className=" max-w-[70vw] rounded-[50px]  bg-slate-800  p-6 lg:min-h-[50vh] "
		>
			<Slider
				{...settings}
				className="  z-0 flex -translate-x-3 -translate-y-3 flex-row  justify-between rounded-[30px] bg-slate-700  p-9 ring-8 ring-slate-900"
			>
				{quests?.map((q: any) => (
					// <>
					// {
					// q.tag
					// // false
					// ?(
					// 	<>
					// 					{/* <div
					// 						className="relative h-[600px] w-full rounded-[30px] flex items-center justify-center transition-all duration-150 hover:shadow-lime-200 hover:shadow-xl  hover:translate-x-2 hover:-translate-y-4 bg-cover bg-blend-darken bg-no-repeat bg-center scale-95  border-b-8 border-gray-600 "
					// 						style={{ backgroundImage: `url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZ43wjxF-7Lo1HEUHykeXJYh9547kzraziga6YEBJ32CvLpAldWqKT8MJgphBpFZ05tOo&usqp=CAU)` }}>
					// 						<div
					// 							id="controller"
					// 							onMouseMove={skewElement}
					// 							onMouseLeave={resetSkew}
					// 							className=" relative flex justify-center items-center  ">
					// 							<div

					// 								className="  h-[600px] w-full ">
					// 								<Image
					// 									// src={questDatafromAllQuests.imageurl??questBanner} // change this later on
					// 									src={LoL} // change this later on

					// 									unoptimized
					// 									className=" saturate-100 h-[600px] w-full h-inherit rounded-[30px]  object-cover object-center   p-4"
					// 									alt="Quest-Banner"
					// 									// style={{}}
					// 									width={120}
					// 									height={20}
					// 								/>

					// 							</div>

					// 						</div>
					// 					</div> */}
					// 					<div
					// 						className="relative h-[600px] w-full rounded-[30px] flex items-center justify-center transition-all duration-150 hover:shadow-lime-200 hover:shadow-xl  hover:translate-x-2 hover:-translate-y-4 bg-cover bg-blend-darken bg-no-repeat bg-center scale-95  border-b-8 border-gray-600 "
					// 						style={{ backgroundImage: `url(https://w0.peakpx.com/wallpaper/277/379/HD-wallpaper-cyberpunk-2077-yellow-background-cyberpunk-2077-logo-new-games-cyberpunk.jpg` }}>
					// 						<div
					// 							// id="controller"
					// 							onMouseMove={skewElement}
					// 							onMouseLeave={resetSkew}
					// 							className=" relative flex justify-center items-center  ">
					// 							<div

					// 								className="  h-[600px] w-full ">
					// 								<Image
					// 									// src={questDatafromAllQuests.imageurl??questBanner} // change this later on
					// 									src={cyberpunk} // change this later on

					// 									unoptimized
					// 									className=" saturate-100 h-[600px] w-full h-inherit rounded-[30px]  object-cover object-center   p-4"
					// 									alt="Quest-Banner"
					// 									// style={{}}
					// 									width={120}
					// 									height={20}
					// 								/>

					// 							</div>

					// 						</div>
					// 					</div>
					// 	</>
					// )
					// 	:(

					<CarouselCard
						id={q._id}
						startimeStamp={q.startTimestamp}
						quest_status={q.status}
						quest_title={q.questTitle}
						quest_discription={q.questDescription}
						quest_url={q.imageurl}
					/>
					// 	)
					// }
					// </>
				))}
			</Slider>
		</div>
	);
};

export default SimpleSlider;
