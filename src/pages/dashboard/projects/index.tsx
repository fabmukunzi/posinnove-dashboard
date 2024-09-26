import CurrentsProjects from '@components/projects/currentsProjects';
import PendingCard from '@components/projects/pending-card';
import PersonalProjects from '@components/projects/personalProject';
import Picked from '@components/projects/picked';
import { myProjects } from '@utils/dummy-data';
import { Carousel } from 'antd';
import React, { useEffect, useState } from 'react';

function Index() {


  return (
    <>
      <CurrentsProjects />
      <PersonalProjects />
      <Picked />
    </>
  );
}

export default Index;
