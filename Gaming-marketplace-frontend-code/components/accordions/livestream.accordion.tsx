/* eslint-disable react/require-default-props */
import { compareDesc, format, isPast, isSameDay, parseISO } from "date-fns";
import { useState } from "react";
import { useSelector } from "react-redux";
import { walletAddressSelector } from "../../features/auth/auth.selectors";
import {
	useDeleteExpertLivestreamMutation,
	useGetExpertLivestreamsQuery,
	useGetSelfQuery,
} from "../../features/profile-page/expert/expert.api";
import { Button5 } from "../common/form/button";

interface LivestreamProps {
	expertId: string;
}

const LivestreamAccordion = ({ expertId }: LivestreamProps) => {
	const [open, setOpen] = useState(0);

	const { data } = useGetExpertLivestreamsQuery(expertId);
	const [handleDelete] = useDeleteExpertLivestreamMutation();

	const addr = useSelector(walletAddressSelector);
	const { data: self } = useGetSelfQuery(addr as string);

	const getLivestreamTime = (startDate: Date, EndDate: Date): string => {
		switch (compareDesc(Date.now(), startDate)) {
			case -1: {
				if (compareDesc(Date.now(), EndDate) === 1) {
					return `Livestream In Progress`;
				} else {
					return `Livestream Expired`;
				}
			}
			case 0: {
				return `Livestream In Progress`;
			}
			case 1: {
				if (isSameDay(Date.now(), startDate)) {
					return `Today, ${format(startDate, "hh:mm a")}`;
				}
				return `${format(startDate, "'On 'do' 'MMMM', 'hh:mm a")}`;
			}
			default:
				return "";
		}
	};

	if (!data || !self)
		return <div className="text-2xl m-5 font-semibold">There are no livestreams to show</div>;

	return (
		<div className="flex h-[57vh] max-h-[57vh] flex-col space-y-3 overflow-y-scroll px-4">
			{data.map((item: any, index) => {
				if (isPast(parseISO(item.streamEnd))) return null;
				return (
					<div className="flex min-h-fit w-full flex-col rounded-2xl border border-card-border-parent font-poppins backdrop-blur-md">
						<button
							type="button"
							className={`leading-[36px]text-white flex cursor-pointer flex-row items-center justify-between p-3 px-8 text-textLarge font-bold ${
								open === index ? "border-b-[1px] border-card-border-parent" : ""
							}  `}
							onClick={() => setOpen(index)}
						>
							<span>{item.title}</span>
						</button>
						<div hidden={!(open === index)} className="space-y-1 p-8">
							<div className="font-poppins text-textMedium2 font-bold leading-[22px]">
								{getLivestreamTime(
									parseISO(item.streamStart),
									parseISO(item.streamEnd),
								)}
							</div>
							<p className="text-textMedium2 font-bold leading-7 text-card-text">
								{item.description}
							</p>
							{self._id === item?.owner && (
								<Button5
									onClick={() => handleDelete(item._id)}
									className="bg-red-500 !px-4 font-poppins leading-7 backdrop-blur-md"
									text="Cancel Livestream"
								/>
							)}
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default LivestreamAccordion;
