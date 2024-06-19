import * as yup from "yup";

export const handleSchema = yup.object().shape({
	icon: yup.mixed().defined("Icon must be uploaded").required(),
	handle: yup
		.string()
		.min(12, "handle must be min. 12 char")
		.max(20, "handle must be max 20 chars")
		.test((value, ctx) => {
			if (typeof value !== "string")
				return ctx.createError({ message: "handle must be a string" });
			if (value.includes(" "))
				return ctx.createError({ message: "handle cant include spaces" });
			if (/[A-Z]/.test(value))
				return ctx.createError({ message: "handle cant have capitals" });
			return true;
		}),
});

export type ExpertType = yup.InferType<typeof handleSchema>;
