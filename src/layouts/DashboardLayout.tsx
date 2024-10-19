import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import DashboardHeader from "@components/DashboardHeader";
import DashboardSideMenu from "@components/DashboardSideMenu";
import { Drawer, Layout, Skeleton } from "antd";

const { Sider, Content } = Layout;
import { useMediaQuery } from 'react-responsive';
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";

const DashboardLayout = ({ children }: React.PropsWithChildren) => {
  const router = useRouter();
  const { pathname } = router;
  const hiddenMenuLinks = [
    routes.profile.url,
    routes.projects.url,
    routes.home.url,
  ];

	const withoutSidebar = hiddenMenuLinks.includes(pathname);
	  // State for controlling collapse behavior
	  const [collapsed, setCollapsed] = useState(false);
	  const [drawerVisible, setDrawerVisible] = useState(false); // State for Drawer visibility
	  const [modalVisible, setModalVisible] = useState(false);
	  const [loading, setLoading] = useState(true);
	  // Detect if the screen size is small (mobile)
	  const isMobile = useMediaQuery({ query: '(max-width: 976px)' });
	
	  // Toggle function for the sidebar
	  useEffect(() => {
		// Simulate loading for 2 seconds (replace with actual logic)
		const timer = setTimeout(() => {
		  setLoading(false);
		}, 2000);
	
		return () => clearTimeout(timer);
	  }, []);

	  const toggleCollapsed = () => {
		setCollapsed(!collapsed);
	  };
	  const showDrawer = () => {
		setDrawerVisible(true);
	  };
	
	  // Close the Drawer
	  const closeDrawer = () => {
		setDrawerVisible(false);
	  }
	return (
		<AntdRegistry>
			<Layout>
				<DashboardHeader />
				<Layout hasSider={!withoutSidebar} className="bg-white mt-24">
					{!withoutSidebar && (
						
						<Sider
							theme="light"
							className="fixed top-[110px] left-12 overflow-hidden"
							width={300}
							collapsible
        collapsed={ isMobile} // Collapse on mobile view
        trigger={null} // Remove default trigger
        breakpoint="md"
        collapsedWidth={isMobile ? 0 : 80}
						>
							      {loading ? (
               <>
			   {/* First set of 4 skeleton rows */}
			   <Skeleton active paragraph={{ rows: 4 }} />
	 
			   {/* Add space between the two sets of skeletons */}
			   <div style={{ marginBottom: '120px' }}></div>
	 
			   {/* Second set of 4 skeleton rows */}
			   <Skeleton active paragraph={{ rows: 4 }} />
			 </>
      ) : (
		<DashboardSideMenu />
      )}
							
						</Sider>
						 
					)}
					<div>
					{isMobile && (
								<div
								//   style={{
								// 	padding: '2px',
								// 	position: 'relative',
								// 	zIndex: 1000,
								// 	left: 10,
								//   }}
								>
								  {collapsed ? (
									<div>
										<MenuFoldOutlined  onClick={showDrawer} className="ml-4 fixed" style={{ fontSize: '32px' }} />
									</div>
									
								  ) : (
									<MenuUnfoldOutlined onClick={toggleCollapsed} className="ml-4 fixed" style={{ fontSize: '24px' }}/>
								  )}
								</div>
							  )}
							  {collapsed &&(

								<Drawer
								title="Menu"
								placement="left"
								closable={true}
								onClose={closeDrawer}
								visible={drawerVisible}
								zIndex={2000} // Ensure this Drawer is above the other modal
								width={300}   // Adjust width for mobile
								>
								{/* <Menu theme="light" mode="vertical">
								<Menu.Item key="1" icon={<HomeOutlined />}>
								Home
								</Menu.Item>
								<Menu.Item key="2" icon={<SettingOutlined />}>
								Settings
								</Menu.Item>
								</Menu> */}
																{/* <Sider
									theme="light"
									className="fixed
										top-[100px] left-12 overflow-hidden"
									width={300}
									>
									<DashboardSideMenu />
								</Sider> */}
								<DashboardSideMenu />
								</Drawer>
	
						)}
							         
					</div>
					<Layout className="lg:ml-[350px] bg-white">
						<Content className=" min-h-[90vh]">{children}</Content>
					</Layout>
				</Layout>
			</Layout>
		</AntdRegistry>
	);
};

export default DashboardLayout;
