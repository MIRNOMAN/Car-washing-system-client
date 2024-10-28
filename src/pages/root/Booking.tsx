import { useCreateNewBookingMutation } from "../../redux/features/booking/booking.api";
import { useGetAvailableSlotsQuery } from "../../redux/features/slot/slots.api";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Booking = () => {
  const [createNewBooking] = useCreateNewBookingMutation();
  const { data: availableSlots } = useGetAvailableSlotsQuery({});
  console.log(availableSlots)
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({ name: "", email: "" });
  
  const selectedSlot = availableSlots?.data[0]; // For demonstration, select the first available slot

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handlePayment = async () => {
    try {
      const bookingData = {
        service: selectedSlot.service._id,
        date: selectedSlot.date,
        startTime: selectedSlot.startTime,
        endTime: selectedSlot.endTime,
        userName: userInfo.name,
        userEmail: userInfo.email,
      };
      await createNewBooking({ payload: bookingData }).unwrap();
      console.log(bookingData)
      toast.success("Redirecting to AAMARPAY for payment...");
      // Redirect to AAMARPAY payment
      // window.location.href = `https://aamarpay.com/checkout?booking_id=${bookingData.service}`;
      // navigate("/payment-success"); // Redirect to success page after payment
    } catch (error) {
      toast.error("Booking failed. Please try again.");
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-start p-6 bg-white shadow-lg rounded-lg animate-fadeIn">
      {/* Left Side - Service and Slot Details */}
      <div className="w-full md:w-1/2 p-4 space-y-4 animate-slideInLeft">
        <h2 className="text-2xl font-semibold text-gray-800">Service Details</h2>
        <div className="border rounded-lg p-4 shadow-md bg-gradient-to-r from-teal-200 to-teal-400 text-white">
          <p className="text-lg font-semibold">Selected Service</p>
          <p className="text-md mt-2">Service Name: <span className="font-medium">{selectedSlot?.service?.name}</span></p>
          <p className="text-md">Price: <span className="font-medium">${selectedSlot?.service?.price}</span></p>
          <p className="text-md">Duration: <span className="font-medium">{selectedSlot?.service?.duration} mins</span></p>
        </div>

        <div className="border rounded-lg p-4 shadow-md bg-gradient-to-r from-purple-200 to-purple-400 text-white">
          <p className="text-lg font-semibold">Selected Time Slot</p>
          <p className="text-md mt-2">Date: <span className="font-medium">{new Date(selectedSlot?.date).toLocaleDateString()}</span></p>
          <p className="text-md">Time: <span className="font-medium">{selectedSlot?.startTime} - {selectedSlot?.endTime}</span></p>
        </div>
      </div>

      {/* Right Side - User Information Form */}
      <div className="w-full md:w-1/2 p-4 mt-6 md:mt-0 animate-slideInRight">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Booking Information</h2>
        <form className="space-y-4">
          <div className="flex flex-col">
            <label className="text-md font-medium text-gray-600">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={userInfo.name}
              onChange={handleChange}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-md font-medium text-gray-600">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={userInfo.email}
              onChange={handleChange}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-md font-medium text-gray-600">Selected Time</label>
            <input
              type="text"
              value={`${selectedSlot?.startTime} - ${selectedSlot?.endTime}`}
              readOnly
              className="px-4 py-2 border rounded-lg bg-gray-100 text-gray-500"
            />
          </div>

          {/* Pay Now Button */}
          <button
            type="button"
            onClick={handlePayment}
            className="w-full bg-gradient-to-r from-teal-400 to-teal-600 hover:from-teal-500 hover:to-teal-700 text-white font-semibold py-2 rounded-lg transform transition duration-300 hover:scale-105 animate-bounce"
          >
            Pay Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default Booking;
