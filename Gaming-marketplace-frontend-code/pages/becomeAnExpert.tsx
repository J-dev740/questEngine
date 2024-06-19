import { useRouter } from "next/router";
import { useState } from "react";
import { useSelector } from "react-redux";
import NewExpertForm from "../components/forms/newExpert/expert.form";
import { walletAddressSelector } from "../features/auth/auth.selectors";
import { useGetSelfQuery } from "../features/profile-page/expert/expert.api";

const BecomeAnExpert = () => {
	const [expertModel, setExpertModel] = useState(false);

	const walletAddress = useSelector(walletAddressSelector);
	const { data: self } = useGetSelfQuery(walletAddress);
	const router = useRouter();

	const handleResult = () => {
		setExpertModel(false);
		router.replace(`/expert/${self?._id}`);
	};

	if (!self) return null;

	if (self.role.includes("expert")) router.push("/404");

	return (
		<>
			<div className="flex h-full w-full flex-col items-center justify-center gap-[32px]">
				<div className="text-center font-Anek text-[96px] font-bold leading-[105px] tracking-[2px] text-[#FFFFFF] ">
					Make $$$ teaching the
					<br />
					games you love.
				</div>
				<div className="font-400 text-center font-poppins text-[24px] leading-[36px] text-[#8ce2ff7b]">
					With Pro Gaming Marketplace, you can make meaningful income
					<br />
					teaching your favorite games.
				</div>
				<div
					onClick={() => {
						setExpertModel(true);
					}}
					className="font-600 mt-[16px] w-fit cursor-pointer rounded-[16px] bg-gradient-to-r from-[#2A84C0] to-[#294A8D] px-[24px] py-[13px] text-[20px] leading-[30px]"
				>
					Apply to Become an Expert
				</div>
			</div>
			{expertModel && (
				<NewExpertForm onClose={() => setExpertModel(false)} onResult={handleResult} />
			)}
		</>
	);
};

export default BecomeAnExpert;
