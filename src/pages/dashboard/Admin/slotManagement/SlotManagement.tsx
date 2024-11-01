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
  return (
    <div>SlotManagement</div>
  )
}

export default SlotManagement