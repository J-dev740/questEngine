import React from "react";
import { BsArrowRightSquare, BsArrowLeftSquare } from "react-icons/bs";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";

const NextArrow = ({ onClick }: any) => (
	<div
		className="absolute -right-4 top-1/2 z-10 -translate-y-1/2 transform cursor-pointer rounded-xl bg-gray-800 p-5 text-white"
		onClick={onClick}
	>
		{/* <i className="fa fa-chevron-left"></i>
		 */}
		<div className=" h-auto w-auto -translate-y-2 translate-x-3 scale-150  transform  rounded-xl  bg-slate-600 p-6 ring-4   ring-slate-800 backdrop-blur-lg transition-all duration-150 hover:translate-x-0 hover:translate-y-0">
			<GrLinkNext className="scale-150"> </GrLinkNext>
		</div>
	</div>
);

const PrevArrow = ({ onClick }: any) => (
	<div
		className="absolute -left-4 top-1/2 z-10 -translate-y-1/2 transform cursor-pointer rounded-xl bg-gray-800 p-5 text-white"
		onClick={onClick}
	>
		{/* <i className="fa fa-chevron-left"></i>
		 */}
		<div className=" h-auto w-auto -translate-x-3 -translate-y-2 scale-150  transform  rounded-xl  bg-slate-600 p-6 ring-4   ring-slate-800 backdrop-blur-lg transition-all duration-150 hover:translate-x-0 hover:translate-y-0">
			<GrLinkPrevious className="scale-150"> </GrLinkPrevious>
		</div>
	</div>
);

export { NextArrow, PrevArrow };
