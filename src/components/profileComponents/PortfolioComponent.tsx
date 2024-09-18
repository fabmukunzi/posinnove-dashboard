import { useState } from "react";
import { MdOutlineModeEditOutline } from "react-icons/md";
import PortfolioCard from "./cards/PortfolioCard";
import { portfolioData } from "@utils/profileDataUtils";

const PortfolioComponent = () => {
	const [openModal, setOpenModal] = useState(false);
	const toggleModal = () => {
		setOpenModal(!openModal);
	};
	return (
		<div className=" mt-10">
			<div className="flex gap-4">
				<h1 className="text-2xl my-4">Profile</h1>
				<div
					className="flex items-center cursor-pointer"
					onClick={() => toggleModal()}
				>
					{/* <MdOutlineModeEditOutline />
					<span className="text-sm underline text-primary">edit</span> */}
				</div>
			</div>
			<div className=" lg:grid grid-cols-3 gap-10 flex flex-col">
				{portfolioData.map((item, idx) => (
					<PortfolioCard
						image={item.image.src}
						title={item.title}
						description={item.description}
						stack={item.stack}
						key={idx}
					/>
				))}
			</div>
		</div>
	);
};

export default PortfolioComponent;
