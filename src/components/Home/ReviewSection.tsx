import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { TUser, useCurrentUser } from "../../redux/features/auth/authSlice"; 
import { useAppSelector } from "../../redux/hooks";
import { TErrorResponse } from "../../types/redux.type";
import { useCreateReviewMutation, useGetLatestTwoRatingsQuery } from "../../redux/features/review/reviewsApi";
import LoadingSpinier from "../global/LoadingSpinier";
import { useState } from "react"; // Import useState

type TInitialValues = {
  feedback: string;
  rating: number;
};

const initialValues: TInitialValues = {
  feedback: "",
  rating: 4,
};


const ReviewSection = () => {
  const { data, isLoading } = useGetLatestTwoRatingsQuery(undefined);
  const user = useAppSelector(useCurrentUser) as TUser;
  console.log(data?.result)
  const [reviewInfo, { isLoading: loading }] = useCreateReviewMutation();
  const [feedback, setFeedback] = useState(initialValues.feedback);
  const [rating, setRating] = useState(initialValues.rating);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!feedback.trim() || !rating) {
      toast.error("Please fill out both the feedback and rating fields.");
      return;
    }
  
    const payload = {
      email: user?.email,
      name: user?.name || "Person1",
      rating,
      feedback: feedback.trim(),
    };
  
    console.log("Submitting review payload:", payload); // Debugging line to verify the payload structure
  
    const toastId = toast.loading("Posting feedback...");
    
    try {
      const response = await reviewInfo(payload).unwrap();
  
      toast.success(response.message || "Feedback posted successfully", {
        id: toastId,
      });
      
      setFeedback("");
      setRating(4);
    } catch (error) {
      console.error("Error submitting review:", error);
      const err = error as TErrorResponse;
  
      const errorMessage = err?.data?.errorSources?.[0]?.message || "An unexpected error occurred";
      toast.error(errorMessage, { id: toastId });
    }
  };
  
  if (isLoading) {
    return <LoadingSpinier />;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md relative">
      {!user && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-md shadow-md">
            <p className="text-gray-800 text-lg mb-4">Please log in to leave a review.</p>
            <Link to="/login">
              <button className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600">
                Login
              </button>
            </Link>
          </div>
        </div>
      )}

      {user && (
        <>
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Leave a Review</h2>
          <form onSubmit={onSubmit} className="space-y-6">
            <div>
              <p className="text-lg font-medium text-gray-700 mb-2">Rate Us:</p>
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className={`w-8 h-8 ${star <= rating ? 'text-yellow-400' : 'text-gray-400'} hover:text-yellow-400`}
                  >
                    <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 6.91-1L12 2z" />
                    </svg>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <textarea
                className="w-full px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="Write your feedback here..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
              ></textarea>
            </div>

            <button
              type="submit"
              className={`w-full ${loading ? 'bg-gray-400' : 'bg-indigo-500 hover:bg-indigo-600'} text-white py-2 px-4 rounded-md shadow-md`}
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Submit Review'}
            </button>
          </form>

          <div className="mt-10">
            <h3 className="text-lg font-semibold mb-2">Overall Rating:</h3>
            <div className="flex items-center space-x-2">
              <p className="text-3xl font-bold">{data?.averageRating?.toFixed(1) || "N/A"}</p>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="w-6 h-6 text-yellow-400 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 6.91-1L12 2z" />
                  </svg>
                ))}
              </div>
            </div>

            <div className="mt-4 space-y-4">
            {data?.data?.result?.map((review, index) => (
        <div key={review._id} className="p-4 bg-gray-50 rounded-md shadow-sm mb-4">
          <div className="flex justify-between">
            <p className="font-medium">{review.name || `User ${index + 1}`}</p>
            <div className="flex">
              {[...Array(review.rating)].map((_, starIndex) => (
                <svg key={starIndex} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 6.91-1L12 2z" />
                </svg>
              ))}
            </div>
          </div>
          <p className="text-gray-600 mt-2">{review.feedback}</p>
        </div>
      ))}
    </div>

            <div className="mt-6">
              <Link to="/reviews" className="inline-block bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600">
                See All Reviews
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ReviewSection;
