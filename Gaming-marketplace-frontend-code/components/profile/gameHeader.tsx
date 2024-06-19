/* eslint-disable react/require-default-props */

interface HeaderProps {
	title: string | undefined;
}

const Header = ({ title }: HeaderProps) => {
	return (
		<div className="flex h-[600px] w-full min-w-fit justify-start bg-[url('/courseHeader.png')] bg-cover px-20 pt-32">
			<div className=" flex flex-col gap-[80px]">
				<div className="font-600 font-poppins text-[20px] leading-[28px] text-[#FFFFFF]">
					Games {">"} {title}
				</div>

				<div className="font-anek text-[40px] font-bold leading-[44px] text-[#ffffff]">
					{title}
				</div>
			</div>
		</div>
	);
};
export default Header;
