import * as yup from "yup";

export const ratingSchema = yup.object().shape({
	rating: yup.number().min(1).max(5).required(),
	content: yup.string().min(3).max(250).required(),
});

export type RatingType = yup.InferType<typeof ratingSchema>;
