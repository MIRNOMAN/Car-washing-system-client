import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the shape of the review
interface Review {
  id: string; // or number, depending on your ID type
  rating: number;
  comment: string;
}

// Define the shape of the reviews state
interface ReviewsState {
  reviews: Review[];
  averageRating: number;
}

const initialState: ReviewsState = {
  reviews: [],
  averageRating: 0,
};

const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    addReview: (state, action: PayloadAction<Review>) => {
      const newReview = action.payload;
      state.reviews.push(newReview);
      // Update the average rating
      const totalRating = state.reviews.reduce((sum, review) => sum + review.rating, 0);
      state.averageRating = totalRating / state.reviews.length;
    },
    deleteReview: (state, action: PayloadAction<string>) => {
        const reviewId = action.payload;
        // Filter out the review with the given ID
        state.reviews = state.reviews.filter(review => review.id !== reviewId);
        // Update the average rating after deletion
        const totalRating = state.reviews.reduce((sum, review) => sum + review.rating, 0);
        state.averageRating = state.reviews.length > 0 ? totalRating / state.reviews.length : 0;
      },
    // Optionally add other reducers for fetching or updating reviews
  },
});

// Export actions and reducer
export const { addReview,deleteReview } = reviewsSlice.actions;
export default reviewsSlice.reducer;
