import { Navigate, Outlet } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { authSelector, fetchProfile } from './redux/slices/authSlice';
import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';

const ProtectedRoute = ({ isPublic }: { isPublic?: boolean }) => {
  const { user, isAuthenticated } = useAppSelector(authSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!user) {
      dispatch(fetchProfile());
    }
  }, [dispatch, user]);

  if (isAuthenticated && !user) {
    return (
      <div className='flex h-screen items-center justify-center'>
        <Loader2 className='animate-spin' size={70} />
      </div>
    );
  }

  if (isPublic) {
    if (user) {
      return <Navigate to='/home' replace />;
    }
    return <Outlet />;
  }

  if (!isAuthenticated && !user) {
    return <Navigate to='/login' replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
