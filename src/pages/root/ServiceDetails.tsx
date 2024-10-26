import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCreateSlotMutation, useGetSingleServicesQuery } from '../../redux/features/services/services.api';
import { toast } from 'react-hot-toast';
import { TResponseSlot } from '../../types/response.slots.type';
import Footer from '../../components/shared/Footer';
import Navbar from '../../components/shared/Navbar';
import { timeSlotsArry } from '../../constants/TimeSlots';

const ServiceDetails = () => {
  const { _id } = useParams<{ _id: string | undefined }>();
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]); // Default to today's date
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  const { data: serviceData, isLoading: serviceLoading } = useGetSingleServicesQuery({ _id: _id ?? ''  });
  const [createSlot, { isLoading: bookingLoading }] = useCreateSlotMutation();

  const selectedSlotData = timeSlotsArry.find(slot => slot.startTime === selectedSlot);


  const mappedSlots = timeSlotsArry.map(slot => ({
    ...slot,
    service: _id ?? '',
    date: selectedDate,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    __v: 0,
  })) as TResponseSlot[];



  const handleSlotSelect = (slot: TResponseSlot) => {
    if (slot.isBooked === 'available') {
      setSelectedSlot(slot.startTime);
    }
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(event.target.value);
    setSelectedSlot(null);
  };

  const handleBooking = async () => {
    if (!selectedSlot) {
      toast.error('Please select a time slot.');
      return;
    }

    if (!selectedSlotData?.endTime) {
      toast.error('End time is required to book the slot.');
      return;
    }

    const slotData: TResponseSlot = {
      _id: _id ?? "", // Providing fallback
      service: _id ?? "",
      date: selectedDate,
      startTime: selectedSlot,
      endTime: selectedSlotData?.endTime ?? "", // Providing fallback for potentially undefined field
      isBooked: 'booked',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      __v: 0,
    };

    try {
      const res = await createSlot(slotData).unwrap();
      if (res?.success) {
        toast.success('Slot booked successfully!');
      } else {
        throw new Error('Booking failed due to server error.');
      }
    } catch (error) {
      toast.error('Failed to book the slot. Please try again.');
      console.error('Booking error:', error);
    }
  };

  if (serviceLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        {/* Service Information */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">{serviceData?.data?.name || 'Service Name'}</h2>
          <p className="text-gray-700 mt-2">{serviceData?.data?.description || 'Detailed description of the selected service goes here...'}</p>
          <p className="text-xl text-blue-600 font-semibold mt-4">Price: ${serviceData?.data?.price}</p>
          <p className="text-sm text-gray-600 mt-1">Duration: {serviceData?.data?.duration} hours</p>
        </div>

        {/* Calendar */}
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
            {mappedSlots.length > 0 ? (
              mappedSlots.map(slot => (
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
            disabled={bookingLoading}
            className="w-full p-3 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            {bookingLoading ? 'Booking...' : 'Book This Service'}
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ServiceDetails;
