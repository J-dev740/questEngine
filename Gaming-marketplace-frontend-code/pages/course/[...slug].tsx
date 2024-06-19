import Link from "next/link";

const CourseSlug = () => {
	return (
		<h1 className="text-2xl mb-auto mt-auto text-center font-semibold ">
			It seems you have stumbled on an invalid page...
			<p>
				{"Click here to go back: "}
				<Link
					href="/home"
					className="text-stone-600 underline hover:cursor-pointer hover:text-stone-400"
				>
					Home
				</Link>
			</p>
		</h1>
	);
};

export default CourseSlug;
