import { useMemo, useState } from 'react';
import {
  Form,
  Input,
  Select,
  Button,
  Upload,
  notification,
  Modal,
  Avatar,
  Typography,
} from 'antd';
import { FaCloudUploadAlt } from 'react-icons/fa';
import countryList from 'react-select-country-list';
import { defaultProfileImage } from '@utils/profileDataUtils';
import { useUpdateProfileMutation } from '@store/actions/auth';
import {
  useGetInterestsQuery,
  useAddUserInterestMutation,
} from '@store/actions/interest';
import { useAddUserExpertiseMutation, useGetExpertisesQuery } from '@store/actions/expertises';

interface EditProfileModalProps {
  visible: boolean;
  toggleModal: () => void;
  profileData: any;
  interests: any;
  expertises:any;
}

const EditProfileModal = ({
  visible,
  toggleModal,
  profileData,
  interests,
  expertises
}: EditProfileModalProps) => {
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();
  const { data, isLoading: loadingInterests } = useGetInterestsQuery();
  const { data:expertisesData, isLoading: loadingExpertises } = useGetExpertisesQuery();
  const [addUserInterest, { isLoading: addInterestLoading }] =
    useAddUserInterestMutation();
    const [addUserExpertise, { isLoading: addExpertiseLoading }] =
    useAddUserExpertiseMutation();

  const interestsOptions = data?.data?.map((item: any) => ({
    label: item?.name,
    value: item?.id,
  }));
  const userInterests = interests?.map((item: any) => ({
    label: item?.name,
    value: item?.id,
  }));

  const safeInterestsOptions = Array.isArray(interestsOptions)
    ? interestsOptions
    : [];
  const safeUserInterests = Array.isArray(userInterests) ? userInterests : [];

  const combinedOptions = [
    ...safeInterestsOptions,
    ...safeUserInterests.filter(
      (userInterest) =>
        !safeInterestsOptions.some((option) => option.id === userInterest.id)
    ),
  ];

  const expertiseOptions = expertisesData?.data?.map((item: any) => ({
    label: item?.name,
    value: item?.id,
  }));
  const userExpertises = expertises?.map((item: any) => ({
    label: item?.name,
    value: item?.id,
  }));

  const safeExpertisesOptions = Array.isArray(expertiseOptions)
    ? expertiseOptions
    : [];
  const safeUserExpertises = Array.isArray(userExpertises) ? userExpertises : [];

  const combinedExpertiseOptions = [
    ...safeExpertisesOptions,
    ...safeUserExpertises.filter(
      (userInterest) =>
        !safeExpertisesOptions.some((option) => option.id === userInterest.id)
    ),
  ];

  const [form] = Form.useForm();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const options = useMemo(() => countryList().getData(), []);

  const handleImageChange = (info: any) => {
    const file = info.fileList[0]?.originFileObj;
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onFinish = async (values: any) => {
    try {
      await addUserInterest({
        body: values?.interests,
        userId: profileData?.data?.id,
      }).unwrap();
      await addUserExpertise({
        body: values?.expertises,
        userId: profileData?.data?.id,
      }).unwrap();
      const formData = new FormData();
      Object.keys(values).forEach((key) => {
        if (key !== 'interests' && key !== 'expertises') {
          formData.append(key, values[key]);
        }
      });
      if (selectedImage) {
        formData.append('profileImage', selectedImage);
      }

      await updateProfile(formData).unwrap();
      form.resetFields();
      setImagePreview(null);
      setSelectedImage(null);
      notification.success({ message: 'Profile updated successfully' });
      toggleModal();
    } catch (error: any) {
      notification.error({
        message:
          error?.data?.error || error?.data?.message || 'Profile update failed',
      });
    }
  };

  return (
    <Modal
      open={visible}
      onCancel={toggleModal}
      footer={null}
      className="w-[60%] bg-black"
      title={
        <Typography.Title level={4} className="font-semibold">
          Edit Profile
        </Typography.Title>
      }
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={profileData?.data}
        onFinish={onFinish}
        className="flex gap-10 p-4"
      >
        <div className="relative mb-6">
          <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200 relative mx-auto">
            <Avatar
              src={
                imagePreview ||
                profileData?.data.profileImage ||
                defaultProfileImage
              }
              size="large"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <Upload
            beforeUpload={() => false}
            onChange={handleImageChange}
            showUploadList={false}
            className="w-full flex justify-center mt-4"
          >
            <Button
              icon={<FaCloudUploadAlt />}
              className="flex items-center gap-2"
            >
              Upload Image
            </Button>
          </Upload>
        </div>

        <div className="w-full">
          <div className="flex w-full gap-4">
            <Form.Item
              name="username"
              label="Username"
              className="w-full"
              rules={[{ required: true, message: 'Username is required' }]}
            >
              <Input placeholder="Username" />
            </Form.Item>

            <Form.Item
              name="firstName"
              label="First Name"
              className="w-full"
              rules={[{ required: true, message: 'First Name is required' }]}
            >
              <Input placeholder="First Name" />
            </Form.Item>
          </div>

          <div className="flex w-full gap-4">
            <Form.Item
              name="lastName"
              label="Last Name"
              className="w-full"
              rules={[{ required: true, message: 'Last Name is required' }]}
            >
              <Input placeholder="Last Name" />
            </Form.Item>

            <Form.Item
              name="gender"
              label="Gender"
              className="w-full"
              rules={[{ required: true, message: 'Gender is required' }]}
            >
              <Select placeholder="Select Gender" size="large">
                <Select.Option value="male">Male</Select.Option>
                <Select.Option value="female">Female</Select.Option>
              </Select>
            </Form.Item>
          </div>

          <div className="flex w-full gap-4">
            <Form.Item name="phone" label="Phone" className="w-full">
              <Input placeholder="Phone" />
            </Form.Item>

            <Form.Item name="country" label="Country" className="w-full">
              <Select
                showSearch
                size="large"
                options={options}
                placeholder="Country"
              />
            </Form.Item>
          </div>
          <div className="flex w-full gap-4">
            <Form.Item
              name="interests"
              label="Interests"
              className="w-full"
              initialValue={userInterests}
            >
              <Select
                placeholder="Select your Interests"
                size="large"
                options={combinedOptions}
                mode="tags"
                disabled={loadingInterests}
              />
            </Form.Item>

            <Form.Item name="expertises" label="Expertises" className="w-full">
              <Select
                placeholder="Select your Expertises"
                size="large"
                options={interestsOptions}
                mode="tags"
                disabled={loadingExpertises}
              />
            </Form.Item>
          </div>
          <div className="flex w-full gap-4">
            <Form.Item name="About" label="Bio" className="w-full">
              <Input.TextArea placeholder="Add bio" rows={4} />
            </Form.Item>
          </div>

          <Form.Item>
            <div className="flex justify-end gap-4">
              <Button onClick={toggleModal}>Cancel</Button>
              <Button type="primary" htmlType="submit">
                {addInterestLoading || isLoading ? 'Updating...' : 'Update'}
              </Button>
            </div>
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
};

export default EditProfileModal;
