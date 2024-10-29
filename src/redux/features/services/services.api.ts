import baseApi from "../../api/baseApi";




const serviceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getServiceDetails: builder.query({
      query: ({ id }) => `/services/details/${id}`,
      providesTags: ["Service"],
    }),
    getAllServices: builder.query({
      query: (args) => {
        return {
          url: `/services?search=${args?.keyword}&sortOrder=${args?.sort}&minDuration=${args?.minDuration}&maxDuration=${args?.maxDuration}`,
          method: "GET",
        };
      },
      providesTags: ["Service"],
    }),
    getServices: builder.query({
      query: () => {
        return {
          url: `/services`,
          method: "GET",
        };
      },
      providesTags: ["Service"],
    }),
    createService: builder.mutation({
      query: (serviceInfo) => ({
        url: "/services",
        method: "POST",
        body: serviceInfo,
      }),
      invalidatesTags: ["Service"],
    }),
    deleteService: builder.mutation({
      query: (deleteService) => ({
        url: `/services/${deleteService}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Service", "Slot"],
    }),
    updateService: builder.mutation({
      query: ({ serviceData, id }) => ({
        url: `/services/${id}`,
        method: "PUT",
        body: serviceData,
      }),
      invalidatesTags: ["Service", "Slot"],
    }),
  }),
});

export const {
  useGetAllServicesQuery,
  useGetServicesQuery,
  useGetServiceDetailsQuery,
  useCreateServiceMutation,
  useDeleteServiceMutation,
  useUpdateServiceMutation,
} = serviceApi;