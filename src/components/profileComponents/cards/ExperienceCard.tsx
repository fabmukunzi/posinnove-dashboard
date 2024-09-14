import EditProfileModal from "@components/common/EditProfileModal";
import { experienceData } from "@utils/profileDataUtils";
import { useState } from "react";
import { MdOutlineModeEditOutline } from "react-icons/md";

const ExperienceCard = () => {
	const [openModal, setOpenModal] = useState(false);
	const toggleModal = () => {
		setOpenModal(!openModal);
	};
	return (
		<>
			<div className="flex flex-col gap-5 items-center max-w-[60%] mx-auto mt-20">
				<div
					className="flex items-center cursor-pointer"
					onClick={() => toggleModal()}
				>
					<MdOutlineModeEditOutline />
					<span className="text-sm underline text-primary">edit</span>
				</div>
				<div className="flex items-center border bg-black/5 border-primary w-full justify-around px-6 py-2 rounded-2xl">
					{experienceData.map((item, idx) => (
						<div
							className={`flex flex-col items-center w-full ${
								idx === 1
									? "border-l-2 border-primary border-r-2"
									: "border-none"
							}`}
							key={idx}
						>
							<h1 className="text-3xl font-bold">{item.title} +</h1>
							<p className="text-base text-black/50">{item.description}</p>
						</div>
					))}
				</div>
			</div>
			{openModal && <EditProfileModal toggleModal={toggleModal} />}
		</>
	);
};

export default ExperienceCard;
