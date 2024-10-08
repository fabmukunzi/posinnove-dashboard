import { Carousel } from 'antd'
import React, { useEffect, useState } from 'react'
import { projects as myProjects } from '@utils/dummy-data';
import PersonalCard from './personal-card';
import { useRouter } from 'next/router';

const PersonalProjects = () => {
    const [chunkSize, setChunkSize] = useState(3);
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
        window.addEventListener('resize', updateChunkSize);
        return () => window.removeEventListener('resize', updateChunkSize); // Cleanup event listener
    }, []);

    const chunkProjects = (projects: any[], size: number) => {
        const chunks = [];
        for (let i = 0; i < projects.length; i += size) {
            chunks.push(projects.slice(i, i + size));
        }
        return chunks;
    };
    const projectChunks = chunkProjects(myProjects, chunkSize);
    const router = useRouter();
    const { pathname } = router;
    const links = ['/dashboard/projects'];

    const isProject = links.includes(pathname);

    
    return (
        <div className='px-4 md:px-10 w-full'>
            <h1 className='text-3xl font-semibold py-5 px-10'>{isProject ? "Projects" :"Personally Picked for You"}</h1>
            <Carousel afterChange={onChange} dotPosition='bottom'>
                {projectChunks.map((chunk, index) => (
                    <div key={index} className='flex flex-col md:flex-row justify-between gap-5'>
                        {chunk.map((project, idx) => (
                            <PersonalCard key={idx} project={project} />
                        ))}
                    </div>
                ))}
            </Carousel>
        </div>
    )
}

export default PersonalProjects
