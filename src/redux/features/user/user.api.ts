import baseApi from "../../api/baseApi";




const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => `/users`,
      providesTags: ["User"],
    }),
    getUserInfo: builder.query({
      query: () => `/user-info`,
      providesTags: ["User"],
    }),
    updateUser: builder.mutation({
      query: ({ userData, id }) => ({
        url: `/update-user/${id}`,
        method: "PUT",
        body: userData,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetUserInfoQuery,
  useUpdateUserMutation,
} = userApi;