import { icons } from '@utils/icons'
import { Button } from 'antd'
import Image from 'next/image'
import React from 'react'

const PickedProjectCard = ({ project }: any) => {
  return (
    <div className={`border border-borderColor w-full md:w-80 h-fit min-h-[40vh] justify-between rounded-xl bg-surface flex flex-col p-4 gap-4 md:gap-2`}>
      <div className='flex items-center justify-between'>
        <div
          style={{
            backgroundColor: project.level === 'Beginner' ? '#CF9B4C' :
              project.level === 'Intermediate' ? '#336940' :
                project.level === 'Advanced' ? '#A12626' :
                  'white'
          }}
          className="p-1 px-4 text-surface w-fit rounded-lg"
        >
          <span>{project.level}</span>
        </div>
        <span className='text-xs md:text-sm font-bold'>02 Aug, 2024</span>
      </div>

      <h3 className='text-sm md:text-lg font-bold leading-5 md:leading-4'>
        {project.title}
      </h3>

      <div className='flex items-center gap-2'>
        <Image src={icons.diamond} alt="diamond" />
        <span className='text-xs md:text-sm font-semibold'>
          Simba Trust Companies
        </span>
      </div>

      <p className='text-xs md:text-sm'>{project.description}</p>

      <div className='grid grid-cols-2 gap-2'>
        {project.technologies.map((tech: any, index: any) => (
          <div className='flex items-center gap-1' key={tech.key}>
            <div className='w-2 h-2 bg-yellow-600 rounded-full'></div>
            <span className='text-xs md:text-sm'>{tech}</span>
          </div>
        ))}
      </div>

      <div className='flex gap-2 justify-between mt-2'>
        <div className='flex gap-2'>
          <div className='border border-borderColor flex justify-center items-center rounded-lg px-2 w-8 h-8'>
            <Image src={icons.share} alt="share icon" />
          </div>
          <div className='border border-borderColor flex justify-center items-center rounded-lg px-2 w-8 h-8'>
            <Image src={icons.bookmark} alt="bookmark icon" />
          </div>
        </div>
        <Button className='rounded-xl h-8 text-xs md:text-sm'>See details</Button>
      </div>
    </div>
  )
}

export default PickedProjectCard
