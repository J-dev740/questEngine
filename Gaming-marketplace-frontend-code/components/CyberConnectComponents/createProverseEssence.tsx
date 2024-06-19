import Image from "next/image";
import { useState } from "react";
import { IPrimaryProfileCard } from "../../features/cyber-connect/cyber.types";
import NewEssenceForm from "./forms/newEssence/newEssence.form";

interface Props {
	primaryProfile: IPrimaryProfileCard;
}

const CreateProverseEssence = ({ primaryProfile }: Props) => {
	const [openEssence, setOpenEssence] = useState(false);
	return (
		<div className=" w-full rounded-lg bg-gradient-to-r from-[#296BBD] to-[#AC85FF] p-[2px]">
			<div className="flex w-full items-center space-x-4 rounded-lg bg-[#111111] px-10 py-7">
				<Image
					src={primaryProfile.avatar}
					alt="user"
					height={0}
					width={0}
					sizes="100vw"
					className=" aspect-square h-auto w-[60px] rounded-full"
				/>
				<input
					type="text"
					placeholder="Type Here...."
					className="flex-grow rounded-2xl bg-[#080808] p-4 pl-6 text-textMedium2 font-[500] text-white placeholder-white"
				/>
				<button
					type="button"
					className="flex items-center justify-center rounded-2xl bg-gradient-to-r from-[#296BBD] to-[#AC85FF] px-8 py-4 font-poppins text-textMedium2 font-[500] text-white"
					onClick={() => setOpenEssence(true)}
				>
					Create Essence
				</button>
				{openEssence && (
					<div>
						<NewEssenceForm onClose={() => setOpenEssence(false)} />
					</div>
				)}
			</div>
		</div>
	);
};

export default CreateProverseEssence;
