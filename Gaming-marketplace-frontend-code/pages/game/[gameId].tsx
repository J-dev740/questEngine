/* eslint-disable react/jsx-indent */
/* eslint-disable indent */
import { skipToken } from "@reduxjs/toolkit/dist/query";
import Head from "next/head";
import { useRouter } from "next/router";
import ExpertCardDiscover from "../../components/cards/expertCard.discover";
import CardsList from "../../components/common/cards/cardList";
import Header from "../../components/profile/gameHeader";
import {
	useGetGameExpertsQuery,
	useGetGameQuery,
} from "../../features/profile-page/games/game.api";

const GamePage = () => {
	const router = useRouter();
	const { gameId } = router.query;
	// const { data: experts } = useGetExpertsQuery();

	const { data: game } = useGetGameQuery((gameId as string) ?? skipToken);
	const {
		data: experts,
		isLoading,
		isError,
	} = useGetGameExpertsQuery((gameId as string) ?? skipToken);

	if (isLoading)
		return (
			<h1 className="text-2xl mb-auto mt-auto text-center font-semibold ">
				Searching for the expert...
			</h1>
		);
	if (isError)
		return (
			<h1 className="text-2xl mb-auto mt-auto text-center font-semibold">Games not found</h1>
		);
	if (!experts || !game)
		return (
			<h1 className="text-2xl mb-auto mt-auto text-center font-semibold">
				Something unexpected happened
			</h1>
		);

	return (
		<>
			<Head>
				<title>Game - {game?.title}</title>
			</Head>
			<div className="page-game relative overflow-y-scroll pl-6">
				<Header title={game?.title} />

				{/* <GameAbout
					data={[
						{
							field: "About Game",
							content: `${game?.description}`,
						},
					]}
				/> */}
				<div className="w-full flex-col px-20 pb-20">
					{/* <TabGroup2
						className="mt-[-180px]"
						Tab1Title="About"
						Tab2Title="Reviews"
						Tab1Content={
							<GameAbout
								data={[
									{
										field: "About Game",
										content: `${game?.description}`,
									},
								]}
							/>
						}
						Tab2Content={
							game && (
								<ReviewCard data-tab-title="Reviews" id={game._id} type="Game" />
							)
						}
					/> */}

					<div className="flex h-fit flex-col space-y-2 pb-6">
						<div className="mb-auto space-y-12">
							<div className="space-y-4 font-poppins">
								<h1 className="text-textxl font-bold">About Game</h1>
								<p className="text-textMedium3 leading-7 text-card-text">
									{game?.description}
								</p>
							</div>
						</div>
					</div>

					<div className="flex h-fit flex-col space-y-6">
						<h2 className="my-4 font-Anek text-[48px] font-bold leading-[70px] text-white">
							Experts
						</h2>

						<CardsList className="gap-6 pb-6">
							{experts
								? experts[0]?.result.map((expertDet) => (
										<ExpertCardDiscover expert={expertDet} />
								  ))
								: null}
						</CardsList>
					</div>
				</div>
			</div>
		</>
	);
};

export default GamePage;
