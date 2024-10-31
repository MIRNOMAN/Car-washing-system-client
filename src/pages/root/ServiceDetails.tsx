import { Link, useParams } from "react-router-dom";
import { BsCurrencyDollar } from "react-icons/bs";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { TService, TSlot } from "../../types/redux.type";
import { formatDateToDDMMYYYY } from "../../utils/utils";
import { useGetServiceDetailsQuery } from "../../redux/features/services/services.api";
import LoadingSpinier from "../../components/global/LoadingSpinier";

interface FormValues {
  slot: string;
}

const ServiceDetails = () => {
  const params = useParams();
  const serviceId = params?.id;
  const { data, isLoading } = useGetServiceDetailsQuery({ id: serviceId });
  const [selectedSlot, setSelectedSlot] = useState<(TService | TSlot)[]>([]);
  const serviceDetails = data?.data?.service as TService;
  const availableSlots = data?.data?.slots;

  const { handleSubmit, control, watch } = useForm<FormValues>({
    defaultValues: { slot: "" },
  });

  const onSubmit = (values: FormValues) => {
    console.log(values);
  };

  const selectedSlotValue = watch("slot");

  if (isLoading) {
    return <LoadingSpinier />;
  }

  return (
    <div className="container">
      <div>
        <h1>{serviceDetails?.name}</h1>
        <p>{serviceDetails?.description}</p>
      </div>
      {availableSlots.length === 0 && (
        <div className="my-10 text-xl font-medium text-center">
          No available slot
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="">
        <div className="grid grid-cols-3 gap-5">
          <Controller
            name="slot"
            control={control}
            render={({ field }) => (
              availableSlots?.map((option: TSlot) => {
                const checkedValue = field.value === option?._id;
                const isBooked = option.isBooked === "booked";
                return (
                  <div key={option._id} className={``}>
                    <input
                      disabled={isBooked}
                      type="radio"
                      id={option._id}
                      {...field}
                      value={option._id}
                      checked={checkedValue}
                      className={`hidden radio`}
                      onClick={() => setSelectedSlot([serviceDetails, option])}
                    />
                    <label
                      htmlFor={option._id}
                      className={`${isBooked ? "cursor-default" : "cursor-pointer"} `}
                    >
                      <div
                        className={`p-5 rounded-md space-y-1 ${
                          checkedValue
                            ? "bg-primary text-white"
                            : "bg-primary-foreground/5"
                        }`}
                      >
                        <h3 className="text-xl font-semibold mb-2">
                          {serviceDetails?.name}
                        </h3>
                        <p>{serviceDetails?.description}</p>
                        <p>Status: <span className="font-medium capitalize">{option.isBooked}</span></p>
                        <p>
                          Date: <span className="font-medium">{formatDateToDDMMYYYY(option.date)}</span>
                        </p>
                        <p className="font-medium flex items-center">
                          Price: {serviceDetails?.price} <BsCurrencyDollar />
                        </p>
                        <div className="flex gap-x-5">
                          <p>Start time: <span className="font-medium">{option.startTime}</span></p>
                          <p>End time: <span className="font-medium">{option.endTime}</span></p>
                        </div>
                      </div>
                    </label>
                  </div>
                );
              })
            )}
          />
        </div>
        <div className="pt-10 text-end">
          {selectedSlotValue && (
            <Link
              to="/book-now"
              state={selectedSlot}
              className="form-submit-btn"
            >
              Book This Service
            </Link>
          )}
        </div>
      </form>
    </div>
  );
};

export default ServiceDetails;
