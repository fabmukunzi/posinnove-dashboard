import baseAPI from "@store/api";

const expertiesEndpoints = baseAPI.injectEndpoints({
	endpoints: (builder) => ({
		getExpertises: builder.query<any, void>({
		  query: () => ({
			url: `/api/users/expertises`,
			method: 'GET',
		  }),
		  providesTags: ['expertise'],
		}),
		getUserExpertises: builder.query<any, string>({
		  query: (userId) => ({
			url: `/api/users/${userId}/expertises`,
			method: 'GET',
		  }),
		  providesTags: ['expertise'],
		}),
		addUserExpertise: builder.mutation<any, any>({
		  query: ({ body, userId }) => ({
			url: `/api/users/${userId}/expertises`,
			method: 'POST',
			body: { interestIds: body },
		  }),
		  invalidatesTags: ['expertise'],
		}),
	  }),
});

export const { useGetExpertisesQuery, useAddUserExpertiseMutation, useGetUserExpertisesQuery } =
	expertiesEndpoints;
