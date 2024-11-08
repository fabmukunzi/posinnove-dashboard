import DashboardProfile from '@components/profile';
import ProtectedRoute from '@components/ProtectedRoute';
import DashboardLayout from '@layout/DashboardLayout';
import { useGetProfileQuery } from '@store/actions/auth';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Profile = () => {
  const { data } = useGetProfileQuery({});
  const router = useRouter();

  useEffect(() => {
    if (!data) {
      router.push('/login');
    }
  }, [data, router]);
  return (
    <div>
      <ProtectedRoute>
        {/* <ProfileComponent /> */}
        <DashboardProfile />
      </ProtectedRoute>
    </div>
  );
};

export default Profile;
