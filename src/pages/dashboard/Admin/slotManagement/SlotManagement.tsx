import { useState } from "react";
import { TSlotWithService } from "../../../../types/redux.type";
import { useCreateSlotMutation, useGetAllSlotsQuery, useUpdateSlotMutation } from "../../../../redux/features/slot/slots.api";
import { useGetServicesQuery } from "../../../../redux/features/services/services.api";

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

  return (
    <div>SlotManagement</div>
  )
}

export default SlotManagement