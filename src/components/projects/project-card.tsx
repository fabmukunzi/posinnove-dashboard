import routes from '@utils/routes';
import { Image, Avatar, Card, Typography } from 'antd';
import dayjs from 'dayjs';
import { Flag, User } from 'lucide-react';
import Link from 'next/link';
import { FC } from 'react';

const ProjectCard: FC<{ project: any }> = ({ project }: { project: any }) => {
  return (
    <Link href={routes.projects.url + '/' + project?.id}>
      <Card
        hoverable
        size="small"
        className="min-h-[26rem] max-h-[26rem] rounded-lg  bg-surface"
      >
        <div className="!h-[50%] relative">
          <Image
            preview={false}
            src={project?.coverImage}
            alt="Project cover"
            className="w-[25rem] h-[16rem] object-cover rounded-md"
          />
          <p className='absolute top-3 right-3 bg-primary text-white border-2 border-primary rounded-lg text-xs px-2 py-1'>{project?.level}</p>
        </div>
        <div className="border border-[#e1e0e0] rounded-lg p-2 mt-1">
          <div className="flex justify-between my-1">
            <h3 className="text-base font-semibold leading-4">
              {project?.title}
            </h3>
            <div className="flex items-center gap-1 mx-4">
              <Flag size={15} color="red" />
              <p className="text-xs font-semibold">
                {dayjs(project?.deadline).format('YYYY MMM D')}
              </p>
            </div>
          </div>
          <Typography.Paragraph ellipsis={{ rows: 2 }} className="text-xs mt-2">
            {project?.projectContent}
          </Typography.Paragraph>
          <div className="flex flex-wrap items-center gap-2">
            {project?.projectAuthor?.profileImage ? (
              <Image
                preview={false}
                width={30}
                height={30}
                className="border border-primary rounded-full"
                src={project?.projectAuthor?.profileImage}
                alt="Profile Image"
              />
            ) : (
              <Avatar icon={<User size={20} />}>
                {project?.projectAuthor?.lastName}
              </Avatar>
            )}
            <span className="font-semibold text-xs">
              {project?.projectAuthor?.lastName}{' '}
              {project?.projectAuthor?.firstName}
            </span>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default ProjectCard;
