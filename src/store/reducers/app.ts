import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { destroyCookie } from 'nookies';

const initialState: { token?: string; userProfile?: any } = {
  token: undefined,
  userProfile: undefined,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string | undefined>) => {
      const { payload } = action;
      state.token = payload;
    },
    clearToken: (state) => {
      state.token = undefined;
      destroyCookie(null, 'access_token', { path: '/' });
    },
    setUserProfile: (state, action: PayloadAction<string | undefined>) => {
      const { payload } = action;
      state.userProfile = payload;
    },
  },
});

export const { setToken, clearToken,setUserProfile } = appSlice.actions;

export default appSlice.reducer;
