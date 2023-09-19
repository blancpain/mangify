import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  RecipeList,
  TMealGeneratorLandingSchema,
  TSignUpSchema,
  NonSensitiveUser,
  LoggedUser,
  TLoginSchema,
} from '@shared/types';

export const mangifyApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3001/api/',
    credentials: 'same-origin',
    mode: 'cors',
  }),
  endpoints: (build) => ({
    generateShowcaseMeals: build.query<RecipeList, TMealGeneratorLandingSchema>({
      query: ({ numberOfMeals, diet }) =>
        `/meal-generator-showcase/?number=${numberOfMeals}?dietType=${diet}`,
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
    logout: build.mutation({
      query: () => '/session/logout',
    }),
  }),
});

export const {
  useGenerateShowcaseMealsQuery,
  useRegisterUserMutation,
  useLoginMutation,
  useLogoutMutation,
} = mangifyApi;
