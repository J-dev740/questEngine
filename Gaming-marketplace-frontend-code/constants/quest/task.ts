// export enum TaskOption {
// 	TWITTER_TASK = "twitter_task",
// 	DISCORD_TASK = "discord_task",
// 	TELEGRAM_TASK = "telegram_task",
// 	REFFERAL_TASK = "referral_task",
// 	NFT_CHECK_TASK = "nft_check_task",
// 	WALLET_BALANCE_TASK = "wallet_balance_task",
// 	GAS_FEE = "gas_fee",
// 	ENS_CHECK = "ens",
// 	TRANSACTION_CHECK = "transaction",
// 	OPENSEA_NFT_PURCHASE_CHECK = "opensea_nft_purchase",
// 	OPENSEA_SPECIFIED_NFT_PURCHASE_CHECK = "opensea_spec_nft_purchase",
// 	OPENSEA_NFT_VALUE_CHECK = "opensea_nft_value",
// 	OPENSEA_SPECIFIED_NFT_VALUE_CHECK = "opensea_spec_nft_value",
// 	OPENSEA_NFT_SOLD_CHECK = "opensea_nft_sold",
// 	OPENSEA_SPECIFIED_NFT_SOLD_CHECK = "opensea_spec_nft_sold",
// 	OPENSEA_SOLD_NFT_VALUE_CHECK = "opensea_sold_nft_value",
// 	OPENSEA_SPECIFIED_SOLD_NFT_VALUE_CHECK = "opensea_spec_sold_nft_value",
// }

export enum TaskOption {
	TWITTER_TASK = "twitter_task",
	DISCORD_TASK = "discord_task",
	TELEGRAM_TASK = "telegram_task",
	REFERRAL = "referral",
	QUIZ = "quiz",
	REDDIT = "reddit",
	// YOUTUBE = "YOUTUBE",
	YOUTUBE = "youtube",

	COINGECKO = "COINGECKO",
	COINMARKETCAP = "coinmarketcap",
	NFT_CHECK_TASK = "nft_check_task",
	WALLET_BALANCE_TASK = "wallet_balance_task",
	GAS_FEE = "gas_fee",
	OPENSEA = "OPENSEA",
	ENS_CHECK = "ens",
	TRANSACTION_CHECK = "transaction",
	OPENSEA_NFT_PURCHASE_CHECK = "opensea_nft_purchase",
	OPENSEA_NFT_SOLD_CHECK = "opensea_nft_sold",
	OPENSEA_NFT_VALUE_CHECK = "opensea_nft_value",
	OPENSEA_SOLD_NFT_VALUE_CHECK = "opensea_sold_nft_value",
	OPENSEA_SPECIFIED_NFT_PURCHASE_CHECK = "opensea_spec_nft_purchase",
	OPENSEA_SPECIFIED_NFT_SOLD_CHECK = "opensea_spec_nft_sold",
	OPENSEA_SPECIFIED_NFT_VALUE_CHECK = "opensea_spec_nft_value",
	OPENSEA_SPECIFIED_SOLD_NFT_VALUE_CHECK = "opensea_spec_sold_nft_value",
	REDIRECT = "redirect",
	NULL = "",
}
export enum TaskType {
	TWITTER_FOLLOW = "followUser",
	TWITTER_RETWEET = "retweet",
	TWITTER_CREATELIKE = "createLike",
	TELEGRAM_USER_VERIFY = "user",
	REFERRAL_COUNT_VERIFY = "referral-count",
	NFT_COUNT = "nft-count",
	WALLET_BALANCE_VERIFY = "balance",
	ENS_COUNT_VERIFY = "ens-count",
	PURCHASED_NFT_COUNT = "purchased-nft-count",
	SPECIFIED_NFT_PURCHASES = "specified-nft-purchases",
	PURCHASED_NFT_VALUE = "nft-purchased-value",
	SPECIFIED_NFT_PURCHASES_VALUE = "specified-nft-purchases-value",
	SOLD_NFT_COUNT = "nft-sold",
	SPECIFIED_NFT_SOLD_COUNT = "specified-nft-sold",
	SOLD_NFT_VALUE = "nft-sold-value",
	SPECIFIED_NFT_SOLD_VALUE = "specified-nft-sold-value",
	GAS_FEES_SPENT = "gas-fees",
	TOTAL_NUMBER_OF_TRANSACTIONS = "transaction-count",
}

export const enum VERIFICATION_ENDPOINTS {
	DISCORD = "discord/verify",
	TWITTER = "twitter/follow",
	TELEGRAM = "telegram/verify",
	GAS_FEE = "gas-fees",
	TRANSACTION = "transaction-count",
	NFT = "nft-count",
	REFERRAL_CHECK = "referral-verify",
	WALLET_CHECK = "wallet-check",
	ENS = "ens-check",
	OPENSEA_NFT_PURCHASE_CHECK = "opensea/nft-purchased",
	OPENSEA_SPECIFIED_NFT_PURCHASE_CHECK = "opensea/specified-nft-purchases",
	OPENSEA_NFT_VALUE_CHECK = "opensea/nft-purchased-value",
	OPENSEA_SPECIFIED_NFT_VALUE_CHECK = "opensea/specified-nft-purchases-value",
	OPENSEA_NFT_SOLD_CHECK = "opensea/nft-sold",
	OPENSEA_SPECIFIED_NFT_SOLD_CHECK = "opensea/specified-nft-sold",
	OPENSEA_SOLD_NFT_VALUE_CHECK = "opensea/nft-sold-value",
	OPENSEA_SPECIFIED_SOLD_NFT_VALUE_CHECK = "opensea/specified-nft-sold-value",
}

export enum TaskStatus {
	PENDING = "pending",
	COMPLETED = "completed",
}

export enum QuestStatus {
	FINISHED = "FINISHED",
	ONGOING = "ONGOING",
}

export interface Task {
	// task: TaskOption;
	category: TaskOption;
	_id: string;
	type: TaskType;
	// type: string;

	customisation: { [k: string]: string };
}
