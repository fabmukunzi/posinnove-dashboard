import { Space, Typography } from 'antd';
import { FolderOpenDot } from 'lucide-react';
import React from 'react';

interface ProjectProps {
    title: string;
    startDate: string;
    deadline: string;
}

const RecentProject: React.FC<ProjectProps> = ({ title, startDate, deadline }) => {
    return (
        <div className="p-2 border-2 border-borderColor rounded-xl w-full flex items-start">
            <div>
                <FolderOpenDot size={35} strokeWidth={1} />
            </div>
            <div className="flex flex-col items-start pl-4">
                <Typography.Text className="font-semibold">{title}</Typography.Text>
                <Typography.Text className="text-xs">
                    {new Date(startDate).toLocaleDateString()} - {new Date(deadline).toLocaleDateString()}
                </Typography.Text>
            </div>
        </div>
    );
};

export default RecentProject;
