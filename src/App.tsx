import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Navigate,
} from 'react-router-dom';

import Login from '@/pages/Auth/Login';
import SignUp from '@/pages/Auth/SignUp';
import { Home } from '@/pages/Home';

import ProtectedRoute from '@/ProtectedRouter';
import { Root } from '@/pages/Root';
import NotFound from '@/pages/NotFound';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='*' element={<NotFound />} />

      <Route path='/' element={<Root />}>
        <Route index element={<Navigate to='/login' replace />} />
        {/* Public routes */}
        <Route element={<ProtectedRoute isPublic />}>
          <Route path='login' element={<Login />} />
          <Route path='signup' element={<SignUp />} />
        </Route>
        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path='home' element={<Home />} />
        </Route>
      </Route>
    </>
  )
);

export const App = () => {
  return <RouterProvider router={router} />;
};
