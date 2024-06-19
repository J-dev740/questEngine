import * as yup from "yup";
import { miscApi } from "../../../features/misc/misc.api";
import store from "../../../features/store";

export const priceSchema = yup.object().shape({
	currency: yup
		.string()
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		.test("currency", "invalid currency", async (value) => {
			return store
				.dispatch(miscApi.endpoints.getCurrency.initiate())
				.then((res) => res.data)
				.then((res) => res?.map((item) => item._id).includes(value as string))
				.catch((err) => {
					throw err;
				});
		})
		.defined(),
	amount: yup.number().min(0).required().typeError("invalid amount"),
});

export type CourseType = yup.InferType<typeof priceSchema>;
