import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import DashboardHeader from "@components/DashboardHeader";
import DashboardSideMenu from "@components/DashboardSideMenu";
import { Drawer, Layout, Skeleton, Space } from "antd";
import logo1 from "../assets/logo1.png";
import routes from '@utils/routes';
import { useMediaQuery } from "react-responsive";
import { RightCircleOutlined } from "@ant-design/icons";


const { Sider, Content } = Layout;

const DashboardLayout = ({ children }: React.PropsWithChildren) => {
  const router = useRouter();
  const { pathname } = router;
  const hiddenMenuLinks = [
    routes.profile.url,
    routes.projects.url,
    routes.home.url,
  ];

  const withoutSidebar = hiddenMenuLinks.includes(pathname);
  const [collapsed, setCollapsed] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const isMobile = useMediaQuery({ query: "(max-width: 976px)" });

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
    if(collapsed){
      closeDrawer()
    }else{
      showDrawer()
    }
  };
  const showDrawer = () => {
    setDrawerVisible(true);
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
      setCollapsed(!collapsed);
  };
  return (
    <AntdRegistry>
      <Layout>
        <DashboardHeader />
        <Layout hasSider={!withoutSidebar} className="bg-white mt-24">
          {withoutSidebar && (
            <Sider
              theme="light"
              className="fixed top-[110px] left-12 overflow-hidden"
              width={300}
              collapsible
              collapsed={isMobile}
              trigger={null}
              breakpoint="md"
              collapsedWidth={isMobile ? 0 : 80}
            >
              {loading ? (
                <>
                  <>
                    <Space direction="vertical" className="ml-8 w-[1/3] px-6  ">
                      <Skeleton.Input active size={"large"} />
                      {[...Array(3)].map((_, index) => (
                        <Space direction="horizontal" key={index}>
                          <Skeleton.Input active size={"small"} />
                          <Skeleton.Avatar
                            active
                            size={"default"}
                            shape={"circle"}
                          />
                        </Space>
                      ))}
                      <Skeleton.Input active size={"large"} />
                      <Skeleton.Node active style={{ width: 200 }} />
                      <Skeleton.Node
                        active
                        style={{ width: 200 }}
                        className=" mt-6 "
                      />
                      <Skeleton.Button
                        active
                        size={"default"}
                        shape={"square"}
                        className=" rounded-sm ml-6 w-[50%]"
                        block={true}
                      />
                    </Space>
                  </>
                </>
              ) : (
                <DashboardSideMenu />
              )}
            </Sider>
          )}
          <div>
            {isMobile && (
              <div>
                {!collapsed && (
                  <div>
                    <RightCircleOutlined
                      onClick={toggleCollapsed}
                      className="ml-4 top-10  mb-4 fixed  z-50"
                      style={{ fontSize: "24px" }}
                    />
                  </div>
                ) 
                // : (
                //   <RightCircleOutlined
                //     onClick={toggleCollapsed}
                //     className="ml-4 top-10  mb-4 fixed  z-50"
                //     style={{ fontSize: "24px" }}
                //   />
                // )
                }
              </div>
            )}
            {collapsed && (
              <Drawer
                title={
                  <div className="">
                    <img
                      src={logo1.src}
                      alt="Posinnove"
                      width={120}
                      height={120}
                      className="mr-2"
                    />
                  </div>
                }
                placement="left"
                closable={true}
                onClose={closeDrawer}
                visible={drawerVisible}
                zIndex={2000}
                width={300}
              >
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
