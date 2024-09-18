import { Inter } from "next/font/google";
import "@/app/globals.css";
import Navbar from "./homepage/Components/navbar/Navbar";
import Footer from "./homepage/Components/footer/Footer";
import "@fortawesome/fontawesome-svg-core";
import { config } from "@fortawesome/fontawesome-svg-core";
import { AuthProvider } from "@/app/(contexts)/authContexts";
config.autoAddCss = false;

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "Blank Web",
	description: "Generated by create next app",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<div className="container">
					<Navbar />
					<AuthProvider>{children}</AuthProvider>
					<Footer />
				</div>
			</body>
		</html>
	);
}