import baseAPI from '@store/api';

const projectsEndpoints = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
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
  }),
});

export const { useGetProjectsQuery, useGetSingleProjectQuery } =
  projectsEndpoints;
