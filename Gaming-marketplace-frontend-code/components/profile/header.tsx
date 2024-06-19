/* eslint-disable react/require-default-props */
import Image from "next/image";
import avatar from "../../assets/avatar.png";

interface HeaderProps {
	icon?: string;
	name?: string;
	bio?: string;
}

const Header = ({ icon, name, bio }: HeaderProps) => {
	return (
		<div className="flex h-[600px] w-full min-w-fit bg-[url('/expertHeader.png')] bg-cover px-20 pt-32 ">
			<div className="flex flex-col space-y-10">
				<div className="font-600 font-poppins text-textMedium3 leading-7 text-white">
					Experts Training Plans {">"} Expert/Trainer
				</div>
				<div className="flex flex-row items-center space-x-4">
					<Image
						src={icon || avatar}
						alt="generic-header"
						width="0"
						height="0"
						sizes="100vw"
						className="h-[100px] w-[100px] rounded-full object-fill"
					/>
					<div className="flex flex-col gap-4">
						<div className="font-anek text-text3xl font-bold leading-[44px] text-white">
							{name}
						</div>
						<div className="text-lg font-500 leading-[28 px] w-96	font-poppins text-[#757575]">
							{bio}
						</div>
						<div className="font-600  w-fit rounded-[50px] bg-gradient-to-r from-[#2A84C0] to-[#294A8D] px-[16px] py-[4px] font-poppins text-[18px] leading-[28px] text-[#ffffff]">
							TOP MENTOR
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
export default Header;
