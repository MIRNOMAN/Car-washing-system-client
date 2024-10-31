import LoadingSpinner from "../../../components/global/LoadingSpinier";
import { useGetMyBookingQuery } from "../../../redux/features/booking/booking.api";
import { TBooking } from "../../../types/booking.type";

const PastBookings = () => {
  const { data, isLoading, error } = useGetMyBookingQuery(undefined);
  const bookingData = data?.data;

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <div className="text-center mb-5">
        <h1 className="text-3xl font-bold text-rose-600 Oswald">Past Bookings</h1>
        <p className="text-xl mt-1 Montserrat">Review your past booking details</p>
      </div>

      {error ? (
        <div className="text-center w-full mb-4">
          <p className="text-xl font-semibold">You didn't book any service</p>
        </div>
      ) : (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          {bookingData?.length === 0 ? (
            <div className="text-center w-full mb-4">
              <p className="text-xl font-semibold">No bookings found</p>
            </div>
          ) : (
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">Service Name</th>
                  <th scope="col" className="px-6 py-3">Vehicle Type</th>
                  <th scope="col" className="px-6 py-3">Vehicle Brand</th>
                  <th scope="col" className="px-6 py-3">Vehicle Model</th>
                  <th scope="col" className="px-6 py-3">Slot Date</th>
                  <th scope="col" className="px-6 py-3">Start Time</th>
                  <th scope="col" className="px-6 py-3">End Time</th>
                  <th scope="col" className="px-6 py-3">Registration Plate</th>
                </tr>
              </thead>
              <tbody>
                {bookingData?.map((booking: TBooking) => (
                  <tr
                    key={booking?._id}
                    className="bg-gray-100 border-b text-black hover:bg-rose-500 hover:text-white"
                  >
                    <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
                      {booking.service.name}
                    </th>
                    <td className="px-6 py-4">{booking.vehicleType}</td>
                    <td className="px-6 py-4">{booking.vehicleBrand}</td>
                    <td className="px-6 py-4">{booking.vehicleModel}</td>
                    <td className="px-6 py-4">{new Date(booking.slot.date).toLocaleDateString()}</td>
                    <td className="px-6 py-4">{booking.slot.startTime}</td>
                    <td className="px-6 py-4">{booking.slot.endTime}</td>
                    <td className="px-6 py-4">{booking.registrationPlate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default PastBookings;
