import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { ExpertInfo } from "../../features/types";
import CardContainerVertical from "../common/cards/cardContainerVertical";

interface CardProps {
	expert: ExpertInfo;
}

const ExpertCardDiscover = ({ expert }: CardProps) => {
	const router = useRouter();
	// const { data: game } = useGetGameQuery((gameId as string) ?? skipToken);

	if (!expert) return <div>Loading...</div>;

	return (
		<Link href={`/expert/${expert._id}`}>
			<CardContainerVertical className="min-w-80 min-h-max w-80">
				<div className="h-full w-full space-y-2 rounded-2xl">
					<div className="h-min w-full">
						<Image
							src={expert.icon}
							alt="expert-image!"
							width="0"
							height="0"
							sizes="100vw"
							className="aspect-video h-auto w-full rounded-md hover:cursor-pointer"
							onClick={() => router.push(`/expert/${expert._id}`)}
						/>
					</div>

					<div className="w-full space-y-1 font-poppins font-bold">
						<h2 className="w-full truncate pt-1 text-textLarge">
							<a
								href="#"
								className="transititext-primary text-primary hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600 transition duration-150 ease-in-out"
								data-te-toggle="tooltip"
								title={expert.username}
							>
								{expert.username}
							</a>
						</h2>
						<p className="text-card-text">{expert.about}</p>
						<p className="text-card-text">{expert.courses.length} Courses</p>
					</div>
				</div>
			</CardContainerVertical>
		</Link>
	);
};

export default ExpertCardDiscover;
