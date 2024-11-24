import { Codesandbox } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';

import { Button } from './ui/button';

import { authSelector, logout } from '@/redux/slices/authSlice';

const NAV_LINK: { route: string; name: string }[] = [
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
    <div className='flex h-[60px] w-full items-center justify-between px-5'>
      <div className='flex items-center gap-2'>
        <Codesandbox size='25' />
        <h2 className='text-[20px] font-bold'>FixMate</h2>
      </div>
      <div className='flex items-center gap-7'>
        {NAV_LINK.map((nav) => (
          <Link
            to={nav.route}
            key={nav.route}
            className='rounded-sm px-2 py-1 text-[14px] font-medium transition duration-100 ease-out hover:bg-slate-300'
          >
            {nav.name}
          </Link>
        ))}
        {!user ? (
          <Link to='/login'>
            <Button>Login</Button>
          </Link>
        ) : (
          <Button onClick={handleLogOut} className='w-fit'>
            Logout
          </Button>
        )}
      </div>
    </div>
  );
}
