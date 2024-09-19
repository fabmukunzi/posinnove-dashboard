import { useAddExpertiesMutation } from "@store/actions/experties";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Item = {
	id: number;
	text: string;
	isVisible: boolean;
};

interface ExpertiesModalProps {
	toggleModal: () => void;
}

const ExpertiesModal = ({ toggleModal }: ExpertiesModalProps) => {
	const [items, setItems] = useState<Item[]>([]);
	const [inputValue, setInputValue] = useState("");
	const [nextId, setNextId] = useState(1);

	const [addExperties, { isLoading, isSuccess, isError, error }] =
		useAddExpertiesMutation();

	const handleAddItem = (e: React.FormEvent) => {
		e.preventDefault();
		if (inputValue.trim()) {
			setItems([...items, { id: nextId, text: inputValue, isVisible: true }]);
			setInputValue("");
			setNextId(nextId + 1);
		}
	};

	const handleRemoveItem = (id: number) => {
		setItems(items.filter((item) => item.id !== id));
	};

	const toggleVisibility = (id: number) => {
		setItems(
			items.map((item) =>
				item.id === id ? { ...item, isVisible: !item.isVisible } : item
			)
		);
	};

	const handleSaveChanges = async () => {
		const expertiseNames = items.map((item) => item.text);
		const data = { expertiseNames };

		try {
			await addExperties(data).unwrap();
			toast.success("Experties added successfully!");
			setTimeout(() => {
				toggleModal();
			}, 4000);
		} catch (err) {
			console.error("Failed to add experties:", err);
			toast.error("Failed to add experties. Please try again.");
		}
	};

	const visibleItems = items.filter((item) => item.isVisible);
	const hiddenItems = items.filter((item) => !item.isVisible);

	return (
		<div className="flex items-center justify-center fixed inset-0 bg-black/20 w-full h-full backdrop-blur-sm">
			<div
				className="absolute w-full h-full -z-10 inset-0"
				onClick={() => toggleModal()}
			></div>
			<div className="bg-white rounded-lg shadow-lg p-6 lg:w-1/2 w-4/5">
				<h1 className="md:text-2xl text-base font-bold">Experties</h1>
				<div className="max-h-[50vh] overflow-auto">
					<div className="mb-4">
						<div className="py-4 rounded-lg ">
							{items.length <= 0 ? (
								"You have not added any experties"
							) : visibleItems.length > 0 ? (
								<ul className="space-y-2">
									{visibleItems.map((item) => (
										<li
											key={item.id}
											className=" py-2 rounded-md text-sm flex justify-between items-center"
										>
											<div className="border flex-[3] md:p-4 p-2 rounded md:rounded-lg">
												{item.text}
											</div>
											<div className="flex items-center justify-evenly space-x-2 flex-1">
												<button
													className="text-gray-600 hover:text-gray-800"
													onClick={() => toggleVisibility(item.id)}
												>
													<AiOutlineEyeInvisible className="md:text-2xl text-lg" />
												</button>
												<button
													className="text-red-500 hover:text-red-700"
													onClick={() => handleRemoveItem(item.id)}
												>
													<RiDeleteBin6Line className="md:text-2xl text-lg" />
												</button>
											</div>
										</li>
									))}
								</ul>
							) : (
								<p className="text-gray-500 md:text-sm text-xs">
									Your experties will not be visible
								</p>
							)}
						</div>
					</div>

					<div className="mb-">
						<div className="flex flex-col  mb-2">
							<h2 className="md:text-lg text-sm font-semibold">
								{hiddenItems.length <= 0 ? "" : "Hidden Items"}{" "}
							</h2>
							<p className="text-xs md:text-sm">
								{hiddenItems.length > 0
									? "Hidden items will only be visible to you"
									: ""}
							</p>
						</div>
						<div className="py- rounded-lg ">
							{hiddenItems.length > 0 ? (
								<ul className="space-y-2">
									{hiddenItems.map((item) => (
										<li
											key={item.id}
											className=" py-2 rounded-md text-sm flex justify-between items-center"
										>
											<div className="border flex-[3] md:p-4 p-2 rounded md:rounded-lg">
												{item.text}
											</div>
											<div className="flex items-center justify-evenly space-x-2 flex-1">
												<button
													className="text-gray-600 hover:text-gray-800"
													onClick={() => toggleVisibility(item.id)}
												>
													<AiOutlineEye className="md:text-2xl text-lg" />
												</button>
												<button
													className="text-red-500 hover:text-red-700"
													onClick={() => handleRemoveItem(item.id)}
												>
													<RiDeleteBin6Line className="md:text-2xl text-lg" />
												</button>
											</div>
										</li>
									))}
								</ul>
							) : (
								<p className="text-gray-500 text-sm"></p>
							)}
						</div>
					</div>
				</div>

				<div className="mt-">
					<h2 className="md:text-lg text-sm font-semibold">Add experties</h2>
					<form
						className="flex items-center space-x-2 md:px-4 w-3/4"
						onSubmit={handleAddItem}
					>
						<input
							type="text"
							className="border-b-2  py-2 flex-grow focus:outline-none"
							value={inputValue}
							onChange={(e) => setInputValue(e.target.value)}
						/>
					</form>
				</div>

				<div className="mt-4 flex justify-between">
					<button
						className="text-primary hover:underline"
						onClick={() => toggleModal()}
					>
						Cancel
					</button>
					<button
						className="bg-primary text-white px-4 py-2 rounded-md hover:bg-blue-900"
						onClick={handleSaveChanges}
					>
						{isLoading ? "Saving..." : "Save Changes"}
					</button>
				</div>
			</div>
			<ToastContainer />
		</div>
	);
};

export default ExpertiesModal;
