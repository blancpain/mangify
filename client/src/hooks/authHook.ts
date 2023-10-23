import { useEffect } from 'react';
import { useAuthCheckMutation } from '@/features/api';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { setUser, logout, selectUser } from '@/stores';

export const useAuth = () => {
  const [authCheck, { isLoading, isUninitialized, isSuccess }] = useAuthCheckMutation();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(selectUser);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const userData = await authCheck().unwrap();
        dispatch(setUser(userData));
      } catch (_err) {
        dispatch(logout());
      }
    };
    verifyUser();
  }, [authCheck, dispatch]);

  return {
    isLoading,
    isUninitialized,
    isSuccess,
    user,
  };
};
