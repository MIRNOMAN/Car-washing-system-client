import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the shape of the review
export interface TReview {
  id: string;
  rating: number;
  feedback: string;
}

// Define the shape of the reviews state
const initialState: {
  reviews: TReview[];
  averageRating: number;
  loading: boolean;
} = {
  reviews: [],
  averageRating: 0,
  loading: false,
};

const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    addReview: (state, action: PayloadAction<TReview>) => {
      const newReview = action.payload;
      state.reviews.push(newReview);
      // Update the average rating
      const totalRating = state.reviews.reduce((sum, review) => sum + review.rating, 0);
      state.averageRating = totalRating / state.reviews.length;
    },
    deleteReview: (state, action: PayloadAction<string>) => {
      const reviewId = action.payload;
      // Filter out the review with the given ID
      state.reviews = state.reviews.filter((review) => review.id !== reviewId);
      // Update the average rating after deletion
      const totalRating = state.reviews.reduce((sum, review) => sum + review.rating, 0);
      state.averageRating = state.reviews.length > 0 ? totalRating / state.reviews.length : 0;
    },
    fetchReviewsStart: (state) => {
      state.loading = true;
    },
    fetchReviewsSuccess: (state, action: PayloadAction<TReview[]>) => {
      state.reviews = action.payload;
      state.loading = false;
      // Recalculate average rating
      const totalRating = state.reviews.reduce((sum, review) => sum + review.rating, 0);
      state.averageRating = state.reviews.length > 0 ? totalRating / state.reviews.length : 0;
    },
    fetchReviewsFailure: (state) => {
      state.loading = false;
    },
  },
});

// Export actions and reducer
export const {
  addReview,
  deleteReview,
  fetchReviewsStart,
  fetchReviewsSuccess,
  fetchReviewsFailure,
} = reviewsSlice.actions;
export default reviewsSlice.reducer;
