import { RefObject, useEffect } from "react";

interface Props {
	ref: RefObject<HTMLElement>;
	callback: () => void;
}

const useOutsideClick = ({ ref, callback }: Props) => {
	const handleClick = (e: MouseEvent) => {
		if (ref.current && !ref.current.contains(e.target as Node)) {
			callback();
		}
	};

	useEffect(() => {
		document.addEventListener("click", handleClick);

		return () => {
			document.removeEventListener("click", handleClick);
		};
	});
};

export default useOutsideClick;
