import baseApi from "../../api/baseApi";


const ratingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getLatestTwoRatings: builder.query({
      query: () => `/review?number=2`,
      providesTags: ["Rating"],
    }),
    getAllRatings: builder.query({
      query: () => `/review`,
      providesTags: ["Rating"],
    }),
    createReview: builder.mutation({
      query: (reviewInfo) => ({
        url: "/review",
        method: "POST",
        body: reviewInfo,
      }),
      invalidatesTags: ["Rating"],
    }),
  }),
});

export const {
  useGetLatestTwoRatingsQuery,
  useGetAllRatingsQuery,
  useCreateReviewMutation,
} = ratingApi;