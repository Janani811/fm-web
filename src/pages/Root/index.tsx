import Navbar from '@/components/Navbar';
import { Outlet } from 'react-router-dom';

export const Root = () => {
  return (
    <>
      <div className='flex w-full justify-center'>
        <Navbar />
      </div>
      <Outlet />
    </>
  );
};
