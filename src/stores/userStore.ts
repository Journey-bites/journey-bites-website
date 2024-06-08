import { JOURNEY_BITES_COOKIE } from '@/constants';
import { UserInfo } from '@/types';
import jsCookie from 'js-cookie';
import { createStore } from 'zustand/vanilla';

export type UserState = {
  isLogin: boolean | null,
  auth: UserInfo | null
};

export type UserActions = {
  removeAuth: () => void,
  setAuth: (userInfo: UserInfo) => void,
}

export type UserStore = UserState & UserActions

export const defaultInitState: UserState = {
  isLogin: null,
  auth: null
};

export const createUserStore = (
  initState: UserState = defaultInitState,
) => {
  return createStore<UserStore>()((set) => ({
    ...initState,
    setAuth: (userInfo: UserInfo) => {
      const userCookie = jsCookie.get(JOURNEY_BITES_COOKIE);
      if (userCookie) {
        set((state) => ({ ...state, auth: userInfo, isLogin: true }), true);
      }
    },
    removeAuth: () => {
      set((state) => ({ ...state, isLogin: false, auth: null }));
      jsCookie.remove(JOURNEY_BITES_COOKIE);
    },
  }));
};