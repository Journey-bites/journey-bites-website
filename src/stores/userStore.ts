import jsCookie from 'js-cookie';
import { createStore } from 'zustand/vanilla';
import { devtools } from 'zustand/middleware';
import { toast } from '@/components/ui/use-toast';
import { JOURNEY_BITES_COOKIE } from '@/constants';
import { getUser } from '@/lib/authApi';
import { handleApiError } from '@/lib/utils';
import { UserInfo } from '@/types';
import StatusCode from '@/types/StatusCode';

export type UserState = {
  isLogin: boolean | null,
  auth: UserInfo | null
};

export type UserActions = {
  removeAuth: () => void,
  setAuth: () => void,
}

export type UserStore = UserState & UserActions

export const defaultInitState: UserState = {
  isLogin: null,
  auth: null
};

export const createUserStore = (
  initState: UserState = defaultInitState,
) => {
  return createStore<UserStore>()(devtools((set, get) => ({
    ...initState,
    setAuth: async () => {
      const userCookie = jsCookie.get(JOURNEY_BITES_COOKIE);
      if (userCookie) {
        try {
          const auth = await getUser();
          set((state) => ({ ...state, auth, isLogin: true }));
        } catch (error) {
          handleApiError(error, {
            [StatusCode.USER_NOT_FOUND]: () => {
              toast({ title: '找不到您的帳號資料', description: '請重新登入', variant: 'error' });
            }
          }, '查詢使用者資料');
          get().removeAuth();
        }
      } else {
        get().removeAuth();
      }
    },
    removeAuth: () => {
      set((state) => ({ ...state, isLogin: false, auth: null }));
      jsCookie.remove(JOURNEY_BITES_COOKIE);
    },
  })));
};