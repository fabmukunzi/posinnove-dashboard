import baseAPI from "@store/api";

const userEndpoints = baseAPI.injectEndpoints({
	endpoints: (builder) => ({
		login: builder.mutation<any, any>({
			query: (body: any) => ({
				url: "/api/users/login",
				method: "POST",
				body,
			}),
		}),
		signup: builder.mutation<any, any>({
			query: (body) => ({
				url: "/api/users/signup",
				method: "POST",
				body,
			}),
		}),
		forgotPassword: builder.mutation<any, any>({
			query: (body) => ({
				url: "/api/users/forgetpassword",
				method: "POST",
				body,
			}),
		}),
		resetPassword: builder.mutation<any, { token: string; password: string }>({
			query: ({ token, password }) => ({
				url: `/api/users/resetpassword/${token}`,
				method: "PATCH",
				body: { password },
			}),
		}),

		getProfile: builder.query({
			query: () => ({
				url: "/api/users/profile",
				method: "GET",
			}),
			providesTags: ["profile"],
		}),
		updateProfile: builder.mutation<any, any>({
			query: (data) => ({
				url: "/api/users/profile",
				method: "PATCH",
				body: data,
			}),
			invalidatesTags: ["profile"],
		}),
		verifyEmail: builder.query<void, string>({
			query: (token) => ({
				url: `/api/users/verify-email/${token}`,
				method: "GET",
			}),
		}),
	}),
});

export const {
	useLoginMutation,
	useSignupMutation,
	useGetProfileQuery,
	useVerifyEmailQuery,
	useUpdateProfileMutation,
	useForgotPasswordMutation,
	useResetPasswordMutation,
} = userEndpoints;
