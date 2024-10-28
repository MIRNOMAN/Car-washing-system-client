import { TServiceResponse } from "./response.services.type";

export type TResponseSlot = {
  serviceId: TServiceResponse;
    date: string;
    startTime: string;
    endTime: string;
    isBooked: "available" | "booked" | "canceled";
    _id?: string;
  };


 