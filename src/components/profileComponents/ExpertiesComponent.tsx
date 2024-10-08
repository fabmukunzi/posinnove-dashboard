import ExpertiesModal from "@components/common/ExpertiesModal";
import { useGetExpertiesQuery } from "@store/actions/experties";
import { useState } from "react";
import { FaLongArrowAltUp } from "react-icons/fa";
import { MdOutlineModeEditOutline } from "react-icons/md";
import HashLoader from "react-spinners/HashLoader";

const ExpertiesComponent = () => {
	const [openAddModal, setOpenAddModal] = useState(false);
	const [openModal, setOpenModal] = useState(false);

	const toggleAddModal = () => {
		setOpenAddModal(!openAddModal);
	};
	const toggleModal = () => {
		setOpenModal(!openModal);
	};

	const { data, error, isLoading } = useGetExpertiesQuery();
	const experties: string[] | undefined = data?.user?.expertise;

	return (
		<>
			<div className="flex flex-col gap-2">
				<div className="flex gap-4 items-center justify-start">
					<h1 className="text-2xl font-bold lg:text-base lg:font-normal">
						Experties
					</h1>
					<div
						className="flex items-center cursor-pointer"
						onClick={() => toggleAddModal()}
					>
						<MdOutlineModeEditOutline />
						<span className="text-sm underline text-primary">Add</span>
					</div>
				</div>

				<div className="lg:flex items-center lg:gap-2 gap-5 lg:flex-row flex-col grid grid-cols-2">
					{isLoading ? (
						<HashLoader color="#0a418a" size={20} speedMultiplier={1.2} />
					) : (
						<>
							{experties?.map((item, idx) => (
								<div
									className="px-2 text-[14px] flex items-center border rounded-l-full rounded-r-full"
									key={idx}
								>
									<FaLongArrowAltUp />
									<h1>{item}</h1>
								</div>
							))}
						</>
					)}
				</div>
			</div>

			{openAddModal && <ExpertiesModal toggleModal={toggleAddModal} />}
		</>
	);
};

export default ExpertiesComponent;
