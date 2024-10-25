/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCreateSlotMutation, useGetAvailableSlotsQuery } from '../../redux/features/slot/slots.api';
import { useGetSingleServicesQuery } from '../../redux/features/services/services.api';
import { toast } from 'react-hot-toast';
import { TResponseSlot } from '../../types/response.slots.type';
import Footer from '../../components/shared/Footer';
import Navbar from '../../components/shared/Navbar';
import { timeSlotsArry } from '../../constants/TimeSlots';

const ServiceDetails = () => {
  const { _id } = useParams<{ _id: string  }>();
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]); // Default to today's date
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  const { data: serviceData, isLoading: serviceLoading } = useGetSingleServicesQuery({ _id });
  
  const [createSlot] = useCreateSlotMutation(); // Use the mutation here


 // Use data or fallback to an empty array
  const selectedSlotData = timeSlotsArry.find((slot: { startTime: string | null; }) => slot.startTime === selectedSlot);

  const handleSlotSelect = (slot: TResponseSlot) => {
    if (slot.isBooked === 'available') { // Only select if the slot is available
      setSelectedSlot(slot.startTime);
    }
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(event.target.value);
    setSelectedSlot(null); // Clear slot selection when date changes
  };

  const handleBooking = async () => {
    if (!selectedSlot) {
      toast.error('Please select a time slot.');
      return;
    }

    try {
      const slotData = {
        service: _id,  // Backend expects 'service' field
        date: selectedDate,
        startTime: selectedSlot,
        endTime: selectedSlotData?.endTime,
      };

      const res = await createSlot(slotData);
      if (res?.data?.success) {
        toast.success('Slot booked successfully!');
      } else {
        throw new Error('Failed to book');
      }
    } catch (error) {
      toast.error('Failed to book the slot. Please try again.');
    }
  };
  // Ensure we get the correct slots array from the response data
  

  if (serviceLoading ) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Navbar/>
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      {/* Service Information */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">{serviceData?.data?.name || 'Service Name'}</h2>
        <p className="text-gray-700 mt-2">{serviceData?.data?.description || 'Detailed description of the selected service goes here...'}</p>
        <p className="text-xl text-blue-600 font-semibold mt-4">Price: ${serviceData?.data?.price}</p>
        <p className="text-sm text-gray-600 mt-1">Duration: {serviceData?.data?.duration} hours</p>
      </div>

      {/* Calendar (Optional) */}
      <div className="mb-6">
        <label htmlFor="date" className="block text-lg font-semibold text-gray-800">Choose a Date:</label>
        <input
          type="date"
          id="date"
          value={selectedDate}
          onChange={handleDateChange}
          className="mt-2 p-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Available Time Slots */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Available Time Slots:</h3>
        <div className="grid grid-cols-4 gap-4">
  {timeSlotsArry.length > 0 ? (
    timeSlotsArry.map((slot: any) => (
      <div key={slot._id} className="flex flex-col items-center">
        <button
          className={`p-3 rounded-lg focus:outline-none focus:ring-2 ${
            slot.isBooked === 'booked'
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : selectedSlot === slot.startTime
              ? 'bg-green-500 text-white'
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
          disabled={slot.isBooked === 'booked'}
          onClick={() => handleSlotSelect(slot)}
        >
          {slot.startTime} - {slot.endTime}
        </button>
        <div className="mt-1 text-sm">
          {slot.isBooked === 'available' && <span className="text-green-500">(Available)</span>}
          {slot.isBooked === 'booked' && <span className="text-gray-500">(Booked)</span>}
          {slot.isBooked === 'canceled' && <span className="text-red-500">(Canceled)</span>}
        </div>
      </div>
    ))
  ) : (
    <p>No available slots for the selected date.</p>
  )}
</div>

      </div>

      {/* Book This Service Button */}
      <div className="mt-8">
        <button
          onClick={handleBooking}
          className="w-full p-3 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
        >
          Book This Service
        </button>
      </div>
    </div>
    <Footer/>
    </div>
  );
};

export default ServiceDetails;
