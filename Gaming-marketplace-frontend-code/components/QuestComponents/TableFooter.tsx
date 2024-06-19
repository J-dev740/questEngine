import { useEffect } from "react";

const TableFooter = (props: any): any => {
	const { slice, page, setPage, range } = props;
	useEffect(() => {
		if (slice?.length < 1 && page !== 1) {
			setPage(page - 1);
		}
	}, [slice, page, setPage]);
	return (
		<div className="flex w-[100%] items-center  justify-between">
			<button
				className=" m-2 mx-10 rounded-lg border-2 p-2"
				type="button"
				onClick={() => {
					if (page > 1) {
						setPage(page - 1);
					}
				}}
			>
				LEFT
			</button>

			<div>
				{range.map((el: any) => (
					<button
						type="button"
						className={
							page === el
								? " m-2 h-7 w-7 rounded-md bg-blue-500"
								: "m-2 h-7 w-7 rounded-md"
						}
						onClick={() => {
							setPage(el);
						}}
					>
						{el}
					</button>
				))}
			</div>
			<button
				className=" m-2 mx-10 rounded-lg border-2 p-2"
				type="button"
				onClick={() => {
					if (page < range.length) {
						setPage(page + 1);
					}
				}}
			>
				RIGHT
			</button>
		</div>
	);
};

export default TableFooter;
