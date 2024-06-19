/* eslint-disable react/require-default-props */

export interface ProgressBarProps {
	progressBar: number;
}

export const ProgressBar = ({ progressBar }: ProgressBarProps) => {
	return (
		<div className="m-2 flex flex-row justify-around">
			<div
				className="ml-[-30px] h-[12px] w-[130px] rounded-[50px] bg-[#1B1047]"
				// style={{
				// 	["background-color" as any]: "black",
				// 	["border-radius" as any]: "50px",
				// 	["width" as any]: "130px",
				// 	["margin-left" as any]: "-30px",
				// 	["height" as any]: "12px",
				// }}
			>
				<div
					// className={`rounded-[50px] bg-[#DB2750] w-[${progressBar}%] h-[12px]`}
					style={{
						["background-color" as any]: "#2A84C0",
						["border-radius" as any]: "50px",
						["width" as any]: `${progressBar}%`,
						["height" as any]: "12px",
					}}
				/>
			</div>
		</div>
	);
};
