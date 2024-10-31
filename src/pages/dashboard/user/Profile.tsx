import { toast } from "sonner";
import LoadingSpinier from "../../../components/global/LoadingSpinier";
import { TErrorResponse } from "../../../types/redux.type";
import { FaEdit } from "react-icons/fa";
import { useGetUserInfoQuery, useUpdateUserMutation } from "../../../redux/features/user/user.api";
import { useState } from "react";
import CustomModal from "../../../components/reUsable/CustomModal";
import FormikForm from "../../../components/formik/FormikForm";
import Input from "../../../components/formik/Input";


type TEditUserInitialValues = {
  name: string;
  phone: string;
  address: string;
};


const Profile = () => {

  const { data, isLoading, error } = useGetUserInfoQuery(undefined);
  console.log("user", data, error);
  const userInfo = data?.data;
  const [updateUser] = useUpdateUserMutation();
  // modal
  const [isEditUserModalOpen, setEditUserModalOpen] = useState(false);

  const userProfileInitialValues: TEditUserInitialValues = {
    name: userInfo?.name,
    phone: userInfo?.phone,
    address: userInfo?.address,
  };

  const onSubmit = async (values: TEditUserInitialValues) => {
    setEditUserModalOpen(false);
    const toastId = toast.loading("User updating");
    if (userInfo) {
      try {
        const response = await updateUser({
          userData: values,
          id: userInfo._id,
        }).unwrap();
        toast.success(response.message, { id: toastId, duration: 2000 });
      } catch (error) {
        console.log(error);
        const err = error as TErrorResponse;
        toast.error(err?.data?.errorMessages[0].message, {
          id: toastId,
          duration: 2000,
        });
      }
    }
  };

  if (isLoading) {
    return <LoadingSpinier />;
  }

  return (
    <>
     <div>
     <main className="w-full min-h-screen py-1 md:w-2/3 lg:w-3/4">
    <div className="p-2 md:p-4">
        <div className="w-full px-6 pb-8 mt-8 sm:max-w-xl sm:rounded-lg">
            <h2 className="pl-6 text-2xl font-bold sm:text-xl">Public Profile</h2>

            <div className="grid max-w-2xl mx-auto mt-8">
                <div className="flex flex-col items-center space-y-5 sm:flex-row sm:space-y-0">

                    <img
                        className="object-cover w-40 h-40 p-1 rounded-full ring-2 ring-indigo-300 dark:ring-indigo-500"
                        src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGZhY2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
                        alt="Bordered avatar"
                    />
                </div>

                

                <div className="flex justify-center w-full">
          <div className="mt-6 relative grid grid-cols-1 sm:grid-cols-2 gap-6  lg:p-10 p-5 bg-primary-foreground/5 rounded-md w-full">
            <button
              onClick={() => setEditUserModalOpen(true)}
              className="absolute top-1 right-2 flex items-center gap-x-2"
            >
              <FaEdit /> Edit profile
            </button>
            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-gray-700">Name</h2>
              <p className="text-gray-500">{userInfo?.name}</p>
            </div>
            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-gray-700">Email</h2>
              <p className="text-gray-500">{userInfo?.email}</p>
            </div>
            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-gray-700">Phone</h2>
              <p className="text-gray-500">{userInfo?.phone}</p>
            </div>
            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-gray-700">Role</h2>
              <p
                className={`text-gray-500 ${
                  userInfo?.role === "admin"
                    ? "text-green-600"
                    : "text-blue-600"
                }`}
              >
                {userInfo?.role.charAt(0).toUpperCase() +
                  userInfo?.role.slice(1)}
              </p>
            </div>
            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-gray-700">Address</h2>
              <p className="text-gray-500">{userInfo?.address}</p>
            </div>
            
            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-gray-700">
                Last Updated
              </h2>
              <p className="text-gray-500">
                {new Date(userInfo?.updatedAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>
      <CustomModal
        isOpen={isEditUserModalOpen}
        setIsOpen={setEditUserModalOpen}
      >
        <FormikForm
          initialValues={userProfileInitialValues}
          onSubmit={onSubmit}
        >
          <Input name="name" label="Name" />
          <Input name="phone" label="Phone" />
          <Input name="address" label="Address" />
          <button type="submit" className="form-submit-btn bg-red-600 p-2 rounded-lg text-white w-full">
            Submit
          </button>
        </FormikForm>
      </CustomModal>

       
        </div>
      
    </div>
</main>
     </div>
    </>

  )
}

export default Profile