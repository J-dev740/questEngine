/* eslint-disable react/jsx-filename-extension */

import { v4 as uuidv4 } from "uuid";
import CardCarousal from "../../../components/QuestComponents/cardCarousal";
import caro1 from "./caro1.svg";
import caro2 from "./caro2.svg";
import caro3 from "./caro3.svg";
import caro4 from "./caro4.svg";
export const cards = [
	{
		key: uuidv4(),
		content: (
			<CardCarousal
				img={caro1}
				content="Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint."
				title="Start Questing"
			/>
		),
	},
	{
		key: uuidv4(),
		content: (
			<CardCarousal
				img={caro2}
				content="Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint."
				title="Start Questing"
			/>
		),
	},
	{
		key: uuidv4(),
		content: (
			<CardCarousal
				img={caro3}
				content="Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint."
				title="Start Questing"
			/>
		),
	},
	{
		key: uuidv4(),
		content: (
			<CardCarousal
				img={caro4}
				content="Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint."
				title="Start Questing"
			/>
		),
	},
];
