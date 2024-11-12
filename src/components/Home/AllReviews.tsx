import { useGetAllRatingsQuery } from '../../redux/features/review/reviewsApi';
import Navbar from '../shared/Navbar';

type TReview = {
  id: string;
  rating: number;
  feedback: string;
};

const AllReviews = () => {

  const { data:reviews, isLoading } = useGetAllRatingsQuery(undefined);
   
  <p>
    {isLoading}
  </p>


  return (
    <div>
        <Navbar/>
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">All Reviews</h1>

      {reviews.length === 0 ? (
        <p className="text-gray-600">No reviews available yet.</p>
      ) : (
        <div className="space-y-4">
          {reviews.map((review: TReview) => (
            <div key={review.id} className="p-4 bg-gray-50 rounded-md shadow-sm">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Rating: {review.rating}</p>
                  {/* Render stars for the rating */}
                  <div className="flex items-center space-x-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-5 h-5 text-yellow-400 fill-current"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 6.91-1L12 2z" />
                      </svg>
                    ))}
                  </div>
                </div>

                
              </div>
              <p className="text-gray-600 mt-2">{review.feedback}</p>
            </div>
          ))}
        </div>
      )}
    </div>
    </div>
  );
};

export default AllReviews;
