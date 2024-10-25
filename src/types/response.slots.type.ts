export type TResponseSlot = {
  _id: string;
  service: string;
  date: string; // ISO date string
  startTime: string;
  endTime: string;
  isBooked: 'available' | 'booked' | 'canceled';
  createdAt: string;
  updatedAt: string;
  __v: number;
  };