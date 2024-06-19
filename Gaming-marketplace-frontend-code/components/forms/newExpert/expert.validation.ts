import * as yup from "yup";
import { miscApi } from "../../../features/misc/misc.api";
import store from "../../../features/store";

export const expertSchema = yup.object().shape({
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
	username: yup.string().min(3).max(250).required(),
	about: yup.string().min(3).max(250).required(),
});

export type ExpertType = yup.InferType<typeof expertSchema>;
