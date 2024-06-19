import { useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { ValidationError } from "yup";
import { useCreateCourseReviewMutation } from "../../../features/profile-page/course/courses.api";
import { useCreateLivestreamReviewMutation } from "../../../features/profile-page/livestream/livestream.api";
import { Button2 } from "../../common/form/button";
import Rating from "../../common/form/selectField/rating";
import { TextArea } from "../../common/form/textArea";
import Modal from "../../util/modal";
import { ratingSchema } from "./review.validation";

interface RatingProps {
	id: string;
	type: "Livestream" | "Course";
	onClose: () => void;
	onResult: () => void;
}

interface CustomElements extends HTMLFormControlsCollection {
	content: HTMLTextAreaElement;
}

interface RegisterForm extends HTMLFormElement {
	readonly elements: CustomElements;
}

const NewReviewForm = ({ onClose, onResult, id, type }: RatingProps) => {
	let useCreateReviewMutation;

	// select a hook according to type
	switch (type) {
		case "Course": {
			useCreateReviewMutation = useCreateCourseReviewMutation;
			break;
		}
		case "Livestream": {
			useCreateReviewMutation = useCreateLivestreamReviewMutation;
			break;
		}
	}
	//63ca3466c8b56896d9681e4c
	const [create] = useCreateReviewMutation();
	const [errors, setErrors] = useState<{ [k: string]: string | null }>({});
	const rating = useRef<number>(0);

	const handleRating = (id: number) => {
		rating.current = id;
		if (id > 0) {
			const err = { ...errors };
			err.rating = null;
			setErrors(err);
		}
	};

	const handleSubmit = async (e: React.FormEvent<RegisterForm>) => {
		e.preventDefault();
		const { content } = e.currentTarget.elements;

		try {
			const result = await ratingSchema.validate(
				{
					rating: rating.current,
					content: content.value,
				},
				{ abortEarly: false },
			);

			if (type === "Course")
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
				toast.promise(create({ ...result, courseId: id, upvotes: 0 }).unwrap(), {
					loading: "Creating review...",
					error: "something went wrong :(",
					success: () => {
						onResult();
						return "Review created successfully!";
					},
				});
			if (type === "Livestream")
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
				toast.promise(create({ ...result, livestreamId: id, upvotes: 0 }).unwrap(), {
					loading: "Creating review...",
					error: "something went wrong :(",
					success: () => {
						onResult();
						return "Review created successfully!";
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
		<Modal title="Write Review" handleExit={onClose}>
			<form
				onSubmit={(e: React.FormEvent<RegisterForm>) => handleSubmit(e)}
				className="bg-pallete1-50 flex w-[25vw] flex-col space-y-2 text-white"
			>
				<Rating
					label="Give a rating"
					onRating={handleRating}
					error={errors.rating ?? null}
					className="w-3/5"
				/>
				<TextArea
					label=""
					name="content"
					placeholder="Write a review..."
					rows={4}
					error={errors.content ?? null}
					onChange={handleChange}
				/>
				<Button2 type="submit" text="Submit" className="ml-auto" />
			</form>
		</Modal>
	);
};

export default NewReviewForm;
