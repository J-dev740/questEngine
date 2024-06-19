import { QueryStatus } from "@reduxjs/toolkit/dist/query";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import "react-paginate/theme/basic/react-paginate.css";
import LeaderboardTable from "../../components/QuestComponents/LeaderboardTable";
import {
	useLazyGetLeaderboardDailyQuery,
	useLazyGetLeaderboardMonthlyQuery,
} from "../../features/quest-engine/quest.api";

interface CustomUrlQuery extends ParsedUrlQuery {
	pageIndex: string;
	limit: string;
}

const Leaderboard = () => {
	const router = useRouter();
	const { pageIndex, limit } = router.query as CustomUrlQuery;
	const [args, setArgs] = useState({
		pageIndex: parseInt(pageIndex ?? 0),
		length: parseInt(limit ?? 10),
	});
	const [isActive, setIsActive] = useState(1);
	const [activeData, setActiveData] = useState([{ result: [] }, { totalCount: { count: 0 } }]);
	const [activeDataLength, setActiveDataLength] = useState(0);
	const [activeDataRange, setActiveDataRange] = useState(0);
	// const { data: dailyList, isLoading: dailyLoading } = useGetLeaderboardDailyQuery(args ?? skipToken);
	const [dailyTrigger, dailyList] = useLazyGetLeaderboardDailyQuery();
	// const { data: monthlyList, isLoading: monthlyLoading } = useGetLeaderboardMonthlyQuery(args ?? skipToken);
	const [monthlyTrigger, monthlyList] = useLazyGetLeaderboardMonthlyQuery();

	useEffect(() => {
		if (args) {
			if (isActive === 2) {
				monthlyTrigger(args);
			}
			if (isActive === 1) {
				dailyTrigger(args);
			}
		}
	}, [args, isActive]);

	useEffect(() => {
		if (
			isActive === 1 &&
			!dailyList.isUninitialized &&
			!dailyList.isLoading &&
			dailyList.status === QueryStatus.fulfilled
		) {
			console.log(dailyList);
			setActiveData(dailyList?.data[0]?.result);
			setActiveDataLength(dailyList?.data[0]?.totalCount?.count ?? 5);
			setActiveDataRange(Math.ceil(dailyList?.data[0]?.totalCount?.count / args.length));
		} else if (
			isActive === 2 &&
			!monthlyList.isUninitialized &&
			!monthlyList.isLoading &&
			monthlyList.status === QueryStatus.fulfilled
		) {
			console.log(monthlyList);
			setActiveData(monthlyList?.data[0]?.result);
			setActiveDataLength(monthlyList?.data[0]?.totalCount?.count ?? 5);
			setActiveDataRange(Math.ceil(monthlyList?.data[0]?.totalCount?.count / args.length));
		}
	}, [dailyList, monthlyList]);

	const handlePageChange = (selectedItem: { selected: number }) => [
		setArgs({ ...args, pageIndex: selectedItem.selected }),
	];

	const toast = {};

	if (dailyList.isLoading || monthlyList.isLoading) {
		return null;
	}

	return (
		<div className="flex flex-row gap-[4px]  overflow-y-scroll text-[#FCFCFD]">
			<div className="flex h-auto w-[80%] flex-[7] flex-col gap-[10px] rounded-bl-[48px] rounded-tl-[48px] ">
				<div className="basis-[84%] ">
					<div className="h-auto w-screen  text-[#FFFFF] md:w-full lg:min-w-full">
						<div className="relative left-4 top-[32px] h-full w-full lg:p-[15px]">
							<nav className="absolute left-0 right-0 top-[10vh] z-10 ml-auto mr-auto flex w-[90%] items-center justify-between rounded-md">
								<ol className="list-reset ">
									<li className="ml-[6%] text-text3xl font-bold ">Leaderboard</li>
								</ol>
								<div>
									<div className="inline-flex cursor-pointer items-center rounded-[20px] bg-[#111111] p-3 text-gray-800">
										<div
											className={`w-[100px] rounded-[16px]  px-4 py-2 text-center  ${
												isActive === 1
													? "bg-[#ffffff] text-[#111111]"
													: "text-white"
											}`}
											onClick={() => {
												setIsActive(1);
											}}
										>
											Daily
										</div>
										<div
											className={`w-[100px] rounded-[16px]  px-4 py-2 text-center ${
												isActive === 2
													? "bg-[#ffffff] text-[#111111]"
													: "text-white"
											}`}
											onClick={() => {
												setIsActive(2);
											}}
										>
											Monthly
										</div>
									</div>
								</div>
							</nav>
							<div className="flex flex-col gap-5 pt-5">
								<h1 className="hover:text-primary-600 focus:text-primary-600 active:text-primary-700 light:text-primary-400 light:hover:text-primary-500 light:focus:text-primary-500 light:active:text-primary-600 text-[22px] text-white transition duration-150 ease-in-out" />
								<div className="flex  justify-center">
									<LeaderboardTable
										activeData={activeData}
										indexing={args.length * args.pageIndex}
									/>
								</div>
								<div className="mt-2 flex w-full justify-center p-5">
									<ReactPaginate
										pageCount={activeDataRange}
										containerClassName="flex flex-row gap-3 justify-center items-center"
										pageClassName="border hover:cursor-pointer rounded-lg border-[#111111] bg-[#212121] px-4 py-2 hover:bg-gradient-to-r from-[#296BBD] to-[#AC85FF]"
										nextClassName="border hover:cursor-pointer rounded-md border-[#111111] bg-[#212121] px-4 py-2 hover:bg-gradient-to-r from-[#296BBD] to-[#AC85FF]"
										previousClassName="border hover:cursor-pointer rounded-md border-[#111111] bg-[#212121] px-4 py-2 hover:bg-gradient-to-r from-[#296BBD] to-[#AC85FF]"
										activeClassName="bg-gradient-to-r from-[#296BBD] to-[#AC85FF]"
										onPageChange={handlePageChange}
										previousLabel="<  Previous"
										nextLabel="Next  >"
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Leaderboard;
