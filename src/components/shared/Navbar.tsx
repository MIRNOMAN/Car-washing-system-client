import { useState } from 'react';
import Headroom from 'react-headroom';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { logout, useCurentUser } from '../../redux/features/auth/authSlice';
const Navbar = () => {
    const [dropDownState, setDropDownState] = useState(false);
    // const url = window.location.href;
    const currentRoute = window.location.pathname.split('/')[1];
    const user = useAppSelector(useCurentUser);
    const dispatch = useAppDispatch();
    // const { data: fullUser } = useGetFullUserQuery([{ email: user?.user }], { skip: !user });


  return (
    < Headroom className='!z-[2000]' >

    <nav className="flex z-20 border-b items-center justify-between text-[#393E46] px-5 py-2 bg-white">
        <div className="scale-100 cursor-pointer uppercase font-bold rounded-2xl px-3 py-2 text-xl   transition-all duration-200 hover:scale-110">
            <Link to={'/'}> <h2 >Quick<span className='text-rose-600'>Wash</span></h2></Link>
        </div>
        <ul className="hidden items-center justify-between gap-10 md:flex">
            <NavLink to={'/'}>
                <li className="group flex  cursor-pointer flex-col">
                    Home<span className={`mt-[2px] h-[3px] ${!currentRoute ? 'w-full' : 'w-0'} rounded-full bg-rose-600 transition-all duration-300 group-hover:w-full`}></span>
                </li>
            </NavLink>

            <NavLink to={'/booking'}>
                <li className="group flex  cursor-pointer flex-col">
                Booking<span className={`mt-[2px] h-[3px] ${currentRoute === 'booking' ? 'w-full' : 'w-0'} rounded-full bg-rose-600 transition-all duration-300 group-hover:w-full`}></span>
                </li>
            </NavLink>

            <NavLink to={'/services'}>
                <li className="group flex  cursor-pointer flex-col">
                Services<span className={`mt-[2px] h-[3px] ${currentRoute === 'services' ? 'w-full' : 'w-0'} rounded-full bg-rose-600 transition-all duration-300 group-hover:w-full`}></span>
                </li>
            </NavLink>
            <NavLink to={'/contact'}>
                <li className="group flex  cursor-pointer flex-col">
                    Contact<span className={`mt-[2px] h-[3px] ${currentRoute === 'contact' ? 'w-full' : 'w-0'} rounded-full bg-rose-600 transition-all duration-300 group-hover:w-full`}></span>
                </li>
            </NavLink>

            {!user ? <NavLink to={'/auth/login'}>
                <li className="group flex  cursor-pointer flex-col">
                    Sign In<span className={`mt-[2px] h-[3px] ${currentRoute === 'auth' ? 'w-full' : 'w-0'} rounded-full bg-rose-600 transition-all duration-300 group-hover:w-full`}></span>
                </li>
            </NavLink> :
                <div className="dropdown dropdown-end">
                   <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img
                                        alt="Profile img"
                                        // src={fullUser?.data?.photo ? fullUser?.data?.photo : demoProfile}
                                        src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                        />
                                </div>
                            </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 p-2 shadow">
                        <li>
                            <div className="justify-between">
                                {user?.user}
                                <span className="badge">
                                    {/* {user.role.charAt(0).toLocaleUpperCase() + user.role.slice(1)} */}
                                    {user.role === 'user' ? 'Customer' : 'Admin'}
                                </span>
                            </div>
                        </li>
                        <li>
                            <Link to={`/profile/settings`} >Profile Settings</Link>
                        </li>
                        <li>
                            <Link to={`/dashboard/${user?.role}/overview`} >Dashboard</Link>
                        </li>
                        <li onClick={() => dispatch(logout())}> <a>Logout</a> </li>
                    </ul>
                </div>}
        </ul>
        <div className="flex md:hidden justify-center items-center z-20">

            {/* mobile profile */}
            {user && <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    alt="Profile img"
                                    // src={fullUser?.data?.photo ? fullUser?.data?.photo : demoProfile}
                                    src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                    />
                            </div>
                        </div>
                <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 p-2 shadow">
                    <li>
                        <div className="justify-between">
                            {user?.user}
                            <span className="badge">
                                {/* {user.role.charAt(0).toLocaleUpperCase() + user.role.slice(1)} */}
                                {user.role === 'user' ? 'Customer' : 'Admin'}
                            </span>
                        </div>
                    </li>
                    <li>
                        <Link to={`/profile/settings`} >Profile Settings</Link>
                    </li>
                    <li>
                        <Link to={`/dashboard/${user?.role}/overview`} >Dashboard</Link>
                    </li>
                    <li onClick={() => dispatch(logout())}> <a>Logout</a> </li>
                </ul>
            </div>}

            <div onClick={() => setDropDownState(!dropDownState)} className="relative z-30 flex transition-transform md:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="cursor-pointer" > <line x1="4" x2="20" y1="12" y2="12" /> <line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" /> </svg>
                {dropDownState && (
                    <ul className=" z-10 bg-white  gap-2 border  text-[#393E46]  absolute right-0 top-11 flex w-[200px] flex-col  rounded-lg   text-base ">
                        <NavLink to={'/'}>
                            <li className="cursor-pointer  px-6 py-2 rounded-t-lg">
                                Home
                            </li>
                        </NavLink>
                        <NavLink to={'/booking'}>
                            <li className="cursor-pointer  px-6 py-2 ">
                            Booking
                            </li>
                        </NavLink>
                        <NavLink to={'/services'}>
                            <li className="cursor-pointer  px-6 py-2 ">
                            Services
                            </li>
                        </NavLink>
                        <NavLink to={'/contact'}>
                            <li className="cursor-pointer  px-6 py-2">
                                Contact
                            </li>
                        </NavLink>

                        {!user && <NavLink to={'/auth/login'}>
                            <li className="cursor-pointer  px-6 py-2">
                                Sign in
                            </li>
                        </NavLink>}
                    </ul>
                )}
            </div>
        </div>
    </nav>
</Headroom>
  )
}

export default Navbar