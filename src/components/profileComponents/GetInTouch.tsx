import { useState } from "react";
import { MdOutlineModeEditOutline } from "react-icons/md";
import SocialMediaComponent from "./SocialMediaComponent";

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
		<div className="border-t-2 pt-2">
			<div className="flex items-center gap-2">
				<h1 className="text-xl font-bold">Let's keep in touch</h1>
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
			<SocialMediaComponent />
		</div>
	);
};

export default GetInTouch;
