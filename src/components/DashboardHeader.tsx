import { SearchOutlined, UserOutlined } from "@ant-design/icons";
import { dashboardLogo, dashboardUserProfile } from "@utils/images";
import { Avatar, Input, Layout, Space } from "antd";
import { CiHome } from "react-icons/ci";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiNotification2Line } from "react-icons/ri";
import { TbHome } from "react-icons/tb";
const { Header } = Layout;

const DashboardHeader = () => {
	return (
		<Header className="!bg-white border-b border-b-[#f1f1f1] flex items-center justify-between px-10 py-10">
			<div className="flex items-center gap-2">
				<div>
					<img src={dashboardLogo.src} alt="dashboard logo" />
				</div>
			</div>
			<div className="flex items-center w-full justify-between">
				<div className="flex items-center w-full justify-between mx-20">
					<Space
						direction="vertical"
						style={{ width: "20%", marginLeft: "7rem" }}
					>
						<Input
							prefix={<SearchOutlined className="text-[#686868]" />}
							placeholder="Search"
							className="bg-[#d9d9d9] rounded-l-full rounded-r-full border-none px-6"
						/>
					</Space>
					<div className="flex gap-4">
						<TbHome className="text-3xl text-primary" />
						<MdOutlineMailOutline className="text-3xl text-primary" />
						<RiNotification2Line className="text-3xl text-primary" />
					</div>
				</div>
				<div className="flex items-center gap-2">
					<div className="flex items-center gap-2 w-10 h-10 rounded-full overflow-hidden">
						<img
							src={dashboardUserProfile.src}
							alt="dashboard logo"
							className="w-full h-full object-cover"
						/>
					</div>
					Garrix
				</div>
			</div>
		</Header>
	);
};

export default DashboardHeader;
