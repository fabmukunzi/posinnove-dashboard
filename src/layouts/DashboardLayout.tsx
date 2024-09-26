import React from "react";
import { useRouter } from "next/router";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import DashboardHeader from "@components/DashboardHeader";
import DashboardSideMenu from "@components/DashboardSideMenu";
import { Layout } from "antd";

const { Sider, Content } = Layout;

const DashboardLayout = ({ children }: React.PropsWithChildren) => {
	const router = useRouter();
	const { pathname } = router;
	const hiddenMenuLinks = ['/dashboard/profile', '/dashboard/projects'];

	const isProfilePage = hiddenMenuLinks.includes(pathname);
	console.log(isProfilePage);

	return (
		<AntdRegistry>
			<Layout>
				<DashboardHeader />
				<Layout hasSider={!isProfilePage} className="bg-white">
					{!isProfilePage && (
						<Sider
							theme="light"
							className="fixed top-[100px] left-0 border border-primary rounded-r-2xl overflow-hidden h-[70vh] w-full"
						>
							<DashboardSideMenu />
						</Sider>
					)}
					<Layout className={isProfilePage ? "bg-white" : "ml-[250px] bg-white"}>
						<Content className="p-[16px] min-h-[90vh]">{children}</Content>
					</Layout>
				</Layout>
			</Layout>
		</AntdRegistry>
	);
};

export default DashboardLayout;
