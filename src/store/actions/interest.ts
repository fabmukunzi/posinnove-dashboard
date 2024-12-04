import baseAPI from '@store/api';

const InterestEndpoints = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getInterests: builder.query<any, void>({
      query: () => ({
        url: `/api/users/interests`,
        method: 'GET',
      }),
      providesTags: ['interest'],
    }),
    getUserInterests: builder.query<any, string>({
      query: (userId) => ({
        url: `/api/users/${userId}/interests`,
        method: 'GET',
      }),
      providesTags: ['interest'],
    }),
    addUserInterest: builder.mutation<any, any>({
      query: ({ body, userId }) => ({
        url: `/api/users/${userId}/interests`,
        method: 'POST',
        body: { interestIds: body },
      }),
      invalidatesTags: ['interest'],
    }),
  }),
});

export const {
  useGetInterestsQuery,
  useGetUserInterestsQuery,
  useAddUserInterestMutation,
} = InterestEndpoints;
