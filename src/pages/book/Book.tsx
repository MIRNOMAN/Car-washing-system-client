import { useLocation } from "react-router-dom";
import { TUser, useCurrentUser } from "../../redux/features/auth/authSlice";
import { useCreateBookingMutation } from "../../redux/features/booking/booking.api";
import { useAppSelector } from "../../redux/hooks";
import { toast } from "sonner";
import { BsCurrencyDollar } from "react-icons/bs";
import { formatDateToDDMMYYYY } from "../../utils/utils";
import { Form, Formik, FormikProps } from "formik";
import Input from "../../components/formik/Input";
import Dropdown from "../../components/formik/Dropdown";
import { vehicleOptions } from "../../utils/const.utils";

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
  const serviceDetails = selectedSlot?.[0] || {};
  const slotDetails = selectedSlot?.[1] || {};

  const userInfo = useAppSelector(useCurrentUser) as TUser;
  const [createBooking] = useCreateBookingMutation();

  const initialValues: TInitialValues = {
    name: userInfo?.name || "",
    email: userInfo?.email || "",
    amount: serviceDetails?.price?.toString() || "0",
    vehicleType: "",
    registrationPlate: "",
    time: slotDetails?.startTime && slotDetails?.endTime ? `${slotDetails.startTime} - ${slotDetails.endTime}` : "",
    vehicleBrand: "",
    vehicleModel: "",
    manufacturingYear: "",
  };

  const onSubmit = async (values: TInitialValues) => {
    const toastId = toast.loading("Booking request processing", { duration: 2000 });
    const bookingInfo = {
      serviceId: serviceDetails?._id,
      slotId: slotDetails?._id,
      vehicleType: values.vehicleType,
      vehicleBrand: values.vehicleBrand,
      vehicleModel: values.vehicleModel,
      manufacturingYear: values.manufacturingYear,
      registrationPlate: values.registrationPlate,
      amount: values.amount,
    };

    try {
      const response = await createBooking(bookingInfo).unwrap();
      if (response?.message === "Booking successful") {
        window.location.href = response?.data?.payment_url;
      }
    } catch (error) {
      console.error("Booking error:", error);
      toast.error("Something went wrong", { id: toastId, duration: 2000 });
    }
  };

  return (
    <div className="mx-3 pt-[50px] pb-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-rose-600 Oswald">Secure Your Slot</h1>
        <p className="text-xl mt-1 Montserrat mb-5">Choose your preferred service slot and complete your booking with ease</p>
      </div>
      <div className="grid lg:grid-cols-2 grid-cols-1 lg:gap-x-[70px]">
        <div>
          <div className="flex flex-col gap-y-5">
            <div className="bg-primary-foreground/5 p-5 rounded-md">
              <h2 className="text-xl font-semibold text-primary-foreground mb-5">Service Details</h2>
              <h3 className="text-xl font-semibold mb-2">{serviceDetails?.name || "N/A"}</h3>
              <p>{serviceDetails?.description?.slice(0, 50) || "No description available."}</p>
              <div className="flex gap-x-5 w-full mt-2">
                <p className="font-medium">Duration: {serviceDetails?.duration || "N/A"}</p>
                <p className="font-medium flex items-center">
                  Price: {serviceDetails?.price || "0"} <BsCurrencyDollar />
                </p>
              </div>
            </div>
            <div className="p-5 rounded-md bg-primary-foreground/5">
              <h2 className="text-xl font-semibold text-primary-foreground mb-5">Slot Details</h2>
              <p>Status: <span className="font-medium capitalize">{slotDetails?.isBooked || "unknown"}</span></p>
              <p>Date: <span className="font-medium">{formatDateToDDMMYYYY(slotDetails?.date) || "N/A"}</span></p>
              <div className="flex gap-x-5">
                <p>Start time: <span className="font-medium">{slotDetails?.startTime || "N/A"}</span></p>
                <p>End time: <span className="font-medium">{slotDetails?.endTime || "N/A"}</span></p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <Formik initialValues={initialValues} onSubmit={onSubmit}>
            {({ setFieldValue }: FormikProps<TInitialValues>) => (
              <Form className="space-y-5">
                <Input name="name" label="Name" readOnly />
                <Input name="email" label="Email" readOnly />
                <Input name="time" label="Time" readOnly />
                <Input name="amount" label="Price" readOnly />
                <Dropdown
                  label="Vehicle Type"
                  name="vehicleType"
                  options={vehicleOptions}
                  setFieldValue={setFieldValue}
                  placeholder="Select vehicle type"
                />
                <Input name="registrationPlate" label="Registration Plate" required />
                <Input name="vehicleBrand" label="Vehicle Brand" />
                <Input name="vehicleModel" label="Vehicle Model" />
                <Input name="manufacturingYear" label="Manufacturing Year" />
                <button type="submit" className="bg-red-600 p-2 rounded-lg text-white w-full">
                  Pay Now
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Book;
