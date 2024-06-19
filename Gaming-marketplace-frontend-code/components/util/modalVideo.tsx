/* eslint-disable react/require-default-props */

interface IModal {
	children: React.ReactNode;
}

export const ModalVideo = ({ children }: IModal) => {
	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm ">
			{children}
		</div>
	);
};

export default ModalVideo;
