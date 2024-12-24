import { useState } from 'react';
import EditProfileModal from '@components/common/EditProfileModal';
import { useGetProfileQuery } from '@store/actions/auth';
import { RootState } from '@store/index';
import { useSelector } from 'react-redux';
import { defaultProfileImage } from '@utils/profileDataUtils';
import { useGetUserInterestsQuery } from '@store/actions/interest';
import { useGetUserExpertisesQuery } from '@store/actions/expertises';
import { Button, Image, notification, Typography } from 'antd';
import { Copy, Mail, Pen, Phone } from 'lucide-react';
import Link from 'next/link';
import Loader from '@components/common/loader';
import { TagGroup, Tag } from 'rsuite';

const ProfileComponent = () => {
  const [openEditModal, setOpenEditModal] = useState(false);
  const toggleEditModal = () => {
    setOpenEditModal(!openEditModal);
  };

  const { token } = useSelector((state: RootState) => state.appReducer);

  const { data: profile, isLoading: profileLoading } = useGetProfileQuery(
    {},
    { skip: !token }
  );

  const { data: interests, isLoading } = useGetUserInterestsQuery(
    profile?.data?.id
  );

  const { data } = useGetUserExpertisesQuery(profile?.data?.id);

  const expertises = data?.data;

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
      {profileLoading && <Loader />}
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
                className={`!w-[120px] !h-[120px] bg-white object-cover rounded-full border-4 border-primary`}
              />
            </div>
          </div>
        </div>
        <div className="flex mt-20 w-full gap-4">
          <div className="p-4 w-[50%] border border-primary rounded-xl">
            <h1 className="text-primary font-bold text-xl">About Me</h1>
            {profile?.data?.about && profile?.data?.about?.length > 0 ? (
              <div className="mt-4 h-[220px] overflow-y-auto">
                <Typography.Paragraph>
                  {profile?.data?.about}
                </Typography.Paragraph>
              </div>
            ) : (
              <div className="text-lg flex items-center h-[80%] gap-2 text-black/50">
                Please add bio
              </div>
            )}
          </div>
          <div className="w-full">
            <div className="w-full p-2 px-3 border border-primary rounded-lg flex flex-col gap-4 h-[48%]">
              <h1 className="text-primary font-semibold text-xl">Interests</h1>
              <TagGroup>
                {interests?.data?.length > 0 ? (
                  interests.data.map((interest: any, index: number) => (
                    <Tag className="bg-[#091F92] text-white" key={index}>
                      {interest?.name}
                    </Tag>
                  ))
                ) : (
                  <p className="text-lg text-center text-black/50">
                    No interests yet
                  </p>
                )}
              </TagGroup>
            </div>

            <div className="w-full p-2 px-3 mt-2 border rounded-lg border-primary flex flex-col gap-4 h-[48%]">
              <h1 className="text-primary font-semibold text-xl">Expertises</h1>
              <TagGroup>
                {expertises?.length > 0 ? (
                  expertises?.map((expertise: any, index: number) => (
                    <Tag className="bg-[#091F92] text-white" key={index}>
                      {expertise?.name}
                    </Tag>
                  ))
                ) : (
                  <p className="text-lg text-center text-black/50">
                    No expertises yet
                  </p>
                )}
              </TagGroup>
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
      <EditProfileModal
        profileData={profile}
        interests={interests?.data}
        visible={openEditModal}
        toggleModal={toggleEditModal}
        expertises={expertises?.data}
      />
    </div>
  );
};

export default ProfileComponent;
