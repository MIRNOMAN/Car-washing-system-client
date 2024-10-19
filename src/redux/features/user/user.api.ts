import { TQueryParams } from "../../../types/TQueryParams.types";
import { baseApi } from "../../api/baseApi";

const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        getFullUser: builder.query({
            query: (args) => {
                const params = new URLSearchParams();
                if (args) {
                    args.forEach((item: TQueryParams) => {
                        params.append((Object.keys(item)[0] as string), (Object.values(item)[0] as string));
                    });
                };

                return {
                    url: `/auth/user`,
                    method: 'GET',
                    params
                }
            },
            providesTags: ['patchUser']
        }),

        getRoleBaseUsers: builder.query({
            query: (args) => {
                const params = new URLSearchParams();
                if (args) {
                    args.forEach((item: TQueryParams) => {
                        params.append((Object.keys(item)[0] as string), (Object.values(item)[0] as string));
                    });
                };

                return {
                    url: `/auth/users`,
                    method: 'GET',
                    params
                }
            },
            providesTags: ['patchUserRole']
        }),

        patchUser: builder.mutation({
            query: (args) => {
                const params = new URLSearchParams();
                params.append('email', args.query);

                return {
                    url: `/auth/user/update`,
                    method: 'PATCH',
                    body: args?.payload,
                    params
                }
            },
            invalidatesTags: ['patchUser']
        }),

        PatchUserRole: builder.mutation({
            query: (args) => ({
                url: '/auth/user/update-role',
                method: 'PATCH',
                body: args?.payload,
            }),
            invalidatesTags: ['patchUser', 'patchUserRole']
        })
    })
})

export const {
    useGetFullUserQuery,
    usePatchUserMutation,
    useGetRoleBaseUsersQuery,
    usePatchUserRoleMutation,
} = userApi