import { RecommendedQuest } from "../../features/quest-engine/quest.types";
import RecommendedTaskCard from "./recommendedTaskCard";
import { InView } from "react-intersection-observer";
import { NextArrow, PrevArrow } from "./CustomArrow";
import Slider from "react-slick";

const AllRecommendedQuests = (props: RecommendedQuest) => {
	const { quests, fetchMore } = props;
	const settings = {
		dots: false,
		infinite: true,
		speed: 500,
		slidesToShow: 4,
		slidesToScroll: 3,
		arrows: true,
		nextArrow: <NextArrow />,
		prevArrow: <PrevArrow />,
	};

	return (
		<>
			{/* <p className="text-2xl text-white ring-2">{quests.length}</p> */}
			<Slider
				{...settings}
				className=" z-0 m-8 flex min-h-fit -translate-x-3 -translate-y-3 flex-row  justify-evenly space-x-0 rounded-[30px]  bg-black bg-gradient-to-tr from-black   via-black  to-slate-900 p-4  ring-8 ring-slate-900 lg:p-6"
			>
				{quests?.map((q: any, idx: number) =>
					idx === quests.length - 1 ? (
						<InView onChange={fetchMore} />
					) : (
						<RecommendedTaskCard
							img_url={q.imageurl}
							category="btc"
							_id={q._id}
							gems={q.gemsReward}
							quest_status={q.status}
							quest_title={q.questTitle}
							quest_description={q.questDescription}
							key={q._id}
							tag={q.tag}
						/>
					),
				)}
			</Slider>
			{/* <div className="flex flex-row  ring-2 scrollbar-hide  bg-gradient-to-tr from-black to-stone-900   rounded-3xl   gap-6 overflow-x-scroll  overflow-y-scroll p-6">
				{quests?.map((q: any, idx: number) =>
					idx === quests.length - 1 ? (
						// <InView onChange={fetchMore} />
						<></>
					) : (
						<RecommendedTaskCard
							img_url={q.imageurl}
							category="btc"
							_id={q._id}
							gems={q.gemsReward}
							quest_status={q.status}
							quest_title={q.questTitle}
							quest_description={q.questDescription}
							key={q._id}
							tag={q.tag}
						/>
					),
				)}
			</div> */}
		</>
	);

	// return (
	// 	<div className="flex flex-row  scrollbar-hide  bg-gradient-to-tr from-black to-stone-900   ring-0 rounded-3xl   gap-6 overflow-x-scroll  overflow-y-scroll p-6">
	// <Slider {...settings}
	// 		className="  p-9 flex flex-row justify-between ring-slate-900  ring-8 bg-slate-700 rounded-[30px]  -translate-y-4 -translate-x-6 z-0">
	// 			{quests?.map((q: any) => (
	// 				// <>
	// 				// {
	// 				// q.tag
	// 				// // false
	// 				// ?(
	// 				// 	<>
	// 				// 					{/* <div
	// 				// 						className="relative h-[600px] w-full rounded-[30px] flex items-center justify-center transition-all duration-150 hover:shadow-lime-200 hover:shadow-xl  hover:translate-x-2 hover:-translate-y-4 bg-cover bg-blend-darken bg-no-repeat bg-center scale-95  border-b-8 border-gray-600 "
	// 				// 						style={{ backgroundImage: `url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZ43wjxF-7Lo1HEUHykeXJYh9547kzraziga6YEBJ32CvLpAldWqKT8MJgphBpFZ05tOo&usqp=CAU)` }}>
	// 				// 						<div
	// 				// 							id="controller"
	// 				// 							onMouseMove={skewElement}
	// 				// 							onMouseLeave={resetSkew}
	// 				// 							className=" relative flex justify-center items-center  ">
	// 				// 							<div

	// 				// 								className="  h-[600px] w-full ">
	// 				// 								<Image
	// 				// 									// src={questDatafromAllQuests.imageurl??questBanner} // change this later on
	// 				// 									src={LoL} // change this later on

	// 				// 									unoptimized
	// 				// 									className=" saturate-100 h-[600px] w-full h-inherit rounded-[30px]  object-cover object-center   p-4"
	// 				// 									alt="Quest-Banner"
	// 				// 									// style={{}}
	// 				// 									width={120}
	// 				// 									height={20}
	// 				// 								/>

	// 				// 							</div>

	// 				// 						</div>
	// 				// 					</div> */}
	// 				// 					<div
	// 				// 						className="relative h-[600px] w-full rounded-[30px] flex items-center justify-center transition-all duration-150 hover:shadow-lime-200 hover:shadow-xl  hover:translate-x-2 hover:-translate-y-4 bg-cover bg-blend-darken bg-no-repeat bg-center scale-95  border-b-8 border-gray-600 "
	// 				// 						style={{ backgroundImage: `url(https://w0.peakpx.com/wallpaper/277/379/HD-wallpaper-cyberpunk-2077-yellow-background-cyberpunk-2077-logo-new-games-cyberpunk.jpg` }}>
	// 				// 						<div
	// 				// 							// id="controller"
	// 				// 							onMouseMove={skewElement}
	// 				// 							onMouseLeave={resetSkew}
	// 				// 							className=" relative flex justify-center items-center  ">
	// 				// 							<div

	// 				// 								className="  h-[600px] w-full ">
	// 				// 								<Image
	// 				// 									// src={questDatafromAllQuests.imageurl??questBanner} // change this later on
	// 				// 									src={cyberpunk} // change this later on

	// 				// 									unoptimized
	// 				// 									className=" saturate-100 h-[600px] w-full h-inherit rounded-[30px]  object-cover object-center   p-4"
	// 				// 									alt="Quest-Banner"
	// 				// 									// style={{}}
	// 				// 									width={120}
	// 				// 									height={20}
	// 				// 								/>

	// 				// 							</div>

	// 				// 						</div>
	// 				// 					</div>
	// 				// 	</>
	// 				// )
	// 				// 	:(

	// 				<RecommendedTaskCard
	// 					img_url={q.imageurl}
	// 					category="btc"
	// 					_id={q._id}
	// 					gems={q.gemsReward}
	// 					quest_status={q.status}
	// 					quest_title={q.questTitle}
	// 					quest_description={q.questDescription}
	// 					key={q._id}
	// 					tag={q.tag}
	// 				/>
	// 			))}
	// 		</Slider>
	// </div>
	// );
};

export default AllRecommendedQuests;
