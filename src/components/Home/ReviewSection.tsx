import { useState } from "react";

// Define the Review type
interface Review {
  rating: number;
  feedback: string;
}

const ReviewSection = () => {
  // Define types for state
  const [rating, setRating] = useState<number>(0);
  const [feedback, setFeedback] = useState<string>('');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false); // Simulating login state

  // Function to handle star rating click
  const handleStarClick = (star: number) => {
    setRating(star);
  };

  // Function to handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (rating === 0 || feedback === '') {
      alert('Please fill out all fields');
      return;
    }
    
    // Construct the review object
    const review: Review = { rating, feedback };

    // Submit review logic (to API or state)
    console.log('Submitted review:', review);

    // Reset form after submission
    setRating(0);
    setFeedback('');
  };

  return (
    <div>
      <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md relative">
        {/* Black Overlay with Login Button (Visible if user is not logged in) */}
        {!isLoggedIn && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-md shadow-md">
              <p className="text-gray-800 text-lg mb-4">Please log in to leave a review.</p>
              <button
                className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600"
                onClick={() => setIsLoggedIn(true)} // Simulate login
              >
                Login
              </button>
            </div>
          </div>
        )}

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
            className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded-md shadow-md"
          >
            Submit Review
          </button>
        </form>

        {/* Post-Submission Display (Static Content) */}
        <div className="mt-10">
          <h3 className="text-lg font-semibold mb-2">Overall Rating:</h3>
          <div className="flex items-center space-x-2">
            <p className="text-3xl font-bold">4.5</p>
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
            <div className="p-4 bg-gray-50 rounded-md shadow-sm">
              <div className="flex justify-between">
                <p className="font-medium">John Doe</p>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 6.91-1L12 2z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-gray-600 mt-2">Great service! Highly recommended.</p>
            </div>
            {/* Second review can be added similarly */}
          </div>

          {/* See All Reviews Button */}
          <div className="mt-6">
            <a href="/reviews" className="inline-block bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600">
              See All Reviews
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewSection;
