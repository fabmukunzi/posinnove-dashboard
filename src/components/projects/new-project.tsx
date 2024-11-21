import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import {
  useCreateProjectMutation,
  useGetCategoriesQuery,
} from '@store/actions/projects';
import {
  Button,
  DatePicker,
  Form,
  Input,
  Modal,
  notification,
  Select,
  Space,
  Upload,
  UploadFile,
} from 'antd';
import React, { FC, useState } from 'react';

interface MenuItem {
  value: string;
  label: string;
}

const items: MenuItem[] = [
  { value: 'Beginner', label: 'Beginner' },
  { value: 'Intermediate', label: 'Intermediate' },
  { value: 'Advanced', label: 'Advanced' },
];

type ModalProps = {
  close: () => void;
  open: boolean;
};

enum ProjectAttendes {
  TEN = 10,
  TWENTY = 20,
  THIRTY = 30,
  FORTY = 40,
  FIFTY = 50,
  SIXTY = 60,
}

const NewProject: FC<ModalProps> = ({ open, close }) => {
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [pdfFileList, setPdfFileList] = useState<UploadFile[]>([]);
  const [createProject] = useCreateProjectMutation();
  const [step1Data, setStep1Data] = useState<any>({});

  const [form] = Form.useForm();

  const { data, isLoading } = useGetCategoriesQuery();
  const projectCategories = data?.data?.projectCategories?.map(
    (category: any) => ({
      value: category?.id,
      label: category.projectCategory,
    })
  );

  const projectAttendance = Object.entries(ProjectAttendes)
    .filter(([key]) => isNaN(Number(key)))
    .map(([key, value]) => ({
      value,
      label: key,
    }));

  const handleNext = async (values: any) => {
    const formData = new FormData();

    if (step === 1) {
      try {
        await form.validateFields();
        setStep1Data(values);

        setStep(2);
      } catch (error: any) {
        notification.error({
          message: error?.message || 'Something went wrong',
        });
      }
    } else {
      setLoading(true);
      for (const [key, value] of Object.entries(step1Data)) {
        formData.append(key, value as string);
      }

      try {
        pdfFileList.forEach((file) => {
          formData.append('uploads', file.originFileObj as Blob);
        });
        formData.append('coverImage', fileList[0].originFileObj as Blob);
        await createProject(formData);
        notification.success({ message: 'Project created successfully' });
        close();
        setFileList([])
        setPdfFileList([])
        form.resetFields()
      } catch (error: any) {
        notification.error({
          message: error?.error || error?.message || 'Something went wrong',
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const handleFileChange: any = ({ fileList: newFileList }: any) => {
    setFileList(newFileList);
  };

  const handlePdfFileChange: any = ({ fileList: newPdfFileList }: any) => {
    setPdfFileList(newPdfFileList);
  };

  const renderModalContent = () => {
    if (step === 1) {
      return (
        <Form
          form={form}
          onFinish={handleNext}
          layout="vertical"
          className="flex flex-col gap-4"
        >
          <div className="flex justify-between gap-2">
            <Form.Item
              name="title"
              rules={[
                { required: true, message: 'Please enter a project name' },
              ]}
              className="w-[50%]"
            >
              <Input
                className="bg-[#F9F9F9] border-2 border-[#0000003c]"
                placeholder="Project Name"
              />
            </Form.Item>
            <Form.Item
              name="projectCategoryId"
              rules={[{ required: true, message: 'Please select a category' }]}
              className="w-[50%]"
            >
              <Select
                placeholder="Project category"
                className="h-9 border-2 border-[#0000003c] rounded-md"
                options={projectCategories}
                disabled={isLoading}
              />
            </Form.Item>
          </div>
          <div className="flex justify-between gap-2">
            <Form.Item
              name="level"
              label="Project Level"
              rules={[{ required: true, message: 'Please select a level' }]}
              className="w-[50%]"
            >
              <Select
                placeholder="Project Level"
                className="border-2 border-[#0000003c] rounded-md h-9"
                options={items}
              />
            </Form.Item>
            <Form.Item
              name="maxAttendances"
              label="Max.Attendees"
              rules={[{ required: true, message: 'Please select attendees' }]}
              className="w-[50%]"
            >
              <Select
                placeholder="Max.Attendees"
                className="border-2 border-[#0000003c] rounded-md h-9"
                options={projectAttendance}
              />
            </Form.Item>
          </div>
          <div className="flex justify-between gap-2">
            <Form.Item
              name="startDate"
              label="Start Date"
              rules={[
                { required: true, message: 'Please select a start date' },
              ]}
              className="w-[50%]"
            >
              <DatePicker className="border-2 border-[#0000003c] py-1.5 bg-[#F9F9F9] w-full" />
            </Form.Item>
            <Form.Item
              name="deadline"
              label="Deadline"
              rules={[{ required: true, message: 'Please select a deadline' }]}
              className="w-[50%]"
            >
              <DatePicker className="border-2 border-[#0000003c] py-1.5 bg-[#F9F9F9] w-full" />
            </Form.Item>
          </div>
          <Form.Item
            label="Description"
            name="projectContent"
            rules={[
              { required: true, message: 'Please enter a description' },
              {
                min: 10,
                message: 'Description must be at least 10 characters',
              },
            ]}
          >
            <Input.TextArea className="bg-[#F9F9F9] h-32 border-2 border-[#0000003c]" />
          </Form.Item>
        </Form>
      );
    } else if (step === 2) {
      return (
        <div className="flex flex-col gap-4">
          <div>
            <Space>Upload Cover Image</Space>
            <Upload
              listType="picture-card"
              fileList={fileList}
              onChange={handleFileChange}
            >
              {fileList.length >= 1 ? null : (
                <Button
                  style={{ border: 0, background: 'none', color: '#0000003c' }}
                  icon={<PlusOutlined className="text-primary" />}
                >
                  Upload
                </Button>
              )}
            </Upload>
          </div>
          <div className="mt-4">
            <Space>Upload PDF Files</Space>
            <Upload
              listType="text"
              fileList={pdfFileList}
              onChange={handlePdfFileChange}
              accept=".pdf"
            >
              {pdfFileList.length >= 3 ? null : (
                <Button
                  style={{ border: 0, background: 'none', color: '#0000003c' }}
                  icon={<UploadOutlined />}
                >
                  Upload
                </Button>
              )}
            </Upload>
          </div>
        </div>
      );
    }
  };

  return (
    <Modal
      title="Create New Project"
      open={open}
      onCancel={close}
      footer={
        step === 1
          ? [
              <Button
                key="next"
                type="primary"
                onClick={() => handleNext(form.getFieldsValue())}
              >
                Next
              </Button>,
            ]
          : [
              <Button key="back" onClick={() => setStep(1)}>
                Back
              </Button>,
              <Button
                key="submit"
                type="primary"
                loading={loading}
                onClick={handleNext}
              >
                Submit
              </Button>,
            ]
      }
    >
      {renderModalContent()}
    </Modal>
  );
};

export default NewProject;
