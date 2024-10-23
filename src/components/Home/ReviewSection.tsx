import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store"; // Adjust this path to your store location
import { addReview, deleteReview, TReview } from "../../redux/features/review/reviewsSlice"; // Adjust the path as necessary
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";
import {  useCurentUser } from "../../redux/features/auth/authSlice"; // Assuming you have an auth state slice
import { useAppSelector } from "../../redux/hooks";


const ReviewSection = () => {
  const dispatch = useDispatch();
  const reviews: TReview[] = useSelector((state: RootState) => state.reviews.reviews);
  const averageRating = useSelector((state: RootState) => state.reviews.averageRating);

  const [rating, setRating] = useState<number>(0);
  const [feedback, setFeedback] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  // Get the user's login state from Redux (you can adjust this based on your authentication flow)
  const  user  = useAppSelector(useCurentUser);


  // Function to handle star rating click
  const handleStarClick = (star: number) => {
    setRating(star);
  };

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (rating === 0 || feedback === '') {
      toast.error('Please fill out all fields');
      return;
    }

    setLoading(true); // Set loading to true

    // Dispatch the addReview action to Redux
    const newReview: TReview = {
      id: Math.random().toString(36).substr(2, 9),
      rating,
      feedback
    };
    await dispatch(addReview(newReview));

    // Reset form after submission
    setRating(0);
    setFeedback('');
    setLoading(false); 
  };

  // Function to handle review deletion
  const handleDeleteReview = async (id: string) => {
    setLoading(true); 
    await dispatch(deleteReview(id)); 
    setLoading(false); 
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md relative">
      {/* Black Overlay with Login Button */}
      {!user && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-md shadow-md">
            <p className="text-gray-800 text-lg mb-4">Please log in to leave a review.</p>
            <Link to="/auth/login">
              <button className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600">
                Login
              </button>
            </Link>
          </div>
        </div>
      )}

      {user && (
        <>
          {/* Review Section */}
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Leave a Review</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Star Rating Component */}
            <div>
              <p className="text-lg font-medium text-gray-700 mb-2">Rate Us:</p>
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => handleStarClick(star)}
                    className={`w-8 h-8 ${star <= rating ? 'text-yellow-400' : 'text-gray-400'} hover:text-yellow-400`}
                  >
                    <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 6.91-1L12 2z" />
                    </svg>
                  </button>
                ))}
              </div>
            </div>

            {/* Text Area for Feedback */}
            <div>
              <textarea
                className="w-full px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="Write your feedback here..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className={`w-full ${loading ? 'bg-gray-400' : 'bg-indigo-500 hover:bg-indigo-600'} text-white py-2 px-4 rounded-md shadow-md`}
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Submit Review'}
            </button>
          </form>

          {/* Post-Submission Display */}
          <div className="mt-10">
            <h3 className="text-lg font-semibold mb-2">Overall Rating:</h3>
            <div className="flex items-center space-x-2">
              <p className="text-3xl font-bold">{averageRating.toFixed(1)}</p>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="w-6 h-6 text-yellow-400 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 6.91-1L12 2z" />
                  </svg>
                ))}
              </div>
            </div>

            {/* Last Two User Reviews */}
            <div className="mt-4 space-y-4">
              {reviews.slice(-2).map((review: TReview, index: number) => (
                <div key={index} className="p-4 bg-gray-50 rounded-md shadow-sm">
                  <div className="flex justify-between">
                    <p className="font-medium">User {index + 1}</p>
                    <div className="flex">
                      {[...Array(review.rating)].map((_, starIndex) => (
                        <svg key={starIndex} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 6.91-1L12 2z" />
                        </svg>
                      ))}
                    </div>
                    <div>
                      <FaTrash
                        size={15}
                        className="text-red-500 cursor-pointer"
                        onClick={() => handleDeleteReview(review.id)}
                      />
                    </div>
                  </div>
                  <p className="text-gray-600 mt-2">{review.feedback}</p>
                </div>
              ))}
            </div>

            {/* See All Reviews Button */}
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
