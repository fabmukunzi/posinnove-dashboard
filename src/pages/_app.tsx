import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ConfigProvider, theme } from "antd";
import antdTheme from "@utils/config/antdConfig";
import { Poppins } from "next/font/google";
import { useRouter } from "next/router";
import { Provider } from "react-redux";
import { store } from "@store/index";
import DashboardLayout from "@layout/DashboardLayout";
import ProtectedRoute from "@components/ProtectedRoute";

const roboto = Poppins({
	weight: "400",
	subsets: ["latin"],
});
export default function App({ Component, pageProps }: AppProps) {
	const { route } = useRouter();
	const isDashboardRoute = route.startsWith("/dashboard");
	return (
		<ConfigProvider theme={antdTheme}>
			<main className={roboto.className}>
				<Provider store={store}>
					{isDashboardRoute ? (
						<ProtectedRoute>
							<DashboardLayout>
								<Component {...pageProps} />
							</DashboardLayout>
						</ProtectedRoute>
					) : (
						<Component {...pageProps} />
					)}
				</Provider>
			</main>
		</ConfigProvider>
	);
}
