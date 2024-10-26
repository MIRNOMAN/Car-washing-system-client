export type TResponseSlot = {
  _id: string | number;
  service: string;
  date: string;
  startTime: string;
  endTime: string;
  isBooked: 'available' | 'booked' | 'canceled';
  createdAt: string;
  updatedAt: string;
  __v: number;
  };