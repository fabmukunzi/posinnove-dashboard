import AdminLayout from '@layout/adminLayout';
import { useGetSingleProjectQuery } from '@store/actions/projects';
import { Avatar, Card, Image, Typography } from 'antd';
import { User } from 'lucide-react';
import { useParams } from 'next/navigation';
import React from 'react';

const SingleProject = () => {
  const params = useParams();
  console.log(params?.projectId);
  const { data } = useGetSingleProjectQuery(params?.projectId?.toString(), {
    skip: !params?.projectId?.toString(),
  });
  console.log(data);
  return (
    <AdminLayout>
      <div className="flex md:flex-row flex-col gap-10">
        <Card
          bordered
          size="small"
          className="md:w-[50%] rounded-md object-cover border border-primary h-[500px] overflow-hidden p-0"
          cover={
            <Image
              className="w-full h-full"
              src={data?.data?.coverImage}
              alt={data?.data?.title}
            />
          }
        />
        <div className="overflow-y-scroll overflow-x-hidden h-[500px] md:w-[50%]">
          <Typography.Title className="font-semibold" level={3}>
            Project : {data?.data?.title}
          </Typography.Title>
          <Typography.Paragraph>
            {data?.data?.projectContent}
          </Typography.Paragraph>
        </div>
      </div>
      <div className="mt-5">
        {/* <div>
          {data?.data?.projectAuthor?.profileImage ? (
            <Image
              preview={false}
              width={35}
              height={35}
              className="border border-primary rounded-full"
              src={data?.data?.projectAuthor?.profileImage}
              alt="diamond"
            />
          ) : (
            <Avatar icon={<User />}>
              {data?.data?.projectAuthor?.lastName}
            </Avatar>
          )}
          {data?.data?.projectAuthor?.lastName +
            ' ' +
            data?.data?.projectAuthor?.firstName}
        </div> */}
        <Typography.Title level={3} className='font-semibold'>Project Uploads</Typography.Title>
        {data?.data?.uploads?.map((upload: string) => (
          <embed className='w-full h-[700px] my-8 border-2 border-primary' src={upload} key={upload}></embed>
        ))}
      </div>
    </AdminLayout>
  );
};

export default SingleProject;
