import { useLazyQuery, useMutation } from "@apollo/client";
import { ethers } from "ethers";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useSignTypedData } from "wagmi";
import { ValidationError } from "yup";
import { walletAddressSelector } from "../../../../../features/auth/auth.selectors";
import { getEssenceSVGData } from "../../../../../features/cyber-connect/cyber.helper";
import {
	IEssenceMetadata,
	IPrimaryProfileCard,
} from "../../../../../features/cyber-connect/cyber.types";
import { CREATE_REGISTER_ESSENCE_TYPED_DATA } from "../../../../../features/cyber-connect/graphql/CreateRegisterEssenceTypedData";
import { ESSENCES_BY } from "../../../../../features/cyber-connect/graphql/GetEssence";
import { RELAY } from "../../../../../features/cyber-connect/graphql/Relay";
import { RELAY_ACTION_STATUS } from "../../../../../features/cyber-connect/graphql/RelayActionStatus";
import useWeb3Storage from "../../../../../features/cyber-connect/hooks/useWeb3Storage";
import { Button6 } from "../../../../common/form/button";
import { Dropzone } from "../../../../common/form/dropzone";
import { InputField } from "../../../../common/form/inputField";
import { apolloClient } from "../../../../util/init/apollo.config";
import { paidEssenceSchema } from "../essence.validation";
import { generateEssenceMetadata } from "../newEssence.form";

interface Props {
	primaryProfile: IPrimaryProfileCard;
	onResult: () => void;
}

interface CustomElements extends HTMLFormControlsCollection {
	text: HTMLTextAreaElement;
	price: HTMLTextAreaElement;
	quantity: HTMLTextAreaElement;
}

interface RegisterForm extends HTMLFormElement {
	readonly elements: CustomElements;
}

const PaidEssenceForm = ({ onResult, primaryProfile }: Props) => {
	const [icon, setIcon] = useState<File | null>(null);
	const [errors, setErrors] = useState<{ [k: string]: string | null }>({});

	const address = useSelector(walletAddressSelector);

	const { storeFile } = useWeb3Storage();
	const { signTypedDataAsync } = useSignTypedData();

	const [createEssence] = useMutation(CREATE_REGISTER_ESSENCE_TYPED_DATA);
	const [getRelayActionStatus, { stopPolling, startPolling }] = useLazyQuery(
		RELAY_ACTION_STATUS,
		{
			notifyOnNetworkStatusChange: true,
			fetchPolicy: "network-only",
			onCompleted: (data: any) => {
				if (data.relayActionStatus?.txStatus === "SUCCESS") {
					toast.dismiss();
					toast.success("Essence created");
					stopPolling();
					setTimeout(() => apolloClient.refetchQueries({ include: [ESSENCES_BY] }), 5000);
					onResult();
				}
			},
		},
	);
	const [relay] = useMutation(RELAY);

	const onIconUpload = useCallback(async (files: File[]) => {
		setIcon(files[0]);

		const err = { ...errors };
		err.icon = null;
		setErrors(err);
	}, []);

	const handleSubmit = async (e: React.FormEvent<RegisterForm>) => {
		e.preventDefault();
		const { text, price, quantity } = e.currentTarget.elements;

		try {
			const result = await paidEssenceSchema.validate(
				{ text: text.value, image: icon, price: price.value, quantity: quantity.value },
				{ abortEarly: false },
			);

			setErrors({});

			const svg_data = getEssenceSVGData();

			toast.loading("Uploading Essence to ipfs", { id: "loading" });
			const imgURL = await storeFile(icon as File).catch(() => {
				toast.dismiss("loading");
				toast.error("could not upload");
				throw new Error();
			});
			toast.dismiss("loading");
			toast.success("Essence uploaded!");

			const metadata: IEssenceMetadata = generateEssenceMetadata({
				primaryProfile,
				text: result.text,
				icon: icon as File,
				imgURL,
				svg_data,
			});

			// Uploading metadata to Web3.Storage
			const blob = new Blob([JSON.stringify(metadata)], {
				type: "application/json",
			});
			const file = new File([blob], "postMetadata.json");
			const metadataURL = await storeFile(file);

			const typedResult = await createEssence({
				variables: {
					input: {
						profileID: primaryProfile?.profileID,
						name: `@${primaryProfile?.handle}'s post`,
						symbol: "ADO",
						tokenURI: metadataURL,
						transferable: true,
						deployAtRegister: true,
						middleware: {
							collectPaid: {
								recipient: address,
								totalSupply: result.quantity.toString(),
								amount: ethers.utils.parseEther(result.price.toString()).toString(),
								currency: process.env.NEXT_PUBLIC_LINK_TOKEN_ADDR as string, // LINK token
								subscribeRequired: false,
							},
						},
					},
				},
			});

			const typedData = typedResult.data?.createRegisterEssenceTypedData?.typedData;
			const typedDataID = typedData?.id;
			const parsed = JSON.parse(typedData.data);

			const signature = await signTypedDataAsync({
				domain: parsed.domain,
				types: parsed.types,
				value: parsed.message,
			});

			const relayResult = await relay({
				variables: {
					input: {
						typedDataID: typedDataID,
						signature: signature,
					},
				},
				refetchQueries: [ESSENCES_BY],
			});
			const relayActionId = relayResult.data.relay.relayActionId;
			const relayActionStatusQuery = await getRelayActionStatus({
				variables: {
					relayActionId: relayActionId,
				},
			});
			if (!(relayActionStatusQuery.data?.relayActionStatus?.txStatus === "SUCCESS")) {
				startPolling(1000);
			}
		} catch (error: unknown) {
			const errs: typeof errors = {};

			if (error instanceof ValidationError)
				error.inner.forEach((item) => {
					errs[item.path as string] = item.message;
				});
			setErrors(errs);
		}
	};

	const handleChange = async (e: React.ChangeEvent<HTMLElement & { name: string }>) => {
		const err = { ...errors };
		err[e.target.name] = null;
		setErrors(err);
	};

	return (
		<form
			onSubmit={(e: React.FormEvent<RegisterForm>) => handleSubmit(e)}
			className="flex w-[33vw] flex-col space-y-2"
		>
			<InputField
				label="Text"
				name="text"
				placeholder="Write here..."
				error={errors.text ?? null}
				onChange={handleChange}
			/>
			<Dropzone
				label="Upload an image or video:"
				name="image"
				fileTypes={{ "image/*": [], "video/*": [] }}
				error={errors.image ?? null}
				onDrop={onIconUpload}
				disabled={false}
			/>
			<InputField
				label="Amount"
				name="price"
				placeholder="Write here..."
				error={errors.price ?? null}
				onChange={handleChange}
			/>
			<InputField
				label="Quantity"
				name="quantity"
				placeholder="Write here..."
				error={errors.quantity ?? null}
				onChange={handleChange}
			/>
			<Button6 type="submit" text="Create Essence" className="!ml-auto" />
		</form>
	);
};

export default PaidEssenceForm;
