import Head from "next/head";
import Link from "next/link";
import OngoingLivestreamsList from "../../components/cards/lists/livestreams.onging.list";
import UpcomingLivestreamsList from "../../components/cards/lists/livestreams.upcoming.list";

const AllLivestreams = () => {
	return (
		<>
			<Head>
				<title>Livestreams</title>
			</Head>

			<div className="overflow-y-scroll pl-6 pt-[10vh]">
				<div className="space-y-6">
					<div className="flex items-center">
						<h1 className="font-poppins text-text4xl font-[700]">
							Ongoing Livestreams
						</h1>
						<Link
							href="/404"
							className="ml-auto pr-10 font-poppins text-textMedium3 font-[500]"
						>
							Show all
						</Link>
					</div>
					<OngoingLivestreamsList />
				</div>

				<div className="space-y-6">
					<div className="flex items-center">
						<h1 className="font-poppins text-text4xl font-[700]">
							Upcoming Livestreams
						</h1>
						<Link
							href="/404"
							className="ml-auto pr-10 font-poppins text-textMedium3 font-[500]"
						>
							Show all
						</Link>
					</div>
					<UpcomingLivestreamsList />
				</div>
			</div>
		</>
	);
};

export default AllLivestreams;
