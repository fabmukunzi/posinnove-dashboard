interface AddNewProfileModalProps {
	toggleModal: () => void;
}

const AddNewProfileModal = ({ toggleModal }: AddNewProfileModalProps) => {
	return (
		<div
			className="flex items-center justify-center fixed inset-0 bg-black/20 w-full h-full text-white"
			onClick={() => toggleModal()}
		>
			Add is comming soon
		</div>
	);
};

export default AddNewProfileModal;
