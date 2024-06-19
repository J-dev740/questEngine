import ArtistTile from "../../../components/CyberConnectComponents/cards/leaderboardArtist.card";

const Tile = () => {
	return (
		<div className="flex h-[70px] w-full items-center rounded-[20px] border border-[#363636] bg-[#212121] px-12 text-textMedium2 font-[600]">
			<span className="w-[5%] text-start">#</span>
			<span className="w-[35%] text-start">Artist</span>
			<span className="w-[15%] text-start">Change</span>
			<span className="w-[15%] text-start">NFTs sold</span>
			<span className="w-[15%] text-start">Volume</span>
		</div>
	);
};

const Artists = () => {
	return (
		<div className="m-8 mt-[100px] overflow-y-scroll pr-4 font-poppins">
			<span className=" text-text4xl font-[700]">Ranking List</span>
			<div className="flex flex-col space-y-5">
				<Tile />
				{Array.from(Array(10)).map((a, item) => (
					<ArtistTile
						name="Gaurav"
						img="https://picsum.photos/300/300"
						index={item + 1}
						change={3.5}
						nfts={602}
						volume="12.5 LINK"
						onFollow={(handle) => console.log("following guy", handle)}
						handle="@abcd"
						isFollowing
					/>
				))}
			</div>
		</div>
	);
};

export default Artists;
