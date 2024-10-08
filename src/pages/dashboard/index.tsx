import CurrentsProjects from "@components/projects/currentsProjects";
import PersonalProjects from "@components/projects/personalProject";
import Picked from "@components/projects/picked";
import DashboardLayout from "@layout/DashboardLayout";
import React from "react";

const index = () => {
	return (
		<>
			<CurrentsProjects />
			<PersonalProjects />
			<Picked />
		</>
	);
};

export default index;
