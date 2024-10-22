/* eslint-disable @typescript-eslint/no-unused-vars */
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useCreateUserMutation } from "../../redux/features/auth/authApi";
import { useState } from "react";

const Register = () => {
  const { register, handleSubmit, reset } = useForm();
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [createUser] = useCreateUserMutation();
  const navigate = useNavigate();

  const handleAccountRegister: SubmitHandler<FieldValues> = async (data) => {
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const toastId = toast.loading("Working...");

    if (!passwordRegex.test(data.password)) {
      toast.error(
        "Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character.",
        { id: toastId }
      );
      return;
    }

    if (data.password !== data.password2) {
      toast.error("Passwords do not match", { id: toastId });
      return;
    }

    const { password2, ...dataWithoutConfirmPassword } = data;
    const dataForBackend = { ...dataWithoutConfirmPassword, role: "user" };

    try {
      const serverResponse = await createUser(dataForBackend).unwrap();

      if (serverResponse?.success) {
        toast.success("Registration Successful! Please login.", { id: toastId });
        reset();
        navigate("/auth/login");
      } else {
        toast.dismiss(toastId);
        toast.error("Failed to register, please try again.");
      }
    } catch (error) {
      toast.dismiss(toastId);
      toast.error("An error occurred. Please try again later.", { id: toastId });
      console.error(error);
    }
  };

  return (
    <div>

      <section className="" data-aos="zoom-out">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:min-h-screen md:!pt-20 lg:py-0">
          <h2 className="text-3xl font-bold Oswald mb-5">
            Quick<span className="text-rose-600">Wash</span>
          </h2>
          <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                Create your account
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(handleAccountRegister)}>
                <div>
                  <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Ex: Name..."
                    required
                    {...register("name")}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Ex: name@example.com"
                    required
                    {...register("email")}
                  />
                </div>
                <div>
                  <label htmlFor="number" className="block mb-2 text-sm font-medium text-gray-900">
                    Phone Number
                  </label>
                  <input
                    type="number"
                    id="phone"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Ex: 01700000000"
                    {...register("phone")}
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
                    Password
                  </label>
                  <input
                    type={showPassword1 ? "text" : "password"}
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 relative rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    required
                    {...register("password")}
                  />
                  <p
                    className="absolute hidden md:flex -mt-8 cursor-pointer curs ml-[350px]"
                    onClick={() => setShowPassword1(!showPassword1)}
                  >
                    {showPassword1 ? <FaEyeSlash /> : <FaEye />}
                  </p>
                </div>
                <div>
                  <label htmlFor="password2" className="block mb-2 text-sm font-medium text-gray-900">
                    Confirm Password
                  </label>
                  <input
                    type={showPassword2 ? "text" : "password"}
                    id="password2"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 relative rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    required
                    {...register("password2")}
                  />
                  <p
                    className="absolute hidden md:flex -mt-8 cursor-pointer ml-[350px]"
                    onClick={() => setShowPassword2(!showPassword2)}
                  >
                    {showPassword2 ? <FaEyeSlash /> : <FaEye />}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
                        required
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="remember" className="text-gray-500">
                        Accept our{" "}
                        <Link to="/" className="text-rose-600 hover:underline">
                          Terms & Conditions
                        </Link>
                      </label>
                    </div>
                  </div>
                </div>
                <button type="submit" className="w-full text-white bg-rose-600 hover:bg-rose-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                  Sign in
                </button>
                <p className="text-sm font-light text-gray-500">
                  Already have an account?{" "}
                  <Link to="/auth/login" className="font-medium text-primary-600 hover:underline">
                    Sign in
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Register;
