import { TaskOption, VERIFICATION_ENDPOINTS } from "../../constants/quest/task";

export const GetVerificationURL = (
	props: any,
	discordAuthCOde: string,
	telegramAuthCode: string,
	walletAddress: string,
) => {
	let verifyURL = "";
	const { taskDetails, quest_id } = props;
	if (taskDetails.task === TaskOption.DISCORD_TASK) {
		verifyURL =
			VERIFICATION_ENDPOINTS.DISCORD +
			"/" +
			taskDetails.customisation.discord_guild_id +
			"/" +
			discordAuthCOde;
	} else if (taskDetails.task === TaskOption.TELEGRAM_TASK) {
		verifyURL =
			VERIFICATION_ENDPOINTS.TELEGRAM +
			"/" +
			telegramAuthCode +
			"/" +
			taskDetails.customisation.join_telegram?.slice(13);
	} else if (taskDetails.task === TaskOption.ENS_CHECK) {
		verifyURL =
			VERIFICATION_ENDPOINTS.ENS +
			"/" +
			walletAddress +
			"/" +
			taskDetails.customisation.ens_domain_per_address;
	} else if (taskDetails.task === TaskOption.NFT_CHECK_TASK) {
		verifyURL =
			VERIFICATION_ENDPOINTS.NFT +
			"/" +
			walletAddress +
			"/" +
			taskDetails.customisation.nft_check;
	} else if (taskDetails.task === TaskOption.GAS_FEE) {
		verifyURL =
			VERIFICATION_ENDPOINTS.GAS_FEE +
			"/" +
			walletAddress +
			"/" +
			taskDetails.customisation.gas_fee;
	} else if (taskDetails.task === TaskOption.TRANSACTION_CHECK) {
		verifyURL =
			VERIFICATION_ENDPOINTS.TRANSACTION +
			"/" +
			walletAddress +
			"/" +
			taskDetails.customisation.transaction_check;
	} else if (taskDetails.task === TaskOption.WALLET_BALANCE_TASK) {
		verifyURL =
			VERIFICATION_ENDPOINTS.WALLET_CHECK +
			"/" +
			walletAddress +
			"/" +
			taskDetails.customisation.wallet_balance;
	} else if (taskDetails.task === TaskOption.OPENSEA_NFT_PURCHASE_CHECK) {
		verifyURL =
			VERIFICATION_ENDPOINTS.OPENSEA_NFT_PURCHASE_CHECK +
			"/" +
			walletAddress +
			"/" +
			taskDetails.customisation.purchased_count;
	} else if (taskDetails.task === TaskOption.OPENSEA_NFT_SOLD_CHECK) {
		verifyURL =
			VERIFICATION_ENDPOINTS.OPENSEA_NFT_SOLD_CHECK +
			"/" +
			walletAddress +
			"/" +
			taskDetails.customisation.sale_count;
	} else if (taskDetails.task === TaskOption.OPENSEA_NFT_VALUE_CHECK) {
		verifyURL =
			VERIFICATION_ENDPOINTS.OPENSEA_NFT_VALUE_CHECK +
			"/" +
			walletAddress +
			"/" +
			taskDetails.customisation.purchased_count_value;
	} else if (taskDetails.task === TaskOption.OPENSEA_SOLD_NFT_VALUE_CHECK) {
		verifyURL =
			VERIFICATION_ENDPOINTS.OPENSEA_SOLD_NFT_VALUE_CHECK +
			"/" +
			walletAddress +
			"/" +
			taskDetails.customisation.sale_count_value;
	} else if (taskDetails.task === TaskOption.OPENSEA_SPECIFIED_NFT_PURCHASE_CHECK) {
		verifyURL =
			VERIFICATION_ENDPOINTS.OPENSEA_SPECIFIED_NFT_PURCHASE_CHECK +
			"/" +
			walletAddress +
			"/" +
			taskDetails.customisation.constract_purchase_count +
			"/" +
			taskDetails.customisation.contract_purchase;
	} else if (taskDetails.task === TaskOption.OPENSEA_SPECIFIED_NFT_SOLD_CHECK) {
		verifyURL =
			VERIFICATION_ENDPOINTS.OPENSEA_SPECIFIED_NFT_SOLD_CHECK +
			"/" +
			walletAddress +
			"/" +
			taskDetails.customisation.constract_sale_count +
			"/" +
			taskDetails.customisation.contract_sale;
	} else if (taskDetails.task === TaskOption.OPENSEA_SPECIFIED_NFT_VALUE_CHECK) {
		verifyURL =
			VERIFICATION_ENDPOINTS.OPENSEA_SPECIFIED_NFT_VALUE_CHECK +
			"/" +
			walletAddress +
			"/" +
			taskDetails.customisation.contract_purchased_count +
			"/" +
			taskDetails.customisation.contract_purchase_value;
	} else if (taskDetails.task === TaskOption.OPENSEA_SPECIFIED_SOLD_NFT_VALUE_CHECK) {
		verifyURL =
			VERIFICATION_ENDPOINTS.OPENSEA_SPECIFIED_SOLD_NFT_VALUE_CHECK +
			"/" +
			walletAddress +
			"/" +
			taskDetails.customisation.contract_sale_count +
			"/" +
			taskDetails.customisation.contract_sale_value;
	}
	return verifyURL;
};
