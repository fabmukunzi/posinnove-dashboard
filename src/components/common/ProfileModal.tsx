import { IoPerson } from "react-icons/io5";
import { IoIosLogOut } from "react-icons/io";

interface ProfileModalProps {
	toggleModal: () => void;
}

const ProfileModal = ({ toggleModal }: ProfileModalProps) => {
	return (
		<div className="flex flex-col items-center justify-center border border-primary/30 rounded ">
			<div className="flex flex-col gap-3 rounded text-primary">
				<div
					className="flex items-center gap-2 hover:bg-[#D6E1FC] px-4 py-1 cursor-pointer"
					onClick={() => toggleModal()}
				>
					<IoPerson className="text-2xl" />
					<h1 className="text-lg">My account</h1>
				</div>
				<div
					className="flex items-center gap-2 hover:bg-[#D6E1FC] px-4 py-1 cursor-pointer"
					onClick={() => toggleModal()}
				>
					<IoIosLogOut className="text-2xl" />
					<h1 className="text-lg">Logout</h1>
				</div>
			</div>
		</div>
	);
};

export default ProfileModal;
