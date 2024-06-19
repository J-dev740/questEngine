import React, { MouseEvent, useEffect, useState } from "react";

type ModalProps = {
	isOpen: boolean;
	onClose: () => void;
	children: React.ReactNode; // Add children prop
};

// Modal component
const ModalCalender: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
	// Use state to track the visibility of the modal
	const [isVisible, setIsVisible] = useState(isOpen);

	// Add event listener to listen for "Escape" key press
	useEffect(() => {
		const handleEscapeKey = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				onClose();
			}
		};

		if (isOpen) {
			window.addEventListener("keydown", handleEscapeKey);
		}

		return () => {
			window.removeEventListener("keydown", handleEscapeKey);
		};
	}, [isOpen, onClose]);

	const handleOutsideClick = (event: MouseEvent) => {
		const modalContent = document.getElementById("modal-content");
		if (modalContent && !modalContent.contains(event.target as Node)) {
			handleClose();
		}
	};

	// Function to handle modal close
	const handleClose = () => {
		setIsVisible(false);
		onClose();
	};
	if (!isOpen) {
		return null; // Return null if modal is not open
	}

	// Render modal content
	return (
		<div className="relative" onClick={handleOutsideClick}>
			<div className="fixed inset-0 z-50 flex h-screen w-screen items-center justify-center bg-opacity-75">
				<div className="relative right-[30%] top-[20%] mx-auto rounded-lg border-form-border bg-form-bg shadow-lg">
					<div id="modal-content" className="relative p-4">
						{children}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ModalCalender;
