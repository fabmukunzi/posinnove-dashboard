import { useState } from 'react';
import { Menu, Layout, MenuProps, Dropdown, Button, message, Avatar, Tooltip } from 'antd';
import Image from "next/image";
import Link from "next/link";
import { icons } from "@utils/icons";
import { logo } from '@utils/images';
import { Input, Space } from 'antd';
import type { GetProps } from 'antd';
import { ChevronDown, Globe, LogOut, Search, Settings, User } from 'lucide-react';
import { AntDesignOutlined, DownOutlined, UserOutlined } from '@ant-design/icons';
import profile from "../assets/profile-pos.jpg"

type SearchProps = GetProps<typeof Input.Search>;


const { Header } = Layout;
type MenuItem = Required<MenuProps>['items'][number];
const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
	message.info('Click on left button.');
	console.log('click left button', e);
};


const items: MenuProps['items'] = [
	{
		label: (
			<Link href="/dashboard/profile">View Profile</Link>
		),
		key: '1',
		icon: <User />,
	},
	{
		label: 'Settings',
		key: '2',
		icon: <Settings />,
	},
	{
		label: 'Logout',
		key: '3',
		icon: <LogOut />,
		danger: true,
	},
];

const menuProps = {
	items,
};

const DashboardHeader = () => {
	const [current, setCurrent] = useState('home');
	const [hovered, setHovered] = useState<string | null>(null);

	const onClick: MenuProps['onClick'] = (e) => {
		setCurrent(e.key);
	};

	const handleMouseEnter = (key: string) => {
		setHovered(key);
	};

	const handleMouseLeave = () => {
		setHovered(null);
	};

	const navMenu: MenuItem[] = [
		{
			label: (
				<Link href="/dashboard">Home</Link>
			),
			key: 'home',
			icon: (
				<Image
					src={current === 'home' || hovered === 'home' ? icons.home_active : icons.home}
					alt="home"
					width={25}
					height={25}
				/>
			),
			onMouseEnter: () => handleMouseEnter('home'),
			onMouseLeave: handleMouseLeave,
		},
		{
			label: (
				<Link href="/dashboard/profile">Projects</Link>
			),
			key: 'projects',
			icon: (
				<Image
					src={current === 'projects' || hovered === 'projects' ? icons.project_acitve : icons.project}
					alt="projects"
					width={25}
					height={25}
				/>
			),
			onMouseEnter: () => handleMouseEnter('projects'),
			onMouseLeave: handleMouseLeave,
		},
		{
			label: (
				<Link href="/dashboard/workplace">Work Place</Link>
			),
			key: 'workPlace',
			icon: (
				<Image
					src={current === 'workPlace' || hovered === 'workPlace' ? icons.work_active : icons.work}
					alt="workPlace"
					width={25}
					height={25}
				/>
			),
			onMouseEnter: () => handleMouseEnter('workPlace'),
			onMouseLeave: handleMouseLeave,
		},
	];
	return (
		<Header className="!bg-white border-b border-b-[#f1f1f1] flex items-center justify-between gap-52 px-10 py-10">
			<div className="flex items-center gap-2">
				<div>
					<Image src={logo.src} alt="dashboard logo" width={182} height={59} />				</div>
			</div>
			<div className="flex items-center w-full justify-between">
				<Menu
					onClick={onClick}
					className="fixed-menu"
					selectedKeys={[current]}
					mode="horizontal"
					items={navMenu}
				/>
				<div className='flex justify-center items-center border-2 border-gray-400 rounded-xl text-gray-600'>
					<input placeholder='Search anything...' type="text" className='h-10  w-56 bg-transparent outline-none px-2' />
					<div className='p-2'><Search /></div>
				</div>
				<div className="flex items-center justify-center h-14 rounded-full">
					<Dropdown menu={menuProps}>
						<Space className="p-2 rounded-full cursor-pointer h-14 flex justify-center items-center bg-gradient-to-r from-[#003fdea9] to-[#00227877] bg-opacity-65">
							<Avatar.Group
								size="large"
								max={{
									count: 3,
									style: { color: '#f56a00', backgroundColor: '#fde3cf' },
								}}
								className='flex justify-center items-center'
							>
								<Image src={profile} alt='browser' width={45} height={45} className='rounded-full w-10 h-10' />
								<Avatar style={{ backgroundColor: '#F3EEEE' }} icon={<Settings className='text-[#21212186]' />} />
								<Avatar style={{ backgroundColor: '#F3EEEE' }} icon={<Globe className='text-[#21212186]' />} />
							</Avatar.Group>
							<ChevronDown className='w-8 h-8 font-bold stroke-2' />
						</Space>
					</Dropdown>
				</div>
			</div>
		</Header>
	);
};

export default DashboardHeader;
