import type { Middleware, MiddlewareAPI } from '@reduxjs/toolkit';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { PERSIST_KEY } from '@utils/constants';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import appReducer, { clearToken } from './reducers/app';
import baseAPI from './api';
import routes from '@utils/routes';

const rootReducer = combineReducers({
  [baseAPI.reducerPath]: baseAPI.reducer,
  appReducer,
});

const persistConfig = {
  key: PERSIST_KEY,
  version: 1,
  storage,
  blacklist: [baseAPI.reducerPath, 'userReducer'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const rtkQueryErrorLogger: Middleware = (api: MiddlewareAPI) => (next) => (action:any) => {
  if (action?.payload?.status === 401) {
    api.dispatch(baseAPI.util.resetApiState())
      api.dispatch(clearToken())
      window.location.href = routes.login.url + `?redirectTo=${window.location.pathname}`
    return next(action)
  }

  return next(action)
}

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseAPI.middleware,rtkQueryErrorLogger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
