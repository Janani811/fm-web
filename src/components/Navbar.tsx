import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';

import { Button } from './ui/button';

import AppLogo from '@/assets/images/app-logo.svg';

import { authSelector, logout } from '@/redux/slices/authSlice';

const NAV_LINK: { route: string; name: string }[] = [
  { route: '/', name: 'Home' },
  { route: '/solution', name: 'Solutions' },
  { route: '/post', name: 'Posts' },
  { route: '/help', name: 'Help' },
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
    <div className='flex h-[80px] w-10/12 items-center justify-between rounded-md bg-white px-10'>
      <div className='flex items-center gap-5'>
        <div className='flex items-center gap-2'>
          <img src={AppLogo} />
        </div>
      </div>
      <div className='flex items-center gap-7'>
        {NAV_LINK.map((nav) => (
          <Link
            to={nav.route}
            key={nav.route}
            className='rounded-3xl p-2 px-6 text-[16px] font-semibold text-[#5C6BC0] transition duration-100 ease-out hover:bg-[#E9ECFF] hover:text-[#5C6BC0]'
          >
            {nav.name}
          </Link>
        ))}
      </div>
      {!user ? (
        <Link to='/login'>
          <Button className='bg-[#5C6BC0] text-[#ffffff] hover:bg-[#445090]'>
            Login
          </Button>
        </Link>
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
