/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
import { JsonRpcProvider } from "@ethersproject/providers";
import { Injectable, NotFoundException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import {  ethers,BigNumber } from "ethers";
import { ABI } from "./RewardPayout.json";
import {TABI} from "./token.json"


@Injectable()
export class ContractService {
	private readonly provider: JsonRpcProvider;

	private readonly ADMIN_PRIVATE_KEY: string;

	private readonly REWARD_PAYOUT_CONTRACT_ADDR: string;

	private readonly INFURA_API: string;

	constructor(private readonly config: ConfigService) {
		this.ADMIN_PRIVATE_KEY = this.config.get<string>("ADMIN_PRIVATE_KEY");
		this.REWARD_PAYOUT_CONTRACT_ADDR = this.config.get<string>("REWARD_PAYOUT_CONTRACT_ADDR");
		this.INFURA_API = this.config.get<string>("INFURA_API");
		// this.provider = new JsonRpcProvider("https://api.zan.top/node/v1/polygon/mumbai/public");
		this.provider = new JsonRpcProvider(this.INFURA_API);
	}

	async payoutERC20(
		questId: string,
		tokenAddress: string,
		recipients: string[],
		amounts: number[],
	) {
		const wallet = new ethers.Wallet(this.ADMIN_PRIVATE_KEY, 
			this.provider
			);

		const contractAddress = this.REWARD_PAYOUT_CONTRACT_ADDR;
		const contractABI = ABI;
		const tokenABI=TABI;

		const contract = new ethers.Contract(contractAddress, contractABI, wallet);
		const tokenContract = new ethers.Contract(tokenAddress, tokenABI, wallet);
		const result=amounts.reduce((a, b) => a + b, 0);
		
		// console.log("payoutcontract",contract)
		// console.log("provider",this.provider)
		console.log("approving contract to spend tokens");
		try {
			
		const approve = await tokenContract.approve(contractAddress, result);
		await approve.wait();
		} catch (error) {
			console.log("approval error");
			throw new Error(error);
		}
		console.log("doing gas estimation")
		const GasEstimation=
		await contract.estimateGas.payoutERC20(questId,tokenAddress,recipients,amounts)
		const getGasLimitMax = (gasEstimation) => {
			const gasEstimationBuffer = 1.2;
			 return BigNumber.from(Math.round(Number(gasEstimation) * gasEstimationBuffer));
			
		}
		 
		const getMaxFeePerGas = async (provider) => (await provider.getFeeData()).maxFeePerGas;
		const maxFeePerGas = await getMaxFeePerGas(this.provider);
		const automatorRole = await contract.AUTOMATOR_ROLE();

		console.log("maxFeePerGas",maxFeePerGas)
		console.log("GasEstimation",GasEstimation)
		// console.log("wallet",wallet)
		// const contract = await contractt.connect(wallet);
		// console.log("contract ",contract )
		async function checkHasRole() {
			try {
				console.log("walletAddress", wallet.address)
				console.log("automatorRole", automatorRole)
				// const automatorRole= String("0x61e61406bf21d7b87d4add4290d44cb24547d0d059db9e4a1b66dcce07fc3c83").valueOf()
				try {
					
					// await contract.grantRole(automatorRole,wallet.address,{
					// 	gasLimit: (getGasLimitMax(GasEstimation)), 
					// 	gasPrice: maxFeePerGas
					// });
				} catch (error) {
					console.error("Error calling grantRole:",error);
					throw new Error(error)
				}
			  const hasRoleResult = await contract.hasRole(automatorRole,
			   wallet.address);
			  
			  console.log(`Does wallet have the role 'AUTOMATOR ROLE'? ${hasRoleResult}`);
			  return hasRoleResult;
			} catch (error) {
			  console.error("Error calling hasRole:", error);
			  throw new Error(error);
			}
		  }

		try {
			const hasRoleResult=await checkHasRole();
			if(hasRoleResult===false){
				console.log("granting Automator Role")
				try {
					
					await contract.grantRole(automatorRole,wallet.address,{
						gasLimit: (getGasLimitMax(GasEstimation)), 
						gasPrice: maxFeePerGas
					});
				} catch (error) {
					console.log("Error calling grantRole:",error)
					throw new Error(error)
				}
			}
			// console.log("hasRoleResult",hasRoleResult)
			const transaction = await contract.payoutERC20(
				questId,
				tokenAddress,
				recipients,
				amounts,
				// ["5","5"],
				{gasLimit: (getGasLimitMax(GasEstimation)), 
				gasPrice: maxFeePerGas}
			);
			console.log("transaction",transaction.txHash)
			const receipt = await transaction.wait();

			// Transaction was successful
			console.log("transaction successful")
			return receipt;
		} catch (error) {
			console.error("Transaction failed:", error);

			// Retry logic here
			const maxRetries = 3;
			let retries = 0;

			while (retries < maxRetries) {
				try {
					const transaction = await contract.payoutERC20(
						questId,
						tokenAddress,
						recipients,
						amounts,
					);
					const receipt = await transaction.wait();
					return receipt;
				} catch (retryError) {
					console.error("Retry failed:", retryError);
					retries++;
				}
			}

			// If all retries fail, handle it accordingly
			throw new NotFoundException(`Transaction failed after ${retries} retries`);
		}
	}
}
