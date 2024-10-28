// import { TQueryParams } from "../../../types/TQueryParams.types";
// import { baseApi } from "../../api/baseApi";

// const bookingApi = baseApi.injectEndpoints({
//     endpoints: (builder) => ({
//         getBookingForAdmin: builder.query({
//             query: (args) => {
//                 const params = new URLSearchParams();
//                 if (args) {
//                     args.forEach((item: TQueryParams) => {
//                         params.append(Object.keys(item)[0] as string, Object.values(item)[0] as string)
//                     });
//                 };

//                 return {
//                     url: '/bookings',
//                     method: 'GET',
//                     params,
//                 };
//             },
//             providesTags: ['booking']
//         }),

//         getUserSpecificBookings: builder.query({
//             query: (args) => {
//                 const params = new URLSearchParams();
//                 if (args) {
//                     args.forEach((item: TQueryParams) => {
//                         params.append(Object.keys(item)[0], Object.values(item)[0]);
//                     });
//                 };

//                 return {
//                     url: '/bookings/my-bookings',
//                     method: 'GET',
//                     params
//                 }
//             },
//             providesTags: ['booking']
//         }),

//         createNewBooking: builder.mutation({
//             query: (args) => ({
//                 url: '/bookings',
//                 method: 'POST',
//                 body: args.payload,
//             }),
//             invalidatesTags: ['booking', 'slot', 'service']
//         }),

//         // patchBookingStatus: builder.mutation({
//         //     query: (args: { _id: string; action: string; }) => {
//         //         const params = new URLSearchParams;
//         //         params.append('action', args.action);

//         //         return {
//         //             url: `/bookings/action/status/${args._id}`,
//         //             method: 'PATCH',
//         //             params,
//         //         }
//         //     },
//         //     invalidatesTags: ['booking', 'slot', 'service']
//         // }),

//         // afterPayPatch: builder.mutation({
//         //     query: (args) => ({
//         //         url: '/bookings/action/payout/success',
//         //         method: 'PATCH',
//         //         body: args?.payload
//         //     }),
//         //     invalidatesTags: ['booking']
//         // }),

//         // deleteBooking: builder.mutation({
//         //     query: (args: { _id: string; }) => {
//         //         const params = new URLSearchParams;
//         //         params.append('_id', args._id);

//         //         return {
//         //             url: `/bookings/delete`,
//         //             method: 'DELETE',
//         //             params,
//         //         }
//         //     },
//         //     invalidatesTags: ['booking','slot', 'service']
//         // })
//     })
// });

// export const {
//     useGetBookingForAdminQuery,
//     // usePatchBookingStatusMutation,
//     useCreateNewBookingMutation,
//     // useDeleteBookingMutation,
//     useGetUserSpecificBookingsQuery,
//     // useAfterPayPatchMutation
// } = bookingApi;