export interface QuestInfo {
	data: any;
}

export interface QuestProgress {
	questProgressID: any; // what are the types
	task: any; // what are the types
}

export enum QuestStatus {
	FINISHED = "FINISHED",
	ONGOING = "ONGOING",
	DRAFTED = "DRAFTEDD",
}

export enum TaskStatus {
	PENDING = "pending",
	COMPLETED = "completed",
}
export interface ReferalObject {
	questId: string;
	referrelUserObjectId: string;
	taskId: string;
}

export interface IQuest {
	system: {
		referCode: string;
	};
	main: {
		selectedQuest: string;
		quests: QuestInfo[];
		referralCode: string;
		discordCode: string;
		telegramCode: string;
		referalObject: ReferalObject | null;
	};
}

export namespace GetAllQuests {
	export type Response = any;
	export type Params = Pagination;
}

export namespace GetQuest {
	export type Response = any;
	export type Params = string;
}

export namespace CreateQuestProgress {
	export type Params = {
		questId: string;
		userId: string;
	};
	export type Response = QuestInfo;
}

export namespace UpdateQuestProgress {
	export type Params = any;
	export type Response = QuestInfo;
}

export namespace GetUserData {
	export type Params = string;
	export type Response = any; // referralCode type?
}

export namespace GetQuesters {
	export type Response = any;
	export type Params = Pagination;
}
export namespace GetRewards {
	export type Response = any;
	export type Params = { questId: string; tokenAddress: string };
}

export namespace UpdateTaskStatus {
	export type Params = { questID: string; userID: string; taskID: string };
	export type Response = any; // referralCode type?
}

export namespace GetReferralCode {
	export type Params = { walletAddress: string };
	export type Response = string; // referralCode type?
}
export namespace getTaskResponse {
	export type Response = boolean;
}

export namespace VerifyQuest {
	export type Params = { questId: string; type: string; body: any; token: string | null };
}

export namespace UpdateQuestStatus {
	export type Params = { questID: string; questStatus: QuestStatus };
}

export namespace UpdateTaskInQuestProgress {
	export type Params = any;
	export type Response = any;
}

export namespace UserQuestProgress {
	export type Params = { userId: string; questId: any };
	export type Response = any;
}

export namespace TwitterFollow {
	export type Params = { walletId: string; twitterId: string };
	export type Response = any;
}

export namespace Tweet {
	export type Params = { walletId: string; tweetId: string };
	export type Response = any;
}

export interface AllQuestCards {
	quests: any;
	noOfColumns: number;
}

export interface IEligibilityButton {
	text: string;
	allTasks: [];
	quest_id: string;
}
export interface RecommendedQuest {
	quests: any;
	fetchMore?: () => void;
}

export interface Quest {
	_id: string;
	quest_title: string;
	quest_discription: string;
	startimeStamp: any;
}

export interface ITaskButtonComponent {
	taskDetails: any;
	onData: (val: boolean) => void;
	userQuestProgress: any;
	taskID?: string;
	userID?: string;
}
