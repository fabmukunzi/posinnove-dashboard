import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import {
  Avatar,
  Button,
  Divider,
  Input,
  Layout,
  Menu,
  MenuProps,
  theme,
} from 'antd';
import {
  BellDot,
  ChevronsLeft,
  ChevronsRight,
  FolderOpenDot,
  LayoutDashboard,
  LogOut,
  MessageCircleMore,
  Search,
  Settings,
  Siren,
  Users,
} from 'lucide-react';
import Image from 'next/image';
import { logo_col, posinnove_logo, profile, support } from '@utils/images';
import routes from '@utils/routes';

const { Header, Sider, Content } = Layout;

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const menuItems: MenuProps['items'] = [
    { key: routes.home.url, icon: <LayoutDashboard />, label: 'Dashboard' },
    { key: routes.projects.url, icon: <FolderOpenDot />, label: 'Projects' },
    { key: routes.members.url, icon: <Users />, label: 'Members' },
    { key: routes.subscription.url, icon: <Siren />, label: 'Subscription' },
    { key: routes.setting.url, icon: <Settings />, label: 'Settings' },
    { key: '/logout', icon: <LogOut />, label: 'Logout' },
  ];

  const handleMenuClick: MenuProps['onClick'] = ({ key }) => {
    router.push(key);
  };

  return (
    <AntdRegistry>
      <Layout className="h-full">
        <Sider
          className={`h-[100vh] bg-white ${
            collapsed ? '' : 'min-w-60 sticky top-0'
          } text-[#45464F]`}
          trigger={null}
          collapsible
          collapsed={collapsed}
        >
          <div className="flex flex-col justify-center">
            <div className="demo-logo-vertical flex justify-center items-center">
              <Image
                src={collapsed ? logo_col : posinnove_logo}
                className="w-3/4 mx-2 my-4"
                alt="logo"
              />
            </div>
            <Menu
              mode="inline"
              className="px-4 font-semibold"
              selectedKeys={[router.pathname]}
              onClick={handleMenuClick}
              items={menuItems.slice(0, 4)}
            />
            <Divider plain />
            <Menu
              mode="inline"
              className="px-4 font-semibold"
              selectedKeys={[router.pathname]}
              onClick={handleMenuClick}
              items={menuItems.slice(4)}
            />
          </div>
          <div className="bg-[#CBD5ED] h-24 rounded-xl mx-4 p-2 flex justify-end absolute bottom-4">
            <div className="relative -top-20">
              <Image src={support} alt="support" />
            </div>
            <div className="">
              <span className="text-xs w-full">
                Need help feel free to reach out!
              </span>
              <Button type="primary" className="px-10 rounded-md">
                Support
              </Button>
            </div>
          </div>
        </Sider>
        <Layout>
          <Header
            style={{ padding: 0, background: colorBgContainer }}
            className="bg-[#EFEFEF] flex items-center justify-between w-full pr-4 sticky top-0 z-10"
          >
            <Button
              type="text"
              className="relative right-4 top-4 rounded-xl border border-[#EFEFEF] text-[#585E71] bg-[#EFEFEF]"
              icon={collapsed ? <ChevronsLeft /> : <ChevronsRight />}
              onClick={() => setCollapsed(!collapsed)}
              style={{ width: 34, height: 34 }}
            />
            <div className="flex justify-between items-center w-[60%]">
              <Input.Search
                placeholder="Search"
                size="large"
                className="w-80"
              />
              <div className="flex items-center justify-between gap-12 text-[#585E71]">
                <MessageCircleMore size={30} />
                <BellDot size={30} />
                <Avatar
                  className="p-0.5 bg-white"
                  shape="square"
                  size="large"
                  icon={
                    <Image src={profile} className="rounded-md" alt="avatar" />
                  }
                />
              </div>
            </div>
          </Header>
          <Content
            style={{
              padding: 24,
              minHeight: 280,
              background: '#EFEFEF',
              borderRadius: borderRadiusLG,
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </AntdRegistry>
  );
};

export default AdminLayout;
