import { Button, Typography, notification } from "antd";
import { useRouter } from "next/router";

const { Title, Paragraph } = Typography;

interface Task {
	title: string;
	description: string;
}

interface ProjectData {
	projectName: string;
	projectLevel: string;
	startDate: string;
	deadline: string;
	objectives: string;
	skills: string[];
	tasks: Task[];
	deliverableName: string | null;
}

interface ProjectPreviewProps {
	data: ProjectData;
	onBack: () => void;
}

const PriviewAddedProject: React.FC<ProjectPreviewProps> = ({
	data,
	onBack,
}) => {
	const router = useRouter();

	const handleContinue = () => {
		notification.success({
			message: "Project Submitted",
			description: "Your project has been successfully submitted.",
			duration: 3,
		});
		setTimeout(() => {
			router.push("/projects");
		}, 3000);
	};

	return (
		<div className="p-6 bg-white rounded-md shadow mt-16">
			<Title level={2}>Project Preview</Title>
			<Paragraph>
				<strong>Project Name:</strong> {data.projectName}
			</Paragraph>
			<Paragraph>
				<strong>Level:</strong> {data.projectLevel}
			</Paragraph>
			<Paragraph>
				<strong>Start Date:</strong> {data.startDate}
			</Paragraph>
			<Paragraph>
				<strong>Deadline:</strong> {data.deadline}
			</Paragraph>
			<Paragraph>
				<strong>Objectives:</strong> {data.objectives}
			</Paragraph>
			<Paragraph>
				<strong>Skills Involved:</strong> {data.skills.join(", ")}
			</Paragraph>
			<Title level={4}>Tasks</Title>
			<ul>
				{data.tasks.map((task, index) => (
					<li key={index}>
						<strong>{task.title}:</strong> {task.description}
					</li>
				))}
			</ul>
			<Paragraph>
				<strong>Deliverable:</strong>{" "}
				{data.deliverableName || "No file uploaded"}
			</Paragraph>
			<div className="flex gap-4 mt-4">
				<Button onClick={onBack} type="default">
					Back to Edit
				</Button>
				<Button onClick={handleContinue} type="primary">
					Continue
				</Button>
			</div>
		</div>
	);
};

export default PriviewAddedProject;
