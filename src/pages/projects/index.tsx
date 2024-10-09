import DashboardHeader from '@components/DashboardHeader';
import CurrentsProjects from '@components/projects/currentsProjects';
import PendingCard from '@components/projects/pending-card';
import PersonalProjects from '@components/projects/personalProject';
import Picked from '@components/projects/picked';
import DashboardLayout from '@layout/DashboardLayout';
import { myProjects } from '@utils/dummy-data';
import { Carousel } from 'antd';
import React, { useEffect, useState } from 'react';

function Index() {


  return (
    <DashboardLayout>
      <PersonalProjects />
    </DashboardLayout>
  );
}

export default Index;