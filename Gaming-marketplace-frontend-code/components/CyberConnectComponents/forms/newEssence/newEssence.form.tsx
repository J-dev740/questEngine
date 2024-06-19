import { useQuery } from "@apollo/client";
import { ReactNode, useState } from "react";
import toast from "react-hot-toast";
import { HiCheck } from "react-icons/hi";
import { ImCheckboxUnchecked } from "react-icons/im";
import { useSelector } from "react-redux";
import { walletAddressSelector } from "../../../../features/auth/auth.selectors";
import { IPrimaryProfileCard } from "../../../../features/cyber-connect/cyber.types";
import { GET_PRIMARY_PROFILE } from "../../../../features/cyber-connect/graphql/PrimaryProfile";
import Modal from "../../../util/modal";
import FreeEssenceForm from "./sub-forms/free.essence.form";
import LimitedEssenceForm from "./sub-forms/limited.essence.form";
import PaidEssenceForm from "./sub-forms/paid.essence.form";
import { v4 as uuidv4 } from "uuid";

interface Props {
	onClose: () => void;
}

interface EssenceMetadata {
	text: string;
	icon: File;
	imgURL: string;
	svg_data: string;
	primaryProfile: IPrimaryProfileCard;
}

const Checked = () => {
	return (
		<div className="grid h-[24px] w-[24px] justify-items-center rounded-md bg-gradient-to-r from-[#296BBD] to-[#AC85FF]">
			<HiCheck className="h-full" />
		</div>
	);
};

const Unchecked = () => {
	return (
		<div className="h-[24px] w-[24px] rounded-md bg-[#212121]">
			<ImCheckboxUnchecked className=" bg-clip-text text-text2xl text-transparent" />
		</div>
	);
};

export const generateEssenceMetadata = (data: EssenceMetadata) => {
	return {
		metadata_id: uuidv4(),
		version: "1.0.0",
		app_id: process.env.NEXT_PUBLIC_APP_ID as string,
		lang: "en",
		issue_date: new Date().toISOString(),
		content: data.text,
		media: [
			{
				media_type: data.icon.type.split("/")[0],
				media_url: data.icon ? data.imgURL : "",
			},
		],
		tags: [],
		image: data.icon ? data.imgURL : "",
		image_data: !data.icon ? data.svg_data : "",
		name: `@${data.primaryProfile?.handle}'s essence`,
		description: `@${data.primaryProfile?.handle}'s essence on Adventure Dao`,
		animation_url: "",
		external_url: "",
		attributes: [],
	};
};

const NewEssenceForm = ({ onClose }: Props) => {
	const [selected, setSelected] = useState<number>(0);
	const address = useSelector(walletAddressSelector);
	const { data: profile, error } = useQuery(GET_PRIMARY_PROFILE, {
		variables: { address, me: address },
	});

	if (error) {
		toast.error("Error loading profile");
		return null;
	}
	if (!profile) {
		toast("Invalid profile");
		return null;
	}

	const primaryProfile: IPrimaryProfileCard | null = profile.address.wallet.primaryProfile;

	if (!primaryProfile) {
		toast.error("error loading primary profile");
		return null;
	}

	const Forms: ReactNode[] = [
		<FreeEssenceForm onResult={onClose} primaryProfile={primaryProfile} />,
		<PaidEssenceForm onResult={onClose} primaryProfile={primaryProfile} />,
		<LimitedEssenceForm onResult={onClose} primaryProfile={primaryProfile} />,
	];

	return (
		<Modal title="Create Essence" handleExit={onClose}>
			<div className="flex w-[33vw] flex-col font-poppins">
				<div className="flex justify-between space-x-3">
					<div
						onClick={() => setSelected(0)}
						className="flex space-x-3 hover:cursor-pointer"
					>
						{selected === 0 ? <Checked /> : <Unchecked />}{" "}
						<span className="select-none">Free Essence</span>
					</div>
					<div
						onClick={() => setSelected(1)}
						className="flex space-x-3 hover:cursor-pointer"
					>
						{selected === 1 ? <Checked /> : <Unchecked />}{" "}
						<span className="select-none">Paid Essence</span>
					</div>
					<div
						onClick={() => setSelected(2)}
						className="flex space-x-3 hover:cursor-pointer"
					>
						{selected === 2 ? <Checked /> : <Unchecked />}
						<span className="select-none">Limited time Essence</span>
					</div>
				</div>
			</div>
			{Forms[selected]}
		</Modal>
	);
};

export default NewEssenceForm;
