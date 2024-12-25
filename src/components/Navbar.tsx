import { NavLink, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';

import { Button } from './ui/button';

import AppLogo from '@/assets/images/app-logo.svg';

import { authSelector, logout } from '@/redux/slices/authSlice';

const NAV_LINK: { route: string; name: string }[] = [
  { route: '/home', name: 'Home' },
  { route: '/solution', name: 'Solutions Hub' },
  // { route: '/post', name: 'Posts' },
  // { route: '/help', name: 'Help' },
];

export default function Navbar() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { user } = useAppSelector(authSelector);

  const handleLogOut = () => {
    dispatch(logout());
    navigate('/login', { replace: true });
  };

  return (
    <div className='flex h-[80px] w-full items-center justify-between rounded-md bg-white px-10'>
      <div className='flex items-center gap-5'>
        <img src={AppLogo} />
      </div>
      <div className='flex items-center gap-7'>
        {NAV_LINK.map((nav) => (
          <NavLink
            to={nav.route}
            key={nav.route}
            className={({ isActive }) =>
              `rounded-3xl p-2 px-6 text-[16px] font-semibold text-[#5C6BC0] transition duration-100 ease-out hover:bg-[#E9ECFF] hover:text-[#5C6BC0] ${isActive ? '!bg-[#d2d7fa] text-[#5C6BC0]' : ''}`
            }
          >
            {nav.name}
          </NavLink>
        ))}
      </div>
      {!user ? (
        <NavLink to='/login'>
          <Button className='bg-[#5C6BC0] text-[#ffffff] hover:bg-[#445090]'>
            Login
          </Button>
        </NavLink>
      ) : (
        <Button
          className='bg-[#5C6BC0] text-[#ffffff] hover:bg-[#445090]'
          onClick={handleLogOut}
        >
          Logout
        </Button>
      )}
    </div>
  );
}
