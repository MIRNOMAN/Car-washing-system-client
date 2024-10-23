import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { toast } from 'react-hot-toast';
import { useGetSingleServicesQuery } from '../../redux/features/services/services.api';

const ServiceDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { service, slots, loading } = useGetSingleServicesQuery({});
  
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedSlot, setSelectedSlot] = useState(null);

  useEffect(() => {
    dispatch(fetchServiceDetails(id));
    dispatch(fetchAvailableSlots({ serviceId: id, date: selectedDate.toISOString().split('T')[0] }));
  }, [dispatch, id, selectedDate]);

  const handleSlotClick = (slot) => {
    if (!slot.isBooked) {
      setSelectedSlot(slot);
      dispatch(selectSlot(slot));
    }
  };

  const handleBookService = () => {
    if (selectedSlot) {
      // Replace with actual booking API call
      toast.success('Service booked successfully!');
    } else {
      toast.error('Please select a time slot.');
    }
  };

  if (loading) return <div>Loading...</div>;
  
  return (
    <div className="container mx-auto p-4">
    {service && (
      <div className="mb-4">
        <h2 className="text-2xl font-bold">{service.name}</h2>
        <p>{service.description}</p>
        <p>Price: ${service.price}</p>
      </div>
    )}

    <div className="mb-4">
      <h3 className="text-xl font-semibold">Available Time Slots</h3>
      <Calendar onChange={setSelectedDate} value={selectedDate} />
      <div className="grid grid-cols-2 gap-4 mt-2">
        {slots.map((slot) => (
          <button
            key={slot.startTime}
            className={`p-2 border rounded ${slot.isBooked ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
            onClick={() => handleSlotClick(slot)}
            disabled={slot.isBooked}
          >
            {slot.startTime} - {slot.endTime}
          </button>
        ))}
      </div>
    </div>

    <button
      onClick={handleBookService}
      className={`mt-4 p-2 bg-green-500 text-white rounded ${!selectedSlot ? 'opacity-50 cursor-not-allowed' : ''}`}
      disabled={!selectedSlot}
    >
      Book This Service
    </button>
  </div>
  )
}

export default ServiceDetails