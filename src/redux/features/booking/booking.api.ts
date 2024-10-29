import baseApi from "../../api/baseApi";


const bookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBookings: builder.query({
      query: () => `/bookings`,
      providesTags: ["Booking"],
    }),
    getMyBooking: builder.query({
      query: () => `/my-bookings`,
      providesTags: ["Booking"],
    }),
    createBooking: builder.mutation({
      query: (bookingInfo) => ({
        url: "/bookings",
        method: "POST",
        body: bookingInfo,
      }),
      invalidatesTags: ["Booking", "Slot"],
    }),
  }),
});

export const {
  useGetAllBookingsQuery,
  useGetMyBookingQuery,
  useCreateBookingMutation,
} = bookingApi;