import React, { useState } from "react";
import { Layout, Menu, Button, List, Progress, Typography } from "antd";
import {
	PlusOutlined,
	UploadOutlined,
	CaretRightOutlined,
	StopOutlined,
} from "@ant-design/icons";
import { profileImage } from "@utils/images";
import Image from "next/image";
import { useReactMediaRecorder } from "react-media-recorder";
import TodoList from "./Todo";
import Link from "next/link";
const { Sider } = Layout;
const { Title } = Typography;

const DashboardSideMenu = () => {
	const [collapsed, setCollapsed] = useState(false);

	const projects = [
		{ name: "Personal Portfolio", progress: 65, dueDate: "21 Sept" },
		{ name: "Project Management Web App", progress: 30, dueDate: "21 Sept" },
		{ name: "Project Management Web App", progress: 30, dueDate: "21 Sept" },
	];

	const todos = [
		{
			name: "Navigation bar",
			description: "Create variations of navigation bar",
		},
		{
			name: "Navigation bar",
			description: "Create variations of navigation bar",
		},
		{
			name: "Navigation bar",
			description: "Create variations of navigation bar",
		},
	];

	return (
		<div className="">
			<div className="p-4 mb-4 border border-borderColor rounded-xl bg-surface">
				<div className="flex justify-between items-center w-full left-0 mb-4">
					<Title level={5} className="m-0">
						My Projects ({projects.length})
					</Title>
					<Button
						type="text"
						className="text-black"
						icon={<PlusOutlined />}
						size="small"
					>
						Project
					</Button>
				</div>
				<div className="overflow-y-auto" style={{ maxHeight: "200px" }}>
					<List
						itemLayout="horizontal"
						dataSource={projects}
						renderItem={(item, index) => (
							<div
								className={`border w-full h-35 border-borderColor mb-2 rounded-xl bg-surface ${
									index % 2 === 0 ? "bg-gray" : "bg-white "
								}`}
							>
								<List.Item>
									<List.Item.Meta
										avatar={
											<Image
												src={profileImage}
												alt="avatar"
												className="w-8 h-8 ml-2 rounded-full object-cover"
											/>
										}
										title={item.name}
										description={`Due to ${item.dueDate}`}
									/>
								</List.Item>
								<Progress
									percent={item.progress}
									size="small"
									style={{
										height: "6px",
										width: "80%",
										left: "20px",
										bottom: "2px",
									}}
								/>
							</div>
						)}
					/>
				</div>
			</div>
			<div className="p-4 mb-4 border border-borderColor rounded-xl bg-surface">
				<div className="flex justify-between items-center mb-4">
					<Title level={5} className="m-0">
						To-Do List ({todos.length})
					</Title>
					<Button
						type="text"
						className="text-black"
						icon={<PlusOutlined />}
						size="small"
					>
						To Do
					</Button>
				</div>
				<List
					itemLayout="horizontal"
					dataSource={todos}
					renderItem={(item) => (
						<List.Item>
							<List.Item.Meta
								avatar={
									<div className="w-8 h-8 flex items-center justify-center bg-green rounded-full">
										<CaretRightOutlined className="bg-white-500" />
									</div>
								}
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
				<p className="text-sm text-gray-500">
					Upload Finished Tasks to be reviewed by Project mentors.
				</p>
				<Link href={"/projects/new"}>
					<Button className="text-white" icon={<UploadOutlined />} block>
						Upload
					</Button>
				</Link>
			</div>
		</div>
	);
};

export default DashboardSideMenu;
