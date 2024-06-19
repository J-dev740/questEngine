/* eslint-disable react/require-default-props */

import { useDropzone } from "react-dropzone";
import { FiUploadCloud } from "react-icons/fi";

interface IFileTypes {
	[key: string]: Array<string>;
}

interface DropzoneProps {
	name: string;
	label: string;
	maxFiles?: number;
	error?: string | null;
	className?: string;
	fileTypes?: IFileTypes; // use MIME Types
	disabled: boolean;
	onDrop: (_acceptedFiles: File[]) => Promise<void>;
}

const Dropzone = ({
	label,
	name,
	fileTypes = { "*": [] },
	onDrop,
	maxFiles = 1,
	className = "",
	error = null,
	disabled,
}: DropzoneProps) => {
	const { getRootProps, getInputProps, isDragAccept, isDragReject } = useDropzone({
		accept: fileTypes,
		maxFiles,
		onDrop,
	});

	return (
		<div className="flex flex-col focus:bg-none">
			<label htmlFor={name} className="text-md">
				{label}
				{error && <p className="italic text-red-500">{error}</p>}
			</label>
			<div
				className={`flex min-w-full flex-col items-center justify-center gap-[12px] rounded-lg border-[1px] border-dashed border-form-child-border bg-form-child-bg p-4 hover:cursor-pointer focus:border-indigo-500 
					${disabled ? "pointer-events-none" : ""}
					${className}`}
				{...getRootProps({ isDragAccept, isDragReject })}
			>
				<input {...getInputProps()} className="focus:bg-none" />
				<div className="rounded-full border-[1px] p-2 ">
					<FiUploadCloud className="text-textMedium3 " />
				</div>
				<div className="flex flex-col text-center placeholder:text-form-child-placeholder">
					<span className="font-500 text-textMedium text-form-child-text">
						Click to upload
						<span className="font-400 ml-1">or drag and drop</span>
					</span>
					<div className="font-400 text-[12px] ">
						mp4, PNG, JPG or GIF (max. 800x400px)
					</div>
				</div>
			</div>
		</div>
	);
};

export { Dropzone };
export type { DropzoneProps };
