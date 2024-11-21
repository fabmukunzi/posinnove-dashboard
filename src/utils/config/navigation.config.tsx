import routes from '@utils/routes';
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
  { key: string; label: string; icon: JSX.Element }[]
> = {
  learner: [
    { key: routes.home.url, icon: <LayoutDashboard />, label: 'Dashboard' },
    { key: routes.projects.url, icon: <FolderOpenDot />, label: 'Projects' },
    { key: '/logout', icon: <LogOut />, label: 'Logout' },
  ],
  instructor: [
    { key: routes.home.url, icon: <LayoutDashboard />, label: 'Dashboard' },
    { key: routes.projects.url, icon: <FolderOpenDot />, label: 'Projects' },
    { key: '/logout', icon: <LogOut />, label: 'Logout' },
  ],
  admin: [
    { key: routes.home.url, icon: <LayoutDashboard />, label: 'Dashboard' },
    { key: routes.projects.url, icon: <FolderOpenDot />, label: 'Projects' },
    { key: routes.members.url, icon: <Users />, label: 'Members' },
    { key: routes.subscription.url, icon: <Siren />, label: 'Subscription' },
    { key: routes.setting.url, icon: <Settings />, label: 'Settings' },
    { key: '/logout', icon: <LogOut />, label: 'Logout' },
  ],
};
