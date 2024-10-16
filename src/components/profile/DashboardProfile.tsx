import { portfolioImage, logo, profileImage } from "@utils/images";
import { MdEmail, MdOutlineError } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import EditProfileModal from "@components/common/EditProfileModal";
import { bio } from "@utils/bio";
import { useGetProfileQuery } from "@store/actions/auth";
import { RootState } from "@store/index";
import { useSelector } from "react-redux";
import { defaultProfileImage } from "@utils/profileDataUtils";
import { useGetInterestQuery } from "@store/actions/interest";
import InterestModal from "@components/common/InterestModal";
import Image from "next/image";
import ExpertiesModal from "@components/common/ExpertiesModal";
import { useGetExpertiesQuery } from "@store/actions/experties";

const DashboardProfile = () => {
	const [openEditModal, setOpenEditModal] = useState(false);
	const toggleEditModal = () => {
		setOpenEditModal(!openEditModal);
	};
	const [openAddModal, setOpenAddModal] = useState(false);
	const toggleAddModal = () => {
		setOpenAddModal(!openAddModal);
	};

	const [openExperties, setOpenExperties] = useState(false);
	const toggleExpertiesModal = () => {
		setOpenExperties(!openExperties);
	};

	const { data: interestData, isLoading } = useGetInterestQuery();
	const fileteredInterest = interestData?.user.interests;
	const [load, setLoad] = useState(false);

	const { token } = useSelector((state: RootState) => state.appReducer);

	const { data: profile, error } = useGetProfileQuery(
		{},
		{
			skip: !token,
		}
	);
	const { data } = useGetExpertiesQuery();

	const experties = data?.user?.expertise;

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
		<div className="mt-4">
			<div className="">
				<div className="">
					<div className=" h-60 border-4 border-primary rounded-t-[2rem] overflow-hidden">
						<Image src={logo} alt="profile_image" className="w-full h-full" />
					</div>
					<div className="relative ml-20 top-0">
						<div className="absolute -top-16 bg-white w-32 h-32 rounded-[1rem] border-4 border-[#666666] overflow-hidden">
							{load ? (
								<svg
									className="w-full h-full text-gray-200 dark:text-gray-600 animate-pulse"
									aria-hidden="true"
									xmlns="http://www.w3.org/2000/svg"
									fill="currentColor"
									viewBox="0 0 20 20"
								>
									<path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
								</svg>
							) : (
								<Image
									src={profile?.data?.profileImage || defaultProfileImage}
									alt="profile_image"
									width={100}
									height={100}
									className={`w-full h-full object-cover ${
										profile?.data?.profileImage ? "bg-none" : "bg-[#666666]"
									} `}
								/>
							)}
						</div>
						<div className="flex">
							<div className="w-[60%] mt-20 flex flex-col gap-2">
								<h1 className="text-black font-bold">
									{isLoading ? (
										<div className="w-[40%] h-4 bg-gray-600 animate-pulse rounded"></div>
									) : (
										<>
											{`${profile?.data?.firstName} ${profile?.data?.lastName}`}
										</>
									)}
								</h1>
								<p>
									{isLoading ? (
										<div className="w-[40%] h-4 bg-gray-600 animate-pulse rounded"></div>
									) : (
										`@` + profile?.data?.username
									)}
								</p>
								<div className="flex items-center gap-2">
									<h1 className="flex items-center gap-2">
										{isLoading ? (
											<div className="w-[40%] h-4 bg-gray-600 animate-pulse rounded"></div>
										) : (
											<>
												<MdEmail className="text-xl" /> {profile?.data?.email}
											</>
										)}
									</h1>
								</div>
								<div className="flex items-center gap-2">
									<h1 className="flex items-center gap-2">
										{isLoading ? (
											<div className="w-[40%] h-4 bg-gray-600 animate-pulse rounded"></div>
										) : (
											<>
												<FaPhoneAlt className="text-xl" />{" "}
												{profile?.data?.phone}
											</>
										)}
									</h1>
								</div>
								<div>
									<button
										className="px-8 py-2 bg-primary text-white rounded-lg"
										onClick={toggleEditModal}
									>
										Edit profile
									</button>
								</div>
							</div>
							<div>
								<div className="p-4 mt-10 ml-16 _shadow rounded-xl">
									<h1 className="text-primary font-black text-2xl">Bio</h1>
									{profile?.data?.About && profile?.data?.About?.length > 0 ? (
										<div>{profile?.data?.About}</div>
									) : (
										<div className="text-lg flex items-center gap-2">
											Please add bio
											<button
												className="text-white rounded-lg text-base px-8 py-1 bg-primary"
												onClick={toggleEditModal}
											>
												Add
											</button>
										</div>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="flex gap-5 ml-16">
					<div className="w-full mt-8 bg-white p-4 _shadow rounded-lg flex flex-col gap-4">
						<div className="flex items-center gap-2">
							<h1 className="text-2xl ">Interests</h1>
							<button
								className="text-white rounded-lg text-sm px-8 py-1 bg-primary"
								onClick={() => toggleAddModal()}
							>
								Add
							</button>
						</div>
						<div
							className={`${
								isLoading ? "grid grid-cols-4" : "flex flex-row flex-wrap"
							}  gap-2 `}
						>
							{isLoading ? (
								[0, 1, 2, 3].map((skel) => (
									<div
										key={skel}
										className="rounded-r-full rounded-l-full border w-full h-8 animate-pulse bg-black/20"
									></div>
								))
							) : fileteredInterest?.length > 0 ? (
								fileteredInterest?.map((interest: string, idx: number) => (
									<div
										className="px-4 py-1 rounded-full border flex items-center justify-center"
										key={idx}
									>
										{interest}
									</div>
								))
							) : (
								<div className="w-full h-full items-center justify-center text-xl mt-4 text-black/50">
									You have not added interest yet
								</div>
							)}
						</div>
					</div>
					<div className="w-full mt-8 bg-white p-4 _shadow rounded-lg flex flex-col gap-4">
						<div className="flex items-center gap-2">
							<h1 className="text-2xl ">Experties</h1>
							<button
								className="text-white rounded-lg text-sm px-8 py-1 bg-primary"
								onClick={() => toggleExpertiesModal()}
							>
								Add
							</button>
						</div>
						<div
							className={`${
								isLoading ? "grid grid-cols-4" : "flex flex-row flex-wrap"
							}  gap-2 `}
						>
							{isLoading ? (
								[0, 1, 2, 3].map((skel) => (
									<div
										key={skel}
										className="rounded-r-full rounded-l-full border w-full h-8 animate-pulse bg-black/20"
									></div>
								))
							) : experties?.length > 0 ? (
								experties?.map((expert: string, idx: number) => (
									<div
										className="px-4 py-1 rounded-full border flex items-center justify-center"
										key={idx}
									>
										{expert}
									</div>
								))
							) : (
								<div className="w-full h-full items-center justify-center text-xl mt-4 text-black/50">
									You have not added experties yet
								</div>
							)}
						</div>
					</div>
				</div>
				{/* profile */}
				<div className="ml-16 mt-10">
					<h1 className="text-lg font-bold my-2">Portifolio</h1>
					<div className=" text-black/60 text-2xl border border-dashed rounded py-10 text-center">
						Not participating in any projects yet. Join an experience to access
						projects.
					</div>
				</div>
			</div>
			{openEditModal && <EditProfileModal toggleModal={toggleEditModal} />}
			{openAddModal && <InterestModal toggleModal={toggleAddModal} />}
			{openExperties && <ExpertiesModal toggleModal={toggleExpertiesModal} />}
		</div>
	);
};

export default DashboardProfile;
