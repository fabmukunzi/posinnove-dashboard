import AdminLayout from '@layout/adminLayout';
import React, { useState } from 'react';
import { Avatar, Pagination, Space, Table, Tag, Dropdown, Menu, Button } from 'antd';
import { Download, ScanEye, Trash, UserRoundPlus } from 'lucide-react';
import { useGetUsersQuery } from '@store/actions/user';
import { UserOutlined, DownOutlined } from '@ant-design/icons';

const { Column } = Table;

interface DataType {
    key: React.Key;
    firstName: string;
    lastName: string;
    age: number;
    address: string;
    role: string;
    status: string;
    profileImage?: string;
}

const Index = () => {
    const [pageSize, setPageSize] = useState(7);
    const [currentPage, setCurrentPage] = useState(1);

    const handlePageChange = (page: number, pageSize: number) => {
        setCurrentPage(page);
        setPageSize(pageSize);
    };

    const handleStatusChange = (status: string, record: DataType) => {
        console.log(`Changing status of ${record.firstName} ${record.lastName} to ${status}`);
    };

    const { data, isLoading } = useGetUsersQuery();
    console.log(data);

    return (
        <AdminLayout>
            <div className='mb-4 flex justify-between items-center'>
                <span className='text-[#585E71] text-lg font-semibold'>Users ({data?.users.length})</span>
                <div className='flex gap-4'>
                    <Button type='dashed' className='bg-white text-slate-800'><Download />Export</Button>
                    <Button><UserRoundPlus />Add member</Button>
                </div>
            </div>
            <div>
                <Table<DataType>
                    dataSource={data?.users}
                    pagination={{
                        current: currentPage,
                        pageSize: pageSize,
                        total: data?.users.length,
                        onChange: handlePageChange,
                    }}
                    loading={isLoading}
                    rowKey="key"
                >
                    <Column
                        title="Name"
                        key="name"
                        render={(record: DataType) => (
                            <Space>
                                <Avatar
                                    src={record.profileImage}
                                    icon={<UserOutlined />}
                                    alt={`${record.firstName} ${record.lastName}`}
                                />
                                {`${record.firstName} ${record.lastName}`}
                            </Space>
                        )}
                    />
                    <Column title="Email" dataIndex="email" key="email" />
                    <Column title="Gender" dataIndex="gender" key="gender" />
                    <Column
                        title="Role"
                        dataIndex="role"
                        key="role"
                        filters={[
                            { text: 'Admin', value: 'admin' },
                            { text: 'Instructor', value: 'instructor' },
                            { text: 'Learn', value: 'learn' },
                        ]}
                        onFilter={(value, record) => record.role === value}
                        render={(role: string) => (
                            <Tag color={role === 'admin' ? 'geekblue' : role === 'instructor' ? 'gold' : 'green'} key={role}>
                                {role ? role.toUpperCase() : 'UNKNOWN'}
                            </Tag>
                        )}
                    />
                    <Column
                        title="Status"
                        dataIndex="status"
                        key="status"
                        render={(status: string, record: DataType) => {
                            const menu = (
                                <Menu
                                    onClick={({ key }) => handleStatusChange(key, record)}
                                    items={[
                                        { label: 'Active', key: 'Active' },
                                        { label: 'Inactive', key: 'Inactive' },
                                    ]}
                                />
                            );

                            return (
                                <Dropdown overlay={menu} trigger={['click']}>
                                    <Tag color={status ? 'red' : 'green'} style={{ cursor: 'pointer' }}>
                                        {status?"Inactivate":"Active"} <DownOutlined />
                                    </Tag>
                                </Dropdown>
                            );
                        }}
                    />
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
    );
};

export default Index;
