import TopArtistCard from "../topArtist.card";

const topArtists = [
	{
		img: "/cyberConnect/assets/img2.png",
		name: "John Doe",
		followers: 100,
		pos: 1,
	},
	{
		img: "/cyberConnect/assets/img5.png",
		name: "John Doe",
		followers: 100,
		pos: 2,
	},
	{
		img: "/cyberConnect/assets/img3.png",
		name: "John Doe",
		followers: 100,
		pos: 3,
	},
	{
		img: "/cyberConnect/assets/img4.png",
		name: "John Doe",
		followers: 100,
		pos: 4,
	},
	{
		img: "/cyberConnect/assets/img5.png",
		name: "John Doe",
		followers: 100,
		pos: 5,
	},
];

const TopNFTArtists = () => {
	return (
		<div className="flex w-full gap-6 overflow-x-scroll py-4 pl-5">
			{topArtists.map((artist) => (
				<TopArtistCard
					img={artist.img}
					name={artist.name}
					followers={artist.followers}
					pos={artist.pos}
				/>
			))}
		</div>
	);
};

export default TopNFTArtists;
