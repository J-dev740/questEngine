import Image from "next/image";
import { useRouter } from "next/router";
import { GradientBtn } from "./buttons";

const SuggestedUsers = () => {
	const router = useRouter();
	return (
		<div className="py-9">
			<span className="mb-6 flex flex-row justify-between font-poppins text-textMedium2 font-semibold">
				Suggested For You
				<button
					type="button"
					onClick={() => router.push("/social/suggestions")}
					className="bg-gradient-to-r from-[#296BBD] to-[#AC85FF] bg-clip-text text-textMedium2 font-semibold text-transparent"
				>
					{"View All >"}
				</button>
			</span>
			<div className="mt-5 flex w-full flex-row items-center justify-between rounded-xl border border-[#212121] bg-[#151515] px-5 py-4">
				<div className="flex flex-row">
					<Image
						src="/cyberConnect/assets/img2.png"
						alt="user"
						height="50"
						width="50"
						className="mr-4 rounded-full"
					/>
					<div>
						<span className="flex flex-row justify-between font-poppins text-textMedium">
							Name
						</span>
						<span className="flex flex-row justify-between font-poppins text-textXs text-gray-400">
							@username
						</span>
					</div>
				</div>
				<GradientBtn title="Follow" />
			</div>

			<div className="mt-5 flex w-full flex-row items-center justify-between rounded-xl border border-[#212121] bg-[#151515] px-5 py-4">
				<div className="flex flex-row">
					<Image
						src="/cyberConnect/assets/img2.png"
						alt="user"
						height="50"
						width="50"
						className="mr-4 rounded-full"
					/>
					<div>
						<span className="flex flex-row justify-between font-poppins text-textMedium">
							Name
						</span>
						<span className="flex flex-row justify-between font-poppins text-textXs text-gray-400">
							@username
						</span>
					</div>
				</div>
				<GradientBtn title="Follow" />
			</div>

			<div className="mt-5 flex w-full flex-row items-center justify-between rounded-xl border border-[#212121] bg-[#151515] px-5 py-4">
				<div className="flex flex-row">
					<Image
						src="/cyberConnect/assets/img2.png"
						alt="user"
						height="50"
						width="50"
						className="mr-4 rounded-full"
					/>
					<div>
						<span className="flex flex-row justify-between font-poppins text-textMedium">
							Name
						</span>
						<span className="flex flex-row justify-between font-poppins text-textXs text-gray-400">
							@username
						</span>
					</div>
				</div>
				<GradientBtn title="Follow" />
			</div>
		</div>
	);
};

export default SuggestedUsers;
