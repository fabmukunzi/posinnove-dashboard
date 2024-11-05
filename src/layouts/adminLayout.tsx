import React, { useState } from "react";
import { useRouter } from "next/router";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Avatar, Button, Divider, Input, Layout, Menu, theme } from 'antd';
import { BellDot, ChevronsLeft, ChevronsRight, FolderOpenDot, LayoutDashboard, LogOut, MessageCircleMore, Search, Settings, Siren, Users } from "lucide-react";
import Image from "next/image";
import { logo_col, posinnove_logo, profile, support } from "@utils/images";

const { Header, Sider, Content } = Layout;

const AdminLayout = ({ children }: any) => {
    const router = useRouter();
    const [collapsed, setCollapsed] = useState(false);
    const [selectedKey, setSelectedKey] = useState("1");
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const handleMenuClick = (e: any) => {
        setSelectedKey(e.key);
        switch (e.key) {
            case '1':
                router.push('/dashboard');
                break;
            case '2':
                router.push('/dashboard/projects');
                break;
            case '3':
                router.push('/dashboard/members');
                break;
            case '4':
                router.push('/dashboard/subscription');
                break;
            case '5':
                router.push('/dashboard/settings');
                break;
            case '6':
                router.push('/logout');
                break;
            default:
                break;
        }
    };

    return (
        <AntdRegistry>
            <Layout className="h-full">
                <Sider className={`h-[100vh] bg-white ${collapsed ? "" : "min-w-60 sticky top-0"} text-[#45464F]`} trigger={null} collapsible collapsed={collapsed}>
                    <div className="flex flex-col justify-center">
                        <div className="demo-logo-vertical flex justify-center items-center">
                            {collapsed ? <Image src={logo_col} className="w-3/4 mx-2 my-4" alt={"logo"} />:<Image src={posinnove_logo} className="w-3/4 mx-2 my-4" alt={"logo"} />}
                        </div>
                        <Menu
                            mode="inline"
                            className="px-4 font-semibold"
                            selectedKeys={[selectedKey]}
                            onClick={handleMenuClick}
                            items={[
                                {
                                    key: '1',
                                    icon: <LayoutDashboard className={`${collapsed ? "w-full h-full" : ""}`} />,
                                    label: 'Dashboard',
                                },
                                {
                                    key: '2',
                                    icon: <FolderOpenDot className={`${collapsed ? "w-full h-full" : ""}`} />,
                                    label: 'Projects',
                                },
                                {
                                    key: '3',
                                    icon: <Users className={`${collapsed ? "w-full h-full" : ""}`} />,
                                    label: 'Members',
                                },
                                {
                                    key: '4',
                                    icon: <Siren className={`${collapsed ? "w-full h-full" : ""}`} />,
                                    label: 'Subscription',
                                },
                            ]}
                        />
                        <Divider plain></Divider>
                        <Menu
                            mode="inline"
                            className="px-4 font-semibold"
                            selectedKeys={[selectedKey]}
                            onClick={handleMenuClick}
                            items={[
                                {
                                    key: '5',
                                    icon: <Settings className={`${collapsed ? "w-full h-full" : ""}`} />,
                                    label: 'Settings',
                                },
                                {
                                    key: '6',
                                    icon: <LogOut className={`${collapsed ? "w-full h-full" : ""}`} />,
                                    label: 'Logout',
                                },
                            ]}
                        />
                    </div>
                    <div className="bg-[#CBD5ED] h-24 rounded-xl mx-4 p-2 flex justify-end absolute bottom-4">
                        <div className="relative -top-20">
                            <Image src={support} alt="support" />
                        </div>
                        <div className="w-2/3 text-center">
                            <span className="text-center">Need help feel free to contact</span>
                            <Button type="primary" className="px-10 rounded-full">Support</Button>
                        </div>
                    </div>
                </Sider>
                <Layout>
                    <Header style={{ padding: 0, background: colorBgContainer }} className="bg-[#EFEFEF] flex items-center justify-between w-full pr-4 sticky top-0 z-10">
                        <Button
                            type="text"
                            className="relative right-4 top-4 rounded-xl border border-[#EFEFEF] text-[#585E71] bg-[#EFEFEF]"
                            icon={collapsed ? <ChevronsLeft /> : <ChevronsRight />}
                            onClick={() => setCollapsed(!collapsed)}
                            style={{
                                width: 34,
                                height: 34,
                            }}
                        />
                        <div className="flex justify-between items-center w-[60%]">
                            <div className=" flex items-center border border-[#100c0c] rounded-full bg-white p-1">
                                <Input placeholder="Search" size="large" className="rounded-full border-none outline-none focus:outline-none w-72" /><div className="p-1.5 bg-[#585E71] rounded-full text-white"><Search /></div>
                            </div>
                            <div className="flex items-center justify-between gap-12 text-[#585E71]">
                                <MessageCircleMore size={30} />
                                <BellDot size={30} />
                                <Avatar className="p-0.5 bg-white" shape="square" size="large" icon={<Image src={profile} className="rounded-md" alt="avatar" />} />
                            </div>
                        </div>
                    </Header>
                    <Content
                        style={{
                            padding: 24,
                            minHeight: 280,
                            background: "#EFEFEF",
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
