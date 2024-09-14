import { awardsData } from "@utils/profileDataUtils";
import { useState } from "react";
import { MdOutlineModeEditOutline } from "react-icons/md";

const Badges = () => {
	const [openModal, setOpenModal] = useState(false);

	const toggleModal = () => {
		setOpenModal(!openModal);
	};
	return (
		<div className="w-2/5">
			<div className="border-t-2 flex flex-col gap-5">
				<div className="flex gap-6">
					<h1>
						{" "}
						<b className="border-b-black border-b-2">Badges/</b>Awards
					</h1>
					<div
						className="flex items-center cursor-pointer"
						onClick={() => toggleModal()}
					>
						<MdOutlineModeEditOutline />
						<span className="text-sm underline text-primary">edit</span>
					</div>
				</div>
				<div className="grid grid-cols-2 gap-2">
					{awardsData.map((item, idx) => (
						<div key={idx} className="flex items-ceter gap-3 border-b-2">
							<div className="w-6 h-6 bg-black/10 mt-1 rounded-full"></div>
							<div className="flex flex-col text-lg">
								<h1>{item.title}</h1>
								<div className="flex text-xs items-center gap-1">
									<div className="w-2 h-2 bg-black/10 rounded-full"></div>
									<p>{item.description}</p>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Badges;
