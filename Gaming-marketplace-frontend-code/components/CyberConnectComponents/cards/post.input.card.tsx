import Image from "next/image";
import React, { ChangeEvent, useState } from "react";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { walletAddressSelector } from "../../../features/auth/auth.selectors";
// import { cyberConnectSelector } from "../../../features/cyber-connect/cyber.selectors";
import { IPostInput, IPrimaryProfileCard } from "../../../features/cyber-connect/cyber.types";
import useWeb3Storage from "../../../features/cyber-connect/hooks/useWeb3Storage";
import { getAvatarSrc } from "../../../services/helper";

interface Props {
	primaryProfile: IPrimaryProfileCard;
}

const PostInput = ({ primaryProfile }: Props) => {
	const walletAddress = useSelector(walletAddressSelector);
	const [media, setMedia] = useState<string>();
	const mediaRef = React.useRef<HTMLInputElement>(null);
	const { storeFile } = useWeb3Storage();
	const [content, setContent] = React.useState<IPostInput>({
		title: "",
		body: "",
		author: primaryProfile.handle || "",
		media: null,
	});
	// const cyberConnect = useSelector(cyberConnectSelector);

	const handleOnClick = async () => {
		try {
			let data;
			let mediaCID;
			if (content.media) {
				mediaCID = await storeFile(content.media as File);
			}
			if (media)
				data = {
					title: content.title,
					author: content.author,
					body: content.body + ` ![image](${mediaCID})`,
				};
			else
				data = {
					title: content.title,
					author: content.author,
					body: content.body,
				};

			// const tx = await cyberConnect.createPost(data);
			// if (tx.status === "SUCCESS") {
			// 	setContent({
			// 		...content,
			// 		body: "",
			// 		media: null,
			// 	});
			// 	toast.success("Post created successfully.");
			// 	setMedia("");
			// }
		} catch (err) {
			toast.error("Something went wrong.");
		}
	};
	const handleOnChange = async (event: ChangeEvent<HTMLInputElement>) => {
		const name = event.target.name;
		const value = event.target.value;

		setContent({
			...content,
			[name]: value,
		});
	};
	const handleMediaChange = async () => {
		const file = mediaRef?.current?.files![0];
		if (!file) {
			setMedia("");
			return;
		}
		const fileTypes = ["image/jpeg", "image/jpg", "image/png"];
		const { size, type } = file;
		if (!fileTypes.includes(type)) {
			toast.error("File format must be either png or jpg");
			return false;
		}
		// Check file size to ensure it is less than 2MB.
		if (size / 1024 / 1024 > 2) {
			toast.error("File size exceeded the limit of 2MB");
			return false;
		}
		setContent({
			...content,
			["media"]: file,
		});
		const reader = new FileReader();
		if (file) {
			reader.readAsDataURL(file);
		}
		reader.onload = (readerEvent) => {
			setMedia(readerEvent?.target?.result?.toString());
		};
	};

	return (
		<div className="mx-auto my-2  mb-9 flex justify-center rounded-lg border  border-[#414141] bg-[#111111] px-1 py-5 lg:w-[95%]">
			<section className="hidden basis-[12%] sm:block">
				<Image
					src={
						primaryProfile?.metadataInfo?.avatar ||
						primaryProfile?.avatar ||
						getAvatarSrc(walletAddress)
					}
					alt="profile-pic"
					width="100"
					height="100"
					className="mx-auto h-8 w-8 rounded-full lg:h-12 lg:w-12"
				/>
			</section>
			<section className="basis-[88%]">
				<div className="flex rounded-lg">
					<input
						type="text"
						name="body"
						value={content.body}
						placeholder="Type here.."
						onChange={handleOnChange}
						className="basis-[90%]  rounded-lg bg-[#080808] p-3 text-white outline-none"
					/>
					<div className="flex justify-center align-middle">
						<input type="file" ref={mediaRef} onChange={handleMediaChange} hidden />
						{!media && (
							<button
								type="button"
								className="rounded-xl  px-3"
								onClick={() => mediaRef?.current?.click()}
							>
								<svg
									width={26}
									height={26}
									viewBox="0 0 24 24"
									stroke="url(#grad1)"
									className="my-auto"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<defs>
										<linearGradient
											id="grad1"
											x1="0%"
											y1="0%"
											x2="100%"
											y2="0%"
										>
											<stop
												offset="50%"
												stopColor="#296BBD"
												stopOpacity="1"
											/>
											<stop
												offset="100%"
												stopColor="#AC85FF"
												stopOpacity="1"
											/>
										</linearGradient>
									</defs>

									<g id="SVGRepo_iconCarrier">
										{" "}
										<path
											d="M16 5L19 2M19 2L22 5M19 2V8M12.5 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V16.2C3 17.8802 3 18.7202 3.32698 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21H17C17.93 21 18.395 21 18.7765 20.8978C19.8117 20.6204 20.6204 19.8117 20.8978 18.7765C21 18.395 21 17.93 21 17M10.5 8.5C10.5 9.60457 9.60457 10.5 8.5 10.5C7.39543 10.5 6.5 9.60457 6.5 8.5C6.5 7.39543 7.39543 6.5 8.5 6.5C9.60457 6.5 10.5 7.39543 10.5 8.5ZM14.99 11.9181L6.53115 19.608C6.05536 20.0406 5.81747 20.2568 5.79643 20.4442C5.77819 20.6066 5.84045 20.7676 5.96319 20.8755C6.10478 21 6.42628 21 7.06929 21H16.456C17.8951 21 18.6147 21 19.1799 20.7582C19.8894 20.4547 20.4547 19.8894 20.7582 19.1799C21 18.6147 21 17.8951 21 16.456C21 15.9717 21 15.7296 20.9471 15.5042C20.8805 15.2208 20.753 14.9554 20.5733 14.7264C20.4303 14.5442 20.2412 14.3929 19.8631 14.0905L17.0658 11.8527C16.6874 11.5499 16.4982 11.3985 16.2898 11.3451C16.1061 11.298 15.9129 11.3041 15.7325 11.3627C15.5279 11.4291 15.3486 11.5921 14.99 11.9181Z"
											stroke="url(#grad1)"
											strokeWidth="2"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
									</g>
								</svg>
							</button>
						)}
					</div>
					<button
						type="submit"
						className="m-2 rounded-lg bg-gradient-to-r from-[#296BBD] to-[#AC85FF] px-3  py-2 duration-300 ease-in-out hover:scale-105  sm:w-[25%]"
						onClick={handleOnClick}
					>
						Create Post
					</button>
				</div>
				<div className="flex">
					{media && (
						<div className="relative">
							<Image
								src={media}
								alt="profile-picture"
								width={300}
								height={300}
								className="mt-5 aspect-auto rounded-xl "
							/>
							<button
								type="button"
								onClick={() => setMedia("")}
								className="absolute right-1 top-6 rounded-full bg-red-500 px-2 text-white"
							>
								x
							</button>
						</div>
					)}
				</div>
			</section>
		</div>
	);
};

export default PostInput;
