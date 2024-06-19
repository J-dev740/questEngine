const getAvatarSrc = (key: string): string => {
	// console.log(
	// 	`https://api.multiavatar.com/${key}?apikey=${process.env.NEXT_PUBLIC_MULTIAVATAR_API_KEY}`,
	// );
	return `https://api.multiavatar.com/${key}.png?apikey=${process.env.NEXT_PUBLIC_MULTIAVATAR_API_KEY}`;
};

export { getAvatarSrc };
