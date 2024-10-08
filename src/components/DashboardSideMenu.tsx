import decodeToken from '@utils/auth/decodeUser';
import { Menu } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { IoSettingsSharp } from 'react-icons/io5';
import { LiaClipboardListSolid } from 'react-icons/lia';
import {
  MdOutlineDashboard,
  MdOutlineLibraryBooks,
  MdOutlineWorkOutline,
} from 'react-icons/md';
import { VscFolderLibrary } from 'react-icons/vsc';

const DashboardSideMenu = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        const user = decodeToken(token);
        setLoggedInUser(user);
        console.log(loggedInUser, 'loooooooooog');
      }
    }
  }, [loggedInUser]);
  const { pathname } = useRouter();

  const menuItems = [
    {
      label: (
        <Link href="" className="flex items-center gap-2">
          <MdOutlineDashboard className="text-3xl" /> Dashboard
        </Link>
      ),
      key: '',
    },
    {
      label: (
        <Link href="/my-projects" className="flex items-center gap-2">
          <VscFolderLibrary className="text-3xl" /> My Projects
        </Link>
      ),
      key: '/my-projects',
    },
    {
      label: (
        <Link href="/opportunities" className="flex items-center gap-2">
          <MdOutlineWorkOutline className="text-3xl" /> Opportunities
        </Link>
      ),
      key: '/opportunities',
    },
    {
      label: (
        <Link href="/my-experience" className="flex items-center gap-2">
          <MdOutlineLibraryBooks className="text-3xl" />
          My Experience
        </Link>
      ),
      key: '/my-experience',
    },
    {
      label: (
        <Link href="/settings" className="flex items-center gap-2">
          <IoSettingsSharp className="text-3xl" />
          Settings
        </Link>
      ),
      key: '/settings',
    },
    {
      label: (
        <Link href="/user-guide" className="flex items-center gap-2">
          <LiaClipboardListSolid className="text-3xl" />
          User Guide
        </Link>
      ),
      key: '/user-guide',
    },
  ];

  return (
    <div className="!text-primary h-full pt-5 bg-[#f7f8fb]">
      <Menu
        mode="inline"
        selectedKeys={[pathname]}
        className="flex flex-col space-y-10 h-full bg-[#f7f8fb]"
        items={menuItems.map((item) => ({
          ...item,
          className: `flex items-center p-4 text-primary ${
            pathname === item.key
              ? 'bg-[#d6e1fc] text-primary'
              : 'hover:bg-[#d6e1fc]'
          }`,
        }))}
      />
    </div>
  );
};

export default DashboardSideMenu;
