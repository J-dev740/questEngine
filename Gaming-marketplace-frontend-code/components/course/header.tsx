/* eslint-disable react/require-default-props */
import { TbSettings } from "react-icons/tb";
import { useSelector } from "react-redux";
import { walletAddressSelector } from "../../features/auth/auth.selectors";
import { useGetCurrencyQuery } from "../../features/misc/misc.api";
import { ExpertInfo } from "../../features/types";

interface HeaderProps {
	icon?: string;
	name: string;
	owner: ExpertInfo | undefined;
	primaryPrice: number;
	primaryCurrency: string;
	handlePayOptions: () => void;
}

const Header = ({
	icon,
	name,
	owner,
	primaryPrice,
	primaryCurrency,
	handlePayOptions,
}: HeaderProps) => {
	const { data } = useGetCurrencyQuery();

	const walletAddress = useSelector(walletAddressSelector);
	const isOwner = owner?.walletAddress === walletAddress;

	if (!data) return null;

	return (
		<div className=" flex h-[600px] w-full   min-w-fit justify-start bg-[url('/courseHeader.png')] bg-cover px-20 pt-32">
			<div className=" flex flex-col gap-[60px]">
				<div className="font-600 font-poppins text-[20px] leading-[28px] text-[#FFFFFF]">
					Courses {">"} {name}
				</div>

				<div className="flex flex-col gap-12">
					<div className="flex flex-col gap-5">
						<div className="font-anek text-[40px] font-bold leading-[44px] text-[#ffffff]">
							{name}
						</div>

						<div className="font-600  font-poppins text-[20px] leading-[30px] text-[#FFFFFF]">
							By {owner?.username}
						</div>
					</div>
					<div className="flex items-center space-x-2">
						<div className="font-600  w-fit rounded-[50px] bg-gradient-to-r from-[#2A84C0] to-[#294A8D] px-[16px] py-[4px] font-poppins text-[18px] leading-[28px] text-[#ffffff]">
							Price: {primaryPrice}{" "}
							{data.filter((item) => item._id === primaryCurrency)[0].name}{" "}
						</div>
						{isOwner && (
							<TbSettings
								className="text-textxl hover:cursor-pointer hover:opacity-70"
								onClick={handlePayOptions}
							/>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};
export default Header;
