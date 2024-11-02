import { useState } from "react";
import {
	Menu,
	Layout,
	MenuProps,
	Dropdown,
	Button,
	Avatar,
	Space,
	Drawer,
} from "antd";
import Image from "next/image";
import Link from "next/link";
import { icons } from "@utils/icons";
import { logo } from "@utils/images";
import {
	ChevronDown,
	Globe,
	LogOut,
	Search,
	Settings,
	User,
	Menu as MenuIcon,
} from "lucide-react";
import { useGetProfileQuery } from "@store/actions/auth";
import { defaultProfileImage } from "@utils/profileDataUtils";
import Cookies from 'js-cookie';
import { useRouter } from "next/navigation";

const { Header } = Layout;
type MenuItem = Required<MenuProps>["items"][number];

const DashboardHeader = () => {
	const { isLoading, data } = useGetProfileQuery({});
	const profileImage = data?.data?.profileImage;
	const router = useRouter();

	const [current, setCurrent] = useState("home");
	const [hovered, setHovered] = useState<string | null>(null);
	const [drawerVisible, setDrawerVisible] = useState(false);

	const onClick: MenuProps["onClick"] = (e) => {
		setCurrent(e.key);
	};	

	const handleMouseEnter = (key: string) => {
		setHovered(key);
	};

	const handleMouseLeave = () => {
		setHovered(null);
	};

	const showDrawer = () => {
		setDrawerVisible(true);
	};

	const closeDrawer = () => {
		setDrawerVisible(false);
	};

	const logout = () => {
		Cookies.remove('access_token');
		console.log("Logged out");
		router.push('/');
	};

	const items: MenuProps["items"] = [
		{
			label: <Link href="/my-profile">View Profile</Link>,
			key: "1",
			icon: <User />,
		},
		{
			label: "Settings",
			key: "2",
			icon: <Settings />,
		},
		{
			label: "Logout",
			key: "3",
			icon: <LogOut />,
			danger: true,
			onClick: logout,
		},
	];

	const menuProps = {
		items,
	};

	const navMenu: MenuItem[] = [
		{
			label: <Link href="/">Home</Link>,
			key: "home",
			icon: (
				<Image
					src={
						current === "home" || hovered === "home"
							? icons.home_active
							: icons.home
					}
					alt="home"
					width={25}
					height={25}
				/>
			),
			onMouseEnter: () => handleMouseEnter("home"),
			onMouseLeave: handleMouseLeave,
		},
		{
			label: <Link href="/projects">Projects</Link>,
			key: "projects",
			icon: (
				<Image
					src={
						current === "projects" || hovered === "projects"
							? icons.project_acitve
							: icons.project
					}
					alt="projects"
					width={25}
					height={25}
				/>
			),
			onMouseEnter: () => handleMouseEnter("projects"),
			onMouseLeave: handleMouseLeave,
		},
		{
			label: <Link href="#">Work Place</Link>,
			key: "workPlace",
			icon: (
				<Image
					src={
						current === "workPlace" || hovered === "workPlace"
							? icons.work_active
							: icons.work
					}
					alt="workPlace"
					width={25}
					height={25}
				/>
			),
			onMouseEnter: () => handleMouseEnter("workPlace"),
			onMouseLeave: handleMouseLeave,
		},
	];

	return (
		<Header className="!bg-white flex items-center justify-between gap-52 px-10 py-12 shadow-sm w-full fixed z-50 top-0">
			<div className="flex items-center gap-2">
				<Image src={logo.src} alt="dashboard logo" width={182} height={59} />
			</div>
			<div className="hidden lg:flex items-center w-full justify-between bg-[#F2F2F2] rounded-3xl">
				<Menu
					onClick={onClick}
					className="fixed-menu"
					selectedKeys={[current]}
					mode="horizontal"
					items={navMenu}
				/>
				<div className="flex justify-center items-center border-2 border-gray-400 rounded-xl text-gray-600">
					<input
						placeholder="Search anything..."
						type="text"
						className="h-10 w-56 bg-transparent outline-none px-2"
					/>
					<div className="p-2">
						<Search />
					</div>
				</div>
				<div className="flex items-center justify-center h-14 rounded-full">
					<Dropdown menu={menuProps}>
						<Space className="p-2 rounded-full cursor-pointer flex justify-center items-center bg-gradient-to-r from-[#003fdea9] to-[#00227877] bg-opacity-65">
							<Avatar.Group
								size="large"
								max={{
									count: 3,
									style: { color: "#f56a00", backgroundColor: "#fde3cf" },
								}}
								className="flex justify-center items-center"
							>
								<Image
									src={profileImage || defaultProfileImage}
									alt="browser"
									width={45}
									height={45}
									className="rounded-full w-8 h-8"
								/>
								<Avatar
									style={{
										backgroundColor: "#F3EEEE",
										height: "30px",
										width: "30px",
									}}
									icon={<Settings className="text-[#21212186]" />}
								/>
								<Avatar
									style={{
										backgroundColor: "#F3EEEE",
										height: "30px",
										width: "30px",
									}}
									icon={<Globe className="text-[#21212186]" />}
								/>
							</Avatar.Group>
							<ChevronDown className=" font-bold stroke-2" />
						</Space>
					</Dropdown>
				</div>
			</div>
			<div className="lg:hidden flex items-center justify-end w-full">
				<Button
					type="text"
					icon={<MenuIcon className="w-8 h-8" />}
					onClick={showDrawer}
				/>
				<Drawer
					title="Menu"
					placement="right"
					onClose={closeDrawer}
					visible={drawerVisible}
					className="drawer-menu"
				>
					<Menu
						onClick={onClick}
						selectedKeys={[current]}
						mode="vertical"
						items={navMenu}
					/>
				</Drawer>
			</div>
		</Header>
	);
};

export default DashboardHeader;
