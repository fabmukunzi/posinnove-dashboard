import Cookies from "js-cookie";
import { Router } from "next/router";

  const logout = () => {
    Cookies.remove('access_token');
  };

const routes = {
  home: {
    label: 'Home',
    url: '/',
    name: 'home',
  },
  profile: {
    label: 'Profile',
    url: '/profile',
    name: 'profile-page',
  },
  projects: {
    label: 'Projects',
    url: '/projects',
    name: 'projects',
  },
  members: {
    label: 'Members',
    url: '/members',
    name: 'members',
  },
  subscription: {
    label: 'Subscriptions',
    url: '/subscriptions',
    name: 'subscriptions',
  },
  setting: {
    label: 'Settings',
    url: '/settings',
    name: 'settings',
  },
  login: {
    label: 'Login',
    url: '/login',
    name: 'login',
    onClick: logout,
  },
};

export default routes;
