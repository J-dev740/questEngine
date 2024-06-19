import QuestQueryService from "@common/database/queries/quest.query";
import QuestProgressQueryService from "@common/database/queries/questProgress.query";
import { rewardStatus } from "@common/quest/constants/reward";
// import { QuestStatus } from "@common/quest/constants/quest";
import { JsonRpcProvider } from "@ethersproject/providers";
import { parseLogs } from "@common/utils";
import { BadRequestException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
// import { CreatorService } from "@src/creator/creator.service";
// import { UpdateQuestDto } from "@src/creator/dtos/UpdateQuestDto";
import { BigNumber } from "ethers";
// import { ABI } from "./RewardPayout.json";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { QuestDocument, modelName as questModelName } from "@common/database/schema/quest.schema";
import UserQueryService from "@common/database/queries/user.query";
import { ContractService } from "./contract.service";
import {
	QuestProgressDocument,
	modelName as questProgressModel,
} from "../_common/database/schema/questProgress.schema";
import { modelName as userModelName, UserDocument } from "../_common/database/schema/user.schema";

interface ERC20PayoutEvent {
	questId: string;
	tokenAddress: string;
	recipient: string[];
	amounts: BigNumber[];
}

@Injectable()
export class RewardPayoutService {
	private readonly INFURA_API: string;

	private readonly ADMIN_PRIVATE_KEY: string;

	private readonly MORALIS_API: string;

	private readonly REWARD_PAYOUT_CONTRACT_ADDR: string;

	private readonly provider: JsonRpcProvider;

	constructor(
		private readonly questQueryService: QuestQueryService,
		private readonly userQueryService: UserQueryService,

		private readonly questProgressQueryService: QuestProgressQueryService,
		private readonly config: ConfigService,
		private readonly contractService: ContractService,
		@InjectModel(questModelName) QuestModel: Model<QuestDocument>,
		@InjectModel(questProgressModel)
		QuestProgressModel: Model<QuestProgressDocument>,
		@InjectModel(userModelName) UserModel: Model<UserDocument>,
	) {
		this.MORALIS_API = this.config.get<string>("MORALIS_API");
		this.INFURA_API = this.config.get<string>("INFURA_API");
		this.ADMIN_PRIVATE_KEY = this.config.get<string>("ADMIN_PRIVATE_KEY");
		this.provider = new JsonRpcProvider(this.INFURA_API);
		this.questQueryService = new QuestQueryService(QuestModel);
		this.questProgressQueryService = new QuestProgressQueryService(QuestProgressModel);
		this.userQueryService = new UserQueryService(UserModel);
	}

	async getRewards(questId: string, tokenAddress: string): Promise<any> {
		let quest;
		try {
			quest = await this.questQueryService.getQuestDetailsQuery(questId);
		} catch (error: any) {
			throw new BadRequestException(error);
		}
		// const users = await this.getUsersWhoCompletedQuest(questId);

		// const recipients = this.getRandomUsers(users, quest.numberOfWinners);
		const getReward = quest.rewards.filter((reward) => reward.address === tokenAddress);

		const carry =
			getReward[0].amount % quest.numberOfWinners === 0
				? 0
				: getReward[0].amount % quest.numberOfWinners;

		const amount = Math.floor((getReward[0].amount - carry) / quest.numberOfWinners);

		const amounts = Array(quest.numberOfWinners).fill(amount);

		amounts[0] += carry;
		return amounts;
	}

	async rewardPayout(questId: string, tokenAddress: string, userId: string) {
		let quest;
		try {
			quest = await this.questQueryService.getQuestDetailsQuery(questId);
		} catch (error: any) {
			throw new BadRequestException(error);
		}

		const { rewards, rewardMethod, numberOfWinners, createdBy } = quest;
		if (userId !== createdBy.toString()) {
			throw new BadRequestException("Only creator can distribute rewards");
		}
		const getReward = rewards.find((reward) => reward.address === tokenAddress);
		const rewardId = getReward._id;
		console.log("rewardId", rewardId);

		if (
			!getReward ||
			[rewardStatus.REWARD_COMPLETED, rewardStatus.REWARD_IN_PROGRESS].includes(
				getReward.rewardStatus,
			)
		) {
			throw new BadRequestException("Reward is already distributed or in progress");
		}

		const userIds = await this.getUsersWhoCompletedQuest(questId);
		let selectedUserIds: string[];

		switch (rewardMethod) {
			case "random_order":
				selectedUserIds = this.getRandomUsers(userIds, numberOfWinners);
				break;
			case "leaderboard_rank":
				selectedUserIds = userIds;
				break;
			default:
				throw new BadRequestException("Invalid reward method");
		}

		const sortedUserIds = await this.sortUserIdsByLeaderboardRank(selectedUserIds, questId);

		if (
			rewardMethod === "leaderboard_rank" &&
			sortedUserIds.length > numberOfWinners &&
			numberOfWinners > 0
		) {
			sortedUserIds.splice(numberOfWinners);
		}

		// get user wallet ids
		const recipients = await Promise.all(
			sortedUserIds.map((userId) => this.getUserWalletId(userId)),
		);

		// get carry and amount
		const divisor = Math.min(sortedUserIds.length, numberOfWinners);
		const carry = getReward.amount % divisor;
		const amount = Math.floor((getReward.amount - carry) / divisor);

		const amounts = Array(recipients.length).fill(amount);

		amounts[0] += carry;

		const result = amounts.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

		console.log("number of winners", numberOfWinners);
		console.log("sortedUserIds", sortedUserIds);
		console.log("recipients", recipients);
		console.log("result", result);
		console.log("getReward.amount", getReward.amount);

		if (result !== getReward.amount) {
			throw new BadRequestException("Amount is not distributed correctly");
		}

		await 
		this.contractService.payoutERC20(questId, tokenAddress, recipients, amounts);

		console.log("Contract is called");
		await this.questQueryService.updateRewardStatusByRewardId(
			questId,
			rewardId,
			rewardStatus.REWARD_IN_PROGRESS,
		);
		console.log("quest service is updated successfully");
	}

	async getUserWalletId(_id: string) {
		const user = await this.userQueryService.readEntity({ _id });
		if (user.walletAddress) {
			return user.walletAddress as string;
		}
		throw new Error("user walletId not found");
	}

	// async payoutERC20(
	// 	questId: string,
	// 	tokenAddress: string,
	// 	recipients: string[],
	// 	amounts: string[],
	// ) {
	// 	const wallet = new ethers.Wallet(this.ADMIN_PRIVATE_KEY, this.provider);

	// 	const contractAddress = this.REWARD_PAYOUT_CONTRACT_ADDR;
	// 	const contractABI = ABI;

	// 	const contract = new ethers.Contract(contractAddress, contractABI, wallet);

	// 	const transaction = await contract.payoutERC20(questId, tokenAddress, recipients, amounts);
	// 	const receipt = await transaction.wait();

	// 	return receipt;
	// }

	getRandomUsers(userArray: any, numberOfWinners: number) {
		if (numberOfWinners <= 0 || numberOfWinners > userArray.length) {
			console.log("getRandomUsers", userArray);
			return userArray;
		}
		console.log("userArray", userArray);
		const randomUsers = [];
		const arrayCopy = userArray.slice();

		// eslint-disable-next-line no-plusplus
		for (let i = 0; i < numberOfWinners; i++) {
			const randomIndex = Math.floor(Math.random() * arrayCopy.length);
			randomUsers.push(arrayCopy[randomIndex]);
			arrayCopy.splice(randomIndex, 1);
		}

		return randomUsers;
	}

	async getUsersWhoCompletedQuest(questId: string) {
		const questProgresses = await this.questProgressQueryService.getQuestProgressByQuestId(
			questId,
		);
		console.log("questProgresses",questProgresses)
		let quest;
		try {
			quest = await this.questQueryService.getQuestDetailsQuery(questId);
		} catch (error: any) {
			throw new BadRequestException(error);
		}
		return questProgresses
			.filter((questProgress) => questProgress.taskStatus.length === quest.tasks.length)
			.map((questProgress) => questProgress.userId);
	}

	async sortUserIdsByLeaderboardRank(userIds: any, questId: string): Promise<string[]> {
		const quests = await this.questProgressQueryService.getUserArrayQuestInformation(
			userIds,
			questId,
		);

		const sortedUserIds = quests.map((questInfo) => questInfo.userId);
		return sortedUserIds;
	}

	async handleRewardPayoutEvent(body: any) {
		if (!body || !body.confirmed) return;

		const { questId, tokenAddress, recipient, amounts } = parseLogs<ERC20PayoutEvent>(body)[0];
		// get rewardId from token address
		const quest = await this.questQueryService.getQuestDetailsQuery(questId);
		const rewardId = quest.rewards.find((reward) => reward.address === tokenAddress)?._id;

		if (questId && tokenAddress && recipient && amounts) {
			await this.questQueryService.updateRewardStatusByRewardId(
				questId.toString(),
				rewardId,
				rewardStatus.REWARD_COMPLETED,
			);
			console.log("rewardCompleted")
		}
	}
}
