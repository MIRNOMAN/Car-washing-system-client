import React, { FC, useEffect, useState } from 'react';
import axios from 'axios';
import demoProfile from '../../assets/demoProfile.png';
import { GetProps, Input } from 'antd';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import sendEmail from '../../utils/sendEmail';
import Navbar from '../../components/shared/Navbar';
import Footer from '../../components/shared/Footer';
import { TAuthEmail, TNotificationEmail } from '../../types/email.emailjs.params.interface';
type OTPProps = GetProps<typeof Input.OTP>;


interface TAxiosResponse {
  name: string;
  email: string;
  token: string
}

const WRONG_EMAIL_LIMIT = 3;
const LOCK_TIME = 15 * 60 * 1000;

const Recover: FC  = () => {

  const [user, setUser] = useState<TAxiosResponse | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [failedAttempts, setFailedAttempts] = useState<number>(0);
    const [isLocked, setIsLocked] = useState<boolean>(false);
    // const [lockTime, setLockTime] = useState<Date | null>(null);
    const [openModal, setOpenModal] = useState(false);
    const [verificationCode, setVerificationCode] = useState<string | null>(null);
    const [passed, setPassed] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleFindUser = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();
        setError('Searching...');
        const email = (event.target as HTMLFormElement).email.value;

        try {
            const res = await axios.get<{ success: boolean; data: TAxiosResponse }>(`https://car-washing-system-sandy.vercel.app/api/auth/user/recovery`, {
                params: {
                    email
                }
            });
            if (res?.data?.success) {
                setFailedAttempts(0);
                setUser((res.data?.data as TAxiosResponse));
                setError(null);

            } else {
                const newFailedAttempts = failedAttempts + 1;
                setFailedAttempts(newFailedAttempts);

                const remainingAttempts = WRONG_EMAIL_LIMIT - newFailedAttempts;

                if (newFailedAttempts >= WRONG_EMAIL_LIMIT) {
                    const lockUntil = new Date(Date.now() + LOCK_TIME);
                    setIsLocked(true);
                    localStorage.setItem('lockTime', lockUntil.toString());
                    setError(`Bro! Too many failed attempts. Session restricted for 15 minutes.`)
                } else {
                    setError(`Invalid email. You have ${remainingAttempts} attempt(s) left.`);
                }
            }
        } catch (error) {
            setError('Something went wrong');
            console.log(error);
        }
    };

    const handleSendVerificationEmail = async () => {
      const toastId = toast.loading('Sending Email...');
      const sixDigitCode = String(Math.floor(100000 + Math.random() * 900000))
      setVerificationCode(sixDigitCode);
    
      // DONE: Email verification code to user for password reset
      const EMAIL_PARAMS: TAuthEmail = {
        name: user?.name as string,
        email: user?.email as string,
        otp: sixDigitCode
      }
      console.log(EMAIL_PARAMS)
      try {
        const res = await sendEmail(1, EMAIL_PARAMS);
        console.log("Email service response: ", res);  // Add this log to see the response
        if (res?.status === 200) {
          toast.success('Verification email sent. Check your inbox/spam folder.', { id: toastId });
          setOpenModal(true);
        } else {
          throw new Error('Email service failed');
        }
      } catch (error) {
        console.error('Email sending error: ', error);  // Detailed error logging
        toast.error('Failed to send verification email. Try again later.', {
          id: toastId
        });
        setUser(null);
      }
    }

  const onChange: OTPProps['onChange'] = (inputtedVerificationCode) => {
    setError(null);
    if (inputtedVerificationCode !== verificationCode) {
        setError(' OTP did not match. Check again');
        return
    }
    setPassed(true);
    setOpenModal(false);
};

const sharedProps: OTPProps = {
    onChange,
};
const handleChangePassword = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  setError(null);
  const toastId = toast.loading('Working...')
  const password = (event.target as HTMLFormElement)?.password?.value;
  const password2 = (event.target as HTMLFormElement)?.password2?.value;
  const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  if (!passwordRegex.test(password)) {
      setError(`Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character`);
      toast.dismiss(toastId);
      return;
  } else if (password !== password2) {
      setError(`Password did not match`);
      toast.dismiss(toastId);
      return;
  } else {
      // DONE: call the server to set new password;
      const res = await axios.patch<{ success: boolean; message: string }>(`https://car-washing-system-sandy.vercel.app/api/auth/user/recovery/passed`, {
          token: user?.token,
          newPassword: password
      });

      if (res.data.success) {
          const EMAIL_PARAMS: TNotificationEmail = {
              subject: 'Welcome back',
              name: user?.name as string,
              email: user?.email as string,
              description: `We happy to inform you that your RentNGo account has been successfully recovered. You can now log in to your account using your new password. 
              
              If you did not initiate this password recovery, please contact our support team immediately.`
          };

          const emailjsRes = await sendEmail(2, EMAIL_PARAMS);
          if (emailjsRes?.status === 200) {
              toast.success(res.data.message, { id: toastId });
              navigate('/auth/login');
              setUser(null);
              setPassed(false);
          }

      } else {
          toast.error(res.data.message, { id: toastId });
          setUser(null);
          setPassed(false);
      }
  }
}

useEffect(() => {
  const savedLockTime = localStorage.getItem('lockTime');
  if (savedLockTime) {
      const timeLeft = new Date(savedLockTime).getTime() - Date.now();
      if (timeLeft > 0) {
          setError('Too many failed attempts. Session restricted for 15 minutes.')
          setIsLocked(true);
          setTimeout(() => {
              setIsLocked(false);
              localStorage.removeItem('lockTime');
          }, timeLeft);
      }
  }
}, []);

  return (
    <div>
            <Navbar />
            <div data-aos='zoom-out' className="min-h-screen flex justify-center px-5 items-center -mt-5 md:-mt-20">
                <div className={`md:h-96 ${user ? 'md:flex' : 'block'} justify-between w-full md:w-[${user ? '80%' : '40%'}] mx-auto py-16 md:py-0 shadow-md rounded-md`}>
                    {/* search */}
                    <div className="flex flex-1 justify-center h-full px-5 md:px-10 flex-col">
                        <div className="mb-10">
                            <h1 className='text-3xl font-semibold text-gray-700'>Recover Your Account</h1>
                            <p className='text-gray-700'>Sorry to hear that you have forgotten your account information, but no problem, we will help you recover it.</p>

                        </div>
                        <form className={`${user ? 'hidden' : 'flex'} items-center`} onSubmit={handleFindUser}>
                            <input
                                disabled={isLocked}
                                name='email'
                                id="Enter Email Address"
                                type="email"
                                placeholder="Enter Email Address"
                                className="w-full px-4 py-2 border border-rose-600 rounded-l-md focus:outline-none focus:ring-0"
                                required
                            />
                            <button type={isLocked ? 'button' : 'submit'} className={`py-2 px-3 border hover:bg-rose-700 transition-all border-rose-600 bg-rose-600 text-white rounded-r-md`}>Search</button>
                        </form>
                        {!passed && <p className='text-sm text-rose-600 ml-1'>{error}</p>}
                        {!error && !user && <p className='ml-1 text-sm text-gray-400'>Note: 3 wrong attempts will lock you out for 15 minutes.</p>}
                    </div>

                    {/* profile details */}
                    {user && !passed && <div data-aos='zoom-out' className="flex-1 border-t md:border-t-0">
                        <p className='text-end p-5 text-xl font-semibold cursor-pointer' onClick={() => setUser(null)}>x</p>
                        <div className=" flex flex-col mt-2 justify-center px-5 md:px-10 items-center border-l">
                            {/* name and photo */}
                            <div className="flex flex-col justify-center items-center">
                                <img
                                    src={demoProfile}
                                    alt="Profile photo"
                                    className="w-24 h-24 rounded-full shadow-lg mb-4"
                                />
                                <h3 className='text-xl text-gray-700'>{user?.name}</h3>
                                <small>{user?.email}</small>

                            </div>
                            <div className="mt-7">
                                <button onClick={handleSendVerificationEmail} className='py-2 px-3 rounded-md hover:bg-rose-700 transition-all bg-rose-600 text-white'>Send Verification Code To Email</button>
                            </div>
                        </div>
                    </div>}

                    {passed && user && <div data-aos='zoom-out' className="flex-1 border-t md:border-t-0">
                        <p className='text-end p-5 text-xl font-semibold cursor-pointer' onClick={() => {
                            setUser(null);
                            setPassed(false);
                        }}>x</p>
                        <div className=" flex flex-col mt-2 justify-center px-5 md:px-10 items-center border-l">
                            {/* name and photo */}
                            <form className='w-full' onSubmit={handleChangePassword}>
                                <h3 className='text-xl '>Create New Password</h3>
                                <small className='leading-none'>You have recovered everything in your account. We are delighted to be with you on this journey</small>
                                <div className="mb-4 mt-4">
                                    <input
                                        name='password'
                                        id="password"
                                        type="password"
                                        placeholder="New Password"
                                        className="w-full px-4  py-2 border border-rose-600 rounded-md focus:outline-none focus:ring-0"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <input
                                        name='password2'
                                        id="password2"
                                        type="password"
                                        placeholder="Confirm Password"
                                        className="w-full px-4  py-2 border border-rose-600 rounded-md focus:outline-none focus:ring-0"
                                        required
                                    />
                                    <p className='text-sm text-rose-600 ml-1'>{error}</p>
                                </div>
                                <div className="mb-4 flex ">
                                    <button type='submit' className='text-white w-full bg-rose-600 hover:bg-rose-700 py-2 px-5 rounded-md'>Change</button>
                                </div>
                            </form>
                        </div>
                    </div>}
                </div>
            </div>

            {/* email verification modal */}
            <div className="mx-auto w-fit">
                <div className={`fixed z-[100] w-screen ${openModal ? 'visible opacity-100' : 'invisible opacity-0'} inset-0 grid place-items-center backdrop-blur-sm duration-100 bg-transparent`}>
                    <div onClick={(e_) => e_.stopPropagation()} className={`absolute w-full md:w-[40%] rounded-lg bg-white p-6 drop-shadow-lg ${openModal ? 'opacity-1 duration-300' : 'scale-110 opacity-0 duration-150'}`}>
                        <svg onClick={() => setOpenModal(false)} className="absolute right-3 top-3 w-6 cursor-pointer fill-zinc-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.99486 7.00636C6.60433 7.39689 6.60433 8.03005 6.99486 8.42058L10.58 12.0057L6.99486 15.5909C6.60433 15.9814 6.60433 16.6146 6.99486 17.0051C7.38538 17.3956 8.01855 17.3956 8.40907 17.0051L11.9942 13.4199L15.5794 17.0051C15.9699 17.3956 16.6031 17.3956 16.9936 17.0051C17.3841 16.6146 17.3841 15.9814 16.9936 15.5909L13.4084 12.0057L16.9936 8.42059C17.3841 8.03007 17.3841 7.3969 16.9936 7.00638C16.603 6.61585 15.9699 6.61585 15.5794 7.00638L11.9942 10.5915L8.40907 7.00636C8.01855 6.61584 7.38538 6.61584 6.99486 7.00636Z"></path></svg>
                        <h1 className="text-gray-700 mb-2 text-2xl font-semibold">Verification Code</h1>
                        <p className='text-gray-700'>If you can't find the email in your inbox, please check your spam or junk folder</p>
                        <div className="mt-8">
                            <Input.OTP
                                size='large'
                                style={{ width: '100%' }}
                                formatter={(str) => str.toUpperCase()} {...sharedProps} />
                        </div>
                        <p className='text-sm text-rose-600 ml-1'>{error}</p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
  )
}

export default Recover