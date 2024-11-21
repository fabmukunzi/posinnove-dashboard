import AdminLayout from '@layout/adminLayout';
import { useGetSingleProjectQuery } from '@store/actions/projects';
import { Avatar, Button, Card, Image, notification, Typography } from 'antd';
import dayjs from 'dayjs';
import { ExternalLink, Flag, Share, User } from 'lucide-react';
import { useParams } from 'next/navigation';
import React from 'react';
import { HashLoader } from 'react-spinners';

const SingleProject = () => {
  const params = useParams();
  const { data, isLoading } = useGetSingleProjectQuery(
    params?.projectId?.toString(),
    {
      skip: !params?.projectId?.toString(),
    }
  );
  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(location.href)
      .then(() => {
        notification.success({ message: 'Project link copied successfully' });
      })
      .catch((err) => {
        notification.error({ message: 'Project link cannot be copied' });
      });
  };
  return (
    <div className="w-full">
      {isLoading ? (
        <div className="w-full h-[80vh] items-center justify-center flex flex-col">
          <HashLoader color="#091e6a" />
        </div>
      ) : (
        <>
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
                <div className="flex justify-between my-4">
                  <div className="flex flex-wrap items-center gap-2">
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
                    <span className="font-semibold">
                      {data?.data?.projectAuthor?.lastName}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center gap-1 mx-4">
                      <Flag size={15} color="red" />
                      <p className="text-xs font-semibold">
                        ({dayjs(data?.data?.startDate).format('YYYY MMM D')} -{' '}
                        {dayjs(data?.data?.deadline).format('YYYY MMM D')})
                      </p>
                    </div>
                    <div className="flex mx-4 items-center gap-2 mt-2">
                      <Share className='cursor-pointer' onClick={copyToClipboard} size={18} />
                      <Button icon={<ExternalLink size={15}/>} size="small">
                        Submit Now
                      </Button>
                    </div>
                  </div>
                </div>
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
              <Typography.Title level={3} className="font-semibold">
                Project Uploads
              </Typography.Title>
              {data?.data?.uploads?.map((upload: string) => (
                <embed
                  className="w-full h-[700px] my-8 border-2 border-primary"
                  src={upload}
                  key={upload}
                ></embed>
              ))}
            </div>
          </AdminLayout>
        </>
      )}
    </div>
  );
};

export default SingleProject;
