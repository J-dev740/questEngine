export enum TaskOption {
	TWITTER_TASK = "twitter_task",
	DISCORD_TASK = "discord_task",
	TELEGRAM_TASK = "telegram_task",
	REFERRAL = "referral",
	QUIZ = "quiz",
	REDDIT = "reddit",
	YOUTUBE = "youtube",
	COINGECKO = "coingecko",
	COINMARKETCAP = "coinmarketcap",
	NFT_CHECK_TASK = "nft_check_task",
	WALLET_BALANCE_TASK = "wallet_balance_task",
	GAS_FEE = "gas_fee",
	OPENSEA = "opensea",
	ENS_CHECK = "ens",
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

export enum TaskStatus {
	PENDING = "pending",
	COMPLETED = "completed",
}

export enum TaskOrigin {
	ONCHAIN = "onchain",
	OFFCHAIN = "offchain",
}

export enum TaskState {
	ACTIVE = "active",
	INACTIVE = "inactive",
}
