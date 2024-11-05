import baseAPI from "@store/api";

const UserEndpoints = baseAPI.injectEndpoints({
	endpoints: (builder) => ({
		getUsers: builder.query<any, void>({
			query: () => ({
				url: "/api/users",
				method: "GET",
			}),
			providesTags: ["users"],
		}),
	}),
});

export const { useGetUsersQuery } =
	UserEndpoints;
