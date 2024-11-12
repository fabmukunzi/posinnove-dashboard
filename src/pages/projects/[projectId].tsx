import AdminLayout from '@layout/adminLayout';
import { useGetSingleProjectQuery } from '@store/actions/projects';
import { useParams } from 'next/navigation';
import React from 'react';

const SingleProject = () => {
  const params = useParams();
  console.log(params?.projectId);
  const { data } = useGetSingleProjectQuery(params?.projectId?.toString(), {
    skip: !params?.projectId?.toString(),
  });
  console.log(data);
  return (
    <AdminLayout>
      <div>SingleProject</div>
    </AdminLayout>
  );
};

export default SingleProject;
