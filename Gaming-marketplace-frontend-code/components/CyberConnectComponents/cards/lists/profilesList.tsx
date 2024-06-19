import { useQuery } from "@apollo/client";
import Image from "next/image";
import { MouseEvent } from "react";
import { useSelector } from "react-redux";
import { walletAddressSelector } from "../../../../features/auth/auth.selectors";
import { IAccountCard } from "../../../../features/cyber-connect/cyber.types";
import { GET_PROFILE_IDS } from "../../../../features/cyber-connect/graphql/GetProfileIDs";

interface Props {
	onClose: () => void;
}

const ProfilesList = ({ onClose }: Props) => {
	const address = useSelector(walletAddressSelector);
	const { data, loading, error } = useQuery(GET_PROFILE_IDS, { variables: { wallet: address } });

	const handleOutsideClick = (event: MouseEvent) => {
		const modalContent = document.getElementById("profile-list-modal");
		if (modalContent && !modalContent.contains(event.target as Node)) {
			onClose();
		}
	};

	const handleUpdateProfile = () => {
		// make backend request to update local profile
	};

	if (loading) return <div>Loading...</div>;
	if (error) return <div>Error!</div>;
	if (!data) return <div>Something went wrong...</div>;

	const profiles: IAccountCard[] =
		data.address.wallet.profiles.edges.map((item: any) => item.node) ?? [];

	return (
		<div className="relative" onClick={handleOutsideClick}>
			<div
				className="absolute inset-0 z-50 flex h-fit max-h-[100px] w-fit max-w-[300px]"
				id="profile-list-modal"
			>
				<div className="flex w-full flex-col space-y-3 overflow-y-scroll rounded-lg p-2 pr-4">
					{profiles.map((profile) => (
						<div
							className="flex w-full items-center space-x-1 rounded-lg border border-gray-600 bg-[#212121] p-2 font-poppins"
							onClick={handleUpdateProfile}
						>
							<Image
								src={
									profile.metadataInfo.avatar ??
									`https://api.multiavatar.com/${address}.svg`
								}
								alt="profile image"
								width={0}
								height={0}
								sizes="100vw"
								className="aspect-square h-[45px] w-[45px] rounded-full"
							/>
							<span className="truncate font-[500]">{profile.handle}</span>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default ProfilesList;
