import axios from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAccount } from "wagmi";
import { walletAddressSelector } from "../../features/auth/auth.selectors";
// import { AppDispatch } from "../../reducer";

const TwitterVerify = () => {
	const router = useRouter();
	const { id, username } = router.query;
	const dispatch = useDispatch();
	const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;
	const { address } = useAccount();
	const walletAddress = useSelector(walletAddressSelector);

	axios.get("http://localhost:5000/v1/tasks/twitter").then((res) => {
		console.log("RES", res);
	});

	const login = () => {
		console.log(walletAddress);
		router.push({
			// pathname: `http://localhost:5000/v1/tasks/twitter/login?walletId=${walletAddress}`,
			pathname:
				"localhost:5000/v1/tasks/twitter/login?walletId=0xb58e54fCA59eF4859322e06F8a5781C11bBCD3c7",
		});
		// axios
		// 	.get(`http://localhost:5000/v1/tasks/twitter/login?walletId=${walletAddress}`)
		// 	.then((res) => {
		// 		console.log("RES", res);
		// 	});
	};

	const getMe = () => {
		console.log(walletAddress);

		axios
			.get(`http://localhost:5000/v1/tasks/twitter/get/me?walletId=${walletAddress}`)
			.then((res) => {
				console.log("RES", res);
			});
	};

	const followUser = () => {
		const body = {
			walletId: `${walletAddress}`,
			twitterId: "mrkc2303",
		};

		axios.post("http://localhost:5000/v1/tasks/twitter/follow", body).then((res) => {
			console.log("RES", res);
		});
	};

	const retweet = () => {
		const body = {
			walletId: `${walletAddress}`,
			tweetId: "1573672272975769605",
		};

		axios.post("http://localhost:5000/v1/tasks/twitter/retweet", body).then((res) => {
			console.log("RES", res);
		});
	};

	const like = () => {
		const body = {
			walletId: `${walletAddress}`,
			tweetId: "1573672272975769605",
		};

		axios.post("http://localhost:5000/v1/tasks/twitter/createLike", body).then((res) => {
			console.log("RES", res);
		});
	};

	const loginURI = `http://localhost:5000/v1/tasks/twitter/login?walletId=${walletAddress}`;

	useEffect(() => {
		const sendTwitterDetails = async () => {
			if (id && username) {
				const resp = await axios.patch(baseURL + "/users/update-user-socials", {
					user_id: address,
					social: "twitter",
					media: {
						user_id: id,
						username,
					},
				});
				if (resp.data) {
					router.replace("/");
				}
			}
		};

		sendTwitterDetails();
	});

	return (
		<div className="flex h-screen w-screen items-center justify-center	">
			<a href={loginURI} target="_blank" rel="noreferrer">
				LOGIN
			</a>

			<button
				type="button"
				className=" btn btn-outline btn-success"
				onClick={() => {
					getMe();
				}}
			>
				Get me
			</button>
			<button
				type="button"
				className=" btn btn-outline btn-success "
				onClick={() => {
					followUser();
				}}
			>
				Follow
			</button>
			<button
				type="button"
				className=" btn btn-outline btn-success "
				onClick={() => {
					retweet();
				}}
			>
				retweet
			</button>
			<button
				type="button"
				className=" btn btn-outline btn-success "
				onClick={() => {
					like();
				}}
			>
				like
			</button>
		</div>
	);
};

export default TwitterVerify;
