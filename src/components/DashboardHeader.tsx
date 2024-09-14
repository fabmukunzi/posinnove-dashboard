import { SearchOutlined } from "@ant-design/icons";
import { dashboardLogo, dashboardUserProfile } from "@utils/images";
import { Input, Layout, Space } from "antd";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { IoMdArrowDropup } from "react-icons/io";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiNotification2Line } from "react-icons/ri";
import { TbHome } from "react-icons/tb";
import ProfileModal from "./common/ProfileModal";
import {Image} from "antd"

const { Header } = Layout;

const DashboardHeader = () => {
	const [openModal, setOpenModal] = useState(false);

	const toggleModal = () => {
		setOpenModal(!openModal);
	};

	return (
		<>
			<Header className="!bg-white border-b border-b-[#f1f1f1] flex items-center justify-between px-10 py-10">
				<div className="flex items-center gap-2">
					<div>
						<Image preview={false} src={dashboardLogo.src} alt="dashboard logo" />
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
						<div
							className="flex items-center gap-2 w-10 h-10 rounded-full overflow-hidden cursor-pointer"
							onClick={() => toggleModal()}
						>
							<Image preview={false}
								src={dashboardUserProfile}
								alt="dashboard logo"
								className="w-full h-full object-cover"
							/>
						</div>
						Garrix
					</div>
				</div>
			</Header>

			<AnimatePresence>
				{openModal && (
					<motion.div
						className="absolute top-12 right-7 flex flex-col items-center"
						initial={{ opacity: 0, scale: 0.5 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0.5 }}
						transition={{ duration: 0.3, staggerChildren: 0.2 }}
					>
						<motion.div
							className="text-4xl cursor-pointer"
							initial={{ rotateZ: 0, opacity: 0 }}
							animate={{ rotateZ: 180, opacity: 1 }}
							exit={{ rotateZ: 0, opacity: 0, y: -50 }}
							transition={{ duration: 0.3, ease: "easeOut" }}
						>
							<IoMdArrowDropup onClick={() => toggleModal()} />
						</motion.div>
						<motion.div
							initial={{ opacity: 0, y: -20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -20 }}
							transition={{ duration: 0.3, delay: 0.3 }}
						>
							<ProfileModal toggleModal={toggleModal} />
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
};

export default DashboardHeader;
