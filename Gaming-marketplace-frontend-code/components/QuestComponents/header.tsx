import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import ellipse from "../../public/assets/ellipse.svg";

const Header = () => {
	const system = useSelector((s: any) => s.system);

	return (
		<div className=" inline-flex">
			<span className=" inline-flex">
				<Link href="/quest/create" target="_blank">
					<button
						type="button"
						className=" mx-2 flex flex-row items-center justify-center gap-[8px] rounded-[16px] bg-[#FD5B74] p-[10px] font-[Inter] text-[#ffffff]"
					>
						Create Quests
					</button>
				</Link>
				<div className="flex flex-row items-center justify-center gap-[8px] rounded-[16px] bg-[#FD5B74] p-[10px]">
					<Image src={ellipse} alt="ellipse" width="12" height="12" />
					<span className="box-shadow-custom flex cursor-pointer items-center justify-center font-[Inter] text-[16px] font-[700px] leading-[24px]">
						{system?.connected ? (
							<button
								type="button"
								onClick={async () => {
									// await dispatch(disconnectWallet(toast));
								}}
							>
								{system.activeUser.wallet_id}
							</button>
						) : (
							<button
								type="button"
								onClick={async () => {
									// await dispatch(connectWallet(toast));
								}}
							>
								Connect
							</button>
						)}
					</span>
				</div>
			</span>
		</div>
	);
};

export default Header;
