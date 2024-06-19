import { AuthPayload } from "@common/decorators/utils/authPayload.decorator";
import { AuthGuard } from "@common/middleware/auth.guard";
import { Body, Controller, Get, Post, Res } from "@nestjs/common";
import { Param, Patch, Query, Req, UseGuards } from "@nestjs/common/decorators";
import { QuestService } from "@src/quest/quest.service";
import { Response } from "express";
import { ReferDTO, TelegramDto, TwitterDto, TwitterFollowDto } from "./dtos/offchain.dto";
import {
	NFTCountDto,
	OnchainCountDto,
	PurchasedNFTValueDto,
	SpecifiedNFTPurchaseDto,
	SpecifiedPurchasedNFTValueDto,
	TotalGasFeeSpentDto,
	TotalTransactionCountDto,
	VerifyBalanceDto,
} from "./dtos/onchain.dto";
import { DiscordService } from "./services/discord/discord.service";
import { ReferralDTO } from "./services/referral/dtos/referral.dto";
import { ReferralService } from "./services/referral/referral.service";
import { TwitterService } from "./services/twitter/twitter.service";
import { VerificationService } from "./services/verification/verification.service";
// import { devNull } from "os";
// import { error } from "console";
// import { NotificationDTO } from "./services/notification/dtos/notification.dto";
import { UserNotificationService } from "./services/notification/notification.service";
import { UserNotificationDTO } from "./services/notification/dtos/userNotification.dto";

let DiscordCode = "";
@Controller({ path: "tasks", version: "1" })
export class TasksController {
	constructor(
		private readonly discordService: DiscordService,
		private readonly twitterService: TwitterService,
		private readonly referralService: ReferralService,
		private readonly questService: QuestService,
		private readonly verificationService: VerificationService,
		private readonly userNotificationService: UserNotificationService,
	) {}

	@Post("/Notify")
	@UseGuards()
	async setNotification(@Body() notification: UserNotificationDTO) {
		try {
			console.log("/NotifyBody", notification);
			const result = await this.userNotificationService.Notify(notification);
			return result;
		} catch (error) {
			console.log("taskcontrollerNotifyError", error);
			throw new Error("taskcontrollerNotifyError");
		}
	}

	@Get("/notifications")
	@UseGuards()
	async getNotification(
		@Query("userId") userId: string,
		// @Query("skip") page=1,
		@Query("limit") limit = 4,
	) {
		console.log("/notificationsGet", userId);
		const notifications =
			// await this.notificationService.getNotifications(userId,page,limit);
			await this.userNotificationService.getNotifications(userId, limit);

		if (notifications) {
			console.log("notification present");
			return notifications;
		}
		return false;
	}

	@Get("/notification/:id")
	@UseGuards()
	async getNotificationById(@Param("id") id: string) {
		try {
			const notification = await this.userNotificationService.getNotification(id);
			return notification;
		} catch (error) {
			console.log("getNotificationByIdError", error);
			throw new Error("getNotificationByIdError");
		}
	}

	@Patch("/notifications")
	@UseGuards()
	async updateNotification(@Query("userNotificationId") UserNotificationId: string) {
		console.log("/notificationsUpdate", UserNotificationId);
		const updatedNotification = await this.userNotificationService.updateNotification(
			UserNotificationId,
		);
		if (updatedNotification) {
			// console.log("notification updated", updatedNotification?.Notification[index]?.read);
			return updatedNotification;
		}
		return false;
	}

	//  DISCORD TASKS //

	@Get("/discord/verify")
	@UseGuards()
	setDiscordCode(@Req() req: any, @Res() res: any) {
		// console.log(req)
		// console.log(req)
		console.log(req.query.code);
		DiscordCode = req.query.code;
		// res.status(200).send('authenticated')
		const script = `<script>
		window.close();
		</script>`;
		res.status(200).send(script);
		// res.status(200)
	}

	getDiscord() {
		return "Hello Discord";
	}

	@Post("/discord/create")
	@UseGuards(AuthGuard)
	async createDiscordTaks(@Body() discordLink: string, @Body() discordGuildID: string) {
		return this.discordService.createTask(discordLink, discordGuildID);
	}

	@Post("/discord")
	@UseGuards(AuthGuard)
	joinChannel(@Req() req, @Res() res) {
		// return res.redirect(uri);
		console.log(req.body.uri);
		return res.status(200).json({ Uri: req.body.uri });
	}

	// @Get("/discord/verify/:GuildID/:Code")
	@Get("/discord/verify/callback")
	@UseGuards()
	async getuserGuilds(
		@Query("GuildID") guildId: string,
		// @Param("Code") code: string,
	): Promise<boolean> {
		console.log("discordVerify----------------------->");
		console.log(guildId);
		console.log(DiscordCode);
		if (!guildId || DiscordCode === "") {
			console.log("params required");
			return false;
		}
		return this.discordService.getUserGuilds(guildId, DiscordCode);
	}

	// TWITTER TASKS //
	@Get("/twitter")
	@UseGuards(AuthGuard)
	getTwitterHello(): string {
		return this.twitterService.getHello();
	}

	@Get("/twitter/login")
	@UseGuards(AuthGuard)
	async twitterLogin(
		@Res({ passthrough: true }) res: Response,
		// @Res() res: Response,

		@Query("walletId") walletId: string,
	) {
		const url = await this.twitterService.login(walletId);
		// return url;
		res.cookie("walletId", walletId, { httpOnly: true }).status(200).json({ redirectUrl: url });
		// res.redirect(url);
	}

	@Get("/twitter/callback")
	@UseGuards(AuthGuard)

	// async callback(
	callback(
		// @Query("code") code: string,
		// @Param("walletId") walletId: string,
		@Query("state") state: string,
	) {
		console.log("Twitter_auth_callback-------------------------->");
		// console.log(code)
		// console.log(walletId)
		console.log(state);
		console.log("called");
		// return await this.twitterService.authCallback(code, state, walletId);
	}

	@Get("/twitter/get/me")
	@UseGuards(AuthGuard)
	async getTwitterUser(@Query("walletId") walletId: string) {
		console.log("called");
		return this.twitterService.getTwitterMe(walletId);
	}

	@Get("/twitter/get/:username")
	@UseGuards(AuthGuard)
	async getTwitterUserByUsername(
		@Query("walletId") walletId: string,
		@Param("username") username: string,
	) {
		return this.twitterService.getTwitterUser(walletId, username);
	}

	@Post("/verify/followUser/quest/:questID")
	@UseGuards(AuthGuard)
	async verifyFollowUser(
		@Param("questID") questID: string,
		@AuthPayload("walletaddress") walletaddress: string,
		@Body() body: TwitterFollowDto,
	) {
		console.log(walletaddress);
		await this.verificationService.verifyFollowTwitterUser(walletaddress, body);
		const updateTaskInQuest = await this.questService.updateTaskInQuestProgress(
			questID,
			body.taskID,
			walletaddress,
		);
		console.log("Task_status after twitter follow");
		console.log(updateTaskInQuest);
		return updateTaskInQuest;
	}

	@Post("/verify/retweet/quest/:questID")
	@UseGuards(AuthGuard)
	async verifyRetweet(
		@Param("questID") questID: string,
		@AuthPayload("walletAddress") walletAddress: string,
		@Body() body: TwitterDto,
	) {
		await this.verificationService.verifyCreateRetweet(walletAddress, body);
		const updateTaskInQuest = await this.questService.updateTaskInQuestProgress(
			questID,
			body.taskID,
			walletAddress,
		);
		return updateTaskInQuest;
	}

	@Post("/verify/createLike/quest/:questID")
	@UseGuards(AuthGuard)
	async verifyCreateLike(
		@Param("questID") questID: string,
		@AuthPayload("walletAddress") walletAddress: string,
		@Body() body: TwitterDto,
	) {
		await this.verificationService.verifyCreateLike(walletAddress, body);
		const updateTaskInQuest = await this.questService.updateTaskInQuestProgress(
			questID,
			body.taskID,
			walletAddress,
		);
		return updateTaskInQuest;
	}

	@Get("/twitter/tweets/:id")
	@UseGuards(AuthGuard)
	async getTweets(@Param("id") id: string, @Query("walletId") walletId: string) {
		const getTweetById = await this.twitterService.getTweetById(walletId, id);
		return getTweetById;
	}

	// TELEGRAM TASKS //

	@Post("/verify/user/quest/:questID")
	@UseGuards(AuthGuard)
	// @UseGuards()
	async verifyUser(
		@Param("questID") questID: string,
		@AuthPayload("walletAddress") walletAddress: string,
		@Body() telegramDto: TelegramDto,
	) {
		const result = await this.verificationService.verifyTelegramUser(telegramDto);
		return result;
		// const updateTaskInQuest = await this.questService.updateTaskInQuestProgress(
		// 	questID,
		// 	telegramDto.taskID,
		// 	walletAddress,
		// );
		// return updateTaskInQuest;
	}

	// REFERRAL TASKS //
	// @Get('/referral')
	// // @UseGuards(AuthGuard)
	// async getLink(): Promise<any> {
	//   const generated = await this.referralService.getLink();
	//   return generated;
	// }

	@Post("/referral")
	@UseGuards(AuthGuard)
	// @UseGuards(AuthGuard)
	async addReferral(@Body() body: { walletAddress: string }): Promise<any> {
		const generateReferral = await this.referralService.addReferral(body.walletAddress);

		return generateReferral; // this will return the uuid returned by addReferral if a referralCode associated with a walletId does not exist
	}

	@Get("/referral/getUserGems/:userwallet")
	@UseGuards(AuthGuard)
	async getUserGems(@Param("userwallet") userWallet: string): Promise<number> {
		const getUserGems = await this.referralService.getUserGems(userWallet);
		return getUserGems;
	}

	@Get("/referral/:id")
	@UseGuards(AuthGuard)

	// @UseGuards(AuthGuard)
	async getReferralCode(@Param("id") walletId: string): Promise<any> {
		const referralCode = await this.referralService.getReferralCode(walletId);
		return referralCode;
	}

	@Patch("/referral/:id")
	@UseGuards(AuthGuard)

	// @UseGuards(AuthGuard)
	async updateReferral(
		@Body() referralDTO: ReferralDTO,
		@Param("id") ReferralCode: string,
	): Promise<any> {
		const UpdatedReferral = await this.referralService.updateReferral(
			referralDTO.questId,
			ReferralCode,
			referralDTO.walletId,
		);
		return UpdatedReferral;
	}

	@Post("/verify/referral-count/quest/:questID")
	@UseGuards(AuthGuard)
	async verifyReferralCount(
		@AuthPayload("walletAddress") walletAddress: string,
		@Param("questID") questID: string,
		@Body() referDTO: ReferDTO,
	) {
		console.log(referDTO);
		console.log(questID);
		console.log(walletAddress);
		const result = await this.verificationService.verifyReferralCount(questID, referDTO);
		console.log("referralVerificationResult", result);
		// if(result){
		// 	const updateTaskInQuest = await this.questService.updateTaskInQuestProgress(
		// 		questID.toString(),
		// 		referDTO.taskID.toString(),
		// 		walletAddress.toString(),
		// 	);
		// 	return updateTaskInQuest;
		// }
		// else{
		// 	throw new error("taskIncomplete");
		// }
		return result;
	}

	// ONCHAIN GAS FEES //
	@Post("/verify/gas-fees/quest/:questID")
	@UseGuards(AuthGuard)
	async verifyTotalGasFeesSpent(
		@Param("questID") questID: string,
		@AuthPayload("walletaddress") walletaddress: string,
		@Body() body: TotalGasFeeSpentDto,
	) {
		await this.verificationService.verifyTotalGasFeesSpent(walletaddress, body);
		const userId = (await this.questService.getUser(walletaddress))?._id.toString();
		const updateTaskInQuest = await this.questService.updateTaskInQuestProgress(
			questID,
			body.taskID,
			userId,
		);
		return updateTaskInQuest;
	}

	// ONCHAIN TRANSACTION COUNT CHECK //
	@Post("/verify/transaction-count/quest/:questID")
	@UseGuards(AuthGuard)
	async verifyTotalNumberOfTransactions(
		@AuthPayload("walletaddress") walletaddress: string,
		@Param("questID") questID: string,
		@Body() body: TotalTransactionCountDto,
	) {
		await this.verificationService.verifyTotalNumberOfTransactions(walletaddress);
		const userId = (await this.questService.getUser(walletaddress))?._id.toString();
		const updateTaskInQuest = await this.questService.updateTaskInQuestProgress(
			questID,
			body.taskID,
			userId,
		);
		return updateTaskInQuest;
	}

	// VERIFY NFT COUNT CHECK //
	@Post("/verify/nft-count/quest/:questID")
	@UseGuards(AuthGuard)
	async verifyNFTcount(
		@Param("questID") questID: string,
		@AuthPayload("walletaddress") walletaddress: string,
		@Body() body: NFTCountDto,
	) {
		await this.verificationService._verifyNFTcount(walletaddress, body);
		const userId = (await this.questService.getUser(walletaddress))?._id.toString();
		const updateTaskInQuest = await this.questService.updateTaskInQuestProgress(
			questID,
			body.taskID,
			userId,
		);
		return updateTaskInQuest;
	}

	// VERIFY WALLET BALANCE //
	@Post("/verify/balance/quest/:questID")
	// @UseGuards(AuthGuard)
	async verifyBalance(
		@Param("questID") questID: string,
		@AuthPayload("walletaddress") walletaddress: string,
		@Body() body: VerifyBalanceDto,
	) {
		await this.verificationService.walletBalanceCheck(walletaddress, body);
		const userId = (await this.questService.getUser(walletaddress))?._id.toString();
		const updateTaskInQuest = await this.questService.updateTaskInQuestProgress(
			questID,
			body.taskID,
			userId,
		);
		return updateTaskInQuest;
	}

	// ENS TASKS //
	@Post("/verify/ens-count/quest/:questID")
	@UseGuards(AuthGuard)
	async verifyENScount(
		@Param("questID") questID: string,
		@AuthPayload("walletaddress") walletaddress: string,
		// @Query("walletAddress") walletaddress:string,
		@Body() body: OnchainCountDto,
	) {
		console.log("OnchainCountDto",body);
		await this.verificationService.verifyENScount(walletaddress, body);
		console.log("ens verification done ")
		const userId = (await this.questService.getUser(walletaddress))?._id.toString();
		const updateTaskInQuest = await this.questService.updateTaskInQuestProgress(
			questID,
			body.taskID,
			userId,
		);
		return updateTaskInQuest;
	}

	// NFTs PURCHASED //
	@Post("/verify/purchased-nft-count/quest/:questID")
	// @UseGuards(AuthGuard)
	async verifyPurchasedNFTCount(
		@Param("questID") questID: string,
		@Query("chainId") chainId: string,
		@AuthPayload("walletaddress") walletaddress: string,
		@Body() body: OnchainCountDto,
	) {
		console.log("Body", body);
		console.log("Wallet Address", walletaddress);
		console.log("ChainId", chainId);
		console.log("QuestId", questID);
		const say = await this.verificationService.verifyPurchasedNFT(walletaddress, body, chainId);
		console.log("Say", say);
		const userId = (await this.questService.getUser(walletaddress))?._id.toString();
		console.log("userId", userId);
		const updateTaskInQuest = await this.questService.updateTaskInQuestProgress(
			questID,
			body.taskID,
			userId,
		);
		return updateTaskInQuest;
	}

	// SPECIFIED NFT PURCHASES //
	@Post("/verify/specified-nft-purchases/quest/:questID")
	@UseGuards(AuthGuard)
	async vaeifySpecifiedNFTPurchases(
		@Param("questID") questID: string,
		@Query("chainId") chainId: string,
		@AuthPayload("walletaddress") walletaddress: string,
		@Body() body: SpecifiedNFTPurchaseDto,
	) {
		await this.verificationService.verifySpecifiedNFTPurchases(walletaddress, body, chainId);
		const userId = (await this.questService.getUser(walletaddress))?._id.toString();
		const updateTaskInQuest = await this.questService.updateTaskInQuestProgress(
			questID,
			body.taskID,
			userId,
		);
		return updateTaskInQuest;
	}

	// TOTAL VALUE OF NFT PURCHASED //
	@Post("/verify/nft-purchased-value/quest/:questID")
	@UseGuards(AuthGuard)
	async verifyPurchasedNFTValue(
		@Param("questID") questID: string,
		@Query("chainId") chainId: string,
		@AuthPayload("walletaddress") walletaddress: string,
		@Body() body: PurchasedNFTValueDto,
	) {
		await this.verificationService.verifyPurchasedNFTValue(walletaddress, body, chainId);
		const userId = (await this.questService.getUser(walletaddress))?._id.toString();
		const updateTaskInQuest = await this.questService.updateTaskInQuestProgress(
			questID,
			body.taskID,
			userId,
		);
		return updateTaskInQuest;
	}

	// SPECIFIED NFT PURCHASE VALUE //
	@Post("/verify/specified-nft-purchases-value/quest/:questID")
	@UseGuards(AuthGuard)
	async vaeifySpecifiedNFTPurchasesValue(
		@Param("questID") questID: string,
		@Query("chainId") chainId: string,
		@AuthPayload("walletaddress") walletaddress: string,
		@Body() body: SpecifiedPurchasedNFTValueDto,
	) {
		await this.verificationService.verifySpecifiedNFTPurchasesValue(
			walletaddress,
			body,
			chainId,
		);
		const userId = (await this.questService.getUser(walletaddress))?._id.toString();
		const updateTaskInQuest = await this.questService.updateTaskInQuestProgress(
			questID,
			body.taskID,
			userId,
		);
		return updateTaskInQuest;
	}

	// NFTs Sold //
	@Post("/verify/nft-sold/quest/:questID")
	@UseGuards(AuthGuard)
	async verifysoldNFTCount(
		@Param("questID") questID: string,
		@Query("chainId") chainId: string,
		@AuthPayload("walletaddress") walletaddress: string,
		@Body() body: OnchainCountDto,
	) {
		await this.verificationService.verifySoldNFT(walletaddress, body, chainId);
		const userId = (await this.questService.getUser(walletaddress))?._id.toString();
		const updateTaskInQuest = await this.questService.updateTaskInQuestProgress(
			questID,
			body.taskID,
			userId,
		);
		return updateTaskInQuest;
	}

	// SPECIFIED NFT's SOLD //
	@Post("/verify/specified-nft-sold/quest/:questID")
	@UseGuards(AuthGuard)
	async vaeifySpecifiedNFTSold(
		@Param("questID") questID: string,
		@Query("chainId") chainId: string,
		@AuthPayload("walletaddress") walletaddress: string,
		@Body() body: SpecifiedNFTPurchaseDto,
	) {
		await this.verificationService.verifySpecifiedNFTSold(walletaddress, body, chainId);
		const userId = (await this.questService.getUser(walletaddress))?._id.toString();
		const updateTaskInQuest = await this.questService.updateTaskInQuestProgress(
			questID,
			body.taskID,
			userId,
		);
		return updateTaskInQuest;
	}

	// TOTAL VALUE OF NFTS SOLD //
	@Post("/verify/nft-sold-value/quest/:questID")
	@UseGuards(AuthGuard)
	async verifySoldNFTValue(
		@Param("questID") questID: string,
		@Query("chainId") chainId: string,
		@AuthPayload("walletaddress") walletaddress: string,
		@Body() body: PurchasedNFTValueDto,
	) {
		await this.verificationService.verifySoldNFTValue(walletaddress, body, chainId);
		const userId = (await this.questService.getUser(walletaddress))?._id.toString();
		const updateTaskInQuest = await this.questService.updateTaskInQuestProgress(
			questID,
			body.taskID,
			userId,
		);
		return updateTaskInQuest;
	}

	// TOTAL VALUE OF SPECIFIED NFTS SOLD //
	@Post("/verify/specified-nft-sold-value/quest/:questID")
	async vaeifySpecifiedNFTSoldValue(
		@Param("questID") questID: string,
		@Query("chainId") chainId: string,
		@AuthPayload("walletaddress") walletaddress: string,
		@Body() body: SpecifiedPurchasedNFTValueDto,
	) {
		await this.verificationService.verifySpecifiedNFTSoldValue(walletaddress, body, chainId);
		const userId = (await this.questService.getUser(walletaddress))?._id.toString();
		const updateTaskInQuest = await this.questService.updateTaskInQuestProgress(
			questID,
			body.taskID,
			userId,
		);
		return updateTaskInQuest;
	}
}

// REFERRAL

// 1. User object ID as referral code =>
//  REFERRAL CODE: DOMAINNAME/quest/QUESTID/USEROBJECTID

// NEW USER : DOMAIN/quest/ :QUESTID / : USEROBJECTID   ---- USEROBJECTID & QUESTID AS AN OBJECT LOCALTORAGE
//  WHEN THER NEW OBJECT IS SAVED IN THE REDUX THEN REDIRECT => DOMAIN/ quest/ :QUESID

/// NEWUSER => PARTICIPATE BUTTON => WALLET CONNECT
//  OLDUSER => WALLETID

// Participate -> API req  { QUESTID, USEROBJECTID, USER-WALLETID}

// DISCORD ID => LOCALSTORAGE REDU
