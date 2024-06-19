/* eslint-disable react/require-default-props */

import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { walletAddressSelector } from "../../features/auth/auth.selectors";
import {
	useDeleteExpertCourseMutation,
	useGetSelfQuery,
} from "../../features/profile-page/expert/expert.api";
import { CONTRACT_STATUS } from "../../features/types";
import { Button5 } from "../common/form/button";
import PaymentHandler from "../util/payment/payment.handler";

interface AboutProps {
	details: {
		status: CONTRACT_STATUS;
		courseId: string;
		ownerWallet: `0x${string}`;
		primaryCurrency: string;
		primaryAmount: number;
	};
	data: Array<{ field: string; content: string | React.ReactNode }>;
	onClick?: (_event: React.MouseEvent<HTMLButtonElement>) => void;
}

const CoursesAbout = ({
	data = [],
	onClick,
	details: { status, courseId, ownerWallet, primaryAmount, primaryCurrency },
}: AboutProps) => {
	const router = useRouter();
	const [handleDelete] = useDeleteExpertCourseMutation();

	const walletAddress = useSelector(walletAddressSelector);
	const { data: self } = useGetSelfQuery(walletAddress);

	const isOwner = self?.courses.includes(courseId);
	const hasPurchased = self?.purchasedCourses.includes(courseId);
	const courseApproved = status === CONTRACT_STATUS.approved;
	const courseConfirmed = status === CONTRACT_STATUS.confirmed;
	const courseSuccess = status === CONTRACT_STATUS.success;

	if (!courseConfirmed && !isOwner) router.push("/404");

	return (
		<div className="flex h-full flex-col space-y-2 p-5">
			<div className="mb-auto space-y-12">
				{data.map((item) => (
					<div key={item.field} className="space-y-4 font-poppins">
						<h1 className="text-textxl font-bold">{item.field}</h1>
						<p className="text-textMedium3 leading-7 text-card-text">{item.content}</p>
					</div>
				))}
				<div className="mt-auto flex w-full items-center justify-end space-x-2 border-t-[1px] border-pallete2 pt-5">
					{!isOwner && !hasPurchased && courseConfirmed && (
						<Button5
							className="w-fit min-w-[100px] font-poppins text-[18px] font-bold leading-7 backdrop-blur-md"
							text={
								<PaymentHandler
									text={`Buy - ${primaryAmount} ${primaryCurrency}`}
									details={{
										courseId: courseId,
										receiver: ownerWallet,
										price: {
											amount: primaryAmount,
											currency: primaryCurrency,
										},
									}}
								/>
							}
						/>
					)}
					{!isOwner && hasPurchased && courseConfirmed && (
						<Button5
							onClick={() => router.push(`/dashboard/courses/${courseId}`)}
							className="w-fit min-w-[100px] font-poppins text-[18px] font-bold leading-7 backdrop-blur-md"
							text="Go to course"
						/>
					)}
					{isOwner && !courseSuccess && (
						<Button5
							onClick={() => handleDelete(courseId)}
							className="w-fit min-w-[100px] bg-red-600 font-poppins text-[18px] font-bold leading-7 backdrop-blur-md"
							text="Delete Course"
						/>
					)}
				</div>
			</div>
		</div>
	);
};

export default CoursesAbout;
