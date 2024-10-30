import SectionTitle from "@/components/reUsable/SectionTitle";
import Loader from "@/components/shared/Loader";
import { useGetAllRatingsQuery } from "@/redux/features/rating";
import { RiDoubleQuotesL } from "react-icons/ri";
import { RiDoubleQuotesR } from "react-icons/ri";
import { FaStar } from "react-icons/fa";
import { formatDateToDDMMYYYY } from "@/utils/utils";
import { TReview } from "@/types";


const Reviews = () => {
  const { data, isLoading } = useGetAllRatingsQuery(undefined);

  if (isLoading) {
    return <Loader />;
  }

  
  return (
    <div>Reviews</div>
  )
}

export default Reviews