import baseApi from "../../api/baseApi";




const slotApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSlots: builder.query({
      query: () => `/slots/all-slots`,
      providesTags: ["Slot"],
    }),
    updateSlot: builder.mutation({
      query: ({ slotInfo, id }) => ({
        url: `/slots/update-slot/${id}`,
        method: "PUT",
        body: slotInfo,
      }),
      invalidatesTags: ["Slot"],
    }),
    createSlot: builder.mutation({
      query: (slotInfo) => ({
        url: `/services/slots`,
        method: "POST",
        body: slotInfo,
      }),
      invalidatesTags: ["Slot"],
    }),
  }),
});

export const {
  useGetAllSlotsQuery,
  useUpdateSlotMutation,
  useCreateSlotMutation,
} = slotApi;