/* eslint-disable react/require-default-props */

import Image from "next/image";
import { Button2, Button5 } from "../common/form/button";
import { CopyClipboard } from "../copyToClipboard";

interface AboutProps {
	streamKey: string;
	data: Array<{ field: string; content: string | Array<string> }>;
	submitText?: string;
	isSelf?: boolean;
	handleCourse?: () => void;
	handleLivestream?: () => void;
}

const About = ({
	streamKey,
	data = [],
	submitText,
	isSelf = false,
	handleCourse,
	handleLivestream,
}: AboutProps) => {
	const parseContent = (content: string | Array<string>) => {
		if (typeof content === "string") return <p className="text-lg">{content}</p>;
		return <div>{content.join(" ")}</div>;
	};

	return (
		<div className="flex h-full flex-col justify-between space-y-4 p-5">
			<div className="mb-auto space-y-12">
				{data.map((item) => (
					<div className="space-y-4 font-poppins">
						<h1 className="text-textxl font-bold">{item.field}</h1>
						<p className="text-textMedium3 leading-7 text-card-text">
							{parseContent(item.content)}
						</p>
					</div>
				))}
			</div>

			{isSelf && (
				<div className="mt-auto flex w-full space-x-2 border-t-[1px] border-pallete2 py-6">
					<div className="flex w-full items-center space-x-2">
						<Button2
							text="Create a course"
							onClick={handleCourse}
							className="text-textLarge font-bold"
						/>
						<Button5
							text="Create a livestream"
							onClick={handleLivestream}
							className="text-textLarge font-bold"
						/>
						<CopyClipboard streamKey={streamKey} />
					</div>
				</div>
			)}

			{submitText && (
				<div className="mt-auto border-t-[1px] border-pallete2 py-6">
					<div className="flex justify-between">
						<div className="flex h-auto w-auto">
							<div>
								<Image
									src="/facebook.png"
									alt="dot"
									width="25"
									height="25"
									className="center m-1 mr-2 rounded-full border-[1px] border-white p-1"
								/>
							</div>
							<div>
								<Image
									src="/linkedin.png"
									alt="dot"
									width="25"
									height="25"
									className="center m-1 mr-2 rounded-full border-[1px] border-white p-1"
								/>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default About;
