import AdminLayout from '@layout/adminLayout'
import React, { useState } from 'react'
import { Avatar, Pagination, Space, Table, Tag, Dropdown, Menu, Button } from 'antd';
import { Download, ScanEye, Trash, UserRoundPlus } from 'lucide-react';
import { UserOutlined, DownOutlined } from '@ant-design/icons';
import { useGetSubscriptionQuery } from '@store/actions/subscription';

const { Column } = Table;

interface DataType {
  key: React.Key;
  names: string;
  createdAt: string;
  updatedAt: number;
  email: string;
}

const Index = () => {
  const [pageSize, setPageSize] = useState(7);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page: number, pageSize: number) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  const { data, isLoading } = useGetSubscriptionQuery();
  console.log(data);
  return (
    <AdminLayout>
      <div className='mb-4 flex justify-between items-center'>
        <span className='text-[#585E71] text-lg font-semibold'>Subscription ({data?.data.subscribers.length})</span>
        <div className='flex gap-4'>
          <Button type='dashed' className='bg-white text-slate-800'><Download />Export</Button>
          <Button><UserRoundPlus />New Subscriber</Button>
        </div>
      </div>
      <div>
        <Table<DataType>
          dataSource={data?.data.subscribers}
          pagination={{
            current: currentPage,
            pageSize: pageSize,
            total: data?.data.subscribers.length,
            onChange: handlePageChange,
          }}
          loading={isLoading}
          rowKey="key"
        >
          <Column
            title="Name"
            key="name"
            render={(record: DataType|any) => (
              <Space>
                <Avatar
                  src={record.profileImage}
                  icon={<UserOutlined />}
                  alt={`${record.names}`}
                />
                {`${record.names}`}
              </Space>
            )}
          />
          <Column title="Email" dataIndex="email" key="email" />
          <Column
            title="Action"
            key="action"
            render={(_: any, record: DataType) => (
              <Space size="middle">
                <ScanEye className="text-primary" />
                <Trash className="text-red-500" />
              </Space>
            )}
          />
        </Table>
      </div>
    </AdminLayout>
  )
}

export default Index
