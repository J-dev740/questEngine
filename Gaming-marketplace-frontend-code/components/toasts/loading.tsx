const Loading = () => (
	<div
		className="flex  h-[256px] w-[413px]  translate-y-2 flex-col items-center justify-center gap-[20px] rounded-[16px] border-[2px] border-gray-800 bg-gradient-to-t from-[#404040] to-[#49505700]
				px-[48px] pb-[48px] pt-[32px] font-poppins font-bold  text-white backdrop-blur-[50px] duration-500 ease-in-out hover:translate-y-5 hover:shadow-none "
	>
		<div>
			<div
				className="h-[102px] w-[102px] animate-spin rounded-full border-[9px]  border-[#294A8D] border-current border-r-[#FFFFFF]   align-[-0.125em]"
				role="status"
			/>
		</div>
		<div className="text-[20px] leading-[32px] text-[#D9D9D9]">Loading...</div>
	</div>
);

export default Loading;
