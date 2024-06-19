import Head from "next/head";
import SuggestionCard from "../../components/CyberConnectComponents/cards/suggestion.card";
// /cyberConnect/assets/img2.png

const suggestions = [
	{
		img: "/cyberConnect/assets/img2.png",
		name: "John Doe",
		followers: 100,
	},
	{
		img: "/cyberConnect/assets/img5.png",
		name: "John Doe",
		followers: 100,
	},
	{
		img: "/cyberConnect/assets/img3.png",
		name: "John Doe",
		followers: 100,
	},
	{
		img: "/cyberConnect/assets/img4.png",
		name: "John Doe",
		followers: 100,
	},
	{
		img: "/cyberConnect/assets/img5.png",
		name: "John Doe",
		followers: 100,
	},
	{
		img: "/cyberConnect/assets/img1.png",
		name: "John Doe",
		followers: 100,
	},
	{
		img: "/cyberConnect/assets/img6.png",
		name: "John Doe",
		followers: 100,
	},
	{
		img: "/cyberConnect/assets/img3.png",
		name: "John Doe",
		followers: 100,
	},
	{
		img: "/cyberConnect/assets/img5.png",
		name: "John Doe",
		followers: 100,
	},
	{
		img: "/cyberConnect/assets/img4.png",
		name: "John Doe",
		followers: 100,
	},
	{
		img: "/cyberConnect/assets/img6.png",
		name: "John Doe",
		followers: 100,
	},
	{
		img: "/cyberConnect/assets/img1.png",
		name: "John Doe",
		followers: 100,
	},
	{
		img: "/cyberConnect/assets/img6.png",
		name: "John Doe",
		followers: 100,
	},
	{
		img: "/cyberConnect/assets/img3.png",
		name: "John Doe",
		followers: 100,
	},
	{
		img: "/cyberConnect/assets/img5.png",
		name: "John Doe",
		followers: 100,
	},
];

const Suggesions = () => {
	return (
		<>
			<Head>
				<title>Suggestions</title>
			</Head>
			<div className="font-inter flex w-full overflow-x-hidden overflow-y-scroll">
				<div className="mt-[100px] min-h-screen w-full px-20">
					<h1 className="text-text3xl font-bold">Suggested for you</h1>
					<div className="mt-10 flex flex-wrap gap-6">
						{suggestions.map((item) => (
							<SuggestionCard
								name={item.name}
								img={item.img}
								followers={item.followers}
							/>
						))}
					</div>
				</div>
			</div>
		</>
	);
};

export default Suggesions;
