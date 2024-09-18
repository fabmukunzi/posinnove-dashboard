import { workExperienceData } from "@utils/profileDataUtils";
import { useState } from "react";
import { MdOutlineModeEditOutline } from "react-icons/md";
import WorkingExperienceCard from "./cards/WorkingExperienceCard";

const WorkExperienceComponent = () => {
	const [openAddModal, setOpenAddModal] = useState(false);
	const [openModal, setOpenModal] = useState(false);

	const toggleAddModal = () => {
		setOpenAddModal(!openAddModal);
	};
	const toggleModal = () => {
		setOpenModal(!openModal);
	};
	return (
		<div>
			<div className="flex gap-4">
				<h1 className="text-2xl">Working Experience</h1>
				<div
					className="flex items-center cursor-pointer"
					onClick={() => toggleAddModal()}
				>
					<MdOutlineModeEditOutline />
					<span className="text-sm underline text-primary">Add</span>
				</div>
				<div
					className="flex items-center cursor-pointer"
					onClick={() => toggleModal()}
				>
					{/* <MdOutlineModeEditOutline />
					<span className="text-sm underline text-primary">edit</span> */}
				</div>
			</div>
			<div className="flex flex-col gap-4 mt-5">
				{workExperienceData.map((data, index) => (
					<WorkingExperienceCard
						key={index}
						title={data.title}
						profile={data.profile.src}
						date={data.date}
						duration={data.duration}
					/>
				))}
			</div>
		</div>
	);
};

export default WorkExperienceComponent;
