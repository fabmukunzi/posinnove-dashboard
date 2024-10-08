import baseAPI from "@store/api";

const InterestEndpoints = baseAPI.injectEndpoints({
	endpoints: (builder) => ({
		getInterest: builder.query<any, void>({
			query: () => ({
				url: "/api/interests",
				method: "GET",
			}),
			providesTags: ["interest"],
		}),
		addInterest: builder.mutation<any, any>({
			query: (body: any) => ({
				url: "/api/interests",
				method: "POST",
				body,
			}),
			invalidatesTags: ["interest"],
		}),
	}),
});

export const { useGetInterestQuery, useAddInterestMutation } =
	InterestEndpoints;
