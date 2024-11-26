import React from 'react';
import RecentProject from './recentProjects';
import { Space, Typography } from 'antd';
import { useGetProjectsQuery } from '@store/actions/projects';
import Loader from '@components/common/loader';

interface ProjectProps {
    title: string;
    startDate: string;
    deadline: string;
}
const Dashboard = () => {
    const { data: projects, isLoading } = useGetProjectsQuery();
    let latestTwoProjects: ProjectProps[] = [];
    if (projects?.data?.projects) {
        const allProjects = projects.data.projects;
        const sortedProjects = [...allProjects].sort(
            (a: any, b: any) =>
                new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        latestTwoProjects = sortedProjects.slice(0, 2);
    } else {
        console.log("No projects found.");
    }

    return (
        <div className='w-full flex flex-col gap-8'>
            <div className="w-full flex flex-col md:flex-row gap-8" style={{ alignItems: 'stretch' }}>
                <Space
                    direction="vertical"
                    className="w-full md:w-1/2 flex-1"
                    style={{ display: 'flex', flexDirection: 'column' }} // Stretch vertically
                >
                    <Typography.Text className="text-lg font-semibold text-primary">
                        Recent Projects
                    </Typography.Text>
                    <div className="bg-white min-h-44 p-3 rounded-xl w-full flex-1 flex flex-col">
                        <Space className="w-full flex justify-end mb-2">
                            <Typography.Text className="text-xs border-2 border-borderColor px-2 rounded-full bg-slate-200 text-primary">
                                All Projects
                            </Typography.Text>
                        </Space>
                        <Space direction="vertical" className="w-full flex-1">
                            {isLoading ? <Loader /> : latestTwoProjects?.map((project: ProjectProps, index: number) => (
                                <RecentProject
                                    key={index}
                                    title={project.title}
                                    startDate={project.startDate}
                                    deadline={project.deadline}
                                />                            
                            ))}
                        </Space>
                    </div>
                </Space>

                <Space
                    direction="vertical"
                    className="w-full md:w-1/2 flex-1"
                    style={{ display: 'flex', flexDirection: 'column' }} // Stretch vertically
                >
                    <Typography.Text className="text-lg font-semibold text-primary">
                        Upcoming Events
                    </Typography.Text>
                    <div className="bg-white p-3 rounded-xl w-full flex-1 flex flex-col min-h-44 justify-center items-center">
                        <Typography.Text className="text-xm text-primary">
                            No events scheduled.
                        </Typography.Text>
                    </div>
                </Space>
            </div>
            <Space
                direction="vertical"
                className="w-full flex-1"
                style={{ display: 'flex', flexDirection: 'column' }} // Stretch vertically
            >
                <Typography.Text className="text-lg font-semibold text-primary">
                    Completed Projects 
                </Typography.Text>
                <div className="bg-white p-3 rounded-xl w-full flex-1 flex flex-col min-h-44 justify-center items-center">
                    <Typography.Text className="text-xm text-primary">
                        You have no Completed project.
                    </Typography.Text>
                </div>
            </Space>
        </div>
    );
};

export default Dashboard;
