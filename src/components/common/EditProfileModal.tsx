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
import {
  useUpdateProfileMutation,
  useGetProfileQuery,
} from '@store/actions/auth';

interface EditProfileModalProps {
  visible: boolean;
  toggleModal: () => void;
}

const EditProfileModal = ({ visible, toggleModal }: EditProfileModalProps) => {
  const { data: profileData, isLoading: isProfileLoading } = useGetProfileQuery(
    {}
  );
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

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
      const formData = new FormData();
      Object.keys(values).forEach((key) => formData.append(key, values[key]));
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
        message: 'Profile update failed',
        description: error.message,
      });
    }
  };

  return (
    <Modal
      open={visible}
      onCancel={toggleModal}
      footer={null}
      className="w-[60%]"
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
            <Form.Item name="About" label="Bio" className="w-full">
              <Input.TextArea placeholder="Add bio" rows={4} />
            </Form.Item>
          </div>

          <Form.Item>
            <div className="flex justify-end gap-4">
              <Button onClick={toggleModal}>Cancel</Button>
              <Button
                type="primary"
                htmlType="submit"
                loading={isLoading || isProfileLoading}
              >
                {isLoading || isProfileLoading ? 'Updating...' : 'Update'}
              </Button>
            </div>
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
};

export default EditProfileModal;
