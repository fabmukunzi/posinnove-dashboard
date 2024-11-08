import React from 'react';
import { useRouter } from 'next/router';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import DashboardHeader from '@components/DashboardHeader';
import DashboardSideMenu from '@components/DashboardSideMenu';
import { Layout } from 'antd';
import routes from '@utils/routes';

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

  return (
    <AntdRegistry>
      <Layout>
        <DashboardHeader />
        <Layout hasSider={!withoutSidebar} className="bg-white mt-24">
          {!withoutSidebar && (
            <Sider
              theme="light"
              className="top-[100px] left-12 overflow-hidden"
              width={300}
            >
              <DashboardSideMenu />
            </Sider>
          )}
          <Layout className="ml-[100px] bg-white">
            <Content className="p-[16px] min-h-[90vh]">{children}</Content>
          </Layout>
        </Layout>
      </Layout>
    </AntdRegistry>
  );
};

export default DashboardLayout;
