import * as yup from "yup";

export const feedbackSchema = yup.object().shape({
	content: yup.string().min(3).max(250).required(),
});

export type FeedbackType = yup.InferType<typeof feedbackSchema>;
