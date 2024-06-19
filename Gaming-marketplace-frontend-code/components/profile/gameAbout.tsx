/* eslint-disable react/require-default-props */

interface AboutProps {
	data: Array<{ field: string; content: string | React.ReactNode }>;
}

const GameAbout = ({ data = [] }: AboutProps) => {
	return (
		<div className="flex h-full flex-col space-y-2 p-10">
			<div className="mb-auto space-y-12">
				{data.map((item) => (
					<div className="space-y-4 font-poppins">
						<h1 className="text-textxl font-bold">{item.field}</h1>
						<p className="text-textMedium3 leading-7 text-card-text">{item.content}</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default GameAbout;
