import { useState } from "react";
import { TUserResponse } from "../../../../types/redux.type";
import { useGetAllUsersQuery, useUpdateUserMutation } from "../../../../redux/features/user/user.api";
import LoadingSpinier from "../../../../components/global/LoadingSpinier";

const userRoleOptions = [
  {
    label: "User",
    value: "user",
  },
  {
    label: "Admin",
    value: "admin",
  },
];

type TInitialValues = {
  role: string;
};

const UserManagement = () => {
  const { data, isLoading } = useGetAllUsersQuery(undefined);
  const [updateUser] = useUpdateUserMutation();
  // modal
  const [isUserUpdateModalOpen, setUserUpdateModalOpen] = useState(false);
  const [userInfo, setUserInfo] = useState<TUserResponse | null>(null);

  const initialValues: TInitialValues = {
    role: userInfo?.role || "",
  };


  const handleUserUpdate = async (values: TInitialValues) => {
    setUserUpdateModalOpen(false);
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
    <div>UserManagement</div>
  )
}

export default UserManagement