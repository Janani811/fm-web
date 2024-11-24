import axios from '@/api/instance';

// signup
export const signUp = (data: {
  us_email: string;
  us_password: string;
  us_confirm_password: string;
}) => axios.post('/auth/signup', data);

// login
export const logIn = (data: { us_email: string; us_password: string }) =>
  axios.post('/auth/login', data);

// get profile
export const getProfile = () => axios.get('/auth/me');

// logout
export const logout = () => axios.get('/auth/logout');
