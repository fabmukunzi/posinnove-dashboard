'use server';

import { cookies } from 'next/headers';

export const setCookie = async (cookie: string, value: string) => {
  const cookieStore = cookies();
  cookieStore.set(cookie, value);
};