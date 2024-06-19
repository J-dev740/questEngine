import * as yup from "yup";
import { miscApi } from "../../../features/misc/misc.api";
import store from "../../../features/store";

export const courseSchema = yup.object().shape({
	title: yup.string().min(3).required(),
	description: yup.string().min(3).max(250).required(),
	game: yup
		.string()
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		.test("game", "game must have a valid value", async (value) => {
			if (!value) return Promise.resolve(false);
			return store
				.dispatch(miscApi.endpoints.getGames.initiate())
				.then((res) => res.data)
				.then((res) => res?.map((item) => item._id).includes(value))
				.catch((err) => {
					throw err;
				});
		})
		.defined(),
	language: yup
		.string()
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		.test("language", "language must have a valid value", async (value) => {
			if (!value) return Promise.resolve(false);
			return store
				.dispatch(miscApi.endpoints.getLanguages.initiate())
				.then((res) => res.data)
				.then((res) => res?.map((item) => item._id).includes(value))
				.catch((err) => {
					throw err;
				});
		})
		.defined(),
	primaryPriceIndex: yup.number().min(0).nonNullable().required(),
	prices: yup
		.array()
		.of(
			yup.object().shape({
				currency: yup
					.string()
					// eslint-disable-next-line @typescript-eslint/ban-ts-comment
					// @ts-ignore
					.test("currency", "currency must have a valid value", async (value) => {
						return store
							.dispatch(miscApi.endpoints.getCurrency.initiate())
							.then((res) => res.data)
							.then((res) => res?.map((item) => item._id).includes(value as string))
							.catch((err) => {
								throw err;
							});
					})
					.defined(),
				amount: yup
					.number()
					.min(0)
					.required()
					.defined()
					.typeError("amount must be a number"),
			}),
		)
		.min(1)
		.required(),
	icon: yup.mixed().defined("Icon must be uploaded").required(),
});

export type CourseType = yup.InferType<typeof courseSchema>;

export const videoSchema = yup.object().shape({
	id: yup.number().positive().required(),
	title: yup.string().min(3).required(),
	description: yup.string().min(3).max(250).required(),
	videoFile: yup.mixed().defined("Video must be uploaded").required(),
	posterFile: yup.mixed().defined("Poster must be uploaded").required(),
});
export type VideoType = yup.InferType<typeof videoSchema>;
