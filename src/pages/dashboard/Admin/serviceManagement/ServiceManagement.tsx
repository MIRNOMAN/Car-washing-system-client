import { toast } from "sonner";
import { TErrorResponse, TService } from "../../../../types/redux.type";
import { useState } from "react";
import { useCreateServiceMutation, useDeleteServiceMutation, useGetServicesQuery, useUpdateServiceMutation } from "../../../../redux/features/services/services.api";

type TInitialValues = {
  name: string;
  description: string;
  price: number;
  duration: number;
};

const initialValues: TInitialValues = {
  name: "",
  description: "",
  price: 60,
  duration: 40,
};

const ServiceManagement = () => {
    // api
    const { data, isLoading } = useGetServicesQuery(undefined);
    const [serviceInfo] = useCreateServiceMutation();
    const [deleteService] = useDeleteServiceMutation();
    const [serviceData] = useUpdateServiceMutation();
    // modal
    const [isAddServiceModalOpen, setAddServiceModalOpen] = useState(false);
    const [isServiceDeleteModalOpen, setServiceDeleteModalOpen] = useState(false);
    const [isServiceUpdateModalOpen, setServiceUpdateModalOpen] = useState(false);
    // utils
    const [serviceID, setServiceId] = useState("");
    const [serviceDetails, setServiceDetails] = useState<TService | null>(null);
  
    const serviceUpdateInitialValues = {
      name: serviceDetails?.name || "",
      description: serviceDetails?.description || "",
      price: serviceDetails?.price || 0,
      duration: serviceDetails?.duration || 0,
    };
  
    const onSubmit = async (values: TInitialValues) => {
      setAddServiceModalOpen(false);
      const toastId = toast.loading("Service creating");
      try {
        const res = await serviceInfo(values).unwrap();
        toast.success(res.message, { id: toastId, duration: 2000 });
      } catch (error) {
        console.log("error", error);
        const err = error as TErrorResponse;
        toast.error(err?.data?.errorMessages[0].message, {
          id: toastId,
          duration: 2000,
        });
      }
    };

 
    const handleServiceDelete = async (id: string) => {
      setServiceDeleteModalOpen(false);
      const toastId = toast.loading("Service deleting");
      try {
        const response = await deleteService(id).unwrap();
        console.log(response);
        toast.success("Service deleted", { id: toastId });
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong", { id: toastId });
      }
    };


    const handleServiceUpdate = async (values: TInitialValues) => {
      console.log(values);
      if (!serviceDetails) {
        // Handle the case where serviceDetails is null
        toast.error("Service details are not available.", { duration: 2000 });
        return;
      }
      setServiceUpdateModalOpen(false);
      const toastId = toast.loading("Service updating");
      try {
        const response = await serviceData({
          serviceData: values,
          id: serviceDetails._id,
        }).unwrap();
        console.log(response);
        toast.success(response.message, { id: toastId, duration: 2000 });
      } catch (error) {
        console.log(error);
        const err = error as TErrorResponse;
        toast.error(err?.data?.errorMessages[0].message, {
          id: toastId,
          duration: 2000,
        });
      }
    };
  
    if (isLoading) {
      return <Loader />;
    }
  

  return (
    <div>ServiceManagement</div>
  )
}

export default ServiceManagement