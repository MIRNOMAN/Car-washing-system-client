import { useState } from "react";
import { TUserResponse } from "../../../../types/redux.type";
import { useGetAllUsersQuery, useUpdateUserMutation } from "../../../../redux/features/user/user.api";

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

  return (
    <div>UserManagement</div>
  )
}

export default UserManagement