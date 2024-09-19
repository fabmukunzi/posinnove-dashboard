import ProfileComponent from "@components/profileComponents/ProfileComponent";
import ProtectedRoute from "@components/ProtectedRoute";
import { useGetProfileQuery } from "@store/actions/auth";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Profile = () => {
	const { data } = useGetProfileQuery({});
	const router = useRouter();

	useEffect(() => {
		if (!data) {
			router.push("/login");
		}
	}, [data, router]);
	return (
		<div>
			<ProtectedRoute>
				<ProfileComponent />
			</ProtectedRoute>
		</div>
	);
};

export default Profile;
