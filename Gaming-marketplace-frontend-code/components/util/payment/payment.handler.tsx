import {
	erc20ABI,
	fetchBalance,
	prepareWriteContract,
	readContract,
	switchNetwork,
	waitForTransaction,
	writeContract,
} from "@wagmi/core";
import { BigNumber, ethers } from "ethers";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useAccount } from "wagmi";
import { useGetCurrencyQuery } from "../../../features/misc/misc.api";
import { CURRENCY_TYPE, PriceInfo } from "../../../features/types";
import paymentAbi from "../../../public/constants/payment.abi.json";
import { useEnrollUserMutation } from "../../../features/purchases/purchase.api";
import { walletAddressSelector } from "../../../features/auth/auth.selectors";
import { useSelector } from "react-redux";

const paymentContract = process.env.NEXT_PUBLIC_PAYMENT_CONTR_ADDR as `0x${string}`; // polygon mumbai

interface CoursePaymentProps {
	details: {
		receiver: `0x${string}`;
		courseId: string;
		price: PriceInfo;
	};
	text: string;
}

interface _PaymentObj {
	type: CURRENCY_TYPE;
	tokenAddress: `0x${string}`;
	tokenAmount: BigNumber | number;
	name: string;
}

const chainId = Number(process.env.NEXT_PUBLIC_CHAIN_ID as string);

let ans: _PaymentObj;

const PaymentHandler = ({ details: { receiver, courseId, price }, text }: CoursePaymentProps) => {
	const { data: currency } = useGetCurrencyQuery();
	const { address } = useAccount();
	const [enrollUser, { isSuccess, data }] = useEnrollUserMutation();
	const walletId: string = useSelector(walletAddressSelector);

	useEffect(() => {
		const init = async () => {
			try {
				const network = await switchNetwork({
					chainId,
				});
			} catch (error) {
				error;
			}
		};
		init();
	}, []);

	if (!currency) return null;
	console.log({ currency, price });

	for (const i of currency) {
		if (i._id === price.currency) {
			if (i.type === CURRENCY_TYPE.base) {
				ans = {
					type: CURRENCY_TYPE.base,
					tokenAddress: i.contractAddress as `0x${string}`,
					tokenAmount: price.amount,
					name: i.name,
				};
				break;
			}
			ans = {
				type: i.type,
				tokenAddress: i.contractAddress as `0x${string}`,
				tokenAmount: BigNumber.from(price.amount),
				name: i.name,
			};
			break;
		}
	}

	const handleContractWrite = async (config: any): Promise<any> => {
		const _config: any = await prepareWriteContract(config);
		return writeContract(_config);
	};

	const handlePay = async (tokenAddress: `0x${string}`, tokenAmount: BigNumber) => {
		console.log("abcd");

		let allowance: BigNumber;
		try {
			const balance = await readContract({
				address: tokenAddress,
				abi: erc20ABI,
				functionName: "balanceOf",
				chainId,
				args: [address as `0x${string}`], // wallet address, contract address
			});

			if (balance.lt(tokenAmount)) {
				toast.error("Insufficient balance");
				return;
			}

			allowance = await readContract({
				address: tokenAddress,
				abi: erc20ABI,
				functionName: "allowance",
				chainId,
				args: [address as `0x${string}`, paymentContract], // wallet address, contract address
			});

			console.log({ balance, allowance });

			if (allowance.lt(tokenAmount)) {
				const _write = await handleContractWrite({
					address: tokenAddress,
					abi: erc20ABI,
					functionName: "approve",
					chainId,
					args: [paymentContract, BigNumber.from(tokenAmount)], // contract addr, token amount
				});
				try {
					toast
						.promise(waitForTransaction({ hash: _write.hash }), {
							loading: "Adding token allowance...",
							error: "something went wrong :(",
							success: "Successfully added token allowance!",
						})
						.then((res) => {
							console.log("transaction result");
							console.log(res);
						})
						.catch((err) => {
							console.log("transaction error", err);
						});
				} catch (error) {
					console.log(error);
				}

				allowance = await readContract({
					address: tokenAddress,
					abi: erc20ABI,
					functionName: "allowance",
					chainId,
					args: [address as `0x${string}`, paymentContract], // wallet address, contract address
				});
				if (allowance.lt(tokenAmount)) {
					toast.error("Insufficient token allowance");
				}
			}

			const _write = await handleContractWrite({
				address: paymentContract,
				abi: paymentAbi,
				functionName: "makePaymentWithToken",
				chainId,
				args: [receiver, BigNumber.from(tokenAmount), tokenAddress, `0x${courseId}`], // receiver, tokenAmount, tokenAddress, courseId
			});
			await toast.promise(
				waitForTransaction({ hash: _write.hash }),
				{
					loading: "Making payment...",
					error: "something went wrong :(",
					success:
						"Payment complete!. Please wait a couple of minutes till the transaction is confirmed",
				},
				{ success: { duration: 7000 } },
			);
		} catch (error: any) {
			if (error.code === 4001) return toast.error("User denied request");
			toast.error("Something went wrong :(");

			// JSON RPC MESSAGES //
			Object.keys(error).forEach((k) => {
				console.log(
					`${k}: ${error[k]} ${
						(typeof error[k] === "object" && Object.keys(error[k])) || " "
					}`,
				);
			});
		}
	};

	const handleNativePay = async (tokenAddress: `0x${string}`, tokenAmount: number) => {
		console.log("abcdefg");
		try {
			const balance = await fetchBalance({
				address: address as `0x${string}`,
			});

			const _write = await handleContractWrite({
				address: paymentContract,
				abi: paymentAbi,
				functionName: "makePayment",
				chainId,
				args: [receiver, `0x${courseId}`, tokenAddress], // receiver, courseId, tokenAddress
				overrides: { value: ethers.utils.parseEther(tokenAmount.toString()) },
			});
			console.log("transaction hash", _write.hash);
			await toast
				.promise(
					waitForTransaction({ hash: _write.hash }),
					{
						loading: "Making payment...",
						error: "something went wrong :(",
						success:
							"Payment complete!. Please wait a couple of minutes till the transaction is confirmed",
					},
					{ success: { duration: 7000 } },
				)
				.then((res) => {
					console.log("transaction result");
					console.log(res.status);
					if (res.status == 1) {
						// toast.success('Transaction confirmed')
						console.log(walletId);
						enrollUser({ id: courseId, walletAddress: walletId })
							.then(() => {
								if (isSuccess) {
									console.log(isSuccess);
								}
								// console.log('enrolled')
								// toast.success('Enrolled in course')
							})
							.catch((err) => {
								console.log("enroll error", err);
							});
					}
				})
				.catch((err) => {
					console.log("transaction error", err);
				});
		} catch (error: any) {
			if (error.code === 4001) return toast.error("User denied request");
			toast.error("Something went wrong :(");
		}
	};

	return (
		<div
			onClick={() => {
				switch (ans.type) {
					case CURRENCY_TYPE.base:
						handleNativePay(ans.tokenAddress, ans.tokenAmount as number);
						break;
					case CURRENCY_TYPE.erc20:
						handlePay(ans.tokenAddress, ans.tokenAmount as BigNumber);
						break;
					default:
						break;
				}
			}}
		>
			{`Buy-${ans.tokenAmount} ${ans.name}`}
		</div>
	);
};

export default PaymentHandler;
