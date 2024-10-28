import dayjs from "dayjs";

export const dateFormatter = (isoDate: string) => {
  return dayjs(isoDate).format("DD-MM-YYYY");
};