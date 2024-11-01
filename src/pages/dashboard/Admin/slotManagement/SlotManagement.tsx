import { useState } from "react";
import { TErrorResponse, TSlotWithService } from "../../../../types/redux.type";
import { useCreateSlotMutation, useGetAllSlotsQuery, useUpdateSlotMutation } from "../../../../redux/features/slot/slots.api";
import { useGetServicesQuery } from "../../../../redux/features/services/services.api";
import { toast } from "sonner";
import LoadingSpinier from "../../../../components/global/LoadingSpinier";

const slotStatusOptions = [
  {
    label: "Available",
    value: "available",
  },
  {
    label: "Cancel",
    value: "canceled",
  },
];

type TInitialValues = {
  isBooked: string;
};
type TCreateSlotInitialValues = {
  service: string;
  date: string;
  startTime: string;
  endTime: string;
};

const createSlotInitialValues: TCreateSlotInitialValues = {
  service: "",
  date: "",
  startTime: "",
  endTime: "",
};

const SlotManagement = () => {
  const { data, isLoading } = useGetAllSlotsQuery(undefined);
  const { data: servicesData } = useGetServicesQuery(undefined);
  const [updateSlot] = useUpdateSlotMutation();
  const [createSlot] = useCreateSlotMutation();
  // modal
  const [isSlotUpdateModalOpen, setSlotUpdateModalOpen] = useState(false);
  const [isSlotCreateModalOpen, setSlotCreateModalOpen] = useState(false);
  // utils
  const [selectedSlot, setSelectedSlot] = useState<TSlotWithService | null>(
    null
  );

  const initialValues = {
    isBooked: selectedSlot?.isBooked || "",
  };


  const handleUpdateSlot = async (values: TInitialValues) => {
    console.log(values);
    setSlotUpdateModalOpen(false);
    const toastId = toast.loading("Slot updating");
    if (selectedSlot) {
      try {
        const response = await updateSlot({
          slotInfo: values,
          id: selectedSlot._id,
        }).unwrap();
        toast.success(response.message, { id: toastId, duration: 2000 });
      } catch (error) {
        console.log(error);
        const err = error as TErrorResponse;
        toast.error(err?.data?.errorMessages[0].message, {
          id: toastId,
          duration: 2000,
        });
      }
    }
  };


  const handleCreateSlot = async (values: TCreateSlotInitialValues) => {
    setSlotCreateModalOpen(false);
    const toastId = toast.loading("Slot creating");
    try {
      const response = await createSlot(values).unwrap();
      toast.success(response.message, { id: toastId, duration: 2000 });
    } catch (error) {
      console.log("error", error);
      const err = error as TErrorResponse;
      toast.error(err?.data?.errorMessages[0].message, {
        id: toastId,
        duration: 2000,
      });
    }
  };

  if (isLoading) {
    return <LoadingSpinier />;
  }

  return (
    <div>SlotManagement</div>
  )
}

export default SlotManagement