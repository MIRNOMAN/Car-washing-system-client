import { baseApi } from "../../api/baseApi";

const servicesApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getServices: builder.query({
            query: () => ({
                url: '/services',
                method: 'GET',
            }),
            providesTags: ['service']
        }),

        getSingleServices: builder.query({
            query: (args: { _id: string }) => ({
                url: `/services/${args._id}`,
                method: 'GET',
            }),
            providesTags: ['service']
        }),

        
        // Create a new slot
        createSlot: builder.mutation({
            query: (slotData) => ({
                url: '/services/slots',
                method: 'POST',
                body: slotData,
            }),
            invalidatesTags: ['slot','service'],
        }),

        // createVehicle: builder.mutation({
        //     query: (arg) => ({
        //         url: '/cars',
        //         method: 'POST',
        //         body: arg.payload
        //     }),
        //     invalidatesTags: ['vehicle', 'statistics']
        // }),

        // patchVehicle: builder.mutation({
        //     query: (args) => ({
        //         url: `/cars/${args?._id}`,
        //         method: 'PUT',
        //         body: args.payload,
        //     }),
        //     invalidatesTags: ['vehicle']
        // }),

        // deleteVehicle: builder.mutation({
        //     query: (args) => ({
        //         url: `/cars/${args?.id}`,
        //         method: 'DELETE'
        //     }),
        //     invalidatesTags: ['vehicle', 'statistics']
        // }),

        // returnVehicle: builder.mutation({
        //     query: (args: { payload: { bookingId: string; endTime: string } }) => ({
        //         url: `/cars/return`,
        //         method: 'PUT',
        //         body: args.payload
        //     }),
        //     invalidatesTags: ['vehicle', 'booking', 'statistics']
        // })
    })
})

export const {
 useGetServicesQuery,
  useGetSingleServicesQuery,
  useCreateSlotMutation,
} = servicesApi