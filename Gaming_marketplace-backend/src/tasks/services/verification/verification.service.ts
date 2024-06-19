import { Injectable } from "@nestjs/common";
import { ReferDTO, TelegramDto, TwitterDto, TwitterFollowDto } from "@src/tasks/dtos/offchain.dto";
import {
	NFTCountDto,
	OnchainCountDto,
	PurchasedNFTValueDto,
	SpecifiedNFTPurchaseDto,
	SpecifiedPurchasedNFTValueDto,
	TotalGasFeeSpentDto,
	VerifyBalanceDto,
} from "@src/tasks/dtos/onchain.dto";
import { GasFeeService } from "../on-chain/gas-fee/gas-fee.service";
import { OnChainService } from "../on-chain/on-chain.service";
import { OpenseaService } from "../on-chain/openseas/opensea.service";
import { ReferralService } from "../referral/referral.service";
import { TelegramService } from "../telegram/telegram.service";
import { TwitterService } from "../twitter/twitter.service";

@Injectable()
export class VerificationService {
	constructor(
		private readonly telegramService: TelegramService,
		private readonly twitterService: TwitterService,
		private readonly referralService: ReferralService,
		private readonly openseaService: OpenseaService,
		private readonly onChainService: OnChainService,
		private readonly gasFeeService: GasFeeService,
	) {}

	private readonly chainIdToName: Record<string, string> = {
		"1": "mainnet",
		"3": "ropsten",
		"4": "rinkeby",
		"5": "goerli",
		"11155111": "sepolia",
		"137": "polygon",
		"80001": "mumbai",
		"97": "BNB Smart Chain Testnet",
		"56": "BNB Chain LlamaNodes",
	};

	getChainName(chainId: string): string {
		return this.chainIdToName[chainId] || "unknown";
	}

	async verifyFollowTwitterUser(walletAddress: string, twitterFollowDto: TwitterFollowDto) {
		// try {
		console.log(walletAddress);
		console.log(twitterFollowDto);
		try {
			const result = await this.twitterService.VerifyFollowTwitterUser(walletAddress, {
				twitterId: twitterFollowDto.twitterId,
				taskID: twitterFollowDto.taskID,
			});
			console.log("result", result);
		} catch (error) {
			console.log(error.message);
		}
		const result = await this.twitterService.VerifyFollowTwitterUser(walletAddress, {
			twitterId: twitterFollowDto.twitterId,
			taskID: twitterFollowDto.taskID,
		});
		console.log("verifyFollowTwitterUserResult------------------>");
		console.log(result);
		return result;

		// } catch (error) {
		// 	console.log('Errorrrr...')
		// 	console.log(error)
		// }
	}

	async verifyCreateRetweet(walletAddress: string, twitterDto: TwitterDto) {
		const result = await this.twitterService.verifyCreateRetweet(walletAddress, twitterDto);
		return result;
	}

	async verifyCreateLike(walletAddress: string, twitterDto: TwitterDto) {
		const result = await this.twitterService.verifyCreateLike(walletAddress, twitterDto);
		return result;
	}

	async verifyTelegramUser(telegramDto: TelegramDto) {
		// console.log(telegramDto)
		try {
			const result = await this.telegramService.verifyUser(
				telegramDto.channelName,
				telegramDto.userID,
			);
			console.log("verificationService Result", result);
			return result;
		} catch (error) {
			console.log("error", error);
			throw new Error("Telegram verification failed");
		}
	}

	async verifyReferralCount(questID: string, referDTO: ReferDTO) {
		// console.log('questId',typeof(questID))
		// console.log('referDto',referDTO)
		// console.log(referDTO.referralCode)
		// console.log(typeof(referDTO.referralCode))

		// console.log(referDTO.minCount)
		// console.log(typeof(referDTO.minCount))

		// this.referralService?console.log('defined'):console.log('undefined')

		const result = await this.referralService.verifyReferralCount(
			questID,
			referDTO.referralCode,
			referDTO.minCount,
		);
		return result;
	}

	async _verifyNFTcount(walletAddress: string, nFTCountDto: NFTCountDto) {
		const result = await this.onChainService._verifyNFTcount(
			walletAddress,
			nFTCountDto.minCount,
		);
		return result;
	}

	async walletBalanceCheck(walletAddress: string, verifyBalanceDto: VerifyBalanceDto) {
		const result = await this.gasFeeService.walletBalanceCheck(
			walletAddress,
			verifyBalanceDto.minBalance,
		);
		return result;
	}

	async verifyENScount(walletAddress: string, onchainCountDto: OnchainCountDto) {
		console.log("walletAddress",walletAddress);
		const result = await this.onChainService.verifyENScount(
			walletAddress,
			onchainCountDto.minCount,
		);
		console.log("result",result)
		return result;
	}

	async verifyPurchasedNFT(
		walletAddress: string,
		onchainCountDto: OnchainCountDto,
		chainId: string,
	) {
		const result = await this.openseaService.verifyPurchasedNFT(
			walletAddress,
			onchainCountDto.minCount,
			this.getChainName(chainId),
		);
		return result;
	}

	async verifySpecifiedNFTPurchases(
		walletAddress: string,
		specifiedNFTPurchaseDto: SpecifiedNFTPurchaseDto,
		chainId: string,
	) {
		const result = await this.openseaService.verifySpecifiedNFTPurchases(
			walletAddress,
			specifiedNFTPurchaseDto.contractAddress,
			specifiedNFTPurchaseDto.minCount,
			this.getChainName(chainId),
		);
		return result;
	}

	async verifyPurchasedNFTValue(
		walletAddress: string,
		purchasedNFTValueDto: PurchasedNFTValueDto,
		chainId: string,
	) {
		const result = await this.openseaService.verifyPurchasedNFTValue(
			walletAddress,
			purchasedNFTValueDto.minValue,
			this.getChainName(chainId),
		);
		return result;
	}

	async verifySpecifiedNFTPurchasesValue(
		walletAddress: string,
		specifiedPurchasedNFTValueDto: SpecifiedPurchasedNFTValueDto,
		chainId: string,
	) {
		const result = await this.openseaService.verifySpecifiedNFTPurchasesValue(
			walletAddress,
			specifiedPurchasedNFTValueDto.contractAddress,
			specifiedPurchasedNFTValueDto.minValue,
			this.getChainName(chainId),
		);
		return result;
	}

	async verifySoldNFT(walletAddress: string, onchainCountDto: OnchainCountDto, chainId: string) {
		const result = await this.openseaService.verifySoldNFT(
			walletAddress,
			onchainCountDto.minCount,
			this.getChainName(chainId),
		);
		return result;
	}

	async verifySpecifiedNFTSold(
		walletAddress: string,
		specifiedNFTPurchaseDto: SpecifiedNFTPurchaseDto,
		chainId: string,
	) {
		const result = await this.openseaService.verifySpecifiedNFTSold(
			walletAddress,
			specifiedNFTPurchaseDto.contractAddress,
			specifiedNFTPurchaseDto.minCount,
			this.getChainName(chainId),
		);
		return result;
	}

	async verifySoldNFTValue(
		walletAddress: string,
		purchasedNFTValueDto: PurchasedNFTValueDto,
		chainId: string,
	) {
		const result = await this.openseaService.verifySoldNFTValue(
			walletAddress,
			purchasedNFTValueDto.minValue,
			this.getChainName(chainId),
		);
		return result;
	}

	async verifySpecifiedNFTSoldValue(
		walletAddress: string,
		specifiedPurchasedNFTValueDto: SpecifiedPurchasedNFTValueDto,
		chainId: string,
	) {
		const result = await this.openseaService.verifySpecifiedNFTSoldValue(
			walletAddress,
			specifiedPurchasedNFTValueDto.contractAddress,
			specifiedPurchasedNFTValueDto.minValue,
			this.getChainName(chainId),
		);
		return result;
	}

	async verifyTotalGasFeesSpent(walletAddress: string, totalGasFeeSpentDto: TotalGasFeeSpentDto) {
		const result = await this.gasFeeService.getTotalGasFeesSpent(
			walletAddress,
			totalGasFeeSpentDto.minBalance,
		);
		return result;
	}

	async verifyTotalNumberOfTransactions(walletAddress: string) {
		const result = await this.gasFeeService.getTotalNumberOfTransactions(walletAddress);
		return result;
	}
}
