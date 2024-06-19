/* eslint-disable react/require-default-props */

interface GradientBtnProps {
	title: string;
	onClick?: (_event: React.MouseEvent<HTMLButtonElement>) => void;
}

const GradientButton = ({ title, onClick }: GradientBtnProps) => {
	return (
		<section className="relative flex cursor-pointer justify-center rounded-lg border border-none bg-gradient-to-r from-[#296BBD] to-[#AC85FF] p-[1px]">
			<button
				type="button"
				className="text-base flex w-full items-center justify-center rounded-lg bg-[#111111] text-center font-semibold text-white"
				onClick={onClick}
			>
				<span className="mx-3 my-2 bg-gradient-to-r from-[#296BBD] to-[#AC85FF] bg-clip-text font-poppins text-textSmall text-transparent">
					{title}
				</span>
			</button>
		</section>
	);
};

export default GradientButton;
