import { Button } from 'antd';
import Image from 'next/image';
import React from 'react';

function PendingCard({ project }: { project: any }) {
    // Calculate total tasks
    const totalTasks = project.status.completed + project.status.underReview + project.status.onprogress + project.status.backlog + project.status.notStarted;

    // Calculate percentages and remove decimals
    const completedPercentage = Math.floor((project.status.completed / totalTasks) * 100);
    const underReviewPercentage = Math.floor((project.status.underReview / totalTasks) * 100);
    const onProgressPercentage = Math.floor((project.status.onprogress / totalTasks) * 100);
    const backlogPercentage = Math.floor((project.status.backlog / totalTasks) * 100);

    return (
        <div className='border border-borderColor w-full sm:w-1/2 lg:w-1/3 rounded-xl bg-surface p-4'>
            <div className='leading-2'>
                <div className='p-5'>
                    <div>
                        <h1 className='text-lg font-bold'>{project.title}</h1>
                        <div className='w-32 h-0.5 bg-primary' />
                    </div>

                    {/* Task Details */}
                    <div className='flex flex-col gap-2'>
                        {/* Task Done */}
                        <div className='flex justify-between'>
                            <div className='flex items-center gap-2'>
                                <div className='w-3 h-3 rounded-full bg-[#1375F6]'></div>
                                <p className='font-semibold'>Task Done</p>
                            </div>
                            <p className='font-semibold'>{project.status.completed}</p>
                        </div>

                        {/* Under Review */}
                        <div className='flex justify-between'>
                            <div className='flex items-center gap-2'>
                                <div className='w-3 h-3 rounded-full bg-[#EEB765]'></div>
                                <p className='font-semibold'>Under Review</p>
                            </div>
                            <p className='font-semibold'>{project.status.underReview}</p>
                        </div>

                        {/* On Progress */}
                        <div className='flex justify-between'>
                            <div className='flex items-center gap-2'>
                                <div className='w-3 h-3 rounded-full bg-[#336940]'></div>
                                <p className='font-semibold'>On-Progress</p>
                            </div>
                            <p className='font-semibold'>{project.status.onprogress}</p>
                        </div>

                        {/* Backlog */}
                        <div className='flex justify-between'>
                            <div className='flex items-center gap-2'>
                                <div className='w-3 h-3 rounded-full bg-[#D9D9D9]'></div>
                                <p className='font-semibold'>Backlog</p>
                            </div>
                            <p className='font-semibold'>{project.status.backlog}</p>
                        </div>
                    </div>
                </div>

                {/* Task Progress Bar */}
                <div className='mx-5 my-2 w-[80%]'>
                    <div className='w-full flex justify-end'>
                        <h2 className='text-md font-bold'>{completedPercentage + underReviewPercentage + onProgressPercentage}%</h2>
                    </div>
                    <div className='bg-zinc-300 h-2 rounded-full flex overflow-hidden'>
                        <div className='bg-[#1375F6] rounded-full' style={{ width: `${completedPercentage}%` }}></div>
                        <div className='bg-[#EEB765] rounded-r-full' style={{ width: `${underReviewPercentage}%` }}></div>
                        <div className='bg-[#336940] rounded-r-full' style={{ width: `${onProgressPercentage}%` }}></div>
                        <div className='bg-[#D9D9D9] rounded-r-full' style={{ width: `${backlogPercentage}%` }}></div>
                    </div>
                </div>

                {/* Next Task */}
                <div className='bg-[#c7dcf07b] w-full'>
                    <p className='text-lg w-full px-5 py-2'>
                        <span className='font-bold text-lg'>Next Task:</span> <span>{project.nextTask}</span>
                    </p>
                </div>

                {/* Company and Button */}
                <div className='flex justify-between items-center px-5 py-2'>
                    <div className='flex gap-2 items-center'>
                        <Image src={project.campany.logo} alt={project.campany.name} />
                        <span>{project.campany.name}</span>
                    </div>
                    <Button className='rounded-2xl'>Go to Project</Button>
                </div>
            </div>
        </div>
    );
}

export default PendingCard;
