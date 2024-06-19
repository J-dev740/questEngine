import { useCreateStream } from "@livepeer/react";
import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { useSignMessage } from "wagmi";
import { ValidationError } from "yup";
import { useCreateExpertMutation } from "../../../features/auth/auth.api";
import { walletAddressSelector } from "../../../features/auth/auth.selectors";
import { useGetGamesQuery, useGetLanguagesQuery } from "../../../features/misc/misc.api";
import { useGetSelfQuery } from "../../../features/profile-page/expert/expert.api";
import { UploadToS3 } from "../../../services/aws.upload";
import { Button2 } from "../../common/form/button";
import { Dropzone } from "../../common/form/dropzone";
import { InputField } from "../../common/form/inputField";
import { Select } from "../../common/form/selectField";
import { TextArea } from "../../common/form/textArea";
import Modal from "../../util/modal";
import { expertSchema } from "./expert.validation";

interface ExpertProps {
	onClose: () => void;
	onResult: () => void;
}

interface CustomElements extends HTMLFormControlsCollection {
	username: HTMLInputElement;
	language: HTMLSelectElement;
	game: HTMLSelectElement;
	about: HTMLTextAreaElement;
	bio: HTMLInputElement;
}

interface RegisterForm extends HTMLFormElement {
	readonly elements: CustomElements;
}

const NewExpertForm = ({ onClose, onResult }: ExpertProps) => {
	const { data: languages } = useGetLanguagesQuery();
	const { data: games } = useGetGamesQuery();
	const [create] = useCreateExpertMutation();
	const walletAddress = useSelector(walletAddressSelector);
	const { data: user } = useGetSelfQuery(walletAddress);

	const [errors, setErrors] = useState<{ [k: string]: string | null }>({});
	const [icon, setIcon] = useState<File | null>(null);

	const { mutateAsync: createStream } = useCreateStream({
		name: user ? user._id : "",
	});

	const { signMessageAsync } = useSignMessage();

	const onIconUpload = useCallback(async (iconFiles: File[]) => {
		setIcon(iconFiles[0]);

		const err = { ...errors };
		err.icon = null;
		setErrors(err);
	}, []);

	const handleSubmit = async (e: React.FormEvent<RegisterForm>) => {
		e.preventDefault();
		const { username, about, game, language, bio } = e.currentTarget.elements;

		try {
			const result = await expertSchema.validate(
				{
					username: username.value,
					about: about.value,
					game: game.value,
					language: language.value,
					bio: bio.value,
				},
				{ abortEarly: false },
			);

			toast.loading("Waiting for user signature", { id: "loader" });
			const sign = await signMessageAsync({
				message: `Signing with acc: ${walletAddress.toLowerCase()}`,
			});

			toast.loading("Uploading image", { id: "loader" });
			const uploadedLink = await UploadToS3(icon, "NewUser", user?._id as string);
			toast.success("image uploaded successfully!");

			toast.loading("Creating your stream key", { id: "loader" });
			const stream = await createStream?.();
			toast.success("Stream key created!");

			toast.loading("Creating your profile", { id: "loader" });
			await create({
				...result,
				role: "expert",
				icon: uploadedLink,
				walletAddress,
				signature: sign,
				streamKey: stream?.streamKey as string,
				streamId: stream?.id as string,
			}).unwrap();
			toast.dismiss();
			toast.success("Profile created successfully!", { duration: 1500 });

			toast("redirecting to profile page..", { duration: 1500 });
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

	if (!games || !languages) return null;
	if (!user) return null;

	if (!walletAddress) return <div>Please connect your walletAddress to proceed</div>;

	return (
		<Modal title="Expert Details" handleExit={onClose}>
			<form
				onSubmit={(e: React.FormEvent<RegisterForm>) => handleSubmit(e)}
				className="flex w-[33vw] flex-col space-y-1 font-Anek text-textMedium2"
			>
				<Dropzone
					label="Upload your photo"
					name="iconImage"
					fileTypes={{ "image/*": [] }}
					error={errors.icon ?? null}
					onDrop={onIconUpload}
					disabled={false}
				/>
				{icon && icon.name}
				<InputField
					label="Username"
					name="username"
					placeholder="Enter username"
					error={errors.username ?? null}
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
				<InputField
					label="Bio"
					name="bio"
					placeholder="Enter Bio"
					error={errors.bio ?? null}
					onChange={handleChange}
				/>
				<TextArea
					label="About"
					name="about"
					placeholder="Write here.."
					rows={4}
					error={errors.about ?? null}
					onChange={handleChange}
				/>
				<Button2 type="submit" text="Register" className="!mt-4 ml-auto" />
			</form>
		</Modal>
	);
};

export default NewExpertForm;
