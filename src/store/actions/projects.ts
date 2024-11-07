import baseAPI from "@store/api";

const projectsEndpoints = baseAPI.injectEndpoints({
	endpoints: (builder) => ({
		getProjects: builder.query<any, void>({
			query: () => ({
				url: "/api/projects",
				method: "GET",
			}),
			providesTags: ["projects"],
		}),
		addProject: builder.mutation<any, any>({
			query: (body: any) => ({
				url: "/api/projects",
				method: "POST",
				body,
			}),
			invalidatesTags: ["projects"],
		}),
	}),
});

export const { useGetProjectsQuery, useAddProjectMutation } = projectsEndpoints;
