import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
// import { useGetSingleServicesQuery } from '../../redux/features/services/services.api';
// import { useGetAllAvailableSlotsQuery } from '../../redux/features/slot/slots.api';
// import { TResponseSlot } from '../../types/response.slots.type';
import Footer from '../../components/shared/Footer';
import Navbar from '../../components/shared/Navbar';
// import { dateFormatter } from '../../utils/dateFormatter';
import { Button } from 'antd';
import { useAppSelector } from '../../redux/hooks';
// import { useCurentUser } from '../../redux/features/auth/authSlice';
import LoadingSpinier from '../../components/global/LoadingSpinier';


const ServiceDetails = () => {
  const { _id } = useParams<{ _id: string | undefined }>();
  const { data, isFetching, isLoading } = useGetSingleServicesQuery({ _id });
  const { data: allSlotsData } = useGetAllAvailableSlotsQuery(undefined);
  const role = useAppSelector(useCurentUser)?.role; // Use the updated selector and optional chaining
  const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null);

  const targetedSlots = allSlotsData?.data?.filter((slot: TResponseSlot) => slot.serviceId?._id === _id);
  console.log(targetedSlots)
  const handleSelect = (slotId: string) => {
    setSelectedSlotId(slotId);
  };

  if (isFetching || isLoading) {
    return <LoadingSpinier />;
  }

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mt-5 mb-8 mx-auto p-6 bg-white rounded-lg shadow-lg">
        {/* Service Information */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">{data?.data?.name || 'Service Name'}</h2>
          <p className="text-gray-700 mt-2">{data?.data?.description || 'Detailed description of the selected service goes here...'}</p>
          <p className="text-xl text-blue-600 font-semibold mt-4">Price: ${data?.data?.price}</p>
          <p className="text-sm text-gray-600 mt-1">Duration: {data?.data?.duration} hours</p>
        </div>

        {/* Available Slots */}
        <div className="flex-1 h-full text-white">
          <h1 className="text-2xl text-center">Available Slots</h1>
          <div className="grid grid-cols-2 gap-5 mt-4">
            {targetedSlots?.map((slot) => (
              <button
                key={slot._id}
                onClick={() => handleSelect(slot._id!)}
                className={`p-2.5 flex flex-col gap-2 rounded-lg border 
                  ${selectedSlotId === slot._id ? "bg-primary text-white border-primary" : "bg-transparent border-text"} 
                  hover:border-primary hover:bg-primary transition-all duration-300 transform disabled:bg-neutral-600 disabled:border-neutral-600 disabled:cursor-not-allowed`}
                disabled={slot.isBooked === "booked" || slot.isBooked === "canceled"}
              >
                <h1>Date: {dateFormatter(slot.date)}</h1>
                <div className="flex gap-4">
                  <h1>Start Time: {slot.startTime}</h1>
                  <h1>End Time: {slot.endTime}</h1>
                </div>
              </button>
            ))}
          </div>

          {/* Booking Button */}
          {selectedSlotId && (
            <div className="flex items-end justify-end h-full mt-8">
              {role === "user" ? (
                <Link to={`/bookings/${_id}/${selectedSlotId}`}>
                  <Button>Book This Slot</Button>
                </Link>
              ) : (
                <Link to="/signin">
                  <Button>Book This Slot</Button>
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ServiceDetails;
