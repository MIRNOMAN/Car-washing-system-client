import SectionTitle from "@/components/reUsable/SectionTitle";
import Loader from "@/components/shared/Loader";
import { useGetServiceDetailsQuery } from "@/redux/features/service";
import { Link, useParams } from "react-router-dom";
import { BsCurrencyDollar } from "react-icons/bs";
import { Field, FieldProps, Form, Formik, FormikProps } from "formik";
import { useState } from "react";
import { TService, TSlot } from "@/types";
import { formatDateToDDMMYYYY } from "@/utils/utils";

interface InitialValues {
  slot: string;
}

const initialValues: InitialValues = {
  slot: "",
};


const ServiceDetails = () => {
  const params = useParams();
  const serviceId = params?.id;
  const { data, isLoading } = useGetServiceDetailsQuery({ id: serviceId });
  const [selectedSlot, setSetSelectedSlot] = useState<(TService | TSlot)[]>([]);
  const serviceDetails = data?.data?.service as TService;
  const availableSlots = data?.data?.slots;

  const onSubmit = (values: InitialValues) => {
    console.log(values);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
 
      
  );
};

export default ServiceDetails;
