import { useState } from 'react';
import EditProfileModal from '@components/common/EditProfileModal';
import { useGetProfileQuery } from '@store/actions/auth';
import { RootState } from '@store/index';
import { useSelector } from 'react-redux';
import { defaultProfileImage } from '@utils/profileDataUtils';
import { useGetInterestQuery } from '@store/actions/interest';
import { useGetExpertiesQuery } from '@store/actions/experties';
import { Button, Image, notification, Tag, Typography } from 'antd';
import { Copy, Mail, Pen, Phone, Plus } from 'lucide-react';
import Link from 'next/link';
import { PlusOutlined } from '@ant-design/icons';

const DashboardProfile = () => {
  const [openEditModal, setOpenEditModal] = useState(false);
  const toggleEditModal = () => {
    setOpenEditModal(!openEditModal);
  };

  const { data: interestData, isLoading } = useGetInterestQuery();
  const fileteredInterest = interestData?.user.interests;

  const { token } = useSelector((state: RootState) => state.appReducer);

  const { data: profile } = useGetProfileQuery({}, { skip: !token });
  const { data } = useGetExpertiesQuery();

  const experties = data?.user?.expertise;

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(location.href + '/' + profile?.data?.username)
      .then(() => {
        notification.success({ message: 'Profile link copied successfully' });
      })
      .catch((err) => {
        notification.error({ message: 'Profile link cannot be copied' });
      });
  };

  return (
    <div className="mt-4">
      <div>
        <div>
          <div className="text-white relative h-60 border-2 bg-gradient-to-r from-[#2348d1] to-primary border-primary rounded-t-[1rem] overflow-hidden">
            <div className="absolute left-56 bottom-4">
              <h1 className="font-semibold text-3xl">{`${profile?.data?.firstName} ${profile?.data?.lastName}`}</h1>
              <div className="flex items-center gap-2">
                <p>@{profile?.data?.username}</p>
                <Copy
                  className="cursor-pointer"
                  onClick={copyToClipboard}
                  size={12}
                />
              </div>
            </div>
            <div className="absolute right-20 bottom-2">
              <h1 className="my-4 font-semibold">Contact Information</h1>
              <div className="flex gap-5">
                {profile?.data?.email && (
                  <Link
                    className="hover:text-white hover:scale-125 transition-all"
                    href={`mailto:${profile?.data?.email}`}
                  >
                    <Mail size={24} />
                  </Link>
                )}
                {profile?.data?.phone && (
                  <Link
                    className="hover:text-white hover:scale-125 transition-all"
                    href={`tel:${profile?.data?.phone}`}
                  >
                    <Phone size={20} />
                  </Link>
                )}
              </div>
            </div>
            <div className="absolute right-4 top-4">
              <Button
                className="border-2"
                title="Edit Profile"
                onClick={toggleEditModal}
                icon={<Pen size={15} />}
              >
                Edit Profile
              </Button>
            </div>
          </div>
          <div className="relative ml-20 top-0">
            <div className="absolute -top-16 overflow-hidden">
              <Image
                src={profile?.data?.profileImage || defaultProfileImage}
                alt="profile_image"
                width={120}
                height={120}
                preview={false}
                loading="lazy"
                className={`!w-[120px] !h-[120px] object-cover rounded-full border-4 border-primary`}
              />
            </div>
          </div>
        </div>
        <div className="flex mt-20 w-full gap-4">
          <div className="p-4 w-[50%] border border-primary rounded-xl">
            <h1 className="text-primary font-bold text-xl">About Me</h1>
            {profile?.data?.About && profile?.data?.About?.length > 0 ? (
              <div className="mt-4 h-[220px] overflow-y-auto">
                <Typography.Paragraph>
                  {profile?.data?.About}
                </Typography.Paragraph>
              </div>
            ) : (
              <div className="text-lg flex items-center gap-2">
                Please add bio
                <button
                  className="text-white rounded-lg text-base px-8 py-1 bg-primary"
                  onClick={toggleEditModal}
                >
                  Add
                </button>
              </div>
            )}
          </div>
          <div className="w-full">
            <div className="w-full p-2 px-3 border border-primary rounded-lg flex flex-col gap-4 h-[48%]">
              <h1 className="text-primary font-semibold text-xl">Interests</h1>
              <div
                className={`${
                  isLoading ? 'grid grid-cols-4' : 'flex flex-row flex-wrap'
                }  gap-1`}
              >
                {fileteredInterest?.length > 0 ? (
                  fileteredInterest?.map((interest: string, index: number) => (
                    <Tag color="#182c78" key={index}>
                      {interest}
                    </Tag>
                  ))
                ) : (
                  <div className="w-full h-full items-center justify-center text-xl mt-4 text-black/50">
                    You have not added interest yet
                  </div>
                )}
                <Tag
                  icon={<PlusOutlined />}
                  className="border-primary text-primary border-dashed"
                  // onClick={showInput}
                >
                  Interest
                </Tag>
              </div>
            </div>
            <div className="w-full p-2 px-3 mt-2 border rounded-lg border-primary flex flex-col gap-4 h-[48%]">
              <h1 className="text-primary font-semibold text-xl">Experties</h1>
              <div
                className={`${
                  isLoading ? 'grid grid-cols-4' : 'flex flex-row flex-wrap'
                }  gap-1`}
              >
                {isLoading ? (
                  [0, 1, 2, 3].map((skel) => (
                    <div
                      key={skel}
                      className="rounded-r-full rounded-l-full border w-full h-8 animate-pulse bg-black/20"
                    ></div>
                  ))
                ) : experties?.length > 0 ? (
                  experties?.map((expert: string, idx: number) => (
                    <div
                      className="px-4 py-1 rounded-full border flex items-center justify-center"
                      key={idx}
                    >
                      {expert}
                    </div>
                  ))
                ) : (
                  <div className="w-full h-full items-center justify-center text-xl mt-4 text-black/50">
                    You have not added experties yet
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* profile */}
        <div className="mt-10">
          <h1 className="text-xl font-semibold text-primary my-2">
            Portifolio
          </h1>
          <div className=" text-black/60 text-2xl border border-dashed rounded py-10 text-center">
            Not participating in any projects yet. Join an experience to access
            projects.
          </div>
        </div>
      </div>
      <EditProfileModal visible={openEditModal} toggleModal={toggleEditModal} />
    </div>
  );
};

export default DashboardProfile;
