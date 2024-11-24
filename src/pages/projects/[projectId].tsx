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
            <div className="mx-auto w-[90%]">
              <div className="flex justify-between mb-5">
                <div>
                  <Typography.Title className="font-semibold my-0" level={3}>
                    Project : {data?.data?.title}
                  </Typography.Title>
                  <div className="flex flex-wrap items-center gap-2 my-2">
                    {data?.data?.projectAuthor?.profileImage ? (
                      <Image
                        preview={false}
                        width={30}
                        height={30}
                        className="border border-primary rounded-full"
                        src={data?.data?.projectAuthor?.profileImage}
                        alt="diamond"
                      />
                    ) : (
                      <Avatar icon={<User />}>
                        {data?.data?.projectAuthor?.lastName}
                      </Avatar>
                    )}
                    <div className="flex flex-col">
                      <span className="font-semibold  leading-none	">
                        {data?.data?.projectAuthor?.lastName}
                      </span>
                      <span className="font-semibold text-xs text-[#737373] leading-4">
                        @{data?.data?.projectAuthor?.lastName}
                      </span>
                    </div>
                  </div>
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
                    {/* <Share
                      className="cursor-pointer"
                      onClick={copyToClipboard}
                      size={20}
                    /> */}
                    <Button icon={<ExternalLink size={15} />} block>
                      Submit Now
                    </Button>
                  </div>
                </div>
              </div>
              <div className="">
                <Image
                  className="w-[1100px] object-cover h-[30rem] my-6"
                  src={data?.data?.coverImage}
                  alt={data?.data?.title}
                />
              </div>
              <div className="overflow-x-hidden">
                <Typography.Paragraph>
                  {data?.data?.projectContent}
                </Typography.Paragraph>
              </div>
            </div>
            <div className="mt-5 mx-auto w-[90%]">
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
