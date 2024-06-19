import { skipToken } from "@reduxjs/toolkit/dist/query";
import { useWeb3Modal } from "@web3modal/react";
import jwtDecode from "jwt-decode";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAccount, useDisconnect, useSigner, useSignMessage } from "wagmi";
import { HiOutlineBell } from "react-icons/hi2";
import ModalNotify from "./util/ModalNotification";

import { useLazyQuery, useMutation } from "@apollo/client";
// import CyberConnect, { Env } from "@cyberlab/cyberconnect-v2";
import { useConnectWalletMutation, useGetAccessTokenMutation } from "../features/auth/auth.api";
import {
	accTokenSelector,
	// cyberConnectTokenSelector,
	refTokenSelector,
	walletAddressSelector,
} from "../features/auth/auth.selectors";
import { authActions } from "../features/auth/auth.slice";
// import { cyberActions } from "../features/cyber-connect/cyber.slice";
import { LOGIN_GET_MESSAGE } from "../features/cyber-connect/graphql/LoginGetMessage";
import { LOGIN_VERIFY } from "../features/cyber-connect/graphql/LoginVerify";
import { VERIFY_ACCESS_TOKEN } from "../features/cyber-connect/graphql/VerifyAccess";
import { useGetSelfQuery } from "../features/profile-page/expert/expert.api";
import { activeUserSelector, roleSelector } from "../features/profile-page/profile.selectors";
import { Button2, Button3, Button4 } from "./common/form/button";
import axios from "axios";
import toast from "react-hot-toast";

interface JWT {
	iat: number;
	exp: number;
	walletAddress: string;
}

interface CyberJWT {
	chain_id: number;
	domain: string;
	address: string;
	is_refresh_token: boolean;
	iss: string;
	iat: number;
	exp: number;
}

const NavBar = () => {
	const router = useRouter();

	const { open } = useWeb3Modal();

	const dispatch = useDispatch();
	const { data: signer } = useSigner();
	const currentRole = useSelector(roleSelector);
	const refToken = useSelector(refTokenSelector);
	const accToken = useSelector(accTokenSelector);
	// const cyberToken = useSelector(cyberConnectTokenSelector);

	const [connectWallet] = useConnectWalletMutation();
	const [recoverToken] = useGetAccessTokenMutation();

	const [verifyCyberToken] = useLazyQuery(VERIFY_ACCESS_TOKEN);
	const [loginVerify] = useMutation(LOGIN_VERIFY);
	const [loginGetMessage] = useMutation(LOGIN_GET_MESSAGE);

	const { signMessageAsync } = useSignMessage();
	const { disconnectAsync } = useDisconnect();
	const { isConnected, address } = useAccount({
		async onConnect({ address }) {
			if (!address) return;
			handleTokens(address.toLowerCase());
		},
		onDisconnect() {
			dispatch(authActions.disconnectWallet());
		},
	});
	const [login, setLogin] = useState(false);
	const [openModal, setOpenModal] = useState(false);
	const [notificationLimit,setLimit]=useState(4)

	useGetSelfQuery(login ? address ?? skipToken : skipToken);

	//cyberAction
	// useEffect(() => {
	// 	if (!signer) return;
	// 	const cyberConnect = new CyberConnect({
	// 		appId: process.env.NEXT_PUBLIC_APP_ID as string,
	// 		namespace: process.env.NEXT_PUBLIC_NAMESPACE as string,
	// 		env: Env.STAGING,
	// 		provider: signer.provider,
	// 		signingMessageEntity: process.env.NEXT_PUBLIC_NAMESPACE as string,
	// 	});
	// 	dispatch(cyberActions.setCyber(cyberConnect));
	// }, [signer]);

	// Notification settings
	// const walletId:string= useSelector(walletAddressSelector)
	// const [userNotification,setUserNotification]=useState([])

	// const fetchNotification= async ()=>{

	//     try {
	//         const notification= await axios.get('http://localhost:5000/v1/tasks/notifications',{
	//             params:{
	//                 walletId: walletId.toString()
	//             }
	//         })

	//                 if(notification){
	// 					// console.log('notification',notification.data)
	// 			const unreadNotifications=notification.data.filter((dta:any)=>{
	// 				 return dta.read===false
	// 			})
	// 			// console.log('notification',unreadNotifications)
	// 					setUserNotification([])
	// 					if( unreadNotifications[0]!==undefined && unreadNotifications.length>0){
	// 						setUserNotification(unreadNotifications)
	// 						console.log(unreadNotifications)

	// 					}
	//                     // console.log(notification.data)

	//                 }else console.log('no Notification Yet ...')

	//     } catch (error) {
	//         console.log('fetchNotificationError',error)
	//     }

	// }

	// Notification settings
	const walletId: string = useSelector(walletAddressSelector);
	const activeUser = useSelector(activeUserSelector);
	const userId = activeUser?activeUser._id:"";
	// console.log("userId",userId)
	
	const [userNotification, setUserNotification] = useState<any[]>();
	const [notification, setNotification] = useState<any[]>();


	const fetchNotification = async (limit=4) => {
		// let Notifications=[]
		// let userNotifications=[];
		// let undreadNotifications=[];
		if(limit>=notificationLimit) setLimit(limit);
		try {
			const userNotifications = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/tasks/notifications`, {
				params: {
					limit:notificationLimit,
					userId: userId.toString(),
				},
			});

			if (userNotifications) {
				// console.log('notification',notification.data)
				// const unreadNotifications = notifications.data.filter((dta: any) => {
				// 	return dta.read === false;
				// });
				//  Notifications=notifications.data.filter((dta: any) => {
				// 	//this function expects a boolean value in order to return each notification object based on some condition
				// 	 return dta.Notification.filter((notif:any)=>{
				// 		// console.log("notif",notif)
				// 		if(notif.read.length==0) return true;
				// 		return notif.read.indexOf(walletId.toString())
				// 	})
				// })
				console.log("Usernotifications",userNotifications.data)
				const notificationIds=userNotifications.data.map((item:any)=>item.notificationId)
				const notifications=await Promise.all(notificationIds.map(async (id:any)=>{
					const notification=await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/tasks/notification/${id}`)
					return notification.data
				}))
				console.log("notifications",notifications)
				if(notifications){
					setUserNotification(userNotifications.data);
					setNotification(notifications)
				}
				// setUserNotification(notifications);
				// userNotifications=Notifications.map((data:any)=>{
				// 	return data.Notification.map((notification:any)=>{
				// 		undreadNotifications.push(notification)
				// 		return notification.data;
				// 	})
				// })
				// console.log("userNotifications",userNotifications)

				// console.log('notification',unreadNotifications)
				// setUserNotification([]);
				// if (unreadNotifications[0] !== undefined && unreadNotifications.length > 0) {
				// 	setUserNotification(unreadNotifications);
				// 	console.log(unreadNotifications);
				// }
				// console.log(notification.data)
				return true
			} else return false
		} catch (error) {
			console.log("fetchNotificationError", error);
		}
	};

	useEffect(() => {
		if (!address) return;
		handleTokens(address.toLowerCase());
		// const setNotificationInterval = setInterval(fetchNotification, 180000);
		const setNotificationInterval = setInterval(fetchNotification, 30000)

		return () => {
			clearInterval(setNotificationInterval);
		};
	}, [address, accToken, refToken]);

	// useEffect(() => {
	// 	if (!address) return;
	// 	if (
	// 		router.pathname.match(/^\/social/) ||
	// 		router.pathname.match(/^\/proverse/) ||
	// 		router.pathname.match(/^\/profile/)
	// 	) {
	// 		handleCyberToken(address);
	// 	}
	// }, [router, address]);

	const handleTokens = async (addr: string) => {
		const runConnectWallet = async (_addr: string) => {
			const result = await connectWallet({
				walletAddress: _addr,
				role: "member",
			}).unwrap();
			if (!result.refreshToken) return;
			dispatch(authActions.setExpert());
			return;
		};

		const runRecoverToken = async (_addr: string) => {
			if (!refToken) return;
			const sign = await signMessageAsync({
				message: `Signing with acc: ${_addr}`,
			});
			await recoverToken({
				role: "expert",
				refreshToken: refToken,
				walletAddress: _addr,
				signature: sign,
			}).unwrap();
		};

		const checkRefToken = async (_addr: string) => {
			if (!refToken) {
				await runConnectWallet(_addr);
				return;
			} else {
				const { exp, walletAddress } = jwtDecode<JWT>(refToken);
				if (new Date().getTime() <= exp * 1000) {
					if (walletAddress.toLowerCase() === addr.toLowerCase()) {
						await runRecoverToken(_addr);
						return;
					} else {
						await runConnectWallet(_addr);
						return;
					}
				} else {
					await runConnectWallet(_addr);
					return;
				}
			}
		};
		if (!accToken) {
			await checkRefToken(addr);
			setLogin(true);
			return;
		} else {
			const { exp, walletAddress } = jwtDecode<JWT>(accToken);
			if (new Date().getTime() <= exp * 1000) {
				if (walletAddress.toLowerCase() === addr.toLowerCase()) return;
				await runConnectWallet(addr);
				setLogin(true);
				return;
			}
			await checkRefToken(addr);
			setLogin(true);
			return;
		}
	};

	// const handleCyberToken = async (addr: string) => {
	// 	const runConnectCyber = async () => {
	// 		const msg = await loginGetMessage({
	// 			variables: {
	// 				input: {
	// 					address: addr,
	// 					domain: process.env.NEXT_PUBLIC_DOMAIN,
	// 				},
	// 			},
	// 		});
	// 		const signature = await signMessageAsync({
	// 			message: msg.data.loginGetMessage?.message,
	// 		});
	// 		const token = await loginVerify({
	// 			variables: {
	// 				input: {
	// 					address: addr,
	// 					domain: process.env.NEXT_PUBLIC_DOMAIN,
	// 					signature,
	// 				},
	// 			},
	// 		});
	// 		console.log(token);
	// 		dispatch(authActions.setCyberToken(token.data.loginVerify.accessToken));
	// 		return;
	// 	};

	// 	try {
	// 		if (!cyberToken) {
	// 			console.log("no cyber");
	// 			await runConnectCyber();
	// 			return;
	// 		} else {
	// 			const { exp, address: cyberAddr } = jwtDecode<CyberJWT>(cyberToken);
	// 			if (new Date().getTime() <= exp * 1000) {
	// 				console.log(
	// 					"cyber expired, ",
	// 					cyberAddr.toLowerCase() === addr.toLowerCase(),
	// 					cyberAddr,
	// 					addr,
	// 				);
	// 				if (cyberAddr.toLowerCase() === addr.toLowerCase()) return;
	// 				await runConnectCyber();
	// 				return;
	// 			}
	// 			const result = await verifyCyberToken({
	// 				variables: {
	// 					input: {
	// 						accessToken: cyberToken,
	// 					},
	// 				},
	// 			});
	// 			if (!result?.data?.verifyAccessToken?.isValid) {
	// 				console.log("cyber not valid");
	// 				await runConnectCyber();
	// 				return;
	// 			}
	// 		}
	// 	} catch (err: any) {
	// 		console.log(err);
	// 	}
	// };

	return (
		<nav className="fixed right-0 top-0 z-10 flex items-start justify-end gap-4 rounded-lg bg-transparent p-5">
			{/* bell icon */}
			<div className="relative ">
				<button
					type="button"
					disabled={userNotification?.length === 0}
					onClick={() => setOpenModal(true)}
					className="flex h-[50px] w-[56px] scale-110 items-center justify-center rounded-[12px] 
					border-[2px] border-[#16141441] bg-[#212121] p-4 ring-2 ring-yellow-950"
				>
					<HiOutlineBell />
				</button>
				{userNotification ? (
					<div
						className={
							userNotification.length == 0
								? `absolute -right-2  -top-2 hidden h-[20px] w-[20px] items-center  justify-center  rounded-full  bg-red-400`
								: `absolute -right-2 -top-2 flex h-[20px] w-[20px]   items-center  justify-center  rounded-full bg-red-400`
						}
					>
						{userNotification.length}
					</div>
				) : (
					" "
				)}
				{openModal ? (
					<ModalNotify
						handleExit={() => {
							setOpenModal(false);
						}}
						notifications={notification}
						userNotifications={userNotification}
						fetchMore={fetchNotification}
					/>
				) : (
					""
				)}
			</div>
			<Button4
				type="button"
				className={`shadow-lg shadow-neutral-400 `}
				text={
					<div className="flex items-center">
						<Image
							src="/main/dot.png"
							alt="dot"
							width="0"
							height="0"
							className="mr-1  w-fit"
						/>
						{isConnected ? (
							<div
								onClick={()=>{
									// if(address){
									// 	navigator.clipboard.writeText(address.toString())
									// 	try {
									// 		toast.success("copied to clipboard",{
									// 			duration:2000
									// 		})
									// 		console.log("copied")
									// 	} catch(error){
									// 		console.log(error)
									// 	}
										

									// }
								}}
								 className="max-w-[5rem] hover:cursor-pointer  font-bold font-gruppo">{address?.slice(0,4)}...{address?.slice(address.length-4)}</div>
						) : (
							"Connect Wallet"
						)}
					</div>
				}
				disabled={isConnected}
				onClick={() => open()}
			/>
			{currentRole && currentRole !== "expert" && isConnected && (
				<Button2
					type="button"
					text="Become an Expert"
					onClick={() => router.push("/becomeAnExpert")}
				/>
			)}
			{isConnected && (
				<Button3
					type="button"
					text={
						<div className="flex">
							<Image
								src="/main/dot.png"
								alt="dot"
								width="13"
								height="10"
								className="m-1 mr-2"
							/>
							<span>Disconnect Wallet</span>
						</div>
					}
					onClick={() => disconnectAsync()}
				/>
			)}
		</nav>
	);
};

export default NavBar;
