interface EditProfileModalProps {
	toggleModal: () => void;
}

const EditProfileModal = ({ toggleModal }: EditProfileModalProps) => {
	return (
		<div
			className="flex items-center justify-center fixed inset-0 bg-black/20 w-full h-full text-white"
			onClick={() => toggleModal()}
		>
			Edit coming soon
		</div>
	);
};

export default EditProfileModal;
