import LoadingSpinier from "../../../../components/global/LoadingSpinier";
import { useGetAllBookingsQuery } from "../../../../redux/features/booking/booking.api";
import { TBooking } from "../../../../types/booking.type";


const Bookings = () => {
  const { data, isLoading } = useGetAllBookingsQuery(undefined);

  if (isLoading) {
    return <LoadingSpinier />;
  }

  return (
    <div>
      <div className="text-center">
        <h1 className="text-3xl font-bold text-rose-600 Oswald">Bookings Overview</h1>
        <p className="text-xl mt-1 Montserrat mb-5">View all customer bookings</p>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-gray-600 tracking-wider">
                Customer Name
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-gray-600 tracking-wider">
                Service Name
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-gray-600 tracking-wider">
                Vehicle
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-gray-600 tracking-wider">
                Slot
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-gray-600 tracking-wider">
                Date
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.data.map((booking: TBooking) => (
              <tr key={booking._id} className="hover:bg-gray-100">
                <td className="px-6 py-4 border-b border-gray-200">
                  {booking.customer.name}
                </td>
                <td className="px-6 py-4 border-b border-gray-200">
                  {booking.service.name}
                </td>
                <td className="px-6 py-4 border-b border-gray-200">
                  {booking.vehicleBrand} {booking.vehicleModel}
                </td>
                <td className="px-6 py-4 border-b border-gray-200">
                  {booking.slot.startTime} - {booking.slot.endTime}
                </td>
                <td className="px-6 py-4 border-b border-gray-200">
                  {new Date(booking.slot.date).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Bookings