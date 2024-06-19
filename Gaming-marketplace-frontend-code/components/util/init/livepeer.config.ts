import { createReactClient, studioProvider } from "@livepeer/react";

const livepeerClient = createReactClient({
	provider: studioProvider({
		apiKey: `${process.env.NEXT_PUBLIC_LIVEPEER_API_KEY}`,
	}),
});

export default livepeerClient;
