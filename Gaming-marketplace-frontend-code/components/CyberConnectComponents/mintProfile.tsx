import { StartMinting } from "./buttons";

const MintProfile = () => {
	return (
		<div>
			<div className="my-7 flex w-full flex-col rounded-xl border border-[#C8C8C8] bg-[#151515] px-10 py-[60px]">
				<h1 className="mb-6 font-poppins text-text3xl font-semibold">
					Mint your Cyberconnect profile
				</h1>
				<span className="mb-6 text-gray-500">
					Facilisi viverra dictum augue eu lobortis elit. Facilisi viverra dictum augue eu
					lobortis elit.
				</span>
				<div className=" flex">
					<StartMinting text="Mint your CC profile" />
				</div>
			</div>
		</div>
	);
};

export default MintProfile;
