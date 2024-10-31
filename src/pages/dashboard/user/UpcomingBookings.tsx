import { useGetMyBookingQuery } from "../../../redux/features/booking/booking.api";
import { TBooking } from "../../../types/booking.type";


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
  if (error) return <p>Error loading bookings</p>;
  return (
    <div>UpcomingBookings</div>
  )
}

export default UpcomingBookings