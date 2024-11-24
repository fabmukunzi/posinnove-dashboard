import Dashboard from '@components/dashboard/dashboard';
import MyChart from '@components/MyChart';
import AdminLayout from '@layout/adminLayout';
import { RootState } from '@store/index';
import React from 'react';
import { useSelector } from 'react-redux';

const HomePage = () => {
  const userProfile = useSelector((state: RootState) => state.appReducer.userProfile);
  console.log(userProfile?.role);
  
  return (
    <AdminLayout>
      <div>
        {userProfile?.role === 'learner' ? <Dashboard />:<MyChart /> }
      </div>
    </AdminLayout>
  );
};

export default HomePage;
