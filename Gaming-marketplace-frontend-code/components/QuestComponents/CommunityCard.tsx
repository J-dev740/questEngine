import Image from "next/image";
import Link from "next/link";
import Ellipse17 from "../../public/assets/images/Ellipse17.png";

const CommunityCard = (props: any) => {
	const { communityName, communityQuests, communityMembers } = props;
	return (
		<Link href="/communities" target="_blank">
			<div className="card bg-base-100 mb-8 h-44 w-44 shadow-xl">
				<figure className=" ml-4 mt-2 h-16 w-16">
					<Image className=" h-16 w-16 " src={Ellipse17} alt="Shoes" />
				</figure>
				<div className="card-body m-0  h-28 pt-5">
					<h2 className="card-title text-base">{communityName}</h2>
					<p className="text-xs">{communityQuests} Quests</p>
					<p className="text-xs">{communityMembers} Members</p>
				</div>
			</div>
		</Link>
	);
};

export default CommunityCard;
