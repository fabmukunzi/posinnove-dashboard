import { icons } from '@utils/icons';
import { Avatar, Button, Image, Typography } from 'antd';
import React from 'react';
import { User } from 'lucide-react';
import Link from 'next/link';
import routes from '@utils/routes';

function PersonalCard({ project }: { project: any }) {
  return (
    <Link
      href={routes.projects.url + '/' + project?.id}
      className="border border-borderColor h-56 rounded-md  bg-surface flex"
    >
      <div
        className="w-[50%] bg-blue-100 rounded-l-md p-2"
        style={{
          backgroundImage: `url(${project.coverImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div
          style={{
            backgroundColor:
              project.level === 'Beginner'
                ? '#CF9B4C'
                : project.level === 'Intermediate'
                ? '#336940'
                : project.level === 'Advanced'
                ? '#A12626'
                : 'white',
          }}
          className="p-1 px-4 text-surface w-fit rounded-xl"
        >
          <span>{project.level}</span>
        </div>
      </div>
      <div className="w-[50%] p-4 flex flex-col justify-between gap-2">
        <h3 className="text-lg font-semibold leading-4">{project.title}</h3>
        <Typography.Paragraph ellipsis={{ rows: 7 }} className="text-xs">
          {project.projectContent}
        </Typography.Paragraph>
        {/* <div className="flex gap-4">
          {project?.technologies?.map((tech: any, index: any) => (
            <div className="flex items-center gap-1" key={tech.key}>
              <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
              <span className="text-xs">{tech}</span>
            </div>
          ))}
        </div> */}
        {/* <Link href={routes.projects.url+"/"+project?.id}>
		<Button className="rounded-xl h-8">See details</Button>
		</Link> */}
        <div className="flex flex-wrap items-center gap-2">
          {project?.projectAuthor?.profileImage ? (
            <Image
              preview={false}
              width={35}
              height={35}
              className="border border-primary rounded-full"
              src={project?.projectAuthor?.profileImage}
              alt="diamond"
            />
          ) : (
            <Avatar icon={<User />}>{project?.projectAuthor?.lastName}</Avatar>
          )}
          <span className="font-semibold">
            {project?.projectAuthor?.lastName}
          </span>
        </div>
      </div>
    </Link>
  );
}

export default PersonalCard;
