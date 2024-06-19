/* eslint-disable react/require-default-props */
import { IoClose } from "react-icons/io5";
import { BiErrorAlt, BiMessageRoundedDots, BiAlarm } from "react-icons/bi";
import { GiTargetPrize } from "react-icons/gi";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { walletAddressSelector } from "../../features/auth/auth.selectors";
import axios from "axios";

interface IModal {
	children?: React.ReactNode;
	handleExit?: () => void;
	fetchMore?:(limit:number) => any;
	notifications?: any;
	userNotifications?:any,
}
const Notifications = [
	{
		icon: <GiTargetPrize />,
		Message: "You have won Prize for winning the The Quest",
		read: false,
	},
	{
		icon: <BiMessageRoundedDots />,
		Message: "Alex Has Messaged You",
		read: false,
	},
	{
		icon: <BiErrorAlt />,
		Message: "There Is An Error Issue Name",
		read: false,
	},
	{
		icon: <BiAlarm />,
		Message: "You are Scheduled for Event Name",
		read: false,
	},
];
export const ModalNotification = 
({ children, handleExit, notifications,userNotifications,fetchMore }: IModal) => {
	const walletId = useSelector(walletAddressSelector);

	const [read, setRead] = useState([{
		id:"",
	}]);
	const [limit,setLimit]=useState(4);
	// useEffect(()=>{

	// })

	return (
		<div className="fixed inset-0 z-50 flex items-start justify-center bg-black bg-opacity-40 backdrop-blur-sm">
			<div className="flex min-h-fit min-w-fit  flex-col items-start justify-between space-y-5
			 rounded-[14px] border-[2px] border-form-border bg-form-bg p-[40px]  font-Anek ring-2
			  backdrop-blur-lg">
				<div className="flex w-full flex-row items-center justify-between ">
					<div className="  font-gruppo text-textLarge font-bold text-[#FFFFFF]">
						{/* {title} */}
						Notifications
					</div>
					<div>
						<IoClose
							className="cursor-pointer text-[30px] text-[#FFFFFF]"
							onClick={handleExit}
						/>
					</div>
				</div>
				{/* {children} */}
				{/* body of Modal */}
				<div className="w-full max-h-[400px] no-scrollbar overflow-y-scroll  ">
					{/* notification */}
					{notifications &&
						notifications.map((Notif: any,index:number) => {
							console.log("notification",Notif)

							return (
								<div
									// key={notification.questId}
									className="flex w-full  border-spacing-2 flex-row items-center font-gruppo text-[20px] justify-self-start justify-between  space-x-4 border-b-[1px] border-[#212121] px-4 py-2"
								>
									{/* icon */}
									<div className=" scale-125 rounded-full bg-[#212121] p-4">
										{(()=>{

											switch (Notif?.type) {
												case "QUEST_REWARD":
													// console.log("questreward")
													return (
														<GiTargetPrize className="text-yellow-500"/>
												
													);
												case "MESSAGE":
													return(
														<BiMessageRoundedDots className=" text-red-800" />
							
													);
												case "PAYMENT":
													// console.log("payment")
													return(
														<BiAlarm className=" text-cyan-400"/>
															
													);
												default:
													return (
														<BiErrorAlt />
													);
											}

										}
										)()
										}
									

										{/* <GiTargetPrize /> */}
									</div>
									{/* message */}
									<div className=" text-start">
										{(() => {

											switch (Notif.type) {
												case "QUEST_REWARD":
													return (
														
														`you have won
															for winning the quest`

														

													);
												case "MESSAGE":

													return (`you have a message`)

													
												case "PAYMENT":
													return (
														`you have a payment notification`

													)
												case "COURSE":
													return (
														`you have a course notification`

													)
												case "COURSE_PAYMENT":
													return (
														`you have a course payment notification`

													)
												default:
													return (
														`this is a default text `
													);
											}

										}
										)()
										}
									</div>
									{/* mark As read */}
									<div
										className={
											!(userNotifications[index].isRead==true  || 
												read.some((obj:any)=>(obj.id===Notif._id)))
												? "rounded-lg bg-white px-4 py-2 font-Anek font-semibold text-black"
												: "rounded-lg bg-slate-700 px-4 py-2 font-Anek font-semibold text-white"
										}
									>
										<button
											type="button"
											disabled=
												{(userNotifications[index].isRead==true  ||
												 read.some((obj:any)=>(obj.id===Notif._id)))}
											onClick={() => {
												axios
													.patch(
														`${process.env.NEXT_PUBLIC_BACKEND_URL}/tasks/notifications`,
														{},
														{
															params: {
														
																userNotificationId:
																 userNotifications[index]._id,
															
															},
														},
													)
													.then((res) => {
														console.log(
															"updatedNotification",
															res.data,
														);
														const newItem={
															id:userNotifications[index]._id,
														}
														setRead((prevItem)=>
															([...prevItem,newItem]));

													});
											}}
										>
											{(userNotifications[index].isRead==true  || read.some((obj:any)=>(obj.id===Notif._id))) ? "Marked As Read" : "Mark As read"}
										</button>
									</div>
								</div>
							);
							

						})}
				</div>
				{/* load More feature */}
				<button className="flex w-full items-center justify-center bg-[#212121] rounded-lg px-4 py-2 font-Anek font-semibold text-white"
					type="button"
					onClick={async()=>{
						setLimit(limit+4);
						if(limit>50){
							setLimit(50);
						}
						if(fetchMore){
							 fetchMore(limit).then((res:any)=>{
								console.log("fetchedMoreNotifications...",res)

							 })
						}
					}}
				 >LoadMore</button>
			</div>
		</div>
	);
};

export default ModalNotification;
