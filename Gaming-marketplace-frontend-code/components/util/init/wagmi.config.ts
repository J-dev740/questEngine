import { EthereumClient, w3mConnectors, w3mProvider } from "@web3modal/ethereum";
import { configureChains, createClient } from "wagmi";
import { bscTestnet, mainnet, polygonMumbai } from "wagmi/chains";

const defaultChains = [mainnet, polygonMumbai, bscTestnet];
const projectId = "7bc1a1ed96140bdbf1ea6c09b67296be";

const { provider, webSocketProvider } = configureChains(defaultChains, [
	w3mProvider({ projectId }),
]);

// Set up client
const wagmiClient = createClient({
	autoConnect: true,
	connectors: w3mConnectors({
		chains: defaultChains,
		projectId,
	}),
	provider,
	webSocketProvider,
});

const ethereumClient = new EthereumClient(wagmiClient, defaultChains);

export { wagmiClient, ethereumClient, projectId };
