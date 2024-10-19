'use server';

import { cookies } from 'next/headers';

export const setCookie = async (cookie: string, value: string) => {
  const cookieStore = cookies();


  cookieStore.set('myCookie', 'cookieValue', {
    path: '/',
    maxAge: 60 * 60 * 24, // 1 day
  });
};