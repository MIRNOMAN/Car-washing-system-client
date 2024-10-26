// slotsApi.js
import { baseApi } from "../../api/baseApi";

const slotsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // Fetch available slots
        getAvailableSlots: builder.query({
            query: () => ({
                url: '/slots/availability',
                method: 'GET',
            }),
            providesTags: ['slot'],
        }),

        // Create a new slot
        // createSlot: builder.mutation({
        //     query: (slotData) => ({
        //         url: '/services/slots',
        //         method: 'POST',
        //         body: slotData,
        //     }),
        //     invalidatesTags: ['slot'],
        // }),

        // Delete a slot
        deleteSlot: builder.mutation({
            query: (slotId) => ({
                url: `/slots/${slotId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['slot'],
        }),
    }),
});

export const {
    useGetAvailableSlotsQuery,
     useDeleteSlotMutation,
} = slotsApi;
