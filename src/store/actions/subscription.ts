import baseAPI from "@store/api";

const subscriptionEndpoints = baseAPI.injectEndpoints({
	endpoints: (builder) => ({
		getSubscription: builder.query<any, void>({
			query: () => ({
				url: "/api/subscribe",
				method: "GET",
			}),
			providesTags: ["subscription"],
		}),
	}),
});

export const { useGetSubscriptionQuery } =subscriptionEndpoints;
