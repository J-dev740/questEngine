import { useRouter } from "next/router";
import { useEffect } from "react";

const Root = () => {
	const router = useRouter();

	useEffect(() => {
		router.replace("/home");
	}, [router]);

	return <div className="text-2xl mb-auto mt-auto text-center font-semibold">Redirecting</div>;
};

export default Root;
