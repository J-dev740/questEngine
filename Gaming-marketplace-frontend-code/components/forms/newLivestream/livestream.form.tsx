import { addMinutes } from "date-fns";
import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import { ValidationError } from "yup";
import {
	useGetCurrencyQuery,
	useGetGamesQuery,
	useGetLanguagesQuery,
} from "../../../features/misc/misc.api";
import { useCreateExpertLivestreamMutation } from "../../../features/profile-page/expert/expert.api";
import { UploadToS3 } from "../../../services/aws.upload";
import { Button2 } from "../../common/form/button";
import { Calender } from "../../common/form/calender";
import { Dropzone } from "../../common/form/dropzone";
import { InputField } from "../../common/form/inputField";
import { Select } from "../../common/form/selectField";
import { TextArea } from "../../common/form/textArea";
import Modal from "../../util/modal";
import { livestreamSchema } from "./livestream.validation";

interface LivestreamProps {
	expertId: string;
	onClose: () => void;
	onResult: () => void;
}

interface CustomElements extends HTMLFormControlsCollection {
	title: HTMLInputElement;
	game: HTMLSelectElement;
	language: HTMLSelectElement;
	description: HTMLTextAreaElement;
	duration: HTMLInputElement;
}

interface RegisterForm extends HTMLFormElement {
	readonly elements: CustomElements;
}

const NewLivestreamForm = ({ onClose, onResult, expertId }: LivestreamProps) => {
	const [create] = useCreateExpertLivestreamMutation();
	const [errors, setErrors] = useState<{ [k: string]: string | null }>({});
	const [calStart, setCalStart] = useState<Date>(new Date());
	const [icon, setIcon] = useState<File | null>(null); // complete later with s3 buckets
	const { data: languages } = useGetLanguagesQuery();
	const { data: games } = useGetGamesQuery();
	const { data: currencies } = useGetCurrencyQuery();

	const onIconUpload = useCallback(async (iconFiles: File[]) => {
		setIcon(iconFiles[0]);

		const err = { ...errors };
		err.icon = null;
		setErrors(err);
	}, []);

	const handleSubmit = async (e: React.FormEvent<RegisterForm>) => {
		e.preventDefault();
		const { title, game, description, language, duration } = e.currentTarget.elements;

		try {
			const result = await livestreamSchema.validate(
				{
					title: title.value,
					game: game.value,
					language: language.value,
					description: description.value,
					dateStart: calStart,
					duration: duration.value,
					icon,
				},
				{ abortEarly: false },
			);
			const { dateStart, duration: dur, ...send } = result;

			toast.loading("Uploading poster", { id: "loader" });
			const uploadedLink = await UploadToS3(
				icon,
				"NewLivestream",
				`${expertId}/livestreams/${title.value}`,
			);
			toast.success("image uploaded successfully!");

			toast.loading("Creating livestream", { id: "loader" });
			await create({
				...send,
				icon: uploadedLink,
				streamStart: dateStart.toISOString(),
				streamEnd: addMinutes(dateStart, dur).toISOString(),
				expertId,
			}).unwrap();
			toast.dismiss();
			toast.success("Livestream created successfully!", { duration: 1500 });

			onResult();
		} catch (error: any) {
			const errs: typeof errors = {};

			if (error instanceof ValidationError) {
				error.inner.forEach((item) => {
					errs[item.path as string] = item.message;
				});
				setErrors(errs);
				return;
			}
			toast.dismiss();
			toast.error(error.message ?? "Something went wrong");
		}
	};

	const handleChange = async (e: React.ChangeEvent<HTMLElement & { name: string }>) => {
		const err = { ...errors };
		err[e.target.name] = null;
		setErrors(err);
	};

	if (!games || !currencies || !languages) return null;

	return (
		<div>
			<Modal title="Livestream Details" handleExit={onClose}>
				<form
					onSubmit={(e: React.FormEvent<RegisterForm>) => handleSubmit(e)}
					className="flex max-h-[80vh] w-[33vw] flex-col space-y-1 overflow-y-scroll pr-4 font-Anek text-textMedium2"
				>
					<InputField
						label="Title"
						name="title"
						placeholder="Enter details..."
						error={errors.title ?? null}
						onChange={handleChange}
					/>

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
					<TextArea
						label="Description"
						name="description"
						placeholder="Enter description..."
						rows={4}
						error={errors.description ?? null}
						onChange={handleChange}
					/>
					<Dropzone
						label="Upload a icon:"
						name="icon"
						fileTypes={{ "image/*": [] }}
						error={errors.icon ?? null}
						onDrop={onIconUpload}
						disabled={false}
					/>
					<Calender
						// label="choose cal"
						error={errors.duration ?? null}
						handleDate={(day) => setCalStart(day)}
					/>
					<Button2 type="submit" text="Register" className="!mt-4 ml-auto" />
				</form>
			</Modal>
		</div>
	);
};

export default NewLivestreamForm;
