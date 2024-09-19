import AddNewProfileModal from "@components/common/AddNewProfileModal";
import EditProfileModal from "@components/common/EditProfileModal";
import Badges from "@components/profileComponents/Badges";
import ExperienceCard from "@components/profileComponents/cards/ExperienceCard";
import ExpertiesComponent from "@components/profileComponents/ExpertiesComponent";
import GetInTouch from "@components/profileComponents/GetInTouch";
import InterestComponent from "@components/profileComponents/InterestComponent";
import PortfolioComponent from "@components/profileComponents/PortfolioComponent";
import WorkExperienceComponent from "@components/profileComponents/WorkExperienceComponent";
import { useGetProfileQuery } from "@store/actions/auth";
import { RootState } from "@store/index";
import { defaultProfileImage } from "@utils/profileDataUtils";
import { Image } from "antd";
import { useEffect, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { BiSolidEdit } from "react-icons/bi";
import { LuCopy } from "react-icons/lu";
import { MdOutlineError } from "react-icons/md";
import { TiTick } from "react-icons/ti";
import { useSelector } from "react-redux";

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
	const { token } = useSelector((state: RootState) => state.appReducer);

	const { data: profile, error } = useGetProfileQuery(
		{},
		{
			skip: !token,
		}
	);

	// console.log(profile, "Prooooooooooofiiiile");

	useEffect(() => {
		if (!token) {
			console.log("No token found, redirecting to login");
		}
	}, [token]);

	if (error)
		return (
			<div className="flex items-center justify-center w-full h-full">
				<div className="w-full h-full">
					<h1>Cannot get your profile</h1>
					<MdOutlineError className="text-4xl text-orange-400" />
				</div>
			</div>
		);

	return (
		<div className="px-[5%] lg:py-10 py-5">
			<div className="flex items-center justify-between gap-20 lg:flex-row flex-col">
				<div className="lg:w-[50%] w-full flex flex-col gap-5">
					<div className="flex items-center ">
						<div className="flex gap-4 items-center relative">
							<div className="w-20 h-20 rounded-full overflow-hidden relative">
								<Image
									preview={false}
									src={profile.data.profileImage || defaultProfileImage}
									alt="profile_image"
									className="w-full h-full object-contain"
								/>
								<div className="bg-black/20 absolute w-full h-full inset-0"></div>
							</div>
							<div className="flex items-center  absolute w-full h-full justify-center">
								<BiSolidEdit
									className="text-4xl text-white cursor-pointer"
									onClick={() => toggleModal()}
								/>
							</div>
						</div>
						<div className="flex items-center gap-2 border rounded p-2 m-5 border-primary">
							<span>{copied ? "Share your profile link" : "Copy link"}</span>
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
							Hello! I&apos;m {profile.data.firstName} {profile.data.lastName}
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
			{openAddModal && <AddNewProfileModal toggleModal={toggleAddModal} />}
			{openModal && <EditProfileModal toggleModal={toggleModal} />}
		</div>
	);
};

export default ProfileComponent;
