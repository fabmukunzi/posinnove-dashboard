import MyChart from '@components/MyChart';
import AdminLayout from '@layout/adminLayout';
import React from 'react';

const HomePage = () => {
  return (
    <AdminLayout>
      <div>
        <MyChart />
      </div>
    </AdminLayout>
  );
};

export default HomePage;
