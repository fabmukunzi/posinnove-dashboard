import CurrentsProjects from "@components/projects/currentsProjects";
import PersonalProjects from "@components/projects/personalProject";
import Picked from "@components/projects/picked";
import DashboardLayout from "@layout/DashboardLayout";
// import DashboardLayout from '@layoutLayout';

const index = () => {
	return (
		<DashboardLayout>
			<CurrentsProjects />
			<PersonalProjects />
			<Picked />
		</DashboardLayout>
	);
};

export default index;
