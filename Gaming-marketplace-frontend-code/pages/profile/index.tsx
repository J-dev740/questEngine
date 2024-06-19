import { useQuery } from "@apollo/client";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BsFillPencilFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import { useAccount } from "wagmi";
import ProfileMyCoursesList from "../../components/cards/lists/profile.mycourses.list";
import ProfilePurchasedCoursesList from "../../components/cards/lists/profile.purchasedcourses.list";
import GradientButton from "../../components/common/form/button/gradientBtn";
import { StartMinting } from "../../components/CyberConnectComponents/buttons";
import ProfileEssenceList from "../../components/CyberConnectComponents/cards/lists/profile.essence.list";
import ProfilePostsList from "../../components/CyberConnectComponents/cards/lists/profile.posts.list";
import { walletAddressSelector } from "../../features/auth/auth.selectors";
import { IPrimaryProfileCard } from "../../features/cyber-connect/cyber.types";
import { GET_PRIMARY_PROFILE } from "../../features/cyber-connect/graphql/PrimaryProfile";
import { useGetSelfQuery } from "../../features/profile-page/expert/expert.api";

const Profile = () => {
	const router = useRouter();
	const walletAddress = useSelector(walletAddressSelector);
	const { data: self } = useGetSelfQuery(walletAddress ?? skipToken);
	const { address } = useAccount();
	const [_skipProfile, _setSkipProfile] = useState(true);
	const {
		data: profile,
		loading,
		error,
	} = useQuery(GET_PRIMARY_PROFILE, {
		variables: { address, me: address },
		skip: _skipProfile,
	});

	useEffect(() => {
		if (!_skipProfile) return;
		if (address) {
			_setSkipProfile(false);
		}
	}, [address, _skipProfile]);

	if (loading || !address) {
		toast.loading("Loading profile", { id: "load-profile" });
		return <>Loading profile</>;
	}
	toast.dismiss("load-profile");

	if (error && address) {
		toast.error("Error loading profile");
		return <>Error loading profile</>;
	}

	if (!profile) return <div>Error loading profile</div>;

	const primaryProfile: IPrimaryProfileCard | null = profile.address.wallet.primaryProfile;

	return (
		<>
			<Head>
				<title>Profile</title>
			</Head>
			<div className="h-screen overflow-y-scroll pl-6">
				<div className="relative">
					<div className="flex h-[400px] w-full min-w-fit justify-start bg-[url('/profileHeader.png')] bg-cover px-20 pt-32 shadow-[inset_0_-8px_8px_rgba(0,0,0,0.6)]" />
				</div>
				<div className="mx-auto flex w-11/12 flex-row items-start justify-between rounded-xl bg-[#111111] px-5 py-10">
					<div className="flex">
						<div className="mr-6 flex w-4/12 flex-col items-center justify-center">
							<Image
								src={self?.icon ?? (primaryProfile?.avatar as string)}
								width={0}
								height={0}
								sizes="100vw"
								className="aspect-square h-auto w-[100px] rounded-full"
								alt="profile"
							/>
						</div>
						<div className="flex flex-col justify-center">
							<div className="truncate text-text2xl font-bold">
								<div
									className="hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600 transition duration-150 ease-in-out"
									title={self?.username ?? self?.walletAddress}
								>
									{self?.username ?? self?.walletAddress}
								</div>
							</div>
							<div className="text-textMedium font-bold text-[#B5B5B5]">
								{self?.bio}
							</div>
							<div className="text-textMedium font-bold text-[#B5B5B5]">
								{self?.walletAddress}
							</div>
						</div>
					</div>
					{primaryProfile && (
						<div className="flex flex-col items-end justify-center">
							<div className="flex flex-row justify-center">
								<div className="mx-6 flex flex-col items-start justify-start">
									<div className="text-textMedium font-bold text-[#B5B5B5]">
										Followers
									</div>
									<div className="text-textMedium2 font-bold text-white">
										{primaryProfile.followerCount}
									</div>
								</div>
								<div className="mx-6 flex flex-col items-start justify-start">
									<div className="text-textMedium font-bold text-[#B5B5B5]">
										Subscribed
									</div>
									<div className="text-textMedium2 font-bold text-white">
										{primaryProfile.subscriberCount}
									</div>
								</div>
								<div className="mx-6 flex flex-col items-start justify-start">
									<div className="text-textMedium font-bold text-[#B5B5B5]">
										Posts
									</div>
									<div className="text-textMedium2 font-bold text-white">
										{primaryProfile.postCount}
									</div>
								</div>
								<div className="mx-6 flex flex-col items-start justify-start">
									<div className="text-textMedium font-bold text-[#B5B5B5]">
										Assets
									</div>
									<div className="text-textMedium2 font-bold text-white">
										{primaryProfile.essences.totalCount}
									</div>
								</div>
							</div>
							<div className="mr-6 mt-5 h-12 w-12">
								<section className="relative flex cursor-pointer justify-center rounded-lg border border-none bg-gradient-to-r from-[#296BBD] to-[#AC85FF] p-[1px]">
									<button
										type="button"
										className="text-base flex w-full items-center justify-center rounded-lg bg-[#111111] text-center font-semibold text-white"
									>
										<span className="mx-3 my-2 flex h-full w-full items-center justify-center bg-gradient-to-r bg-clip-text">
											<BsFillPencilFill />
										</span>
									</button>
								</section>
							</div>
						</div>
					)}
					{!primaryProfile && (
						<div className="px-5">
							<StartMinting text="Mint your CC profile" />
						</div>
					)}
				</div>
				<div className="space-y-10">
					<div className="mx-auto min-h-[250px] w-11/12">
						<div className="flex w-full items-center justify-between">
							<h1 className="my-4 text-text3xl font-semibold text-[#B5B5B5]">
								{self?.role.includes("expert") ? "My Courses" : "Purchased Courses"}
							</h1>
							<span className="w-2/12">
								<GradientButton
									onClick={() => router.push(`/profile/courses`)}
									title="View All"
								/>
							</span>
						</div>
						{self?.role.includes("expert") ? (
							<ProfileMyCoursesList expertId={self?._id} />
						) : (
							<ProfilePurchasedCoursesList />
						)}
					</div>
					<div className="mx-auto min-h-[250px] w-11/12">
						<div className="flex w-full items-center justify-between">
							<h1 className="my-4 text-text3xl font-semibold text-[#B5B5B5]">
								Recent Posts
							</h1>
							<span className="w-2/12">
								<GradientButton
									onClick={() => router.push(`/profile/posts`)}
									title="View All"
								/>
							</span>
						</div>
						{primaryProfile ? (
							<ProfilePostsList primaryProfile={primaryProfile} />
						) : (
							"Please connect/mint your CC profile"
						)}
					</div>
					<div className="mx-auto min-h-[250px] w-11/12">
						<div className="flex w-full items-center justify-between">
							<h1 className="my-4 text-text3xl font-semibold text-[#B5B5B5]">
								Assets
							</h1>
							<span className="w-2/12">
								<GradientButton
									onClick={() => router.push(`/profile/assets`)}
									title="View All"
								/>
							</span>
						</div>
						{primaryProfile ? (
							<ProfileEssenceList primaryProfile={primaryProfile} />
						) : (
							"Please connect/mint your CC profile"
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default Profile;
