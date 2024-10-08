import { icons } from '@utils/icons';
import { Button } from 'antd';
import Image from 'next/image';
import React from 'react';
import { simba } from "@utils/images";

function PersonalCard({ project }: { project: any }) {
    return (
        <div className='border border-borderColor w-1/3 h-56 max-md:w-1/2 rounded-xl bg-surface flex'>
            <div
                className='w-[40%] bg-blue-100 rounded-l-xl p-2'
                style={{ backgroundImage: `url(${simba.src})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            >
                <div
                    style={{
                        backgroundColor: project.level === 'Beginner' ? '#CF9B4C' :
                            project.level === 'Intermediate' ? '#336940' :
                                project.level === 'Advanced' ? '#A12626' :
                                    'white'
                    }}
                    className="p-1 px-4 text-surface w-fit rounded-xl"
                >
                    <span>{project.level}</span>
                </div>
            </div>
            <div className='w-[60%] p-4 flex flex-col justify-between gap-2'>
                <h3 className='text-lg font-bold leading-4'>{project.title}</h3>
                <p className='text-xs'>{project.description}</p>
                <div className='flex gap-4'>
                    {project.technologies.map((tech: any, index: any) => (
                        <div className='flex items-center gap-1' key={tech.key}>
                            <div className='w-2 h-2 bg-yellow-600 rounded-full'></div>
                            <span className='text-xs'>{tech}</span>
                        </div>
                    ))}
                </div>
                <div className='flex gap-2 justify-end'>
                    <div className=' border border-borderColor flex justify-center items-center rounded-lg px-2 w-8 h-8'>
                        <Image src={icons.share} alt="project image" />
                    </div>
                    <div className='border border-borderColor flex justify-center items-center rounded-lg px-2 w-8 h-8'>
                        <Image src={icons.bookmark} alt="project image" />
                    </div>
                    <Button className='rounded-xl h-8'>See details</Button>
                </div>
                <div className='flex items-center gap-2'>
                    <Image src={icons.diamond} alt="diamond" />
                    <span className='font-semibold'>Simba Trust Companies</span>
                </div>
            </div>
        </div>
    );
}

export default PersonalCard;
