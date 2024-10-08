import baseAPI from "@store/api";

const expertiesEndpoints = baseAPI.injectEndpoints({
	endpoints: (builder) => ({
		getExperties: builder.query<any, void>({
			query: () => ({
				url: "/api/expertises",
				method: "GET",
			}),
			providesTags: ["expertise"],
		}),
		addExperties: builder.mutation<any, any>({
			query: (body: any) => ({
				url: "/api/expertises",
				method: "POST",
				body,
			}),
			invalidatesTags: ["expertise"],
		}),
	}),
});

export const { useGetExpertiesQuery, useAddExpertiesMutation } =
	expertiesEndpoints;
