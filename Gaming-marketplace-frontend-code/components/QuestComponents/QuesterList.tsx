import Image from "next/image";

const QuesterList = (props: any) => {
	const { questers } = props;
	return (
		<div className="grid grid-cols-4 gap-3 sm:grid-cols-6 md:grid-cols-10 xl:grid-cols-6">
			{questers &&
				questers.map((quester: any, index: number) => {
					return (
						quester && (
							<div
								key={quester._id}
								className="m-1 h-[60px] w-[60px] hover:scale-150 hover:animate-wiggle_bounce"
							>
								{index % 2 == 0 ? (
									<Image
										src="/assets/images/person1.png"
										alt="quester1"
										width={60}
										height={60}
										// className=" hover:animate-wiggle_bounce"
									/>
								) : (
									<Image
										src="/assets/images/person2.png"
										alt="quester1"
										width={60}
										height={60}
									/>
								)}
							</div>
						)
					);
				})}
		</div>
	);
};

export default QuesterList;
