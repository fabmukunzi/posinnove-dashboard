import { useState } from "react";
import { MdOutlineModeEditOutline } from "react-icons/md";
import SocialMediaComponent from "./SocialMediaComponent";
import AddNewProfileModal from "@components/common/AddNewProfileModal";

const GetInTouch = () => {
	const [openAddModal, setOpenAddModal] = useState(false);
	const [openModal, setOpenModal] = useState(false);

	const toggleAddModal = () => {
		setOpenAddModal(!openAddModal);
	};
	const toggleModal = () => {
		setOpenModal(!openModal);
	};
	return (
		<>
			<div className="border-t-2 pt-2">
				<div className="flex items-center gap-2">
					<h1 className="text-xl md:text-2xl lg:text-xl font-bold">
						Let&apos;s keep in touch
					</h1>
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
				<SocialMediaComponent />
			</div>
			{openAddModal && <AddNewProfileModal toggleModal={toggleAddModal} />}
		</>
	);
};

export default GetInTouch;
