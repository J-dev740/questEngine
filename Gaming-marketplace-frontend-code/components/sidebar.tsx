/* eslint-disable indent */

import { useQuery } from "@apollo/client";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BsRocketTakeoff } from "react-icons/bs";
import { CgPlayButtonR } from "react-icons/cg";
import { FaRegCompass } from "react-icons/fa";
import { FiFlag } from "react-icons/fi";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdCheckboxOutline } from "react-icons/io";
import { MdPeopleAlt } from "react-icons/md";
import { useSelector } from "react-redux";
import { walletAddressSelector } from "../features/auth/auth.selectors";
import { roleSelector } from "../features/profile-page/profile.selectors";
// import { IPrimaryProfileCard } from "../features/cyber-connect/cyber.types";
// import { GET_PRIMARY_PROFILE } from "../features/cyber-connect/graphql/PrimaryProfile";
import { useGetSelfQuery } from "../features/profile-page/expert/expert.api";
import { getAvatarSrc } from "../services/helper";

const Sidebar = () => {
	const router = useRouter();
	const [init, setInit] = useState(false);
	const [sidebar, setSidebar] = useState(true);
	const walletAddress = useSelector(walletAddressSelector);
	const role = useSelector(roleSelector);
	const { data: self } = useGetSelfQuery(walletAddress ?? skipToken);

	// const { data: profile } = useQuery(GET_PRIMARY_PROFILE, {
	// 	variables: { address: walletAddress, me: walletAddress },
	// });

	useEffect(() => {
		if (!self) return;
		setInit(true);
	}, [self]);

	// const primaryProfile: IPrimaryProfileCard | null = profile?.address?.wallet?.primaryProfile;

	return (
		// removed w-[20vw] from div below
		<div className="relative bottom-0 top-0 min-h-screen p-6 pr-0 font-poppins text-white lg:min-w-[300px]">
			<div
				className=" relative lg:hidden"
				onClick={() => {
					setSidebar(!sidebar);
				}}
			>
				<GiHamburgerMenu />
			</div>
			<div
				className={sidebar ? "hidden font-poppins lg:grid lg:h-full" : "fixed z-50 h-[95%]"}
			>
				<div className="flex h-full w-full flex-col justify-between rounded-3xl  border-[1px] border-[#212121]  bg-[#111111]  px-[20px] py-[32px] backdrop-blur-[5px]">
					<div className="flex w-full flex-col items-start justify-between space-y-[32px] ">
						<Link href="/home">
							<div className="isolate flex h-[32px] w-full cursor-pointer flex-row items-center gap-[16px] px-3 font-poppins text-[20px] font-[700] text-[#FFFFFF]">
								<div className="flex h-[32px] w-[32px] items-center justify-center rounded-[6px] bg-gradient-to-r from-[#296BBD] to-[#AC85FF] px-[5px] py-[4px] font-Inter text-[16px] leading-[24px] ">
									PG
								</div>
								<div className="font-700">Pro Gaming</div>
							</div>
						</Link>
						<div className="flex  w-full flex-col gap-4">
							<div className="px-3 text-[14px] font-semibold leading-[15px] tracking-widest text-[#6B6B6B]">
								Menu
							</div>
							<div className="flex w-full flex-col gap-[4px]">
								<Link href={init ? `/dashboard` : router.pathname}>
									<div
										className={` ${
											router.asPath == `/dashboard`
												? `bg-gradient-to-r from-[#296BBD] to-[#AC85FF] px-4 py-2`
												: `font-[500]`
										} flex h-[50px] w-full  cursor-pointer flex-row items-center justify-start gap-[12px] rounded-[16px] pl-[19px] hover:bg-[#1B1047]`}
									>
										<IoMdCheckboxOutline className="text-textMedium3" />
										<div className="text-textMedium3 leading-6">Dashboard</div>
									</div>
								</Link>
								<Link href={init ? "/discover" : router.pathname}>
									<div
										className={` ${
											router.pathname.match(/^\/discover/) ||
											router.pathname.match(/^\/game/) ||
											router.pathname.match(/^\/expert/) ||
											router.pathname.match(/^\/course/)
												? "bg-gradient-to-r from-[#296BBD] to-[#AC85FF] px-4 py-2 font-[600]"
												: "font-[500]"
										} flex h-[50px] w-full  cursor-pointer flex-row items-center justify-start gap-[12px] rounded-[16px] pl-[19px] hover:bg-[#1B1047]`}
									>
										<FaRegCompass className="text-textMedium3" />
										<div className="text-textMedium3 leading-6">Discover</div>
									</div>
								</Link>
								<Link href={init ? "/livestreams" : router.pathname}>
									<div
										className={` ${
											router.pathname.match(/^\/livestream/)
												? "bg-gradient-to-r from-[#296BBD] to-[#AC85FF] px-4 py-2 font-[600]"
												: "font-[500]"
										} flex h-[50px] w-full  cursor-pointer flex-row items-center justify-start gap-[12px] rounded-[16px] pl-[19px] hover:bg-[#1B1047]`}
									>
										<CgPlayButtonR className="text-textMedium3" />
										<div className="text-textMedium3 leading-6">Livestream</div>
									</div>
								</Link>
							</div>
							<div>
								<div className="my-4 flex h-[1px] w-full items-center justify-center bg-[#212121]" />
							</div>
							<div className="flex  flex-col space-y-[16px]">
								<div className="px-3 text-[14px] font-semibold leading-[15px] tracking-widest text-[#6B6B6B]">
									More
								</div>
								<Link href={init ? "/quest" : router.pathname}>
									<div
										className={`${
											router.pathname.match(/^\/quest/)
												? "bg-gradient-to-r from-[#296BBD] to-[#AC85FF] px-4 py-2"
												: "font-[500]"
										} flex h-[50px] w-full  cursor-pointer flex-row items-center justify-start gap-[12px] rounded-[16px] pl-[19px] hover:bg-[#1B1047]`}
									>
										<FiFlag className="text-textMedium3" />
										<div className="text-textMedium3 leading-6">Quest</div>
									</div>
								</Link>
								<Link href={init ? "/events" : router.pathname}>
									<div
										className={`${
											router.pathname.match(/^\/events/)
												? "bg-gradient-to-r from-[#296BBD] to-[#AC85FF] px-4 py-2"
												: "font-[500]"
										} flex h-[50px] w-full  cursor-pointer flex-row items-center justify-start gap-[12px] rounded-[16px] pl-[19px] hover:bg-[#1B1047]`}
									>
										<FiFlag className="text-textMedium3" />
										<div className="text-textMedium3 leading-6">Events</div>
									</div>
								</Link>
								<Link href={init ? "/social" : router.pathname}>
									<div
										className={` ${
											router.pathname.match(/^\/social/)
												? "bg-gradient-to-r from-[#296BBD] to-[#AC85FF] px-4 py-2 font-[600]"
												: "font-[500]"
										} flex h-[50px] w-full  cursor-pointer flex-row items-center justify-start gap-[12px] rounded-[16px] pl-[10px] hover:bg-[#1B1047]`}
									>
										<MdPeopleAlt className="text-xl" />
										<div className="font-500 text-[20px] leading-[24px]">
											Social
										</div>
									</div>
								</Link>
								<Link href={init ? "/proverse" : router.pathname}>
									<div
										className={` ${
											router.pathname.match(/^\/proverse/)
												? "bg-gradient-to-r from-[#296BBD] to-[#AC85FF] px-4 py-2 font-[600]"
												: "font-[500]"
										} flex h-[50px] w-full  cursor-pointer flex-row items-center justify-start gap-[12px] rounded-[16px] pl-[10px] hover:bg-[#1B1047]`}
									>
										<BsRocketTakeoff className="text-xl" />
										<div className="font-500 text-[20px] leading-[24px]">
											Proverse
										</div>
									</div>
								</Link>
							</div>
						</div>
					</div>
					<div className="flex w-full flex-col items-start justify-between space-y-[16px] ">
						<div className="px-3 text-[16px] font-semibold leading-[24px] tracking-widest text-[#6E78D3]">
							PROFILE
						</div>
						<div className="w-full">
							<Link
								href={init ? "/profile" : router.pathname}
								className="flex w-full"
							>
								<div
									className={`${
										router.pathname.match(/^\/profile/)
											? "bg-gradient-to-r from-[#296BBD] to-[#AC85FF] font-[600]"
											: "font-[500]"
									} flex w-full cursor-pointer flex-row items-center gap-[12px] space-x-[16px] rounded-[16px] px-4 py-2 `}
								>
									<Image
										src={
											self?.icon ??
											// primaryProfile?.avatar ??
											// primaryProfile?.metadataInfo.avatar ??
											getAvatarSrc(walletAddress)
										}
										alt="avt"
										width={0}
										height={0}
										sizes="100vw"
										className="h-[40px] w-[40px] rounded-full"
									/>

									<div className="truncate text-textMedium3 font-[600] leading-[20px] text-[#FFFFFF]">
										{role === "expert"
											? self?.username
												? self?.username?.length > 10
													? self?.username.slice(0, 8) + "..."
													: self?.username
												: ""
											: self?.walletAddress
											? self?.walletAddress.slice(0, 4) +
											  "..." +
											  self?.walletAddress.slice(-3)
											: null}
									</div>
								</div>
							</Link>
						</div>
					</div>{" "}
				</div>
			</div>
		</div>
	);
};

export default Sidebar;
