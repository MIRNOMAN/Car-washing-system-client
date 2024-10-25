import { useState } from 'react';
import Headroom from 'react-headroom';
import { NavLink, Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { logout, useCurentUser } from '../../redux/features/auth/authSlice';

const Navbar = () => {
  const [dropDownState, setDropDownState] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const currentRoute = window.location.pathname.split('/')[1];
  const user = useAppSelector(useCurentUser);
  const dispatch = useAppDispatch();

  return (
    <Headroom className="!z-[2000]">
      <nav className="flex z-20 border-b items-center justify-between text-[#393E46] px-5 py-2 bg-white">
        {/* Logo */}
        <div className="scale-100 cursor-pointer uppercase font-bold rounded-2xl px-3 py-2 text-xl transition-all duration-200 hover:scale-110">
          <Link to={'/'}>
            <h2>Quick<span className='text-rose-600'>Wash</span></h2>
          </Link>
        </div>

        {/* Desktop Links */}
        <ul className="hidden items-center justify-between gap-10 md:flex">
          {['', 'booking', 'services', 'contact'].map((route, idx) => (
            <NavLink to={`/${route}`} key={idx}>
              <li className="group flex cursor-pointer flex-col">
                {route ? route.charAt(0).toUpperCase() + route.slice(1) : 'Home'}
                <span className={`mt-[2px] h-[3px] ${currentRoute === route ? 'w-full' : 'w-0'} rounded-full bg-rose-600 transition-all duration-300 group-hover:w-full`}></span>
              </li>
            </NavLink>
          ))}

          {/* Conditional Sign In/Dropdown for User */}
          {!user ? (
            <NavLink to={'/auth/login'}>
              <li className="group flex cursor-pointer flex-col">
                Sign In
                <span className={`mt-[2px] h-[3px] ${currentRoute === 'auth' ? 'w-full' : 'w-0'} rounded-full bg-rose-600 transition-all duration-300 group-hover:w-full`}></span>
              </li>
            </NavLink>
          ) : (
            <div className="relative">
              <button onClick={() => setUserMenuOpen(!userMenuOpen)} className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" aria-expanded={userMenuOpen}>
                <span className="sr-only">Open user menu</span>
                <img className="w-8 h-8 rounded-full" src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg">
                  <div className="px-4 py-3">
                    <span className="block text-sm text-gray-900">{user.role === 'user' ? 'Customer' : 'Admin'}</span>
                    <span className="block text-sm text-gray-500 truncate">{user?.user}</span>
                  </div>
                  <ul className="py-1">
                    <li><Link to={`/profile/settings`} className="block px-4 py-2 text-sm text-gray-700">Profile Settings</Link></li>
                    <li><Link to={`/dashboard/${user?.role}/overview`} className="block px-4 py-2 text-sm text-gray-700">Dashboard</Link></li>
                    <li onClick={() => { dispatch(logout()); setUserMenuOpen(false); }} className="block px-4 py-2 text-sm text-gray-700 cursor-pointer">Logout</li>
                  </ul>
                </div>
              )}
            </div>
          )}
        </ul>

        {/* Mobile Menu */}
        <div className="flex md:hidden items-center">
          {user && (
            <div className="relative">
              <button onClick={() => setUserMenuOpen(!userMenuOpen)} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img className='w-8 rounded-full' alt="Profile img" src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" />
                </div>
              </button>

              {userMenuOpen && (
                <ul className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg">
                  <li className="px-4 py-3">{user?.user} <span className="badge">{user.role === 'user' ? 'Customer' : 'Admin'}</span></li>
                  <li><Link to={`/profile/settings`} className="block px-4 py-2 text-sm text-gray-700">Profile Settings</Link></li>
                  <li><Link to={`/dashboard/${user?.role}/overview`} className="block px-4 py-2 text-sm text-gray-700">Dashboard</Link></li>
                  <li onClick={() => { dispatch(logout()); setUserMenuOpen(false); }} className="block px-4 py-2 text-sm text-gray-700 cursor-pointer">Logout</li>
                </ul>
              )}
            </div>
          )}

          <button onClick={() => setDropDownState(!dropDownState)} className="ml-2 flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          </button>

          {dropDownState && (
            <ul className="absolute right-0 top-12 bg-white rounded-md shadow-lg">
              {['', 'booking', 'services', 'contact'].map((route, idx) => (
                <NavLink to={`/${route}`} key={idx} onClick={() => setDropDownState(false)}>
                  <li className="block px-6 py-2 cursor-pointer">{route ? route.charAt(0).toUpperCase() + route.slice(1) : 'Home'}</li>
                </NavLink>
              ))}
              {!user && (
                <NavLink to={'/auth/login'} onClick={() => setDropDownState(false)}>
                  <li className="block px-6 py-2 cursor-pointer">Sign In</li>
                </NavLink>
              )}
            </ul>
          )}
        </div>
      </nav>
    </Headroom>
  );
}

export default Navbar;
