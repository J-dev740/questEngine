import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { TwitterDto, TwitterFollowDto } from "@src/tasks/dtos/offchain.dto";
import * as dotenv from "dotenv";
import { Model } from "mongoose";
import { Client, auth } from "twitter-api-sdk";
import { OAuth2User } from "twitter-api-sdk/dist/OAuth2User";
// import { promises } from "dns";
import UserQueryService from "../../../_common/database/queries/user.query";
import {
	UserDocument,
	modelName as userModelName,
} from "../../../_common/database/schema/user.schema";

dotenv.config();

@Injectable()
export class TwitterService {
	userQueryService: UserQueryService;

	twitterClient: OAuth2User;

	constructor(@InjectModel(userModelName) UserSchema: Model<UserDocument>) {
		this.userQueryService = new UserQueryService(UserSchema);
		// this.twitterClient = new OAuth2User({
		// 	client_id: process.env.TWITTER_CLIENT_ID,
		// 	client_secret: process.env.TWITTER_CLIENT_SECRET,
		// 	// callback: `https://ebcf-223-186-22-8.ngrok-free.app/v1/tasks/twitter/callback`,
		// 	callback: "http://localhost:5000/v1/tasks/twitter/callback",
		// 	scopes: [
		// 		"users.read",
		// 		"follows.write",
		// 		"offline.access",
		// 		"follows.read",
		// 		"tweet.write",
		// 		"tweet.read",
		// 		"like.read",
		// 		"like.write",
		// 	],
		// 	// request_options:{
		// 	// 	base_url:"http://localhost:5000/v1",

		// 	// }
		// });
		this.twitterClient = new auth.OAuth2User({
			client_id: process.env.TWITTER_CLIENT_ID,
			client_secret: process.env.TWITTER_CLIENT_SECRET,
			// callback: `https://ebcf-223-186-22-8.ngrok-free.app/v1/tasks/twitter/callback`,
			callback: "http://localhost:5000/v1/tasks/twitter/callback",
			scopes: [
				"users.read",
				"follows.write",
				"offline.access",
				"follows.read",
				"tweet.write",
				"tweet.read",
				"like.read",
				"like.write",
			],
		});
	}

	async login(walletId: string) {
		console.log(this.twitterClient);
		const authUrl = this.twitterClient.generateAuthURL({
			state: walletId,
			code_challenge_method: "s256",
		});
		console.log("AuthUrl---------------------------------->");
		console.log(authUrl);
		return authUrl;
	}

	async authCallback(code: string, state: string, walletAddress: string) {
		// let { } = this.twitterClient.token

		await this.userQueryService.readEntity({ walletAddress });

		const token = await this.twitterClient.requestAccessToken(code);
		// const token = await this.twitterClient.requestAccessToken(state);

		await this.userQueryService.updateEntity({ walletAddress }, { twitterToken: token.token });

		await this.userQueryService.readEntity({ walletAddress });

		console.log("called");
	}

	async getUserClient(walletAddress: string): Promise<{ client: Client; clientUser: any }> {
		const user = await this.userQueryService.readEntity({ walletAddress });
		// get user
		const token = user.twitterToken;

		this.twitterClient.token = token;
		if (this.twitterClient.isAccessTokenExpired()) {
			this.refreshToken();
		}

		const client = new Client(this.twitterClient);
		const clientUser = await client.users.findMyUser();
		return { client, clientUser };
	}

	async refreshToken() {
		try {
			await this.twitterClient.refreshAccessToken();
		} catch (err) {
			console.error(err);
		}
	}

	async getTwitterMe(walletAddress: string) {
		const currentUser = await this.userQueryService.readEntity({ walletAddress });
		// get user
		const token = currentUser.twitterToken;

		this.twitterClient.token = token;
		if (this.twitterClient.isAccessTokenExpired()) {
			this.refreshToken();
		}

		const client = new Client(this.twitterClient);

		const userData = await client.users.findMyUser();

		return { message: "success", data: userData.data };
	}

	async getTwitterUser(walletId: string, twitterHandle: string) {
		const { client, clientUser } = await this.getUserClient(walletId);
		if (clientUser?.data) {
			const user = await client.users.findUserByUsername(twitterHandle);
			if (user.errors) {
				throw new Error(user.errors[0].detail);
			}
			return { message: "success", data: user.data };
		}
		return "";
	}

	async getTweetById(walletId: string, tweetId: string) {
		const { client, clientUser } = await this.getUserClient(walletId);
		if (clientUser?.data) {
			const tweet = await client.tweets.findTweetById(tweetId, {
				"user.fields": ["name"],
				"tweet.fields": ["text", "source"],
			});
			if (tweet.errors) {
				throw new Error(tweet.errors[0].detail);
			}
			return { message: "success", data: tweet.data };
		}
		return { message: "SOMETHING WENT WRONG" };
	}

	async VerifyFollowTwitterUser(
		walletId: string,
		createFollowuser: TwitterFollowDto,
	): Promise<any> {
		console.log("before getUserClient_verifyFollowTwitterUser");
		const { client, clientUser } = await this.getUserClient(walletId);
		console.log("client", client);
		console.log("clientUser", clientUser);

		const clientID = await client.users.findUserByUsername(createFollowuser.twitterId);

		if (clientUser?.data) {
			const followers = await client.users.usersIdFollowing(clientUser.data.id);
			if (followers.data.some((follower) => follower.id === clientID.data.id)) {
				return { message: "success", data: followers.data };
			}
			throw new Error("You are not following this user");
		}
		return { message: "SOMETHING WENT WRONG" };
	}

	async verifyCreateRetweet(walletId: string, createRetweet: TwitterDto) {
		const { client, clientUser } = await this.getUserClient(walletId);
		if (clientUser?.data) {
			const retweeters = await client.users.tweetsIdRetweetingUsers(createRetweet.tweetId, {
				"user.fields": ["id"],
			});
			if (retweeters.data.some((retweeter) => retweeter.id === clientUser.data.id)) {
				return { message: "success", data: retweeters.data };
			}
			throw new Error("You are not retweeting this tweet");
		}
		return { message: "SOMETHING WENT WRONG" };
	}

	async verifyCreateLike(walletId: string, createRetweet: TwitterDto) {
		const { client, clientUser } = await this.getUserClient(walletId);
		if (clientUser?.data) {
			const likes = await client.tweets.usersIdLikedTweets(clientUser.data.id);
			if (likes.data.some((like) => like.id === createRetweet.tweetId)) {
				return { message: "success", data: likes.data };
			}
			throw new Error("You are not liking this tweet");
		}
		return { message: "SOMETHING WENT WRONG" };
	}

	getHello() {
		return "Hello World!";
	}
}
