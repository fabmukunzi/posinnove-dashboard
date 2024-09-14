import { interestData } from "@utils/profileDataUtils";
import { useState } from "react";
import { FaLongArrowAltUp } from "react-icons/fa";
import { MdOutlineModeEditOutline } from "react-icons/md";

const InterestComponent = () => {
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
			<div className="flex flex-col lg:gap-2 gap-5">
				<div className="flex gap-4 items-center justify-start">
					<h1 className="text-2xl font-bold lg:text-base lg:font-normal">
						Interests
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
				<div className="lg:flex items-center lg:gap-2 gap-5 lg:flex-row flex-col grid grid-cols-2">
					{interestData.map((item, idx) => (
						<div
							className="text-[14px] px-2 flex items-center gap-2 border rounded-l-full rounded-r-full"
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

export default InterestComponent;