

const Bookings = () => {
  const { data, isLoading } = useGetAllBookingsQuery(undefined);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>Bookings</div>
  )
}

export default Bookings