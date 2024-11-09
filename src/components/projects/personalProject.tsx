import { Carousel } from "antd";
import React, { useEffect, useState } from "react";
import PersonalCard from "./personal-card";
import { useRouter } from "next/router";
import { useGetProjectsQuery } from "@store/actions/projects";
import HashLoader from "react-spinners/HashLoader";

const PersonalProjects = () => {
	const [chunkSize, setChunkSize] = useState(3);
	const { data: projects = [], isLoading, isError } = useGetProjectsQuery();

	const router = useRouter();
	const { pathname } = router;
	const links = ["/projects"];

	const onChange = (currentSlide: number) => {
		console.log(currentSlide);
	};

	const updateChunkSize = () => {
		if (window.innerWidth < 768) {
			setChunkSize(1);
		} else if (window.innerWidth < 1024) {
			setChunkSize(2);
		} else {
			setChunkSize(3);
		}
	};

	useEffect(() => {
		updateChunkSize();
		window.addEventListener("resize", updateChunkSize);
		return () => window.removeEventListener("resize", updateChunkSize);
	}, []);

	const chunkProjects = (projects: any[], size: number) => {
		const chunks = [];
		for (let i = 0; i < projects?.length; i += size) {
			chunks.push(projects?.slice(i, i + size));
		}
		return chunks;
	};

	const pro = [];

	const projectChunks = chunkProjects(
		projects?.data?.projects || [],
		chunkSize
	);
	const isProject = links.includes(pathname);

	if (isError) return <div>Error loading projects</div>;

	return (
		<div className="px-4 md:px-10 w-full">
			{isLoading ? (
				<div className="w-full h-[80vh] items-center justify-center flex flex-col">
					<HashLoader color="#091e6a" />
				</div>
			) : (
				<>
					<h1 className="text-3xl font-semibold py-5 px-10">
						{isProject ? "Projects" : "Personally Picked for You"}
					</h1>
					{projects?.data?.projects?.length === 0 ? (
						<div className="text-center text-xl py-10">
							No projects available
						</div>
					) : (
						<Carousel afterChange={onChange} dotPosition="bottom">
							{projectChunks.map((chunk, index) => (
								<div
									key={index}
									className="flex flex-col md:flex-row justify-between gap-5"
								>
									{chunk.map((project, idx) => (
										<PersonalCard key={idx} project={project} />
									))}
								</div>
							))}
						</Carousel>
					)}
				</>
			)}
		</div>
	);
};

export default PersonalProjects;
