import React, { useState } from 'react';
import { Layout, Menu, Button, List, Progress, Typography, Dropdown } from 'antd';
import { PlusOutlined, UploadOutlined,CaretRightOutlined, StopOutlined, MoreOutlined, EllipsisOutlined, EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { profileImage } from "@utils/images";
import Image from "next/image";
import { useReactMediaRecorder } from 'react-media-recorder';
import TodoList from './Todo';
import MyProgressComponent from './progressComponent';
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
  const menu = (
    <Menu>
      <Menu.Item key="1" className='text-[#336940]'> <EyeOutlined /> View</Menu.Item>
      <Menu.Item key="2" className='text-[#091e6a]'><EditOutlined /> Edit</Menu.Item>
      <Menu.Item key="3" className='text-[#a12626]'><DeleteOutlined /> Delete</Menu.Item>
    </Menu>
  );

  return (
    <div className=''>
        <div className="p-4 mb-4 border border-borderColor rounded-xl bg-surface">
          <div className="flex justify-between items-center w-full left-0 mb-4">
            <Title level={5} className="m-0">My Projects ({projects.length})</Title>
            <Button type="text" className="text-black bg-[#ffffff] hover:bg-[#1a1b21] hover:text-white " icon={<PlusOutlined />} size="small">
                Project
            </Button>
          </div>
          {/* <List
            itemLayout="horizontal"
            dataSource={projects}
            renderItem={(item, index) => (
              <div
                className={`border w-full h-35 border-borderColor mb-2 rounded-xl bg-surface ${index % 2 === 0 ? 'bg-gray' : 'bg-white '
                  }`}
              >
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
          <div>
  <List
    className='overflow-y-scroll custom-scrollbar  max-h-[300px]'
    itemLayout="horizontal"
    dataSource={projects}
    renderItem={(item, index) => (
      <div
        className={`border w-full h-35 border-borderColor mb-2 rounded-xl bg-surface  ${
          index % 2 !== 0 ? 'bg-[#202124] hover:bg-[#202124] ' : 'bg-white hover:bg-[#f2f2f2]  '
        }`}
      >
        {/* <Dropdown overlay={menu} trigger={['click']}>
          <Button  icon={<MoreOutlined />} />
        </Dropdown> */}
        <List.Item>
          <List.Item.Meta
            avatar={<Image src={profileImage} alt="avatar" className="w-8 h-8 ml-2 rounded-full object-cover" />}
            title={
            <div className="flex justify-between items-center">
              <span  className={`${
                  index % 2 !== 0 ? 'text-[#ffffff]' : 'text-black '
                }`}>
                  {item.name}
              </span>
              <div>
                <Dropdown overlay={menu} trigger={['click']}>
                  <button  className={`border-none mr-4 mt-2 w-8 h-8 text-xl bg-transparent ${index % 2 !== 0 ? 'text-white' : 'text-black'
        }`}><EllipsisOutlined  className='text-[32px]'/>

        </button>
                </Dropdown>
              </div>
            </div>
}
            description={<span className={`${
              index % 2 !== 0 ? 'text-[#ffffff]' : 'text-black '
            }`}>
              Due to {item.dueDate}
            </span>}
          />
        </List.Item>
        <MyProgressComponent key={index} item={item} index={index} />
        {/* <Progress 
  percent={item.progress}
  size="small" 
  
  strokeColor="#002278"
  style={{ height: '6px', width: '80%', left: '20px', bottom: '2px' }} 
/> */}

      </div>
    )}
  />
</div>

        </div>
        {/* <div className="p-4 mb-4 border border-borderColor rounded-xl bg-surface">
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
        </div> */}
        {/* <TodoList/> */}
        <div className="p-4 border border-borderColor rounded-xl bg-surface text-[#757680]">
          <Title level={5}>Upload</Title>
          <p className="text-sm ">Upload Finished Tasks to be reviewed by Project mentors.</p>
          {/* <Button  className="text-black" icon={<PlusOutlined />} block/> */}
          <Button className="block hover:text-[#091e6a] rounded-xl w-20 ml-20">
            <span className="items-center">
              <PlusOutlined className="text-blue transition-colors duration-200" />
            </span>
          </Button>
        </div>
    </div>
  );
};

export default DashboardSideMenu;