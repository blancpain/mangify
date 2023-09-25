import { createApi } from '@reduxjs/toolkit/query/react';
import {
  ShowCaseRecipe,
  TMealGeneratorLandingSchema,
  TSignUpSchema,
  NonSensitiveUser,
  LoggedUser,
  TLoginSchema,
} from '@shared/types';
import { baseQueryWithReauth } from '@/lib';

export const mangifyApi = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  endpoints: (build) => ({
    generateShowcaseMeals: build.mutation<ShowCaseRecipe[], TMealGeneratorLandingSchema>({
      query: ({ numberOfMeals, diet }) => ({
        url: `/meal-generator-showcase/?numberOfMeals=${numberOfMeals}&type=${diet}`,
        method: 'GET',
      }),
    }),
    registerUser: build.mutation<NonSensitiveUser, TSignUpSchema>({
      query: ({ ...user }) => ({
        url: '/users',
        method: 'POST',
        body: user,
      }),
    }),
    login: build.mutation<LoggedUser, TLoginSchema>({
      query: ({ ...user }) => ({
        url: '/session/login',
        method: 'POST',
        body: user,
      }),
    }),
    authCheck: build.mutation<LoggedUser, void>({
      query: () => ({
        url: `/session/auth-check`,
        method: 'GET',
      }),
    }),
    logout: build.mutation<void, void>({
      query: () => '/session/logout',
    }),
  }),
});

export const {
  useGenerateShowcaseMealsMutation,
  useRegisterUserMutation,
  useLoginMutation,
  useLogoutMutation,
  useAuthCheckMutation,
} = mangifyApi;
