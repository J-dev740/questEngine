import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import NavBar from "../components/navbar";
import Sidebar from "../components/sidebar";
import Init from "../components/util/init";
import "../styles/calendar.css";
import "../styles/globals.css";
import "../styles/scrollbar.css";

const App = ({ Component, pageProps }: AppProps) => {
	return (
		<div className="scrollbar-hide overflow-y-auto bg-[#080808] ">
			<Init>
				<Sidebar />
				<div className="flex h-screen w-full min-w-0 flex-col pl-0 text-white lg:pl-4">
					<NavBar />
					<Component {...pageProps} />
					<Toaster />
				</div>
			</Init>
		</div>
	);
};

export default App;
