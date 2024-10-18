// import decodeToken from '@utils/auth/decodeUser';
// import { Button, Menu } from 'antd';
// import Link from 'next/link';
// import { useRouter } from 'next/router';
// import { useEffect, useState } from 'react';
// import { IoSettingsSharp } from 'react-icons/io5';
// import { LiaClipboardListSolid } from 'react-icons/lia';
// import {
//   MdOutlineDashboard,
//   MdOutlineLibraryBooks,
//   MdOutlineWorkOutline,
// } from 'react-icons/md';
// import { VscFolderLibrary } from 'react-icons/vsc';

// const DashboardSideMenu = () => {
//   const [loggedInUser, setLoggedInUser] = useState(null);
//   useEffect(() => {
//     if (typeof window !== 'undefined') {
//       const token = localStorage.getItem('token');
//       if (token) {
//         const user = decodeToken(token);
//         setLoggedInUser(user);
//         console.log(loggedInUser, 'loooooooooog');
//       }
//     }
//   }, [loggedInUser]);
//   const { pathname } = useRouter();

//   const menuItems = [
//     {
//       label: (
//         <Link href="" className="flex items-center gap-2">
//           <MdOutlineDashboard className="text-3xl" /> Dashboard
//         </Link>
//       ),
//       key: '',
//     },
//     {
//       label: (
//         <Link href="/my-projects" className="flex items-center gap-2">
//           <VscFolderLibrary className="text-3xl" /> My Projects
//         </Link>
//       ),
//       key: '/my-projects',
//     },
//     {
//       label: (
//         <Link href="/opportunities" className="flex items-center gap-2">
//           <MdOutlineWorkOutline className="text-3xl" /> Opportunities
//         </Link>
//       ),
//       key: '/opportunities',
//     },
//     {
//       label: (
//         <Link href="/my-experience" className="flex items-center gap-2">
//           <MdOutlineLibraryBooks className="text-3xl" />
//           My Experience
//         </Link>
//       ),
//       key: '/my-experience',
//     },
//     {
//       label: (
//         <Link href="/settings" className="flex items-center gap-2">
//           <IoSettingsSharp className="text-3xl" />
//           Settings
//         </Link>
//       ),
//       key: '/settings',
//     },
//     {
//       label: (
//         <Link href="/user-guide" className="flex items-center gap-2">
//           <LiaClipboardListSolid className="text-3xl" />
//           User Guide
//         </Link>
//       ),
//       key: '/user-guide',
//     },
//   ];

//   return (
//     // <div className="!text-primary h-full pt-5 bg-[#f7f8fb]">
//     //   <Menu
//     //     mode="inline"
//     //     selectedKeys={[pathname]}
//     //     className="flex flex-col space-y-10 h-full bg-[#f7f8fb]"
//     //     items={menuItems.map((item) => ({
//     //       ...item,
//     //       className: `flex items-center p-4 text-primary ${
//     //         pathname === item.key
//     //           ? 'bg-[#d6e1fc] text-primary'
//     //           : 'hover:bg-[#d6e1fc]'
//     //       }`,
//     //     }))}
//     //   />
//     // </div>
//     <div className='border border-borderColor w-1/3 h-56 max-md:w-1/2 rounded-xl bg-surface flex'>
//     </div>
//   );
// };

// export default DashboardSideMenu;
import React, { useState } from 'react';
import { Layout, Menu, Button, List, Progress, Typography } from 'antd';
import { PlusOutlined, UploadOutlined,CaretRightOutlined, StopOutlined } from '@ant-design/icons';
import { profileImage } from "@utils/images";
import Image from "next/image";
import { useReactMediaRecorder } from 'react-media-recorder';
import TodoList from './Todo';
const { Sider } = Layout;
const { Title } = Typography;

const DashboardSideMenu = () => {
  const [collapsed, setCollapsed] = useState(false);

  const projects = [
    { name: 'Personal Portfolio', progress: 65, dueDate: '21 Sept' },
    { name: 'Project Management Web App', progress: 30, dueDate: '21 Sept' },
    { name: 'Project Management Web App', progress: 30, dueDate: '21 Sept' },
  ];

  const todos = [
    { name: 'Navigation bar', description: 'Create variations of navigation bar' },
    { name: 'Navigation bar', description: 'Create variations of navigation bar' },
    { name: 'Navigation bar', description: 'Create variations of navigation bar' },
  ];

  return (
    <div className=''>
        <div className="p-4 mb-4 border border-borderColor rounded-xl bg-surface">
          <div className="flex justify-between items-center w-full left-0 mb-4">
            <Title level={5} className="m-0">My Projects ({projects.length})</Title>
            <Button type="text" className="text-black" icon={<PlusOutlined />} size="small">
                Project
            </Button>
          </div>
          {/* <List
            itemLayout="horizontal"
            dataSource={projects}
            renderItem={item => (
              // <List.Item>
              //   <List.Item.Meta
              //     avatar={<div className="w-8 h-8 bg-gray-200 rounded-full" />}
              //     title={item.name}
              //     description={`Due to ${item.dueDate}`}
              //   />
              //   <Progress percent={item.progress} size="small" />
              // </List.Item>
              <div className='border w-full h-35 border-borderColor mb-2 rounded-xl bg-surface'>
                <List.Item>
                  <List.Item.Meta
                    avatar={<Image src={profileImage} alt="avatar" className="w-8 h-8 ml-2 rounded-full object-cover" />}
                    title={item.name}
                    description={`Due to ${item.dueDate}`}
                    />
                </List.Item>
                <Progress percent={item.progress} size="small" style={{ height: '6px', width: '80%', left:'20px' }} />
              </div>
            )}
          /> */}
          <div className="overflow-y-auto" style={{ maxHeight: '200px' }}>
  <List
    itemLayout="horizontal"
    dataSource={projects}
    renderItem={(item, index) => (
      <div
        className={`border w-full h-35 border-borderColor mb-2 rounded-xl bg-surface ${
          index % 2 === 0 ? 'bg-gray' : 'bg-white '
        }`}
      >
        <List.Item>
          <List.Item.Meta
            avatar={<Image src={profileImage} alt="avatar" className="w-8 h-8 ml-2 rounded-full object-cover" />}
            title={item.name}
            description={`Due to ${item.dueDate}`}
          />
        </List.Item>
        <Progress percent={item.progress} size="small" style={{ height: '6px', width: '80%', left: '20px', bottom:'2px' }} />
      </div>
    )}
  />
</div>

        </div>
        <div className="p-4 mb-4 border border-borderColor rounded-xl bg-surface">
          <div className="flex justify-between items-center mb-4">
            <Title level={5} className="m-0">To-Do List ({todos.length})</Title>
            <Button type="text" className="text-black" icon={<PlusOutlined />} size="small">
              To Do
            </Button>
          </div>
          <List
            itemLayout="horizontal"
            dataSource={todos}
            renderItem={item => (
              <List.Item>
                <List.Item.Meta
                  avatar={<div className="w-8 h-8 flex items-center justify-center bg-green rounded-full" 
                    >
                      <CaretRightOutlined className="bg-white-500" />
                  </div>}
                  title={item.name}
                  description={item.description}
                />
              </List.Item>
            )}
          />
        </div>
        {/* <TodoList/> */}
        <div className="p-4 border border-borderColor rounded-xl bg-surface">
          <Title level={5}>Upload</Title>
          <p className="text-sm text-gray-500">Upload Finished Tasks to be reviewed by Project mentors.</p>
          <Button  className="text-white" icon={<UploadOutlined />} block>
            Upload
          </Button>
        </div>
    </div>
  );
};

export default DashboardSideMenu;