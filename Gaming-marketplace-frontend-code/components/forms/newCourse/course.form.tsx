import { FormEvent, useCallback, useRef, useState } from "react";
import toast from "react-hot-toast";
import { AiFillCheckCircle } from "react-icons/ai";
import { ValidationError } from "yup";
import {
	useGetCurrencyQuery,
	useGetGamesQuery,
	useGetLanguagesQuery,
} from "../../../features/misc/misc.api";
import { CourseInfo, PriceInfo } from "../../../features/types";
import { UploadToS3 } from "../../../services/aws.upload";
import { Button2 } from "../../common/form/button";
import { Dropzone } from "../../common/form/dropzone";
import { InputField } from "../../common/form/inputField";
import { Select } from "../../common/form/selectField";
import { TextArea } from "../../common/form/textArea";
import Modal from "../../util/modal";
import NewPriceForm from "../newPrice/newPrice.form";
import { courseSchema } from "./newCourse.validation";
export type ResultType = Partial<CourseInfo>;

interface CourseProps {
	onResult: (_data: ResultType) => void;
	onClose: () => void;
	expertId: string;
}

interface CustomElements extends HTMLFormControlsCollection {
	title: HTMLInputElement;
	description: HTMLTextAreaElement;
	language: HTMLSelectElement;
	currency: HTMLSelectElement;
	game: HTMLSelectElement;
	price: HTMLInputElement;
}

interface NewCourseFormElements extends HTMLFormElement {
	readonly elements: CustomElements;
}

const CourseForm = ({ onClose, onResult, expertId }: CourseProps) => {
	const [errors, setErrors] = useState<{ [k: string]: string | null }>({});
	const [icon, setIcon] = useState<File | null>(null);

	const [isUploading, setIsUploading] = useState(false);
	const [imageUploaded, setImageUploaded] = useState(false);

	const [prices, setPrices] = useState<PriceInfo[]>([]);
	const [primaryCurIndex, setPrimaryCurIndex] = useState<number | null>(null);

	const submitRef = useRef<HTMLButtonElement>(null);

	const { data: languages } = useGetLanguagesQuery();
	const { data: games } = useGetGamesQuery();
	const { data: currencies } = useGetCurrencyQuery();

	const onIconUpload = useCallback(async (files: File[]) => {
		setIcon(files[0]);

		const err = { ...errors };
		err.icon = null;
		setErrors(err);
	}, []);

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
			setPrimaryCurIndex(null);
		}
		setPrices(newPrices);
	};

	const handlePrimaryIndexSelect = (id: number) => {
		const err = { ...errors };
		err["prices"] = null;
		setErrors(err);

		setPrimaryCurIndex(id);
	};

	const handleSubmit = async (e: FormEvent<NewCourseFormElements>) => {
		e.preventDefault();
		const { title, description, game, language } = e.currentTarget.elements;

		try {
			const { primaryPriceIndex, ...result } = await courseSchema.validate(
				{
					title: title.value,
					description: description.value,
					game: game.value,
					language: language.value,
					primaryPriceIndex: primaryCurIndex,
					prices,
					icon,
				},
				{ abortEarly: false },
			);

			toast.loading("Uploading image", { id: "loader" });
			const uploadedLink = await UploadToS3(
				icon,
				"NewCourse",
				`${expertId}/courses/${title.value}`,
			);
			toast.dismiss();
			toast.success("image uploaded successfully!");

			toast.success("Course form updated");
			onResult({
				...result,
				icon: uploadedLink as string,
				primaryCurrency: prices[primaryPriceIndex].currency,
				primaryAmount: prices[primaryPriceIndex].amount,
			});
		} catch (error) {
			const errs: typeof errors = {};

			(error as ValidationError).inner.forEach((item) => {
				if (!item.path) return;
				if (item.path === "primaryPriceIndex") errs["prices"] = item.message;
				else errs[item.path] = item.message;
			});
			setErrors(errs);
		}
	};

	const handleChange = async (e: React.ChangeEvent<HTMLElement & { name: string }>) => {
		const err = { ...errors };
		err[e.target.name] = null;
		setErrors(err);
	};

	if (!games || !currencies || !languages) return null;

	return (
		<Modal title="Course Details" handleExit={onClose}>
			{isUploading ? (
				<div
					className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] text-[#AC85FF] motion-reduce:animate-[spin_1.5s_linear_infinite]"
					role="status"
				/>
			) : imageUploaded ? (
				<AiFillCheckCircle size={20} className="text-[#50d71e]" />
			) : (
				<div className="max-h-[80vh] w-[33vw] space-y-1 overflow-y-scroll pr-4">
					<form
						onSubmit={(e: React.FormEvent<NewCourseFormElements>) => handleSubmit(e)}
						className="flex w-full flex-col space-y-1 font-Anek text-textMedium2"
					>
						<InputField
							label="Title"
							name="title"
							placeholder="Enter details..."
							error={errors.title ?? null}
							onChange={handleChange}
						/>
						<TextArea
							label="Description"
							name="description"
							placeholder="Enter description..."
							rows={4}
							error={errors.description ?? null}
							onChange={handleChange}
						/>
						<Dropzone
							label="Upload an icon:"
							name="icon"
							fileTypes={{ "image/*": [] }}
							error={errors.icon ?? null}
							onDrop={onIconUpload}
							disabled={false}
						/>
						{icon && icon.name}
						<Select
							label="Game"
							name="game"
							options={[
								{
									text: "select...",
									value: "",
									disabled: true,
								},
								...games.map((item) => ({
									text: item.title,
									value: item._id,
								})),
							]}
							error={errors.game ?? null}
							onChange={handleChange}
						/>
						<Select
							label="Language"
							name="language"
							options={[
								{
									text: "select...",
									value: "",
									disabled: true,
								},
								...languages.map((item) => ({
									text: item.name,
									value: item._id,
								})),
							]}
							error={errors.language ?? null}
							onChange={handleChange}
						/>
						<button type="submit" ref={submitRef} className="hidden" />
					</form>
					<NewPriceForm
						error={errors.prices ?? null}
						data={prices}
						onSelect={handlePrimaryIndexSelect}
						onResult={handlePriceSubmit}
						onRemove={handlePriceRemoval}
					/>
					<Button2
						type="submit"
						text="Next"
						className="!mt-4 ml-auto"
						onClick={() => submitRef.current?.click()}
					/>
				</div>
			)}
		</Modal>
	);
};

export default CourseForm;
