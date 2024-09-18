import { profileImage } from "@utils/images";
import { awardsData } from "@utils/profileDataUtils";
import { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { LuCopy } from "react-icons/lu";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { TiTick } from "react-icons/ti";
import { Image } from "antd";
import ExpertiesComponent from "@components/profileComponents/ExpertiesComponent";
import InterestComponent from "@components/profileComponents/InterestComponent";
import GetInTouch from "@components/profileComponents/GetInTouch";
import ExperienceCard from "@components/profileComponents/cards/ExperienceCard";
import WorkExperienceComponent from "@components/profileComponents/WorkExperienceComponent";
import Badges from "@components/profileComponents/Badges";
import PortfolioComponent from "@components/profileComponents/PortfolioComponent";
import AddNewProfileModal from "@components/common/AddNewProfileModal";
import EditProfileModal from "@components/common/EditProfileModal";

const ProfileComponent = () => {
	const [copied, setCopied] = useState(false);
	const linkToShare = "https://myprofile.com";
	const [openModal, setOpenModal] = useState(false);
	const [openAddModal, setOpenAddModal] = useState(false);
	const toggleModal = () => {
		setOpenModal(!openModal);
	};
	const toggleAddModal = () => {
		setOpenAddModal(!openAddModal);
	};

	return (
		<>
			<div className="px-[5%] lg:py-10 py-5">
				<div className="flex items-center justify-between gap-20 lg:flex-row flex-col">
					<div className="lg:w-[50%] w-full flex flex-col gap-5">
						<div className="flex items-center ">
							<div className="flex gap-4 items-center">
								<div className="w-20 h-20 rounded-full overflow-hidden">
									<Image
										preview={false}
										src={profileImage.src}
										alt="profile_image"
										className="w-full h-full object-cover"
									/>
								</div>
								<div
									className="flex items-center cursor-pointer"
									onClick={() => toggleModal()}
								>
									{/* <MdOutlineModeEditOutline />
									<span className="text-sm underline text-primary">edit</span> */}
								</div>
							</div>
							<div className="flex items-center gap-2 border rounded p-2 m-5 border-primary">
								<span>Share link</span>
								<CopyToClipboard
									text={linkToShare}
									onCopy={() => setCopied(true)}
								>
									<div className={` `}>
										{copied ? (
											<TiTick className="text-2xl text-green-500" />
										) : (
											<LuCopy className={` text-black`} />
										)}
									</div>
								</CopyToClipboard>
							</div>
						</div>
						<div className="2xl:w-[40%] lg:w-[50%]">
							<h1 className="text-2xl font-bold text-center lg:text-start">
								Hello! I&apos;m Bright Manzi
							</h1>
							<p className="text-sm md:text-lg text-center lg:text-start">
								Digital Product Designer Based In Kigali Rwanda
							</p>
						</div>
						<div className="flex flex-col gap-4 mt-5">
							<ExpertiesComponent />
							<InterestComponent />
						</div>
					</div>
					<div className="flex flex-col gap-10 lg:w-[40%]">
						<div className="flex flex-col gap-2">
							<div className="flex">
								<h1 className="lg:text-3xl text-xl font-bold lg:font-normal text-center lg:text-start">
									Passionate Creating great experiences for Digital Product
								</h1>
							</div>
							<div>
								<p className="text-lg text-center lg:text-start">
									“All leaders have Visions”
								</p>
							</div>
						</div>
						<GetInTouch />
					</div>
				</div>
				<ExperienceCard />
				<div className="flex justify-between mt-12 lg:flex-row flex-col gap-10">
					<WorkExperienceComponent />
					<Badges />
				</div>
				<PortfolioComponent />
			</div>
			{openAddModal && <AddNewProfileModal toggleModal={toggleAddModal} />}
			{openModal && <EditProfileModal toggleModal={toggleModal} />}
		</>
	);
};

export default ProfileComponent;
