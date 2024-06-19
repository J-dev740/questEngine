import { useLazyQuery, useMutation } from "@apollo/client";
import { erc20ABI } from "@wagmi/core";
import { TiTick } from "react-icons/ti";
import { useSelector } from "react-redux";
// import { cyberConnectSelector } from "../../../features/cyber-connect/cyber.selectors";
import { CREATE_SUBSCRIBE_TYPED_DATA } from "../../../features/cyber-connect/graphql/CreateSubscribeTypedData";
import { GET_PROFILE_BY_HANDLE } from "../../../features/cyber-connect/graphql/GetProfileByHandle";
import { apolloClient } from "../../util/init/apollo.config";

import { ethers } from "ethers";
import { useSignTypedData } from "wagmi";
import ERC20 from "../../../constants/cyberConnect/abis/ERC20.json";
import { walletAddressSelector } from "../../../features/auth/auth.selectors";
import { IPrimaryProfileCard } from "../../../features/cyber-connect/cyber.types";
import { RELAY } from "../../../features/cyber-connect/graphql/Relay";
import { RELAY_ACTION_STATUS } from "../../../features/cyber-connect/graphql/RelayActionStatus";

import { prepareWriteContract, readContract, waitForTransaction, writeContract } from "@wagmi/core";
import toast from "react-hot-toast";

interface Props {
	profile: IPrimaryProfileCard;
	isFollowed: boolean | undefined;
	isSubscribed: boolean | undefined;
}

const PostDropdown = ({ isFollowed, isSubscribed, profile }: Props) => {
	const walletAddress = useSelector(walletAddressSelector);
	// const cyberConnect = useSelector(cyberConnectSelector);

	const [subscribe] = useMutation(CREATE_SUBSCRIBE_TYPED_DATA);
	const [relay] = useMutation(RELAY);
	const [getRelayActionStatus] = useLazyQuery(RELAY_ACTION_STATUS);

	const { signTypedDataAsync } = useSignTypedData();

	const refetch = () => {
		apolloClient.refetchQueries({
			include: [GET_PROFILE_BY_HANDLE],
			updateCache: (cache) => {
				cache.evict({ fieldName: profile.handle });
			},
		});
	};

	// const handleFollow = async () => {
	// 	await cyberConnect.follow(profile.handle).catch((err: Error) => toast.error(err.message));
	// 	refetch();
	// };

	// const handleUnfollow = async () => {
	// 	await cyberConnect
	// 		.unfollow(profile.handle)
	// 		.then(() => refetch())
	// 		.catch((err: Error) => toast.error(err.message));
	// };

	const handleSubscribe = async () => {
		const { subscribeMw } = profile;
		if (!subscribeMw) return;

		try {
			if (subscribeMw.type === "SUBSCRIBE_PAID") {
				const allowance = await readContract({
					address: ERC20.address as `0x${string}`,
					abi: erc20ABI,
					functionName: "allowance",
					args: [
						walletAddress as `0x${string}`,
						subscribeMw.contractAddress as `0x${string}`,
					],
				});

				const subData = JSON.parse(subscribeMw.data);
				const needApprove = allowance.gte(
					ethers.utils.parseEther(ethers.utils.formatEther(subData.Amount.toString())),
				);

				if (!needApprove) {
					const _config = await prepareWriteContract({
						address: ERC20.address as `0x${string}`,
						abi: erc20ABI,
						functionName: "approve",
						args: [
							subscribeMw.contractAddress as `0x${string}`,
							ethers.utils.parseEther(
								ethers.utils.formatEther(subData.Amount.toString()),
							),
						],
					});
					const { hash } = await writeContract(_config);
					await waitForTransaction({ hash });
				}
			}
			const data = await subscribe({
				variables: { input: { profileIDs: [profile.profileID] } },
			});

			const typedData = data?.data?.createSubscribeTypedData?.typedData;
			const typedDataID = typedData.id;
			const parsed = JSON.parse(typedData.data);
			const signature = await signTypedDataAsync({
				domain: parsed.domain,
				types: parsed.types,
				value: parsed.message,
			});
			const relayResult = await relay({
				variables: {
					input: {
						typedDataID,
						signature,
					},
				},
			});
			const relayActionId = relayResult.data?.relay?.relayActionId;
			await getRelayActionStatus({
				variables: {
					relayActionId,
				},
			});
		} catch (error) {
			toast.dismiss();
			toast.error("Something went wrong");
		}
	};

	return (
		<div className="absolute left-auto right-0 mt-5 flex w-fit flex-col rounded-lg border bg-[#111111] p-2 font-poppins text-textMedium">
			{!isFollowed && (
				<button
					type="button"
					className="rounded-lg p-1 text-start hover:bg-slate-500"
					// onClick={handleFollow}
				>
					Follow
				</button>
			)}
			{isFollowed && (
				<button
					type="button"
					className="flex items-center rounded-lg p-1 text-start hover:bg-slate-500"
					// onClick={handleUnfollow}
				>
					Following <TiTick className=" text-textMedium3 text-green-500 " />
				</button>
			)}

			{!isSubscribed && (
				<button
					type="button"
					className="rounded-lg p-1 text-start hover:bg-slate-500"
					onClick={handleSubscribe}
				>
					Subscribe
				</button>
			)}
			{isSubscribed && (
				<span className="flex items-center space-x-3 rounded-lg p-1 text-start hover:bg-slate-500">
					Subscribed <TiTick className="text-textMedium3 text-green-500" />
				</span>
			)}
		</div>
	);
};

export default PostDropdown;
