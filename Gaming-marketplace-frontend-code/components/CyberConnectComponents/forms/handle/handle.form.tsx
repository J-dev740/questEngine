import { useLazyQuery, useMutation } from "@apollo/client";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";

import { useAccount } from "wagmi";
import { ValidationError } from "yup";
import { pinJSONToIPFS } from "../../../../features/cyber-connect/cyber.helper";
import { IProfileMetadata } from "../../../../features/cyber-connect/cyber.types";
import { CREATE_CREATE_PROFILE_TYPED_DATA } from "../../../../features/cyber-connect/graphql/CreateProfileTypedData";
import { GET_PRIMARY_PROFILE } from "../../../../features/cyber-connect/graphql/PrimaryProfile";
import { RELAY } from "../../../../features/cyber-connect/graphql/Relay";
import { RELAY_ACTION_STATUS } from "../../../../features/cyber-connect/graphql/RelayActionStatus";
import { useGetSelfQuery } from "../../../../features/profile-page/expert/expert.api";
import { Button5 } from "../../../common/form/button";
import { Dropzone } from "../../../common/form/dropzone";
import { InputField } from "../../../common/form/inputField";
import { apolloClient } from "../../../util/init/apollo.config";
import { handleSchema } from "./handle.validation";

interface Props {
	onClose: () => void;
	onResult: () => void;
}

const CyberHandleForm = ({ onClose, onResult }: Props) => {
	const { address } = useAccount();
	const [createProfile] = useMutation(CREATE_CREATE_PROFILE_TYPED_DATA);
	const [relay] = useMutation(RELAY);

	const [relayActionStatus, { startPolling, stopPolling }] = useLazyQuery(RELAY_ACTION_STATUS, {
		notifyOnNetworkStatusChange: true,
		fetchPolicy: "network-only",
		onCompleted: (data) => {
			if (data.relayActionStatus?.txStatus === "SUCCESS") {
				stopPolling();
				setTimeout(() => {
					apolloClient.refetchQueries({ include: [GET_PRIMARY_PROFILE] });
					toast.dismiss();
					toast.success("CC profile minted!");
				}, 5000);
				onResult();
			}
		},
	});
	const { data: self } = useGetSelfQuery(address ?? skipToken);

	const [handle, setHandle] = useState("");
	const [errors, setErrors] = useState<{ [k: string]: string | null }>({});
	const [icon, setIcon] = useState<File | null>(null);

	const onIconUpload = useCallback(async (iconFiles: File[]) => {
		setIcon(iconFiles[0]);

		const err = { ...errors };
		err.icon = null;
		setErrors(err);
	}, []);

	const handleSubmit = async () => {
		try {
			await handleSchema.validate({ handle, icon }, { abortEarly: false });

			if (!self) return;
			const metadata: IProfileMetadata = {
				display_name: self.username,
				bio: self.about,
				avatar: self.icon,
				version: "1.1.0",
			};

			toast.loading("Creating profile - Updating metadata...", { id: "loader" });
			const ipfsHash = await pinJSONToIPFS(metadata);

			toast.loading("Creating profile - Minting profile...", { id: "loader" });
			const data = await createProfile({
				variables: {
					input: {
						to: address,
						handle,
						avatar: self.icon,
						metadata: ipfsHash,
						operator: process.env.NEXT_PUBLIC_PROFILE_NFT_OPERATOR as string,
					},
				},
			});
			toast.loading("Creating profile - waiting for cyberConnect...", { id: "loader" });
			const typedDataID = data.data?.createCreateProfileTypedData.typedDataID;
			const relayData = await relay({
				variables: {
					input: {
						typedDataID: typedDataID,
					},
				},
			});
			const relayActionId = relayData.data?.relay?.relayActionId;
			const relayActionStatusData = await relayActionStatus({
				variables: {
					relayActionId: relayActionId,
				},
			});
			if (!(relayActionStatusData.data?.relayActionStatus?.txStatus === "SUCCESS")) {
				startPolling(1000);
			}
		} catch (error: unknown) {
			const errs: typeof errors = {};

			if (error instanceof ValidationError) {
				error.inner.forEach((item) => {
					errs[item.path as string] = item.message;
				});
				setErrors(errs);
			}
			toast.dismiss();
			toast.error("Something went wrong :(");
		}
	};

	const handleChange = async (e: React.ChangeEvent<HTMLInputElement & { name: string }>) => {
		const err = { ...errors };
		err[e.target.name] = null;
		setHandle(e.target.value);
		setErrors(err);
	};

	return (
		<span
			id="modal-content2"
			className="absolute left-80 right-auto top-2 z-10 flex w-[400px] flex-col space-y-1 rounded-lg bg-[#212121] p-2 font-Anek text-textMedium2 "
		>
			<InputField
				label="@handle"
				name="handle"
				placeholder="handle w/0 '@'"
				error={errors.handle ?? null}
				value={handle}
				onChange={handleChange}
			/>
			<Dropzone
				label="Upload your photo"
				name="iconImage"
				fileTypes={{ "image/*": [] }}
				error={errors.icon ?? null}
				onDrop={onIconUpload}
				disabled={false}
			/>
			{icon && icon.name}
			<Button5
				type="button"
				onClick={handleSubmit}
				text="Create"
				className="ml-auto self-end !rounded-lg"
			/>
		</span>
	);
};

export default CyberHandleForm;
