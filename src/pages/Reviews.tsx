import { RiDoubleQuotesL } from "react-icons/ri";
import { RiDoubleQuotesR } from "react-icons/ri";
import { FaStar } from "react-icons/fa";
import { formatDateToDDMMYYYY } from "../utils/utils";
import { useGetAllRatingsQuery } from "../redux/features/review/reviewsApi";
import LoadingSpinier from "../components/global/LoadingSpinier";
import { TReview } from "../types/redux.type";



const Reviews = () => {
  const { data, isLoading } = useGetAllRatingsQuery(undefined);

  if (isLoading) {
    return <LoadingSpinier />;
  }


  return (
    <div className="container lg:py-[30px]">
      <div className="text-center my-8">
  <h2 className="text-3xl font-bold text-gray-800">Customer Reviews</h2>
  <p className="text-lg text-gray-600 mt-2">
    Discover the experiences of those who have chosen our services
  </p>
</div>
      <div className="mx-10">
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-5">
          {data?.data?.result?.map((item: TReview) => {
            return (
              <div
                key={item?._id}
                className="space-y-2 bg-blue-100 p-5 rounded-md"
              >
                <p className="font-medium text-lg">{item?.name}</p>
                <p className="flex items-center gap-x-1 font-medium">
                  Rated: {item?.rating} <FaStar className="text-primary" />
                </p>
                <p className="flex items-center gap-x-1 font-medium ">
                  Date: {formatDateToDDMMYYYY(item.createdAt)}
                </p>
                <p className="flex items-center text-xl font-medium">
                  <RiDoubleQuotesL /> {item?.feedback} <RiDoubleQuotesR />
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  )
}

export default Reviews