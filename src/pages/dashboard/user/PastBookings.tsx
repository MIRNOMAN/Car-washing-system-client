import LoadingSpinier from "../../../components/global/LoadingSpinier";
import { useGetMyBookingQuery } from "../../../redux/features/booking/booking.api";


const PastBookings = () => {
  const { data, isLoading, error } = useGetMyBookingQuery(undefined);
  const bookingData = data?.data;

  if (isLoading) {
    return <LoadingSpinier />;
  }

  return (
    <div> 
      <div>
        <h1>Fast Booking</h1>
        <p>Review your past booking details</p>
      </div>
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50  dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    Product name
                </th>
                <th scope="col" className="px-6 py-3">
                    Color
                </th>
                <th scope="col" className="px-6 py-3">
                    Category
                </th>
                <th scope="col" className="px-6 py-3">
                    Price
                </th>
                <th scope="col" className="px-6 py-3">
                    <span className="sr-only">Edit</span>
                </th>
            </tr>
        </thead>
        <tbody>
            <tr className="bg-gray-100 border-b   text-black hover:bg-rose-500 hover:text-white">
                <th scope="row" className="px-6 py-4 font-medium  whitespace-nowrap ">
                    Apple MacBook Pro 17"
                </th>
                <td className="px-6 py-4">
                    Silver
                </td>
                <td className="px-6 py-4">
                    Laptop
                </td>
                <td className="px-6 py-4">
                    $2999
                </td>
                <td className="px-6 py-4 text-right">
                    <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                </td>
            </tr>
            
            
        </tbody>
    </table>
</div>

</div>
  )
}

export default PastBookings