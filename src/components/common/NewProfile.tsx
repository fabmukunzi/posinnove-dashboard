import DashboardProfile from "@components/profile/DashboardProfile";
import ProtectedRoute from "@components/ProtectedRoute";

const NewProfile = () => {

	return (
		<div>
			<ProtectedRoute>
				<DashboardProfile />
			</ProtectedRoute>
		</div>
	);
};

export default NewProfile;
