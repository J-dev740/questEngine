import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import CardContainerVertical from "../common/cards/cardContainerVertical";
import gameIcon from "../../public/main/game.png";

interface CardProps {
	data: {
		_id: string;
		title: string;
		description: string;
		icon: string;
		users: Array<string>;
		courses: Array<string>;
		livestreams: Array<string>;
		createdAt: string;
		updatedAt: string;
		__v: number;
	};
}

const GameCardVertical = ({ data }: CardProps) => {
	const router = useRouter();
	// const { data: game } = useGetGameQuery((gameId as string) ?? skipToken);

	if (!data) return <div>Loading...</div>;

	return (
		<Link href={`/game/${data._id}`}>
			<CardContainerVertical className="min-w-80 min-h-max w-80">
				<div className="h-full w-full space-y-2 rounded-2xl">
					<div className="h-min w-full">
						<Image
							// src={data.icon}
							src={gameIcon}
							alt="expert-image!"
							width="0"
							height="0"
							sizes="100vw"
							className="aspect-video h-auto w-full rounded-md object-cover object-center hover:cursor-pointer "
							onClick={() => router.push(`/game/${data._id}`)}
						/>
					</div>

					<div className="w-full space-y-1 font-poppins font-bold">
						<h2 className="w-full truncate pt-1 text-textMedium3 lg:text-textLarge">
							<a
								href="#"
								className="transititext-primary text-primary hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600 transition duration-150 ease-in-out"
								data-te-toggle="tooltip"
								title={data.title}
							>
								{data.title}
							</a>
						</h2>
						<p className="text-card-text">{data.courses.length} Courses</p>
						<p className="text-card-text">{data.users.length} Players</p>
					</div>
				</div>
			</CardContainerVertical>
		</Link>
	);
};

export default GameCardVertical;
