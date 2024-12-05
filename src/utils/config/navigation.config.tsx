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
    { key: routes.home.url, icon: <LayoutDashboard className="mt-2 "/>, label: 'Dashboard' },
    { key: routes.projects.url, icon: <FolderOpenDot className="mt-2 "/>, label: 'Projects' },
    { key: '/login', icon: <LogOut className="mt-2 "/>, label: 'Logout', onClick: () => Cookies.remove('access_token') },
  ],
  instructor: [
    { key: routes.home.url, icon: <LayoutDashboard className="mt-2 "/>, label: 'Dashboard' },
    { key: routes.projects.url, icon: <FolderOpenDot className="mt-2 "/>, label: 'Projects' },
    { key: '/logout', icon: <LogOut className="mt-2 "/>, label: 'Logout', onClick: () => Cookies.remove('access_token') },
  ],
  admin: [
    { key: routes.home.url, icon: <LayoutDashboard className="mt-2 "/>, label: 'Dashboard' },
    { key: routes.projects.url, icon: <FolderOpenDot className="mt-2 "/>, label: 'Projects' },
    { key: routes.members.url, icon: <Users className="mt-2 "/>, label: 'Members' },
    { key: routes.subscription.url, icon: <Siren className="mt-2 "/>, label: 'Subscription' },
    { key: routes.setting.url, icon: <Settings className="mt-2 "/>, label: 'Settings' },
    { key: '/logout', icon: <LogOut className="mt-2 "/>, label: 'Logout',  onClick: () => Cookies.remove('access_token') },
  ],
};
