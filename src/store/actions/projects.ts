import baseAPI from '@store/api';

const projectsEndpoints = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    createProject: builder.mutation<any, FormData>({
      query: (body) => ({
        url: '/api/projects',
        method: 'POST',
        body
      }),
      invalidatesTags: ['projects'],
    }),
    getProjects: builder.query<any, void>({
      query: () => ({
        url: '/api/projects',
        method: 'GET',
      }),
      providesTags: ['projects'],
    }),
    getSingleProject: builder.query<any, string>({
      query: (projectId) => ({
        url: `/api/projects/${projectId}/`,
        method: 'GET',
      }),
    }),
    getCategories: builder.query<any, void>({
      query: () => ({ url: '/api/categories', method: 'GET' }),
    }),
  }),
});

export const { useGetProjectsQuery, useGetSingleProjectQuery,useGetCategoriesQuery,useCreateProjectMutation } =
  projectsEndpoints;
