import { useForm, useFieldArray } from "react-hook-form";
import { Input, Button } from "antd";
import { FaTrash } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";

interface AddNewProfileModalProps {
	toggleModal: () => void;
}

interface Profile {
	id: string;
	platform: string;
	username: string;
}

const AddNewProfileModal = ({ toggleModal }: AddNewProfileModalProps) => {
	const { control, handleSubmit, register, reset } = useForm({
		defaultValues: {
			Contact: [] as Profile[],
		},
	});

	const { fields, append, remove } = useFieldArray({
		control,
		name: "Contact",
	});

	const [platform, setPlatform] = useState("");

	const onSubmit = (data: { Contact: Profile[] }) => {
		toast.success("Changes saved successfully!");
		console.log(data);
	};

	const handleAddProfile = () => {
		if (platform) {
			append({ id: Math.random().toString(), platform, username: "" });
			setPlatform("");
		}
	};

	return (
		<div className="flex items-center justify-center fixed inset-0 bg-black/20 w-full h-full backdrop-blur-sm">
			<div
				className="absolute w-full h-full -z-10 inset-0"
				onClick={() => toggleModal()}
			></div>
			<div className="bg-white rounded-lg shadow-lg p-6 lg:w-1/2 w-4/5">
				<h1 className="md:text-2xl text-base font-bold">Contact</h1>
				<div className="max-h-[50vh] overflow-auto">
					<div className="mb-4">
						{fields.length <= 0 ? (
							<p className="text-gray-500">You have not added any platform</p>
						) : (
							<ul className="space-y-2">
								{fields.map((field, index) => (
									<li
										key={field.id}
										className="py-2 rounded-md text-sm flex justify-between items-center"
									>
										<div className=" flex-[3] md:p-4 p-2 rounded md:rounded-lg flex items-center">
											<label className="text-gray-600 w-24">
												{field.platform}
											</label>
											<input
												{...register(`Contact.${index}.username`)}
												className="border flex-[3] md:p-4 p-2 rounded md:rounded-lg"
												placeholder={`Add username for ${field.platform}`}
											/>
										</div>
										<div className="flex items-center justify-evenly space-x-2 flex-1">
											<Button
												type="text"
												icon={<FaTrash />}
												onClick={() => remove(index)}
												className="text-red-500 hover:text-red-700"
											/>
										</div>
									</li>
								))}
							</ul>
						)}
					</div>
				</div>

				<div className="mt-4">
					<h2 className="md:text-lg text-sm font-semibold">Add New Platform</h2>
					<form
						className="flex items-center space-x-4 w-4/5"
						onSubmit={(e) => {
							e.preventDefault();
							handleAddProfile();
						}}
					>
						<input
							value={platform}
							onChange={(e) => setPlatform(e.target.value)}
							className="border-b-2 py-2 flex-grow focus:outline-none"
						/>
					</form>
				</div>

				<div className="mt-4 flex justify-between">
					<Button type="link" onClick={toggleModal} className="px-0">
						Cancel
					</Button>
					<Button
						type="primary"
						htmlType="submit"
						onClick={handleSubmit(onSubmit)}
					>
						Save Changes
					</Button>
				</div>

				<ToastContainer />
			</div>
		</div>
	);
};

export default AddNewProfileModal;
