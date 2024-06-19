/* eslint-disable react/require-default-props */
import { FormEvent, useState } from "react";
import { MdRadioButtonChecked, MdRadioButtonUnchecked } from "react-icons/md";
import { TiTick, TiTrash } from "react-icons/ti";
import { ValidationError } from "yup";
import { useGetCurrencyQuery } from "../../../features/misc/misc.api";
import { PriceInfo } from "../../../features/types";
import { InputField2 } from "../../common/form/inputField";
import { Select2 } from "../../common/form/selectField";
import { priceSchema } from "./newPrice.validation";

interface CustomElements extends HTMLFormControlsCollection {
	currency: HTMLSelectElement;
	amount: HTMLInputElement;
}

interface NewCourseFormElements extends HTMLFormElement {
	readonly elements: CustomElements;
}

interface Props {
	error: string | null;
	data: PriceInfo[];
	primaryIndex?: number | null;
	onSelect: (_id: number) => void;
	onResult: (_data: PriceInfo) => void;
	onRemove: (_id: number) => void;
}

const royalty = process.env.NEXT_PUBLIC_ROYALTY as string;

const NewPriceForm = ({
	onResult,
	onRemove,
	onSelect,
	primaryIndex = null,
	data,
	error,
}: Props) => {
	const { data: currencies } = useGetCurrencyQuery();
	const [errors, setErrors] = useState<{ [k: string]: string | null }>({});
	const [primary, setPrimary] = useState<number | null>(primaryIndex);

	const remCurr = currencies?.filter((item) => {
		for (const i of data) {
			if (i.currency === item._id) return false;
		}
		return true;
	});

	const handleSubmit = async (e: FormEvent<NewCourseFormElements>) => {
		e.preventDefault();
		const { currency, amount } = e.currentTarget.elements;

		try {
			const result = await priceSchema.validate(
				{
					currency: currency.value,
					amount: amount.value,
				},
				{ abortEarly: false },
			);
			setErrors({});
			const resultObj = { ...result };
			onResult(resultObj);
		} catch (error) {
			const errs: typeof errors = {};

			(error as ValidationError).inner.forEach((item) => {
				errs[item.path!] = item.message;
			});
			setErrors(errs);
		}
	};

	const handleChange = async (e: React.ChangeEvent<HTMLElement & { name: string }>) => {
		const err = { ...errors };
		err[e.target.name] = null;
		setErrors(err);
	};

	if (!currencies) return null;

	return (
		<div className="h-fit w-full ">
			<label className="text-md">
				Prices
				{error && <p className="italic text-red-500">{error}</p>}
			</label>
			<div
				className={`space-y-4 rounded-lg border-2 border-[#404040] ${
					error && "border-red-500"
				} px-2 pb-4`}
			>
				{data.map((item, index) => {
					return (
						<div className="flex items-center space-x-2 !text-card-text">
							{index === primary ? (
								<MdRadioButtonChecked className="mt-4 text-textMedium3 text-blue-400" />
							) : (
								<MdRadioButtonUnchecked
									onClick={() => {
										setPrimary(index);
										onSelect(index);
									}}
									className="mt-4 text-textMedium3 hover:cursor-pointer hover:text-blue-400"
								/>
							)}
							<Select2
								label="Currency"
								name="currency"
								error={null}
								value={item.currency}
								options={[
									{
										text: "select...",
										value: "",
										disabled: true,
									},
									...currencies.map((item) => ({
										text: item.name,
										value: item._id,
									})),
								]}
								disabled
							/>
							<InputField2
								label={`Amount received: ${
									Math.trunc(100000 * item.amount * (1 - Number(royalty))) /
									100000
								}`}
								name="amount"
								placeholder="Enter details..."
								error={null}
								className="!text-card-text"
								value={item.amount}
								disabled
							/>
							<button
								type="button"
								onClick={() => {
									setPrimary(null);
									onRemove(index);
								}}
							>
								<TiTrash className=" mt-4 text-textxl hover:text-red-500" />
							</button>
						</div>
					);
				})}
				{remCurr && remCurr.length > 0 && (
					<form onSubmit={handleSubmit} className="flex items-center space-x-2">
						<p className="mt-4 p-1 text-textMedium3">{data.length}</p>
						<Select2
							label="Currency"
							name="currency"
							options={[
								{
									text: "select...",
									value: "",
									disabled: true,
								},
								...remCurr.map((item) => ({
									text: item.name,
									value: item._id,
								})),
							]}
							error={errors.currency ?? null}
							onChange={handleChange}
						/>
						<InputField2
							label="Amount"
							name="amount"
							placeholder="Enter details..."
							error={errors.amount ?? null}
							onChange={handleChange}
						/>
						<button type="submit">
							<TiTick className="mt-4  text-textxl hover:text-green-500" />
						</button>
					</form>
				)}
			</div>
		</div>
	);
};

export default NewPriceForm;
