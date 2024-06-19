import { ApolloProvider } from "@apollo/client";
import { LivepeerConfig } from "@livepeer/react";
import { Web3Modal } from "@web3modal/react";
import { Toaster } from "react-hot-toast";
import { Provider as ReduxProvider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { WagmiConfig } from "wagmi";
import store from "../../../features/store";
import { apolloClient } from "./apollo.config";
import livepeerClient from "./livepeer.config";
import { ethereumClient, projectId, wagmiClient } from "./wagmi.config";

interface InitProps {
	children: React.ReactNode;
}

const persistor = persistStore(store);

const Init = ({ children }: InitProps) => {
	return (
		<ReduxProvider store={store}>
			<PersistGate persistor={persistor}>
				<ApolloProvider client={apolloClient}>
					<WagmiConfig client={wagmiClient}>
						<LivepeerConfig
							client={livepeerClient}
							theme={{ colors: { accent: "#DB2750" } }}
						>
							<div className="flex">{children}</div>
							<Toaster reverseOrder={false} />
						</LivepeerConfig>
					</WagmiConfig>
				</ApolloProvider>
				<Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
			</PersistGate>
		</ReduxProvider>
	);
};

export default Init;
