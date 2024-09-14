import { expertiesData } from "@utils/profileDataUtils";
import { useState } from "react";
import { FaLongArrowAltUp } from "react-icons/fa";
import { MdOutlineModeEditOutline } from "react-icons/md";

const ExpertiesComponent = () => {
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
			<div className="flex flex-col gap-2">
				<div className="flex gap-4">
					<h1>Experties</h1>
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
						<MdOutlineModeEditOutline />
						<span className="text-sm underline text-primary">edit</span>
					</div>
				</div>
				<div className="flex items-center gap-2">
					{expertiesData.map((item, idx) => (
						<div
							className=" px-2 text-[14px] flex items-center border rounded-l-full rounded-r-full"
							key={idx}
						>
							<FaLongArrowAltUp />
							<h1>{item.title}</h1>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default ExpertiesComponent;
