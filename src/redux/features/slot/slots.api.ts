import { TQueryParams } from "../../../types/TQueryParams.types";
import { baseApi } from "../../api/baseApi";


const slotApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createSlot: builder.mutation({
      query: (slotInfo) => {
        return {
          url: "/slots/create-slot",
          method: "POST",
          body: slotInfo,
        };
      },
    }),
    getAllAvailableSlots: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParams) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/slots",
          method: "GET",
          params: params,
        };
      },
    }),
    getSingleSlot: builder.query({
      query: (id) => {
        return {
          url: `/slots/${id}`,
          method: "GET",
        };
      },
    }),
    updateSlot: builder.mutation({
      query: (payload) => {
        const { _id, ...newStatus } = payload;
        // console.log(payload, "slot payload");
        // console.log(_id);
        return {
          url: `/slots/${_id}`,
          method: "PATCH",
          body: newStatus,
        };
      },
    }),
  }),
});

export const {
  useCreateSlotMutation,
  useGetAllAvailableSlotsQuery,
  useUpdateSlotMutation,
  useGetSingleSlotQuery,
} = slotApi;