import CountdownTimer from "../../../components/shared/CountdownTimer";
import { useGetMyBookingQuery } from "../../../redux/features/booking/booking.api";
import { TBooking } from "../../../types/booking.type";
import { getTargetDateTime } from "../../../utils/utils";


const UpcomingBookings = () => {
  const { data, isLoading, error } = useGetMyBookingQuery(undefined);
  const bookingData = data?.data || [];

  const filterUpcomingBookings = (bookings: TBooking[]): TBooking[] => {
    const now = new Date();
    const currentDate = now.toISOString().split("T")[0]; // YYYY-MM-DD

    return bookings.filter((booking) => {
      const bookingDate = new Date(booking.slot.date);
      const bookingDateStr = bookingDate.toISOString().split("T")[0];
      return bookingDateStr >= currentDate;
    });
  };

  const futureBookings = filterUpcomingBookings(bookingData);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p className="text-red-600 text-center">Error loading bookings</p>;

  return (
    <div>
      <div className="text-center mb-5">
        <h1 className="text-3xl font-bold text-rose-600 Oswald">Upcoming Bookings</h1>
        <p className="text-xl mt-1 Montserrat">Overview of Upcoming Bookings</p>
      </div>

    <div className="grid lg:grid-cols-4 md:grid-cols-3 gap-5 grid-cols-1">
      {futureBookings.map((booking) => {
        const targetDateTime = getTargetDateTime(
          booking.slot.date,
          booking.slot.startTime
        );
        const desLength = booking?.service?.description.length;
        // console.log("Target DateTime:", targetDateTime); // Debugging line
        return (
          <div
            key={booking._id}
            className="border p-4 rounded-lg shadow-md h-[210px] bg-primary-foreground/10"
          >
            <h2 className="text-xl font-semibold text-primary">
              {booking.service.name}
            </h2>
            <p>
              {booking.service.description.slice(0, 25)}
              {desLength > 25 && "..."}
            </p>
            <p>Date: {new Date(booking.slot.date).toLocaleDateString()}</p>
            <p>
              Time: {booking.slot.startTime} - {booking.slot.endTime}
            </p>
            <p>
              Vehicle: {booking.vehicleBrand} {booking.vehicleModel}
            </p>
            <div className="mt-2">
              <p className="font-medium">Remaining:</p>
              <CountdownTimer targetDateTime={targetDateTime} />
            </div>
          </div>
        );
      })}
    </div>
  </div>
  )
}

export default UpcomingBookings