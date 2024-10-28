import { TQueryParams } from "../../../types/TQueryParams.types";
import { baseApi } from "../../api/baseApi";

const servicesApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllServices: builder.query({
            query: (args) => {
                const params = new URLSearchParams();
                if (args) {
                  args.forEach((item: TQueryParams) => {
                    params.append(item.name, item.value as string);
                  });
                }
                return {
                  url: `/services`,
                  method: "GET",
                  params: params,
                };
              },
              providesTags: ["service"],
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

        deleteService: builder.mutation({
            query: (id) => {
              // console.log(id);
              return {
                url: `/services/${id}`,
                method: "DELETE",
              };
            },
            invalidatesTags: ["service"],
          }),

          updateService: builder.mutation({
            query: (payload) => {
              const { _id, ...data } = payload;
              // console.log(_id);
              return {
                url: `/services/${_id}`,
                method: "PATCH",
                body: data,
              };
            },
            invalidatesTags: ["service"],
          }),
    })
})

export const {
    useGetAllServicesQuery,
  useGetSingleServicesQuery,
  useCreateSlotMutation,
  useDeleteServiceMutation,
  useUpdateServiceMutation,
} = servicesApi