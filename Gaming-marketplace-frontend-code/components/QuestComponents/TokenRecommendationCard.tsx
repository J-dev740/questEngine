import Image from "next/image";
import avatar from "../../public/cyberConnect/assets/img3.png";

const TokenRecommendationCard = () => {
	return (
		<div
			className="
       flex h-[110px] w-[123px] flex-col items-center justify-center rounded-[12px] border-2 border-[#5B5B5B] bg-[#13141D] "
		>
			<div className=" avatar relative top-[-25px] flex h-12 w-12 items-center justify-center rounded-full bg-black">
				<Image className=" h-6 w-6 rounded-full" src={avatar} alt="" />
			</div>
			<div className="relative -top-5  text-center uppercase ">
				<h1 className="text-[20px] "> btc</h1>
				<p className=" text-[16px] text-[#FE3796]"> 33.184,80 USD</p>
			</div>
		</div>
	);
};

export default TokenRecommendationCard;
