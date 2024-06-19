import * as yup from "yup";

export const freeEssenceSchema = yup.object().shape({
	text: yup.string().min(3).required(),
	image: yup.mixed().defined("Image must be uploaded").required(),
});

export const paidEssenceSchema = yup.object().shape({
	text: yup.string().min(3).required(),
	image: yup.mixed().defined("Image must be uploaded").required(),
	price: yup.number().min(0).required().typeError("price must be a number"),
	quantity: yup.number().integer().min(0).required().typeError("price must be a number"),
});

export const limitedEssenceSchema = yup.object().shape({
	text: yup.string().min(3).required(),
	image: yup.mixed().defined("Image must be uploaded").required(),
	price: yup.number().min(0).required().typeError("price must be a number"),
	quantity: yup.number().integer().min(0).required().typeError("price must be a number"),
	startDate: yup.date().required(),
	endDate: yup.date().min(yup.ref("startDate"), "endDate must be more than startDate").defined(),
});

export type FreeEssenceType = yup.InferType<typeof freeEssenceSchema>;
export type PaidEssenceType = yup.InferType<typeof paidEssenceSchema>;
export type LimitedEssenceType = yup.InferType<typeof limitedEssenceSchema>;
