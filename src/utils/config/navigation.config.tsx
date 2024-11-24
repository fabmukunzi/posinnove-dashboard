import routes from '@utils/routes';
import Cookies from 'js-cookie';
import {
  FolderOpenDot,
  LayoutDashboard,
  LogOut,
  Settings,
  Siren,
  Users,
} from 'lucide-react';

export const navigationConfig: Record<
  string,
  { key: string; label: string; icon: JSX.Element,onClick?: () => void }[]
> = {
  learner: [
    { key: routes.home.url, icon: <LayoutDashboard />, label: 'Dashboard' },
    { key: routes.projects.url, icon: <FolderOpenDot />, label: 'Projects' },
    { key: '/login', icon: <LogOut />, label: 'Logout', onClick: () => Cookies.remove('access_token') },
  ],
  instructor: [
    { key: routes.home.url, icon: <LayoutDashboard />, label: 'Dashboard' },
    { key: routes.projects.url, icon: <FolderOpenDot />, label: 'Projects' },
    { key: '/logout', icon: <LogOut />, label: 'Logout', onClick: () => Cookies.remove('access_token') },
  ],
  admin: [
    { key: routes.home.url, icon: <LayoutDashboard />, label: 'Dashboard' },
    { key: routes.projects.url, icon: <FolderOpenDot />, label: 'Projects' },
    { key: routes.members.url, icon: <Users />, label: 'Members' },
    { key: routes.subscription.url, icon: <Siren />, label: 'Subscription' },
    { key: routes.setting.url, icon: <Settings />, label: 'Settings' },
    { key: '/logout', icon: <LogOut />, label: 'Logout', onClick: () => Cookies.remove('access_token') },
  ],
};
