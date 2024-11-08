import PersonalProjects from '@components/projects/personalProject';
import Picked from '@components/projects/picked';
import DashboardLayout from '@layout/DashboardLayout';
import React, { useEffect, useState } from 'react';

function Index() {


  return (
    <DashboardLayout>
      <PersonalProjects />
    </DashboardLayout>
  );
}

export default Index;
