import { profileImage } from "@utils/images";
import { awardsData } from "@utils/profileDataUtils";
import { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { LuCopy } from "react-icons/lu";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { TiTick } from "react-icons/ti";
import AddNewProfileModal from "./common/AddNewProfileModal";
import EditProfileModal from "./common/EditProfileModal";
import ExpertiesComponent from "./profileComponents/ExpertiesComponent";
import InterestComponent from "./profileComponents/InterestComponent";
import ExperienceCard from "./profileComponents/cards/ExperienceCard";
import SocialMediaComponent from "./profileComponents/SocialMediaComponent";
import GetInTouch from "./profileComponents/GetInTouch";
import WorkExperienceComponent from "./profileComponents/WorkExperienceComponent";
import Badges from "./profileComponents/Badges";
import PortfolioComponent from "./profileComponents/PortfolioComponent";

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
			<div className="px-[5%] py-10">
				<div className="flex items-center justify-between gap-20">
					<div className="w-[50%] flex flex-col gap-5">
						<div className="flex">
							<div className="flex gap-4 items-center">
								<div className="w-20 h-20 rounded-full overflow-hidden">
									<img
										src={profileImage.src}
										alt="profile_image"
										className="w-full h-full object-cover"
									/>
								</div>
								<div
									className="flex items-center cursor-pointer"
									onClick={() => toggleModal()}
								>
									<MdOutlineModeEditOutline />
									<span className="text-sm underline text-primary">edit</span>
								</div>
							</div>
							<div className="flex items-center gap-2 border w-40 rounded p-2 m-5 border-primary">
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
						<div className="w-1/3">
							<h1 className="text-2xl font-bold">Hello! I'm Bright Manzi</h1>
							<p className="text-lg">
								Digital Product Designer Based In Kigali Rwanda
							</p>
						</div>
						<div className="flex flex-col gap-4 mt-5">
							<ExpertiesComponent />
							<InterestComponent />
						</div>
					</div>
					<div className="flex flex-col gap-10 w-[40%]">
						<div className="flex flex-col gap-2">
							<div className="flex">
								<h1 className="text-3xl">
									Passionate Creating great experiences for Digital Product
								</h1>
							</div>
							<div>
								<p className="text-lg">“All leaders have Visions”</p>
							</div>
						</div>
						<GetInTouch />
					</div>
				</div>
				<ExperienceCard />
				<div className="flex justify-between mt-12 ">
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
