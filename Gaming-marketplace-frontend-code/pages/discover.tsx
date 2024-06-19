import Head from "next/head";
import DiscoverExpertsList from "../components/cards/lists/discover.experts.list";
import DiscoverGamesList from "../components/cards/lists/discover.games.list";

const Discover = () => {
	return (
		<>
			<Head>
				<title>Discover</title>
			</Head>
			<div className="mt-5 overflow-y-scroll px-4 pl-0 pt-[10vh] lg:mt-0 lg:pl-8">
				<h1 className="p-1 px-4 font-Anek text-text2xl font-bold md:text-header1">Games</h1>
				<DiscoverGamesList />
				{/* <h1 className="p-1 font-Anek text-header1 font-bold ">Courses</h1>
				<DiscoverCoursesList /> */}
				<h1 className="p-1 px-4 font-Anek text-text2xl font-bold md:text-header1 ">
					Experts
				</h1>
				<DiscoverExpertsList />
			</div>
		</>
	);
};
export default Discover;
