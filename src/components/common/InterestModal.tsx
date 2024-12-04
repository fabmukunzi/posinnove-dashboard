import { useAddUserInterestMutation } from "@store/actions/interest";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";
import { Select, Button } from "antd";
import { predefinedInterests } from "@utils/profileDataUtils";

const { Option } = Select;

type Item = {
	id: number;
	text: string;
	isVisible: boolean;
};

interface InterestModalProps {
	toggleModal: () => void;
}

const InterestModal = ({ toggleModal }: InterestModalProps) => {
	const [items, setItems] = useState<Item[]>([]);
	const [nextId, setNextId] = useState(1);
	const [error, setError] = useState<string | null>(null);

	const [addInterest, { isLoading }] = useAddUserInterestMutation();
	const { register, handleSubmit, reset } = useForm<{ interest: string }>();

	const handleAddItem = (interest: string) => {
		if (interest && !items.find((item) => item.text === interest)) {
			setItems([...items, { id: nextId, text: interest, isVisible: true }]);
			reset();
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
		setError(null);

		try {
			await addInterest({
				interestNames: items.map((item) => item.text),
			}).unwrap();
			toast.success("Interests updated successfully");

			setTimeout(() => {
				toggleModal();
			}, 4000);
		} catch (err: any) {
			setError("Failed to save items. Please try again.");
			toast.error("Failed to save items. Please try again.");
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
				<h1 className="md:text-2xl text-base font-bold">Interest</h1>
				<div className="max-h-[50vh] overflow-auto">
					<div className="mb-4">
						<div className="py-4 rounded-lg ">
							{items.length <= 0 ? (
								"You have not added any Interest"
							) : visibleItems.length > 0 ? (
								<ul className="space-y-2">
									{visibleItems.map((item) => (
										<li
											key={item.id}
											className="py-2 rounded-md text-sm flex justify-between items-center"
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
									Your interest will not be visible
								</p>
							)}
						</div>
					</div>

					<div className="mb-">
						<div className="flex flex-col mb-2">
							<h2 className="md:text-lg text-sm font-semibold">
								{hiddenItems.length <= 0 ? "" : "Hidden interests"}
							</h2>
							<p className="text-xs md:text-sm">
								{hiddenItems.length > 0
									? "Hidden interests will only be visible to you"
									: ""}
							</p>
						</div>
						<div className="py- rounded-lg ">
							{hiddenItems.length > 0 ? (
								<ul className="space-y-2">
									{hiddenItems.map((item) => (
										<li
											key={item.id}
											className="py-2 rounded-md text-sm flex justify-between items-center"
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

				<div className="mt-4">
					<h2 className="md:text-lg text-sm font-semibold">Add Interest</h2>
					<Select
						showSearch
						placeholder="Select an interest"
						optionFilterProp="children"
						onChange={handleAddItem}
						className="w-full"
					>
						{predefinedInterests.map((interest) => (
							<Option key={interest} value={interest}>
								{interest}
							</Option>
						))}
					</Select>
				</div>

				{error && <p className="text-red-500 text-sm mt-2">{error}</p>}

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
						disabled={isLoading}
					>
						{isLoading ? "Saving..." : "Save Changes"}
					</button>
				</div>
			</div>
			<ToastContainer />
		</div>
	);
};

export default InterestModal;
