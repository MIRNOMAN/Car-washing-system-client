import { Link, useLocation, useNavigate } from "react-router-dom"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { useLoginUserMutation } from "../../redux/features/auth/authApi";
import { useAppDispatch } from "../../redux/hooks";
import toast from "react-hot-toast";
import { setUser, TUser } from "../../redux/features/auth/authSlice";
import { jwtDecode } from "jwt-decode";
import { FaEye, FaEyeSlash } from "react-icons/fa";



const Login = () => {
  const { register, handleSubmit } = useForm();
  const [showPassword1, setShowPassword1] = useState(false);
  const [loginUser] = useLoginUserMutation();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const searchParams = new URLSearchParams(location?.search);
  const redirect = searchParams.get('redirect');
  const navigate = useNavigate();


  const handleLoginAction: SubmitHandler<FieldValues> = async (credential) => {
    const toastId = toast.loading('Logging in...');

    try {
        const serverResponse = await loginUser(credential);
        if (!serverResponse?.data?.success) {
            toast.dismiss(toastId);

        } else {
            //! actual action
            const extractUserFormToken = (jwtDecode(serverResponse?.data?.token as string) as TUser);
            dispatch(setUser({
                user: extractUserFormToken,
                token: serverResponse?.data?.token
            }));

            navigate(redirect ? redirect : '/');
            toast.success('Logged in Success', { id: toastId });
        }

    } catch (error) {
        toast.error('An error occurred. Please try again later.', { id: toastId });
        console.log(error);
    }
}
  return (
    <div>
         
            <section data-aos='zoom-out' className="mt-5 mb-5">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <h2 className="text-3xl font-bold mb-5">Quick<span className='text-rose-600'>Wash</span></h2>
                    <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                                Sign in to your account
                            </h1>
                            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(handleLoginAction)}>
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email Address</label>
                                    <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="name@example.com" required {...register('email')} />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                                    <input type={showPassword1 ? 'text' : 'password'} id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 relative rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " required {...register('password')} />
                                    <p className="absolute hidden md:flex -mt-8 cursor-pointer curs ml-[350px]" onClick={() => setShowPassword1(!showPassword1)}>
                                        {showPassword1 ? <FaEyeSlash /> : <FaEye />}
                                    </p>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-start">
                                        <div className="flex items-center h-5">
                                            <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300" />
                                        </div>
                                        <div className="ml-3 text-sm">
                                            <label htmlFor="remember" className="text-gray-500">Remember me</label>
                                        </div>
                                    </div>
                                    <Link to={'/auth/recover'} className="text-sm font-medium text-primary-600 hover:underline">Forgot password?</Link>
                                </div>
                                <button type="submit" className="w-full text-white bg-rose-600 hover:bg-rose-700  font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Sign in</button>
                                <p className="text-sm font-light text-gray-500">
                                    Don’t have an account yet? <Link to={'/register'} className="font-medium text-primary-600 hover:underline">Sign up</Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
  )
}

export default Login