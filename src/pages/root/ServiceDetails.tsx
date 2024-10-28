import { useState } from 'react';
import { useParams } from 'react-router-dom';
import {  useGetSingleServicesQuery } from '../../redux/features/services/services.api';
import { TResponseSlot } from '../../types/response.slots.type';
import Footer from '../../components/shared/Footer';
import Navbar from '../../components/shared/Navbar';
import { useGetAllAvailableSlotsQuery } from '../../redux/features/slot/slots.api';
import LoadingSpinier from '../../components/global/LoadingSpinier';


const ServiceDetails = () => {
  const { _id } = useParams<{ _id: string | undefined }>();
    const { data, isFetching, isLoading } = useGetSingleServicesQuery(_id);
  const { data: AllSlots } = useGetAllAvailableSlotsQuery(undefined);
  
  const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null); // State to store selected slot ID

  const targetedSlot = AllSlots?.data?.filter((data: TResponseSlot) => {
    return data?.serviceId?._id === _id;
  });

  const handleSelect = (slotId: string) => {
    setSelectedSlotId(slotId);
    // console.log("Selected Slot ID:", slotId);
  };

  if (isFetching || isLoading) {
    return <LoadingSpinier />;
  }
  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mt-5 mb-8 mx-auto p-6 bg-white rounded-lg shadow-lg">
        {/* Service Information */}
        <div className="mb-8 ">
          <h2 className="text-2xl font-bold text-gray-900">{data?.data?.name || 'Service Name'}</h2>
          <p className="text-gray-700 mt-2">{data?.data?.description || 'Detailed description of the selected service goes here...'}</p>
          <p className="text-xl text-blue-600 font-semibold mt-4">Price: ${data?.data?.price}</p>
          <p className="text-sm text-gray-600 mt-1">Duration: {data?.data?.duration} hours</p>
        </div>

        {/* Calendar */}
        <div className="flex-1 h-full text-white ">
          <h1 className="text-2xl text-center">Available Slots</h1>
          <div className="grid grid-cols-2 gap-5 mt-4">
            {targetedSlot?.map((slot: TResponseSlot) => (
              <button
                key={slot._id}
                onClick={() => handleSelect(slot._id!)}
                className={`p-2.5 flex flex-col gap-2 rounded-lg border 
                ${
                  selectedSlotId === slot._id
                    ? "bg-primary text-white border-primary"
                    : "bg-transparent border-text"
                } 
                hover:border-primary hover:bg-primary transition-all duration-300 transform disabled:bg-neutral-600 disabled:border-neutral-600 disabled:cursor-not-allowed`}
                disabled={
                  slot.isBooked === "booked" || slot.isBooked === "canceled"
                }
              >
                <h1>Date: {dateFormatter(slot.date)}</h1>
                <div className="flex gap-4">
                  <h1>Start Time: {slot.startTime}</h1>
                  <h1>End Time: {slot.endTime}</h1>
                </div>
              </button>
            ))}
          </div>

          {selectedSlotId && (role?.role as string) === "user" && (
            <div className="flex items-end justify-end h-full mt-8">
              <Link to={`/bookings/${id}/${selectedSlotId}`}>
                <Button>Book This Slot</Button>
              </Link>
            </div>
          )}
          {selectedSlotId && !role && (
            <div className="flex items-end justify-end h-full mt-8">
              <Link to={"/signin"}>
                <Button>Book This Slot</Button>
              </Link>
            </div>
          )}


      </div>

      <Footer />
    </div>
    </div>
  );
};

export default ServiceDetails;
