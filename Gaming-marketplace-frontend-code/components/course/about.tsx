/* eslint-disable react/require-default-props */

import { Button2 } from "../common/form/button";

import { useGetGameQuery } from "../../features/profile-page/games/game.api";
import { CourseInfo } from "../../features/types";

interface AboutProps {
	course: CourseInfo;
}

const About = ({ course }: AboutProps) => {
	const { data: game } = useGetGameQuery(course.game as string);

	return (
		<div className="flex min-h-full flex-col justify-between space-y-6 px-16 ">
			<div className="flex flex-col gap-12 py-16">
				<div className="flex flex-col gap-6">
					<div className="leading-[48px font-poppins text-[32px] font-semibold">
						About Course
					</div>
					<div className="font-poppins text-[20px] font-medium leading-[20px] text-[#757575]">
						{course.description}
					</div>
				</div>
				<div className="flex flex-col gap-6">
					<div className="leading-[48px font-poppins text-[32px] font-semibold">
						Games
					</div>
					<div className="w-fit rounded-[48px] bg-[#ffffff0e] px-[24px] py-[12px] font-poppins text-[20px] font-medium leading-[20px] text-[#757575]">
						{game?.title}
					</div>
				</div>

				<div className="font-600  flex w-fit flex-col rounded-[50px] bg-gradient-to-r from-[#2A84C0] to-[#294A8D] px-[16px] py-[4px] font-poppins text-[18px] leading-[28px] text-[#ffffff]">
					{course.users.length} users
				</div>
			</div>
			<div className=" flex w-full justify-end border-t-[1px] border-pallete2 py-6">
				<Button2 text="Buy Now" className="text-textLarge font-bold" />
			</div>
		</div>
	);
};

export default About;
