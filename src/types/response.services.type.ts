export type TServiceResponse = {
    _id?: string;
    name: string;
    description: string;
    photo: string;
    price: number;
    duration: number; // Duration in minutes
    isDeleted: boolean;
  };