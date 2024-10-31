import { toast } from "sonner";
import LoadingSpinier from "../../../components/global/LoadingSpinier";
import { TErrorResponse } from "../../../types/redux.type";

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

                
            </div>
        </div>
    </div>
</main>

  )
}

export default Profile