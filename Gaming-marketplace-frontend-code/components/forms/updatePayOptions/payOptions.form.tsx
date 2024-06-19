import { prepareWriteContract, waitForTransaction, writeContract } from "@wagmi/core";
import { BigNumber, ethers } from "ethers";
import { useState } from "react";
import toast from "react-hot-toast";
import { ValidationError } from "yup";
import {
	useGetCurrencyQuery,
	useGetGamesQuery,
	useGetLanguagesQuery,
} from "../../../features/misc/misc.api";
import { useUpdatePayOptionsMutation } from "../../../features/profile-page/course/courses.api";
import { CURRENCY_TYPE, PriceInfo } from "../../../features/types";
import courseAbi from "../../../public/constants/course.abi.json";
import { Button2 } from "../../common/form/button";
import Modal from "../../util/modal";
import NewPriceForm from "../newPrice/newPrice.form";
import { payOptionsSchema } from "./payOptions.validation";

interface LivestreamProps {
	prevPayOptions: PriceInfo[];
	prevPrimaryCurrency: string;
	courseId: string;
	_expertId: string;
	onClose: () => void;
	onResult: () => void;
}

const primaryIndex = (prevPayOptions: PriceInfo[], prevPrimaryCurrency: string) => {
	for (let i = 0; i < prevPayOptions.length; i++) {
		if (prevPayOptions[i].currency === prevPrimaryCurrency) return i;
	}
	return -1;
};

const chainId = Number(process.env.NEXT_PUBLIC_CHAIN_ID as string);
const courseContract = process.env.NEXT_PUBLIC_COURSE_CONTR_ADDR as `0x${string}`; // polygon mumbai

const UpdatePayOptionsForm = ({
	onClose,
	onResult,
	_expertId,
	courseId,
	prevPayOptions,
	prevPrimaryCurrency,
}: LivestreamProps) => {
	const [errors, setErrors] = useState<{ [k: string]: string | null }>({});

	const [prices, setPrices] = useState<PriceInfo[]>(prevPayOptions);
	const [primaryCurIndex, setPrimaryCurIndex] = useState<number>(
		primaryIndex(prevPayOptions, prevPrimaryCurrency),
	);

	const [update] = useUpdatePayOptionsMutation();
	const { data: languages } = useGetLanguagesQuery();
	const { data: games } = useGetGamesQuery();
	const { data: currencies } = useGetCurrencyQuery();

	const handleContractWrite = async (config: any): Promise<any> => {
		const _config: any = await prepareWriteContract(config);
		return writeContract(_config);
	};

	const handleFormSubmit = async () => {
		try {
			await payOptionsSchema.validate({ prices }, { abortEarly: false });

			const { amount, currency } = prices[primaryCurIndex];

			const _currency = currencies?.filter((item) => item._id === currency)[0];
			const _amount =
				_currency?.type === CURRENCY_TYPE.base
					? ethers.utils.parseUnits(amount.toString(), "ether")
					: BigNumber.from(amount.toString());

			const _write = await handleContractWrite({
				address: courseContract,
				abi: courseAbi,
				functionName: "updateCourse",
				chainId,
				args: [`0x${courseId}`, [_currency?.contractAddress], [_amount]], // courseid, [tokenAddress], [price]
			});
			const id = toast.loading("Updating course...");
			await waitForTransaction({ hash: _write.hash })
				.then(() => {
					toast.dismiss(id);
					toast.success("Course updated!");
				})
				.catch(() => {
					toast.dismiss(id);
					toast.error("Something went wrong!");
				});

			await update({
				_expertId,
				courseId,
				prices,
				primaryAmount: amount,
				primaryCurrency: currency,
			}).unwrap();
			onResult();
		} catch (error: any) {
			const errs: typeof errors = {};

			if (error instanceof ValidationError) {
				error.inner.forEach((item) => {
					errs[item.path as string] = item.message;
				});
				setErrors(errs);
			} else {
				// JSON RPC MESSAGES //
				// Object.keys(error).forEach((k) => {
				// 	console.log(
				// 		`${k}: ${error[k]} ${
				// 			(typeof error[k] === "object" && Object.keys(error[k])) || " "
				// 		}`,
				// 	);
				// });
				toast.error("Something went wrong");
			}
		}
	};

	const handlePriceSubmit = (item: PriceInfo) => {
		const err = { ...errors };
		err["prices"] = null;
		setErrors(err);

		const newPrices = [...prices];
		newPrices.push(item);
		setPrices(newPrices);
	};

	const handlePriceRemoval = (id: number) => {
		const newPrices = prices.filter((item, index) => index !== id);
		if (id === primaryCurIndex) {
			setPrimaryCurIndex(-1);
		}
		setPrices(newPrices);
	};

	const handlePrimaryIndexSelect = (id: number) => {
		const err = { ...errors };
		err["prices"] = null;
		setErrors(err);

		setPrimaryCurIndex(id);
	};

	if (!games || !currencies || !languages) return null;

	return (
		<Modal title="Update Payment Options" handleExit={onClose}>
			<div className="flex flex-col space-y-4">
				<NewPriceForm
					error={errors.prices ?? null}
					data={prices}
					primaryIndex={primaryCurIndex}
					onSelect={handlePrimaryIndexSelect}
					onResult={handlePriceSubmit}
					onRemove={handlePriceRemoval}
				/>
				<Button2 onClick={handleFormSubmit} text="Submit" className="ml-auto" />
			</div>
		</Modal>
	);
};

export default UpdatePayOptionsForm;
