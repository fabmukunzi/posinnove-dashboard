import Footer from "@components/common/Footer";
import Navbar from "@components/common/Navbar";
import React, { ReactNode } from "react";

type LayoutProps = {
	children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
	return (
		<div className="flex flex-col min-h-screen">
			<Navbar />
			<main className="flex-grow">{children}</main>
			<Footer />
		</div>
	);
};

export default Layout;
