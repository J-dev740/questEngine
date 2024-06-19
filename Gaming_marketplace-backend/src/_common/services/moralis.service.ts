import { EvmChain } from "@moralisweb3/evm-utils";
import { Injectable, Logger, OnApplicationBootstrap } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import Moralis from "moralis";
import { URL } from "url";

import config from "../constants/moralis.config.json";

interface StreamOptions {
	webhookUrl: string;
	tag: string;
	topic0: string[];
	abi: any;
	includeNativeTxs: boolean;
	includeContractLogs: boolean;
	description: string;
	chains: string[];
}

type UpdatableOptions = Pick<(typeof config)[0], "contracts" | "tag" | "chains" | "webhookRoute">;

type StreamStatus = "active" | "paused" | "error" | "terminated";

@Injectable()
export class MoralisService implements OnApplicationBootstrap {
	chains: EvmChain[];

	moralisLogger = new Logger("MoralisService");

	selfUrl: string;

	constructor(private configService: ConfigService) {
		this.selfUrl = this.configService.get<string>("SELF_URL");
	}

	// create all the streams on application start
	async onApplicationBootstrap() {
		await Moralis.start({
			apiKey: this.configService.get<string>("MORALIS_STREAM_API_KEY"),
		});
		const { result } = await Moralis.Streams.getAll({ limit: 100 });
		console.log("moralis streams", result);

		config.forEach(async (item) => {
			// if(result.map((res) => res.id).includes("cc8d9387-d81b-4984-9744-007666b87883")  ) {
			// 	try {
			// 		console.log("updating stream...")
			// 		await this.updateStream(
			// 			"cc8d9387-d81b-4984-9744-007666b87883", {
			// 			tag: "rewardPayout",
			// 			chains: ["0x13881"],
			// 			// contracts: ["0xAD11C5818073018a3C1f28581c24fca4Fba382b0"]
			// 		}
			// 		);
			// 		console.log("updated stream")
			// 		this.moralisLogger.log(
			// 			`Updated stream, tag: ${item.tag} | url: ${item.webhookRoute}`,
			// 		);
			// 		return;
					
			// 	} catch (error) {
			// 		console.log(error)
			// 		this.moralisLogger.error("Error updating payout Stream");
			// 	}
			// }
			if (result.map((res) => res.tag).includes(item.tag)  ) {
				this.moralisLogger.log(`Resuing Stream tag: ${item.tag}`);
				return;
			}
			// if(item.tag==="rewardPayout"){
			// 	try {
			// 		await this.updateStream(
			// 			"cc8d9387-d81b-4984-9744-007666b87883", {
			// 			// webhookRoute: "/v1/questor/reward-payout",
			// 			tag: "rewardPayout",
			// 			chains: ["0x13881"],
			// 			contracts: ["0xAD11C5818073018a3C1f28581c24fca4Fba382b0"]
			// 		}
			// 		);
			// 		this.moralisLogger.log(
			// 			`Updated stream, tag: ${item.tag} | url: ${item.webhookRoute}`,
			// 		);
			// 		return;
					
			// 	} catch (error) {
			// 		console.log(error)
			// 		this.moralisLogger.error("Error updating payout Stream");
			// 	}
			// }

			try {
				await this.createStream(
					{
						tag: item.tag,
						webhookUrl: this.selfUrl.concat(item.webhookRoute),
						description: item.description,
						abi: item.abi,
						topic0: item.topic0,
						chains: item.chains,
						includeContractLogs: item.includeContractLogs,
						includeNativeTxs: item.includeNativeTxs,
					},
					item.contracts,
				);

				this.moralisLogger.log(
					`Created new stream, tag: ${item.tag} | url: ${item.webhookRoute}`,
				);
				console.log("morralis streams created for ", item.tag);
			} catch (error) {
				this.moralisLogger.error("Error creating new Stream");
				throw new Error(error)
			}
		});
	}

	// update the stream based on id, with options overriding the previous configs
	async updateStream(id: string, options: Partial<UpdatableOptions> = {}) {
		const { webhookRoute, ...subOptions } = options;
		try {
			if (webhookRoute) {
				const url = new URL(this.selfUrl + webhookRoute);
				try {
					await Moralis.Streams.update({ id, ...subOptions, webhookUrl: url.toString() });
					console.log("stream updated ")
					
				} catch (error) {
					console.log("streamUpdating error", error)
					throw new Error(error)
				}
				// console.log("error updation")
				this.moralisLogger.log(
					`Updated stream. tag: ${subOptions.tag} | url: ${url.toString()}`,
				);
			} else {
				const { result } = await Moralis.Streams.getById({ id });
				const { webhookRoute, contracts, ...eventConfig } = config.find(
					(item) => item.tag === result.tag,
				);
				const url = new URL(this.selfUrl + webhookRoute);

				try {
					
					await Moralis.Streams.update({
						id,
						...eventConfig,
						...subOptions,
						webhookUrl: url.toString(),
					});
				} catch (error) {
					console.log("streamUpdating error", error)
					throw new Error(error)
				}

				this.moralisLogger.log(
					`Updated stream. tag: ${result.tag} | url: ${url.toString()}`,
				);
			}
		} catch (error) {
			this.moralisLogger.error(`Error updating stream`);
		}
	}

	// get all the streams based on limit and cursor(optional)
	async getAllStreams(pageOptions: { limit: number; cursor?: string }) {
		return Moralis.Streams.getAll({ ...pageOptions });
	}

	// create a new stream
	async createStream(streamData: StreamOptions, contracts: string[]): Promise<string> {
		const newStream = await Moralis.Streams.add({
			...streamData,
		});
		const { id } = newStream.toJSON();
		await this.addStreamAddress(contracts, id);
		return id;
	}

	// add contract addresses to a stream
	async addStreamAddress(address: string[], id: string) {
		await Moralis.Streams.addAddress({ address, id });
	}

	// remove contract addresses from the stream
	async removeStreamAddress(address: string[], id: string) {
		await Moralis.Streams.deleteAddress({ address, id });
	}

	// update the stream status to "active" | "paused" | "error" | "terminated"
	updateStreamStatus(id: string, status: StreamStatus) {
		return Moralis.Streams.updateStatus({ id, status });
	}
}
