import { PlusOutlined } from "@ant-design/icons";
import { Button, DatePicker, Input, Select, Tag, Typography } from "antd";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { IoClose } from "react-icons/io5";
import { MdDragHandle } from "react-icons/md";
import PriviewAddedProject from "./PriviewAddedProject";

const { TextArea } = Input;
const { Title } = Typography;

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

const AddProjectComponent = () => {
	const { handleSubmit, control, getValues, resetField } = useForm();
	const [skills, setSkills] = useState<string[]>([]);
	const [tasks, setTasks] = useState<Task[]>([]);
	const [deliverable, setDeliverable] = useState<File | null>(null);
	const [isPreview, setIsPreview] = useState(false);
	const [projectData, setProjectData] = useState<ProjectData | null>(null);

	const onSubmit = (data: any) => {
		const formattedData = {
			projectName: data.projectName,
			projectLevel: data.projectLevel,
			startDate: data.startDate?.format("YYYY-MM-DD") || "",
			deadline: data.deadline?.format("YYYY-MM-DD") || "",
			objectives: data.objectives,
			skills,
			tasks,
			deliverableName: deliverable?.name || null,
		};
		setProjectData(formattedData);
		setIsPreview(true);
	};

	const addSkill = () => {
		const skill = getValues("skillsInvolved");
		if (skill && !skills.includes(skill)) {
			setSkills((prevSkills) => [...prevSkills, skill]);
			resetField("skillsInvolved");
		}
	};

	const removeSkill = (removedSkill: string) => {
		setSkills((prevSkills) =>
			prevSkills.filter((skill) => skill !== removedSkill)
		);
	};

	const addTask = () => {
		const title = getValues("taskTitle");
		const description = getValues("taskDescription");
		if (title && description) {
			setTasks((prevTasks) => [...prevTasks, { title, description }]);
			resetField("taskTitle");
			resetField("taskDescription");
		}
	};

	const removeTask = (index: number) => {
		setTasks((prevTasks) => prevTasks.filter((_, i) => i !== index));
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file && file.type === "application/pdf") {
			setDeliverable(file);
		} else {
			alert("Please upload a PDF file.");
		}
	};

	const handleBack = () => setIsPreview(false);

	return (
		<div>
			{isPreview && projectData ? (
				<PriviewAddedProject data={projectData} onBack={handleBack} />
			) : (
				<div className="p-6 bg-white rounded-md shadow mt-16">
					<Title level={2} className="text-black/50 mb-4">
						Project Description
					</Title>
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className="mb-4 w-96">
							<Controller
								name="projectName"
								control={control}
								render={({ field }) => (
									<Input
										{...field}
										placeholder="Project Name"
										className="w-full"
									/>
								)}
							/>
						</div>

						<div className="flex gap-4 mb-4">
							<Controller
								name="projectLevel"
								control={control}
								render={({ field }) => (
									<Select
										{...field}
										placeholder="Project Level"
										className="w-full"
									>
										<Select.Option value="beginner">Beginner</Select.Option>
										<Select.Option value="intermediate">
											Intermediate
										</Select.Option>
										<Select.Option value="advanced">Advanced</Select.Option>
									</Select>
								)}
							/>
							<Controller
								name="startDate"
								control={control}
								render={({ field }) => (
									<DatePicker
										{...field}
										placeholder="Start Date"
										className="w-full"
									/>
								)}
							/>
							<Controller
								name="deadline"
								control={control}
								render={({ field }) => (
									<DatePicker
										{...field}
										placeholder="Deadline"
										className="w-full"
									/>
								)}
							/>
						</div>

						<div className="mb-4">
							<Controller
								name="objectives"
								control={control}
								render={({ field }) => (
									<TextArea
										{...field}
										placeholder="Objectives"
										rows={4}
										className="w-full"
									/>
								)}
							/>
						</div>

						<div className="flex items-center gap-4 mb-4">
							<Controller
								name="skillsInvolved"
								control={control}
								render={({ field }) => (
									<Input
										{...field}
										placeholder="Skills involved"
										className="w-full"
									/>
								)}
							/>
							<Button
								onClick={addSkill}
								icon={<PlusOutlined />}
								className="flex items-center"
							/>
						</div>

						<div className="mb-4">
							{skills.map((skill, index) => (
								<Tag
									key={index}
									closable
									onClose={() => removeSkill(skill)}
									className="mb-2"
								>
									{skill}
								</Tag>
							))}
						</div>

						<Title level={4} className="text-black/50 mb-2">
							Tasks
						</Title>
						<div className="flex items-center gap-4 mb-2">
							<Controller
								name="taskTitle"
								control={control}
								render={({ field }) => (
									<Input {...field} placeholder="Title" className="w-full" />
								)}
							/>
							<Controller
								name="taskDescription"
								control={control}
								render={({ field }) => (
									<Input
										{...field}
										placeholder="Description"
										className="w-full"
									/>
								)}
							/>
							<Button
								onClick={addTask}
								icon={<PlusOutlined />}
								className="flex items-center w-20"
							/>
						</div>

						<div className="text-xl">
							{tasks.map((task, index) => (
								<div
									key={index}
									className="task-item flex items-center justify-between border-b border-black p-4"
								>
									<div className="flex gap-4">
										<span>{index + 1}.</span>
										<span>
											{task.title.length > 30
												? `${task.title.slice(0, 30)}...`
												: task.title}
										</span>
										<span>
											{task.description.length > 30
												? `${task.description.slice(0, 30)}...`
												: task.description}
										</span>
									</div>
									<div className="flex items-center gap-2">
										<button
											onClick={() => removeTask(index)}
											className="text-2xl text-black flex items-center justify-center"
										>
											<IoClose />
										</button>
										<button className="drag text-4xl text-black flex items-center justify-center">
											<MdDragHandle />
										</button>
									</div>
								</div>
							))}
						</div>

						<Title level={4} className="text-black/50 mb-2 mt-6">
							Deliverables
						</Title>
						<div className="mb-4">
							<input
								type="file"
								accept="application/pdf"
								onChange={handleFileChange}
								className="w-full"
							/>
							{deliverable && (
								<div className="mt-2">
									Uploaded: {deliverable.name}{" "}
									<Button onClick={() => setDeliverable(null)} type="link">
										Remove
									</Button>
								</div>
							)}
						</div>

						<div className="flex justify-start items-center gap-4 mt-6">
							<Button type="link" className="text-black/70">
								Save as Draft
							</Button>
							<Button type="primary" htmlType="submit" className="font-bold">
								Add project
							</Button>
						</div>
					</form>
				</div>
			)}
		</div>
	);
};

export default AddProjectComponent;
