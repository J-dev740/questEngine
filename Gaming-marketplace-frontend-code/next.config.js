/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	headers: [
		{
			key: "Cache-Control",
			value: "no-store, max-age=0",
		},
	],
	images: {
		domains: [
			"api.multiavatar.com",
			"buck-gaming-market-place.s3.amazonaws.com",
			"picsum.photos",
			"unsplash.com",
			"pixabay.com",
			"img.freepik.com",
			"emerging-europe.com",
			"i.pravatar.cc",
			"bafybeidjvw7mfmoosx74dfhzeyay2q4xro2k7x22mcdnv7zew3gnrbqube.ipfs.nftstorage.link",
			"encrypted-tbn0.gstatic.com",
			"bafybeihnvn67kgboioq64gkd3dowmxgsf2ziae7k56d5jqzqes5pyfgb4q.ipfs.nftstorage.link",
			"bafybeieb3kk2ub3eqj4qh7cbr2bzf2yl4w27fv64tjc3uq2qat3m7of63u.ipfs.w3s.link",
			// "ipfs.nftstorage.link"
		],
		// domains: ["api.multiavatar.com", "buck-gaming-market-place.s3.amazonaws.com"],
		// remotePatterns: [
		// 	{
		// 		protocol: "https",
		// 		hostname: "**",
		// 		port: "",
		// 		pathname: "**",
		// 	},
		// ],
	},
};

module.exports = nextConfig;
