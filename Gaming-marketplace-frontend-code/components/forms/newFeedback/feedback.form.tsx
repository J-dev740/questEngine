import { useState } from "react";
import toast from "react-hot-toast";
import { ValidationError } from "yup";
import { useCreateFeedbackMutation } from "../../../features/misc/misc.api";
import { Button2 } from "../../common/form/button";
import { TextArea } from "../../common/form/textArea";
import Modal from "../../util/modal";
import { feedbackSchema } from "./feedback.validation";

interface LivestreamProps {
	onClose: () => void;
	onResult: () => void;
}

interface CustomElements extends HTMLFormControlsCollection {
	content: HTMLTextAreaElement;
}

interface RegisterForm extends HTMLFormElement {
	readonly elements: CustomElements;
}

const NewFeedbackForm = ({ onClose, onResult }: LivestreamProps) => {
	const [create] = useCreateFeedbackMutation();
	const [errors, setErrors] = useState<{ [k: string]: string | null }>({});

	const handleSubmit = async (e: React.FormEvent<RegisterForm>) => {
		e.preventDefault();
		const { content } = e.currentTarget.elements;

		try {
			const result = await feedbackSchema.validate(
				{ content: content.value },
				{ abortEarly: false },
			);

			toast.promise(create({ ...result }).unwrap(), {
				loading: "Submitting feedback...",
				error: "something went wrong :(",
				success: () => {
					setErrors({});
					onResult();
					return "Feedback submitted successfully!";
				},
			});
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
		<Modal title="Feedback" handleExit={onClose}>
			<form
				onSubmit={(e: React.FormEvent<RegisterForm>) => handleSubmit(e)}
				className="flex w-[33vw] flex-col"
			>
				<TextArea
					label="Content"
					name="content"
					placeholder="Write here..."
					rows={6}
					error={errors.content ?? null}
					onChange={handleChange}
				/>
				<Button2 type="submit" text="Done" className="!ml-auto" />
			</form>
		</Modal>
	);
};

export default NewFeedbackForm;
