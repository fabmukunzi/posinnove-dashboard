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
	}),
});

export const { useGetProjectsQuery } = projectsEndpoints;
