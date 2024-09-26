import React from 'react';
import { projects as myProjects } from '@utils/dummy-data';
import PickedProjectCard from './picked-project-card';
import { Empty } from 'antd';

function PersonalSelected({ category }: { category: string }) {
    // Filter projects by category
    const filteredProjects = myProjects.filter(project => project.category === category);

    return (
        <div className='flex justify-center'>
            <div className='custom-scrollbar flex flex-wrap gap-2 justify-center w-fit h-96 overflow-auto'>
                {filteredProjects.length > 0 ? (
                    filteredProjects.map((project, index) => (
                        <PickedProjectCard key={index} project={project} />
                    ))
                ) : (
                        <Empty />
                )}
            </div>
        </div>
    );
}

export default PersonalSelected;
