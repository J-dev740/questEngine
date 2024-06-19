const RoundButton = (Props: any) => {
	const { text } = Props;
	return (
		<button
			type="button"
			className="text-xl ml-4 scale-110 rounded-3xl bg-[#1D1D1D] px-8 py-4 text-[#fff]"
		>
			{text}
		</button>
	);
};
export default RoundButton;
