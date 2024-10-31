import { toast } from "sonner";
import { TErrorResponse, TService } from "../../../../types/redux.type";
import { useState } from "react";
import { useCreateServiceMutation, useDeleteServiceMutation, useGetServicesQuery, useUpdateServiceMutation } from "../../../../redux/features/services/services.api";
import CustomModal from "../../../../components/reUsable/CustomModal";
import FormikForm from "../../../../components/formik/FormikForm";
import Input from "../../../../components/formik/Input";
import LoadingSpinier from "../../../../components/global/LoadingSpinier";

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
      return <LoadingSpinier />;
    }
  

  return (
    <>
    <div className="">
    <div className="text-center">
        <h1 className="text-3xl font-bold text-rose-600 Oswald">Service Management</h1>
        <p className="text-xl mt-1 Montserrat">Manage your services efficiently and keep track of all service details</p>
      </div>
      <div className="flex justify-end mb-5">
        <button
          onClick={() => setAddServiceModalOpen(true)}
          className="form-submit-btn"
        >
          Add Service
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-gray-600 tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-gray-600 tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-gray-600 tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-gray-600 tracking-wider">
                Duration (mins)
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-gray-600 tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {}
            {data?.data.map((service: TService) => (
              <tr key={service._id} className="hover:bg-gray-100">
                <td className="px-6 py-4 border-b border-gray-200">
                  {service.name}
                </td>
                <td className="px-6 py-4 border-b border-gray-200">
                  {service.description}
                </td>
                <td className="px-6 py-4 border-b border-gray-200">
                  ${service.price}
                </td>
                <td className="px-6 py-4 border-b border-gray-200">
                  {service.duration} mins
                </td>
                <td className="px-6 py-4 border-b border-gray-200">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => {
                        setServiceDetails(service);
                        setServiceUpdateModalOpen(true);
                      }}
                      className="text-white bg-primary-foreground py-1 px-4 rounded-md font-medium"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        setServiceDeleteModalOpen(true);
                        setServiceId(service._id);
                      }}
                      className="text-white bg-primary py1 px-4 rounded-md font-medium"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    {/* create service */}
    <CustomModal
      isOpen={isAddServiceModalOpen}
      setIsOpen={setAddServiceModalOpen}
    >
      <FormikForm initialValues={initialValues} onSubmit={onSubmit}>
        <Input name="name" label="Name" />
        <Input name="description" label="Description" />
        <Input name="price" label="Price" type="number" />
        <Input name="duration" label="Duration" type="number" />
        <button type="submit" className="form-submit-btn w-full">
          Submit
        </button>
      </FormikForm>
    </CustomModal>
    {/* update service */}
    <CustomModal
      isOpen={isServiceUpdateModalOpen}
      setIsOpen={setServiceUpdateModalOpen}
    >
      <FormikForm
        initialValues={serviceUpdateInitialValues}
        onSubmit={handleServiceUpdate}
      >
        <Input name="name" label="Name" />
        <Input name="description" label="Description" />
        <Input name="price" label="Price" type="number" />
        <Input name="duration" label="Duration" type="number" />
        <button type="submit" className="form-submit-btn w-full">
          Submit
        </button>
      </FormikForm>
    </CustomModal>
    {/* delete service */}
    <CustomModal
      isOpen={isServiceDeleteModalOpen}
      setIsOpen={setServiceDeleteModalOpen}
    >
      <div className="flex flex-col items-center w-full">
        <h2 className="text-xl font-semibold">Are you sure?</h2>
        <h3 className="text-lg font-medium">You want to delete it?</h3>
        <div className="flex justify-between mt-5 w-full">
          <button
            onClick={() => setServiceDeleteModalOpen(false)}
            className="text-white bg-primary-foreground py-2 px-6 font-semibold rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={() => handleServiceDelete(serviceID)}
            className="text-white bg-primary py-2 px-6 font-semibold rounded-md"
          >
            Delete
          </button>
        </div>
      </div>
    </CustomModal>
  </>
  )
}

export default ServiceManagement