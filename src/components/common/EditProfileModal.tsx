import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { notification } from "antd";
import { FaCloudUploadAlt } from "react-icons/fa";
import { defaultProfileImage } from "@utils/profileDataUtils";
import {
	useUpdateProfileMutation,
	useGetProfileQuery,
} from "@store/actions/auth";

interface EditProfileModalProps {
	toggleModal: () => void;
}

const EditProfileModal = ({ toggleModal }: EditProfileModalProps) => {
	const { data: profileData, isLoading: isProfileLoading } = useGetProfileQuery(
		{}
	);
	const [updateProfile, { isLoading }] = useUpdateProfileMutation();

	const [imagePreview, setImagePreview] = useState<string | null>(null);
	const [selectedImage, setSelectedImage] = useState<File | null>(null);

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm({
		defaultValues: {
			username: "",
			firstName: "",
			lastName: "",
			gender: "",
			institution: "",
			country: "",
			phone: "",
			About: "",
		},
	});

	useEffect(() => {
		if (profileData) {
			setValue("username", profileData.data.username);
			setValue("firstName", profileData.data.firstName);
			setValue("lastName", profileData.data.lastName);
			setValue("gender", profileData.data.gender);
			setValue("institution", profileData.data.institution);
			setValue("country", profileData.data.country);
			setValue("phone", profileData.data.phone);
			setValue("About", profileData.data.About);
		}
	}, [profileData, setValue]);

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			setSelectedImage(file);
			const reader = new FileReader();
			reader.onloadend = () => {
				setImagePreview(reader.result as string);
			};
			reader.readAsDataURL(file);
		}
	};

	const onSubmit = async (data: any) => {
		try {
			const formData = new FormData();
			formData.append("username", data.username);
			formData.append("firstName", data.firstName);
			formData.append("lastName", data.lastName);
			formData.append("gender", data.gender);
			formData.append("institution", data.institution);
			formData.append("country", data.country);
			formData.append("phone", data.phone);
			formData.append("About", data.About);

			if (selectedImage) {
				formData.append("profileImage", selectedImage);
			}

			await updateProfile(formData).unwrap();
			notification.success({ message: "Profile updated successfully" });
			toggleModal();
		} catch (error: any) {
			notification.error({
				message: "Profile update failed",
				description: error.message,
			});
		}
	};

	return (
		<div className="flex items-center justify-center fixed inset-0 bg-black/20 w-full h-full text-white">
			<div
				className="absolute w-full h-full inset-0 -z-10"
				onClick={toggleModal}
			></div>
			<div className="w-4/5 max-w-3xl bg-white p-6 rounded-lg shadow-lg">
				<form onSubmit={handleSubmit(onSubmit)} className="flex gap-10">
					<div className="relative">
						<div className="w-40 h-40 rounded-full overflow-hidden bg-gray-200 relative">
							<img
								src={
									imagePreview ||
									profileData?.data.profileImage ||
									defaultProfileImage
								}
								alt="Profile"
								className="w-full h-full object-cover"
							/>
							<div className="absolute w-full h-full bg-black/20 inset-0"></div>
						</div>
						<div className="absolute top-14 left-14">
							<FaCloudUploadAlt className="text-white text-5xl" />
						</div>
						<input
							type="file"
							accept="image/*"
							className="absolute w-full  cursor-pointer bg-red-600 top-16 right-10 opacity-0"
							onChange={handleImageChange}
						/>
					</div>

					<div className="flex-grow grid grid-cols-2 gap-4">
						<div>
							<label htmlFor="username" className="block text-gray-700">
								Username
							</label>
							<input
								{...register("username", { required: "Username is required" })}
								className="w-full p-2 border border-gray-300 rounded text-black/60"
								placeholder="Username"
								name="username"
							/>
							{errors.username && (
								<span className="text-red-500">{errors.username.message}</span>
							)}
						</div>
						<div>
							<label htmlFor="firstName" className="block text-gray-700">
								First Name
							</label>
							<input
								{...register("firstName", {
									required: "First Name is required",
								})}
								className="w-full p-2 border border-gray-300 rounded text-black/60"
								placeholder="First Name"
								name="firstName"
							/>
							{errors.firstName && (
								<span className="text-red-500">{errors.firstName.message}</span>
							)}
						</div>
						<div>
							<label htmlFor="lastName" className="block text-gray-700">
								Last Name
							</label>
							<input
								{...register("lastName", { required: "Last Name is required" })}
								className="w-full p-2 border border-gray-300 rounded text-black/60"
								placeholder="Last Name"
								name="lastName"
							/>
							{errors.lastName && (
								<span className="text-red-500">{errors.lastName.message}</span>
							)}
						</div>
						<div>
							<label htmlFor="gender" className="block text-gray-700">
								Gender
							</label>
							<select
								{...register("gender", { required: "Gender is required" })}
								className="w-full p-2 border border-gray-300 rounded text-black/60"
							>
								<option value="">Select Gender</option>
								<option value="male">Male</option>
								<option value="female">Female</option>
							</select>
							{errors.gender && (
								<span className="text-red-500">{errors.gender.message}</span>
							)}
						</div>
						<div>
							<label htmlFor="institution" className="block text-gray-700">
								Institution
							</label>
							<input
								{...register("institution")}
								className="w-full p-2 border border-gray-300 rounded text-black/60"
								placeholder="Institution"
								name="institution"
							/>
						</div>
						<div>
							<label htmlFor="country" className="block text-gray-700">
								Country
							</label>
							<input
								{...register("country")}
								className="w-full p-2 border border-gray-300 rounded text-black/60"
								placeholder="Country"
								name="country"
							/>
						</div>
						<div>
							<label htmlFor="phone" className="block text-gray-700">
								Phone
							</label>
							<input
								{...register("phone")}
								className="w-full p-2 border border-gray-300 rounded text-black/60"
								placeholder="Phone"
								name="phone"
							/>
						</div>
						<div>
							<label htmlFor="about" className="block text-gray-700">
								About
							</label>
							<textarea
								{...register("About")}
								className="w-full p-2 border border-gray-300 rounded text-black/60"
								placeholder="About"
								name="About"
								rows={2}
							></textarea>
						</div>
						<div className="flex items-center gap-5">
							<button
								type="button"
								onClick={toggleModal}
								className="text-white bg-red-500 p-2 px-6 rounded w-full"
							>
								Cancel
							</button>
							<button
								type="submit"
								className="px-6 py-2 bg-green-600 text-white rounded w-full"
								disabled={isLoading || isProfileLoading}
							>
								{isLoading || isProfileLoading ? "Updating..." : "Update"}
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};

export default EditProfileModal;
