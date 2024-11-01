import { useLocation } from "react-router-dom";
import { TUser, useCurrentUser } from "../../redux/features/auth/authSlice";
import { useCreateBookingMutation } from "../../redux/features/booking/booking.api";
import { useAppSelector } from "../../redux/hooks";
import { toast } from "sonner";

interface TInitialValues {
  name: string;
  email: string;
  time: string;
  amount: string;
  vehicleType: string;
  registrationPlate: string;
  vehicleBrand: string;
  vehicleModel: string;
  manufacturingYear: string;
}

const Book = () => {
  const location = useLocation();
  const selectedSlot = location.state;
  const serviceDetails = selectedSlot[0];
  const slotDetails = selectedSlot[1];

  const userInfo = useAppSelector(useCurrentUser) as TUser;

  const [createBooking] = useCreateBookingMutation();

  const initialValues: TInitialValues = {
    name: userInfo?.name || "",
    email: userInfo?.email || "",
    amount: serviceDetails?.price || "",
    vehicleType: "",
    registrationPlate: "ABC420",
    time: `${slotDetails?.startTime} - ${slotDetails?.endTime}`,
    vehicleBrand: "RR",
    vehicleModel: "Galaxy",
    manufacturingYear: "2023",
  };


  const onSubmit = async (values: TInitialValues) => {
    const toastId = toast.loading("Booking request processing", {
      duration: 2000,
    });
    const bookingInfo = {
      serviceId: serviceDetails?._id,
      slotId: slotDetails?._id,
      vehicleType: values?.vehicleType,
      vehicleBrand: values?.vehicleBrand,
      vehicleModel: values?.vehicleModel,
      manufacturingYear: values?.manufacturingYear,
      registrationPlate: values?.manufacturingYear,
      amount: values?.amount,
    };
    try {
      const response = await createBooking(bookingInfo).unwrap();
      if (response?.message === "Booking successful") {
        window.location.href = response?.data?.payment_url;
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong", {
        id: toastId,
        duration: 2000,
      });
    }
  };

  return (
    <div>Book</div>
  )
}

export default Book